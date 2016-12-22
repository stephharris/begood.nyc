'use strict';

const router = require('express').Router();
module.exports = router;

router.get('/', function(req, res, next){
  res.send('admin panel')
})

// will eventually need a PUT Route & POST route from emails :)

router.use(function(req, res){
  res.status(404).end();
})
