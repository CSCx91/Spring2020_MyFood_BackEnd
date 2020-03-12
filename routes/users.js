var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

var getUserById = userController.getUserById;
var createUser = userController.createUser;

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
	// let {username, password} = req.body;
	try {
		let result = await createUser(body);
		res.send(result);
	} catch (error) {
		console.log('---------------------error at create user route-----------------')
		console.log(error)
		res.send({status: 'fail', message: 'system error'});
	}

});

module.exports = router;
