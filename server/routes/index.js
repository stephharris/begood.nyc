'use strict';

const router = require('express').Router();
const models = require('../db/models');
const Listing = models.Listing;
module.exports = router;


router.get('/', function(req, res, next){
  Listing.findAll({
    where: { status: 'active' }
  })
  .then( (listings) => {
    res.json(listings)
  })
  .catch(next);
})

router.post('/', function(req, res, next){
  console.log('hit the post route')
  res.json('submitted volunteer form')
})

router.use(function(req, res){
  res.status(404).end()
})

