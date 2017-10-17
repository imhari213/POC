'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _register = require('../controllers/register');

var _register2 = _interopRequireDefault(_register);

var _login = require('../controllers/login');

var _login2 = _interopRequireDefault(_login);

var _generator = require('../controllers/generator');

var _generator2 = _interopRequireDefault(_generator);

var _mail = require('../controllers/mail');

var _mail2 = _interopRequireDefault(_mail);

var _logout = require('../controllers/logout');

var _logout2 = _interopRequireDefault(_logout);

var _contact = require('../controllers/contact');

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var router = express.Router();
//import Transaction from './controllers/transaction';
//import Dashboard from './controllers/dashboard';

var Api = function () {
	function Api() {
		_classCallCheck(this, Api);

		this.router = router;
		this.postRoutes();
	}

	_createClass(Api, [{
		key: 'postRoutes',
		value: function postRoutes() {

			this.router.post('/register', _register2.default.register.bind(express));
			this.router.post('/login', _login2.default.login.bind(express));
			this.router.post('/generator', _generator2.default.generator.bind(express));
			this.router.post('/mail', _mail2.default.mail.bind(express));
			//this.router.post('/logout',logout.logout.bind(express));
			this.router.post('/contact', _contact2.default.contact.bind(express));
		}
	}]);

	return Api;
}();

module.exports = new Api().router;