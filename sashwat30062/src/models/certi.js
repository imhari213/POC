'use strict';

const mongoose = require('mongoose');

const certiSchema = mongoose.Schema({
	
	email:{
		type:String,
		unique:true
	},
	data:{
		type:String,
		unique:true
	}
	
});

module.exports = mongoose.model('certi',certiSchema);