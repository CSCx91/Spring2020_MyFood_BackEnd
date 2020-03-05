var express = require('express');
var router = express.Router();
var mongoFamily = require('../models/Family').mongoFamily;
var joiFamily = require('../models/Family').joiFamily;


router.get('../', function(req, res) {

    var 


})



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

module.exports = router;