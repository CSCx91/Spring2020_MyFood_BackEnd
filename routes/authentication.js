var express = require('express');
var router = express.Router();
var sha256 = require('js-sha256').sha256;
var userMongoDB = require('../models/user').MongoModel;

// function to generate random Hex String (use to create access token)
var randHex = function(len) {
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

router.post('/login', async (req, res) => {
	let { username, password } = req.body;
	password = sha256(password);
	let user;

	try {
		user = await userMongoDB.findOne({ username: username });
	} catch (error) {
		// console.log('--------get user error-----------');

		res.send({ status: 'fail', message: 'connect database error' });
		return;
	}

	// if user with that user name exist
	if (user) {
		// check if password is correct
		if (user.password === password) {
			// generate new access token
			let expireDate = new Date();
			expireDate.setDate(expireDate.getFullYear() + 30);
			expireDate = expireDate.getTime();
			let newAccessToken = { value: randHex(20), expireDate: expireDate };

			// try save access token to user database
			user.access_token.push(newAccessToken);

			try {
				await user.save();
			} catch (error) {
				console.log(error);
				res.send({ status: 'fail', message: 'connect database error' });
				return;
			}
			res.send({ status: 'successful', access_token: newAccessToken });
		} else {
			res.send({ status: 'fail', message: 'invalid password' });
		}
	} else {
		res.send({ status: 'fail', message: 'invalid username' });
		return;
	}
});

module.exports = router;
