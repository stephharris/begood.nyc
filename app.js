const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
let port = process.env.PORT || 3001;

app.set('view engine', 'js'); // js is file extension of views (JSX)
app.set('views', path.join(__dirname, '/views')) // all the JSX

require('./server/configure')(app); // body-parsing middleware

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(path.join(__dirname, '/public')));

// routes accessed via AJAX (isolated from our GET /*)
app.use('/api', require('./server/routes'));
app.use('/admin', require('./server/routes/admin.js'));

//app.get('/admin', require('./server/routes/admin.js'));
app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(port, function () {
  console.log('Server is listening on port 3001!');
})

