'use-strict';

module.exports = function(app) {
require('./parsing-middleware')(app);
require('./app-variables')(app);
}


