var mongoFridge = require('../models/fridge').MongoModel;
var joiFridge = require('../models/fridge').JoiModel;

let getFridgeById = async id => {
	try {
		let user = await mongoFridge.findOne({
			_id: id
		});
		return fridge;
	} catch (error) {
		return null;
	}
};

let createFridge = async (data) => {

	try {		
		let validationResult = joiFridge.validate(data);
		// check if there is an error
		if (validationResult.error) {
			return({ status: 'fail', message: 'validation error' });
		}
	} catch (error) {
		console.log('---------------------error at validate create fridge function------------')
		console.log(error);
		return({ status: 'fail', message: 'validation error' });
    }

    let newFridge = new mongoFridge(data);

	// check if there is an error when adding to database
	try {
		
		await newFridge.save();
	} catch (error) {
		console.log(error);
			console.log('---------------------error at new fridge save in create fridge function------------')
			console.log(error);
			return({ status: 'fail', message: "can't create fridge" });
	}
	return {status: 'successful'}

}

exports.getFridgeById = getFridgeById;
exports.createFridge = createFridge;
