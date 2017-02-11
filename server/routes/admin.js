'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Listing = models.Listing;
const Validator = require('validator');
const _ = require('lodash');
const Login = require('../configure/login-credentials');
const Credentials = Login.Credentials;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
module.exports = router;


function validateInput(data) {
  let errors = {};

  if(!Validator.equals(data.user.username, Credentials.username)) {
    if(Validator.isEmpty(data.user.username)) {
      errors.username = 'username is required';
    }else{
      errors.username = 'username does not match';
    }
  }

  if(!Validator.equals(data.user.password, Credentials.password)) {
    if(Validator.isEmpty(data.user.password)) {
      errors.password = 'password is required';
    }else{
      errors.password = 'password does not match';
    }
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

// router.use(expressJWT({ secret: Credentials.jwtSecret }));

router.put('/', function(req, res, next) {
console.log('req', req)
console.log('res', res)
  console.log('loggin req body', req.body);
  const { errors, isValid } = validateInput(req.body);
  if(!isValid) {
    console.log('oooooh errors', errors)
    res.status(400).json(errors);
  }else {
    const token = jwt.sign(req.body.user.username , Credentials.jwtSecret);
    // simulates writing jwtToken to database
    Credentials.jwtToken = token;
    res.status(200).json(token)
  }
})

router.post('/create', function(req, res, next) {
  Listing.create(req.body.data)
  .then( () => res.sendStatus(201))
  .catch(next);
});

router.get('/pending', function(req, res, next) {
  Listing.findAll({
    where: { status: 'pending' },
    order: '"expires"'
  }).then( (pendingListings) => { res.json(pendingListings) })
  .catch(next)
})

// handling errors from '/create'
router.use(function(err, req, res, next) {
  // console.log('error', err.message)
  res.status(500).json(err.errors);
})
