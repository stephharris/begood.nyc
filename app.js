const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// routes

app.set('view engine', 'js'); //js is file extension of views (JSX)
app.set('views', path.join(__dirname, '/views')) // all the JSX

// body-parsing middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(path.join(__dirname, '/public'))); // all stylesheets

app.get('/', function(req, res){
  res.send('hiiii')
})

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(3001, function () {
  console.log('Server is listening on port 3001!');
})

