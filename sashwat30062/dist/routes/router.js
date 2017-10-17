'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var router = express.Router();

var Router = function () {
	function Router() {
		_classCallCheck(this, Router);

		this.router = router;
		this.getRoutes();
	}

	_createClass(Router, [{
		key: 'getRoutes',
		value: function getRoutes() {
			this.router.get('/', function (req, res) {
				res.send('<h1>Hello Mahesh</h1>');
			});

			this.router.get('/wallet', function (req, res) {
				res.render('wallet.ejs', { email: "" });
			});

			this.router.get('/register', function (req, res) {
				res.render('register.ejs');
			});

			this.router.get('/login', function (req, res) {
				res.render('login.ejs', { name: "" }, { u1: "" });
			});

			this.router.get('/dashboard', function (req, res) {
				res.render('dashboard.ejs', { user: "" });
			});

			this.router.get('/contact', function (req, res) {
				res.render('contactus.ejs');
			});
		}
	}]);

	return Router;
}();

module.exports = new Router().router;