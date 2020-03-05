var express = require('express');
var router = express.Router();
var mongoUser = require('../models/user').MongoModel;
var joiUser = require('../models/user').JoiModel;

/*
Function for determining if a username is already
in the database
*/
function isUniqueUser(uname){
  return user.find({username: uname});
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req,res) {
  const body = req.body;
  let validationResult = joiUser.validate(body)
  console.log(validationResult)
  // TODO use validation result and check for duplicates

  // let newUser = new mongoUser(body)
  // newUser.save();
})

module.exports = router;
