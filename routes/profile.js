var express = require('express');
var router = express.Router();
var mongoProfile = require('../models/Profile').mongoProfile;
var joiProfile = require('../models/Profile').joiProfile;

    router.get('/:id', async (req, res) => {

        try {
            let id = req.params.id;
            let Profile = await mongoProfile.findById(id);
            res.send(Profile);
        } 
        catch(err) {
            res.status(400).send({status: "Failed", message: "Cannot get data"})
        }
    
    })
    

router.post('/', (req, res) => {

    let data = req.body;
    let validationResult = joiProfile.validate(data);

    if (validationResult.error){
        res.send({status: "fail", message: "validate error"})
        return;
    }

    let newProfile = new mongoProfile(data);
    newProfile.save()
        .then(newProfile => {
            res.send({status: "success"});
        })
        .catch(err => {
            res.status(400).send({status: "fail", message: "can't save data"});
        });
});

module.exports = router;