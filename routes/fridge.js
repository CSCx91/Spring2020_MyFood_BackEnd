var express = require('express');
var router = express.Router();
var userController = require('../controllers/fridge');

var getFridgeById = fridgeController.getFridgeById;
var createFridge = fridgeController.createFridge;

router.get('/:id', async (req,res, next) => {
    let id = req.params.id;
    try {
        let fridge = await getFridgeById(id)
        if (fridge) {
            res.send(fridge)
        }
            else {
                res.send(null)
            }
        } catch (error) {
            console.log(
                '--------------------error at get fridge route---------------------'
            );
            console.log(error);
            res.send(null);
        }
    });

    router.post('/', async function(req, res) {
       const body = req.body;
       try {
           let result = await createFridge(body);
           res.send(result);
       }catch (error) {
		console.log('---------------------error at create fridge route-----------------')
		console.log(error)
		res.send({status: 'fail', message: 'system error'});
	}

});

module.exports = router;
