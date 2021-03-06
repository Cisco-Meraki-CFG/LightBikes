
/**
 * Module dependencies.
 */

var db = require('./db');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var _ = require('lodash-node');

var ejs = require('ejs-locals');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bots', express.static(path.join(__dirname, 'example-bots')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

_.each(routes, function(func, name) {
  var route = '/' + name;
  if (name === 'index') {
    route = '/';
  }
  app.get(route, func);
});

var api = require('./routes/api');
api.register(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
