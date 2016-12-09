'use strict';

const router = require('express').Router();
module.exports = router;

router.get('/', function(req, res, next){
  res.send('admin panel')
})

// router.post('/', function(req, res, next){

// })

router.use(function(req, res){
  res.status(404).end();
})
