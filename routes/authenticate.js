let express = require('express');
let router = express.Router();
let authenticateController = require('../controllers/authenticate');

let loginController = authenticateController.loginController;
let checkToken = authenticateController.checkToken;

router.post('/login', async (req, res) => {
	try {
		let { username, password } = req.body;
		let result = await loginController(username, password);
		res.send(result);
	} catch (error) {
		console.log(error);
		res.send({ status: 'fail', message: 'system error' });
	}
});

router.post('/check_token', async (req, res) => {
	let access_token = req.body.access_token;
	let userId = req.body.userId;
	try {
		let result = await checkToken(access_token, userId);
		if (result) {
			res.send({ status: 'successful', access_token: result });
		} else {
			res.send({ status: 'fail' });
		}
	} catch (error) {
		console.log(
			'--------------------error at check token route------------------------'
		);
		console.log(error);
		res.send({ status: 'fail' });
	}
});

module.exports = router;
