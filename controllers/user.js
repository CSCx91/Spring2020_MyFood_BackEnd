var mongoUser = require('../models/user').MongoModel;
var mongoUser = require('../models/user').MongoModel;
var joiUser = require('../models/user').JoiModel;
var sha256 = require('js-sha256').sha256;

let getUserById = async id => {
	try {
		let user = await mongoUser.findOne({
			_id: id
		});
		return user;
	} catch (error) {
		return null;
	}
};

let createUser = async (data) => {

	try {		
		let validationResult = joiUser.validate(data);
		// check if there is an error
		if (validationResult.error) {
			return({ status: 'fail', message: 'valition error' });
		}
	} catch (error) {
		console.log('---------------------error at validate create user function------------')
		console.log(error);
		return({ status: 'fail', message: 'validation error' });
	}

	

	// checking if user is already in db
	try {
		let existUser = await mongoUser.findOne({ username: data.username });
		if (existUser) {
			return({ status: 'fail', message: 'user exists' });
		}
		
	} catch (error) {
		console.log('---------------------error at check database for user in create user function------------')
		console.log(error);
		return({ status: 'fail', message: 'Connection issue' });
	}

	let { password, ...userInfo } = data;
	password = sha256(password);
	let newUser = new mongoUser({ ...userInfo, password, access_token: [] });

	// check if there is an error when adding to database
	try {
		
		await newUser.save();
	} catch (error) {
		console.log(error);
			console.log('---------------------error at new user save in create user function------------')
			console.log(error);
			return({ status: 'fail', message: "can't create user" });
	}
	return {status: 'successful'}

}

exports.getUserById = getUserById;
exports.createUser = createUser;
