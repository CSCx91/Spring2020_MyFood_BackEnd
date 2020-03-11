var mongoUser = require('../models/user').MongoModel;

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

exports.getUserById = getUserById;
