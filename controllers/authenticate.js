let sha256 = require('js-sha256').sha256;
let userMongoDB = require('../models/user').MongoModel;
let userController = require('./user');

let getUserById = userController.getUserById;

// function to generate random Hex String (use to create access token)
let randHex = function(len) {
	var maxlen = 8,
		min = Math.pow(16, Math.min(len, maxlen) - 1),
		max = Math.pow(16, Math.min(len, maxlen)) - 1,
		n = Math.floor(Math.random() * (max - min + 1)) + min,
		r = n.toString(16);
	while (r.length < len) {
		r = r + randHex(len - maxlen);
	}
	return r;
};

// create a new random access token
let createNewAccessToken = () => {
	let expireDate = new Date();
	expireDate.setDate(expireDate.getFullYear() + 30);
	expireDate = expireDate.getTime();
	let newAccessToken = { value: randHex(20), expireDate: expireDate };
	return newAccessToken;
};

let loginController = async (username, password) => {
	password = sha256(password);
	let user;

	try {
		user = await userMongoDB.findOne({ username: username });
	} catch (error) {
		return { status: 'fail', message: 'connect database error' };
	}

	// if user with that user name exist
	if (user) {
		// check if password is correct
		if (user.password === password) {
			// generate new access token
			let newAccessToken = createNewAccessToken();
			// try save access token to user database
			user.access_token.push(newAccessToken);

			try {
				await user.save();
			} catch (error) {
				return { status: 'fail', message: 'connect database error' };
			}
			return { status: 'successful', access_token: newAccessToken };
		} else {
			return { status: 'fail', message: 'invalid password' };
		}
	} else {
		return { status: 'fail', message: 'invalid username' };
	}
};

// check if access token of that user is valid
let checkToken = async (token, userId) => {
	try {
		// check if access token is valid
		let user = await getUserById(userId);
		let access_token = user.access_token.find(
			element => element.value === token
		);
		// if valid then proceed to create a new token
		if (access_token) {
			console.log(access_token);
			let now = new Date();
			user.access_token = user.access_token.filter(
				item => item.value !== token
			);
			await user.save();

			// if token not expired then add a new token otherwise do nothing
			if (now.getTime() < access_token.expireDate) {
				let newAccessToken = createNewAccessToken();
				user.access_token.push(newAccessToken);
				await user.save();

				return newAccessToken;
			}
			return false;
		} else {
			return false;
		}
	} catch (error) {
		console.log(
			'--------------error at authenticate token----------------------'
		);
		console.log(error);
		return false;
	}
};

exports.loginController = loginController;
exports.checkToken = checkToken;
