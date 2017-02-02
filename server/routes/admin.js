'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Listing = models.Listing;
const Validator = require('validator');
const _ = require('lodash');
const Login = require('../configure/login-credentials');
const Credentials = Login.Credentials;
module.exports = router;

function validateInput(data) {
  let errors = {};

  if(!Validator.equals(data.user.username, Credentials.username)) {
    if(Validator.isEmpty(data.user.username)) {
      errors.username = 'Username is required';
    }else{
      errors.username = 'Username does not match';
    }
  }


  if(!Validator.equals(data.user.password, Credentials.password)) {
    if(Validator.isEmpty(data.user.password)) {
      errors.password = 'Password is required';
    }else{
      errors.password = 'Password does not match';
    }
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

router.post('/', function(req, res, next) {
  console.log('loggin req body', req.body);
  const { errors, isValid } = validateInput(req.body);
  if(!isValid) {
    console.log('oooooh errors', errors)
    res.status(400).send(errors);
  }else{
    console.log('okay')
    res.send('okay!')
  }

})

router.get('/pending', function(req, res, next){
  Listing.findAll({
    where: { status: 'pending' }
  }).then( (pendingListings) => { res.json(pendingListings) })
  .catch(next)
})


// will eventually need a PUT Route & POST route from emails :)

router.use(function(req, res){
  res.status(404).end();
})
