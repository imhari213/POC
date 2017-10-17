'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	uname:{
		type:String,
		unique:false
	},
	email:{
		type:String,
		unique:true
	},
	phone:{
		type:String,
		unique:true
	},
	password:{
		type:String,
		unique:true
	},
	cname:{
		type:String,
		unique:true
	}
});

module.exports = mongoose.model('users',userSchema);