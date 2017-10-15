

var express = require('express');
var app = express();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var uri = 'mongodb://kbanashek:Password1@ds111895.mlab.com:11895/heroku_cwl3k0sv';


mongoose.Promise = global.Promise;
mongoose.connect(uri, function(err, db) {

  if(err) {
    throw err;
  }
  else{
    console.log("connected to mongo");

    process.env.NODE_ENV = 'development';
    var config = require('./config/environment');

    if(config.seedDB) {
        require('./config/seed');
    }

    var server = require('http').createServer(app);

    var socketio = require('socket.io')(server, {
      serveClient:  true,
      path: '/socket.io-client'
    });

    require('./config/socketio')(socketio);

    require('./config/express')(app);
    require('./routes')(app);


    server.listen(config.port, config.ip, function () {
      console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
  }
});



// Expose app
exports = module.exports = app;
