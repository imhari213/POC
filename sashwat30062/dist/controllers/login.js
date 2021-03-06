'use strict';

var express = require('express');
var bcrypt = require('bcryptjs');
var mongojs = require('mongojs');
var User = require('../models/users');
//const database = require('../models/db');

var db = mongojs('mydb', ['user']);

exports.login = function (req, res) {

	db.user.findOne({ email: req.body.email }, function (err, user) {
		if (!user) {
			console.log('User not found');
			res.render('login.ejs', { u1: "Cannot find user in db are u real user" });

			console.log(user.email);
		} else {
			console.log(user.email);
			if (bcrypt.compareSync(req.body.password, user.password)) {
				console.log(user.password);
				res.render('dashboard.ejs', { user: user });
			} else {
				res.render('login.ejs');
			}
		}
	});
};