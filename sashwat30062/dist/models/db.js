'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = require('mongoose');

var Db = function () {
	function Db() {
		_classCallCheck(this, Db);

		this.connection();
	}

	_createClass(Db, [{
		key: 'connection',
		value: function connection() {

			mongoose.connect('mongodb://localhost/es6', function (err) {
				if (err) {
					console.log("Error in data base connection");
				} else {
					console.log("Data base succesfully connected");
				}
			});
		}
	}]);

	return Db;
}();

module.exports = new Db().connection;