'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _router2 = require('./routes/router');

var _router3 = _interopRequireDefault(_router2);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var app = express();
var ejs = require('ejs');
var join = require('path').join;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var db = mongojs('mydb', ['user']);
var jwt = require('express-jwt');

//imports from other files

var Server = function () {
	function Server() {
		_classCallCheck(this, Server);

		this.app = app;
		this.port = process.env.PORT || 3000;
		this.templates();
		this.config();
		this.router();
		this.run();

		this.middleware();
		//this.database();
	}

	_createClass(Server, [{
		key: 'run',
		value: function run() {
			var _this = this;

			this.app.listen(this.port, 'localhost', function (err) {
				if (err) {
					console.log("Error while connecting Server");
				} else {
					console.log('Server successfully started at port ' + _this.port);
				}
			});
		}
	}, {
		key: 'config',
		value: function config() {
			this.app.use(bodyParser.json());
			this.app.use(bodyParser.urlencoded({ extended: false }));
		}
	}, {
		key: 'templates',
		value: function templates() {
			this.app.set('views', __dirname + '/views');
			this.app.engine('html', ejs.renderFile);
			this.app.set('view engine', 'html');
		}
	}, {
		key: 'router',
		value: function router() {
			this.app.use('/user', _router3.default);
			this.app.use('/user', _api2.default);

			console.log("Hello router");
		}
	}, {
		key: 'middleware',
		value: function middleware() {

			this.app.use(jwt({
				secret: 'Hello World !',
				credentialsRequired: false,
				getToken: function fromHeaderOrQuerystring(req) {
					if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
						return req.headers.authorization.split(' ')[1];
					} else if (req.query && req.query.token) {
						return req.query.token;
					}
					return null;
				}
			}));
		}

		// database(){

		// 	mongoose.connect('mongodb://localhost/es6',(err)=>{
		// 		if(err){
		// 			console.log("Error in data base connection");
		// 		}else{
		//			console.log("Data base succesfully connected");
		// 		}
		// 	});

		// }

	}]);

	return Server;
}();

new Server();