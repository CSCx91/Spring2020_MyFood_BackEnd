var express = require('express');
var router = express.Router();
var mongoUser = require('../models/user').MongoModel;
var joiUser = require('../models/user').JoiModel;
var sha256 = require('js-sha256').sha256;
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/:id', async (req, res, next) => {
	let id = req.params.id;

	try {
		let user = await mongoUser.findOne({
			_id: id
		});

		if (user) {
			let { password, ...resUser } = user._doc;
			// console.log(user);
			res.send(resUser);
		} else {
			res.send(null);
		}
	} catch (error) {
		console.log(error);
		res.send(null);
	}

	// console.log(user);
	// TODO: get user from ID
});

router.post('/', async function(req, res) {
	const body = req.body;
	let validationResult = joiUser.validate(body);
	// check if there is an error
	if (validationResult.error) {
		res.send({ status: 'fail', message: 'valition error' });
		return;
	}

	let existUser;
	// checking if user is already in db
	await mongoUser.findOne({ username: body.username }, (err, user) => {
		if (err) {
			res.send({
				status: 'fail',
				message: 'can not check if user exist'
			});
			return;
		}
		existUser = user;
	});
	if (existUser) {
		res.send({ status: 'fail', message: 'user exists' });
		return;
	}

	let { password, ...userInfo } = body;
	password = sha256(password);
	// console.log(password, { ...userInfo, password });
	let newUser = new mongoUser({ ...userInfo, password });
	// check if there is an error when adding to database
	newUser.save(err => {
		if (err) {
			console.log(err);
			res.send({ status: 'fail', message: "can't create user" });
			return;
		}
		res.send({ status: 'success' });
	});
});

module.exports = router;
