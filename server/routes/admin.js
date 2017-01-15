'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Listing = models.Listing;
module.exports = router;


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
