'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Listing = models.Listing;
const Validator = require('validator');
const _ = require('lodash');
const Login = require('../configure/credentials.js');
const Credentials = Login.Credentials;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
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

//router.use(expressJWT({ secret: Credentials.jwtSecret }));

// updating the listing (regardless of status)
router.put('/', function(req, res, next) {
  Listing.findById(req.body.id)
  .then( (listing) => {
    if(listing){
      listing.updateAttributes(req.body)
      .then( () => res.sendStatus(201) )
      .catch(next)
    }
  })
});

// verifying login request
router.put('/login', function(req, res, next) {
  const { errors, isValid } = validateInput(req.body);
  if(!isValid) {
    res.status(400).json(errors);
  }else {
    //let expires = moment().add(7, 'days').valueOf();
    let expires = moment().add(20, 'seconds');
    let payload = {
      iss: req.body.user.username,
      exp: expires.valueOf()
    };

    let start = moment();
    let end = expires;

    const token = jwt.sign(payload, Credentials.jwtSecret);
    // simulates writing jwtToken to database
    Credentials.jwtToken = token;
    Credentials.timeout = [start, end];
    payload.token = token;
    res.status(200).json(payload);
  }
})

router.put('/verify', function(req, res, next) {
  console.log('token obj from localStorage', req.body)
  //console.log('Credentials', Credentials)
  let end = Credentials.timeout[1];
  let start = Credentials.timeout[0];
  let diff = moment.duration(end.diff(start));

  if(diff <= 0 ){
    // log em out
    console.log('unverified')
    res.status(201).json({ verified: false })
  }
  //console.log('IDKKKKKKKKKK', diff);
  //console.log(JSON.stringify(req.body.token))
})

// creating new listing
router.post('/create', function(req, res, next) {
  Listing.create(req.body.data)
  .then( () => res.sendStatus(201))
  .catch(next);
});

// updating a listing's status to active
router.put('/approve', function(req, res, next) {
  Listing.findById(req.body.id)
  .then( (listing) => {
    if(listing){
      listing.updateAttributes({
        status: 'active'
      })
      .then( () => res.sendStatus(201) )
      .catch(next)
    }
  })
});

// setting a listing's status to expired
router.put('/setexpired', function(req, res, next) {
  Listing.findById(req.body.id)
  .then( (listing) => {
    if(listing){
      listing.updateAttributes({
        status: 'expired'
      })
      .then( () => res.sendStatus(201) )
      .catch(next)
    }
  })
});


// retrieving all pending listings
router.get('/pending', function(req, res, next) {
  Listing.findAll({
    where: { status: 'pending' },
    order: '"expires"'
  }).then( (pendingListings) => {
    res.json(pendingListings)
  })
  .catch(next)
})

// retrieving all expired listings, ordered by most recently expired
router.get('/expired', function(req, res, next) {
  Listing.findAll({
    where: { status: 'expired' },
    order: '"expires"'
  }).then( (expiredListings) => {
    res.json(expiredListings)
  })
  .catch(next)
})

router.delete('/', function(req, res, next) {
  console.log('logging body $$$$', req.body)
  Listing.destroy({ where: { id: req.body.id }})
  .then( () => res.sendStatus(201) )
  .catch(next)
});

// handling request errors from '/pending'
router.use(function(err, req, res, next) {
  console.log('error', err.message)
  res.status(500).json(err.errors);
})
