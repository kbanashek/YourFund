/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var funds = require('../api/fund/fund.model');
var transcations = require('../api/transaction/transaction.model');


  var user = new User({
    name: 'Jon Seed',
    email: 'admin@admin.com',
    password: 'admin',
    funds: []
  });

  user.save(function (err, result) {
    if (err) {
      console.log(err.message);
    }
    console.log("users created");
    //res.status(200).send({token: createToken(result)});
  });








