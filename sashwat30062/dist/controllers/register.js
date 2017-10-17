'use strict';

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var bcrypt = require('bcryptjs');
var mongojs = require('mongojs');
//const database = require('../models/db');

var db = mongojs('mydb', ['user']);

exports.register = function (req, res) {

	var user1 = new _users2.default({

		uname: req.body.uname,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
		phone: req.body.phone,
		cname: req.body.cname
	});

	db.user.save(user1, function (err, result) {
		if (err) {
			console.log("Error connecting to database");
			return res.status(500).send({ msg: 'Sorry database is busy right now or cannot connect' });
		} else {
			console.log("User saved in database during registration " + result);
			res.render('login.ejs', { name: result.uname });
		}
	});
};