'use strict';

const router = require('express').Router();
const models = require('../db/models');
const Listing = models.Listing;
module.exports = router;


// retrieve all active listings
router.get('/', function(req, res, next){
  Listing.findAll({
    where: { status: 'active' },
    order: '"expires"'
  })
  .then( (listings) => {
    res.json(listings)
  })
  .catch(next);
})

router.use(function(req, res){
  console.log('bizarrely got here')
  res.status(404).end()
})

