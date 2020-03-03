var express = require('express');
var router = express.Router();
var mongoFamily = require('../models/Family').mongoFamily;

router.post('/', (req, res) => {
    data = req.body;
    let newFamily = new mongoFamily({});
    newFamily.save(function (err) {

    })
})

module.export = router;