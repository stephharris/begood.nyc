'use strict';

const router = require('express').Router();
// const models = require('../db/models');
// const Listing = models.Listing;
const test = [{ company: 'ACLU', description: 'bleh'}, { company: 'WPA', description: 'meep'}, { company: 'Planned Parenthood', description: 'jlkajdkfljd'}];
module.exports = router;


router.get('/', function(req, res, next){
  console.log('hit the router in the back');
  res.json(test)
 // .catch(next);
  // Listing.findAll({})
  // .then( listings => res.json(listings))
  // .catch(next);
})

router.use(function(req, res){
  res.status(404).end()
})

