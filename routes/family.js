var express = require('express');
var router = express.Router();
var mongoFamily = require('../models/Family').mongoFamily;
var joiFamily = require('../models/Family').joiFamily;

router.get('/:id', async (req, res) => {
    
    try {
        let id = req.params.id;
        let family = await mongoFamily.findById(id);
        res.send(family);
    } 
    
    catch(err) {
        res.send(null);
    }
});


router.post('/', (req, res) => {

    let data = req.body;

    let validationResult = joiFamily.validate(data);
    if (validationResult.error){
        console.log(validationResult.error)
        res.send({status: "fail", message: "validate error"})
        return;
    }

    let newFamily = new mongoFamily(data);
    newFamily.save()
        .then(newFamily => {
            res.send({status: "success"});
        })
        .catch(err => {
            res.status(400).send({status: "fail", message: "can't save data"});
        });
});

router.put('/:id', (req, res) => {

    let id = req.params.id;
    let data = req.body;

    let validationResult = joiFamily.validate(data);
    if (validationResult.error) {
        res.send({status: "fail", message: "validate error"})
        return;
    }
    
    try {
        mongoFamily.findByIdAndUpdate(id, data);
        res.send({status: "successful"});
    }

    catch(err) {
        res.status(400).send({status: "fail", message: "could not find and update data"});
    }

});


module.exports = router;