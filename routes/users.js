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

router.post('/', async function(req,res) {
  const body = req.body;
  let validationResult = joiUser.validate(body);
  // check if there is an error
  if (validationResult.error){
    res.send({status: "fail", message: "valition error"});
    return;
  }

  let existUser;

  // checking if user is already in db
  await mongoUser.findOne({username: body.username}, (err, user) => {
    if (err){
      return;
    }
    existUser = user;

  });

  if (existUser) {
    res.send({status: "fail", message: "user exists"});
    return
  }
  
  let newUser = new mongoUser(body);

  // check if there is an error when adding to database
  newUser.save((err) => {
    if (err){
      res.send({status: "fail", message: "can't create user"});
      return;
    }
    res.send({status: "success"})
  });
});

module.exports = router;
