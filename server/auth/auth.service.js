'use strict';

var mongoose = require('mongoose');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secrets.session });
var moment = require('moment');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt

    // Attach user to request
    .use(function(req, res, next) {

      if(!req.header('Authorization')) {
        return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
      }

      var token = req.header('Authorization').split(' ')[1];

      var payload = jwt.decode(token, 'secret');
      var userId = payload._id;

      if(payload.exp <= moment().unix()){
        return res.status(401).send({message: 'Token has expired'});
      }

      User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
        user.token = payload.sub;
        req.user = user;
        next();
      });
    });
}

function authenticate(User, plainText) {
  return User.password === plainText;
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.send(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresIn: 60*5 });
}


exports.authenticate = authenticate;
exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;

