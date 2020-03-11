var express = require('express');
var router = express.Router();
var mongoUser = require('../models/user').MongoModel;
var joiUser = require('../models/user').JoiModel;
var sha256 = require('js-sha256').sha256;
var userController = require('../controllers/user');

var getUserById = userController.getUserById;

/* GET users listing. */
router.get('/:id', async (req, res, next) => {
	let id = req.params.id;
	try {
		let user = await getUserById(id);
		if (user) {
			let { password, access_token, ...resUser } = user._doc;
			res.send(resUser);
		} else {
			res.send(null);
		}
	} catch (error) {
		console.log(
			'--------------------error at get user route---------------------'
		);
		console.log(error);
		res.send(null);
	}
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
	let newUser = new mongoUser({ ...userInfo, password, access_token: [] });

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
