const express = require('express');
const bcrypt = require('bcryptjs');
const mongojs = require('mongojs');
//const database = require('../models/db');

var db = mongojs('mydb',['user']);

import User from '../models/users';

exports.register = (req,res)=>{

	
		const user1 = new User({

			uname:req.body.uname,
			email:req.body.email,
			password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
			phone:req.body.phone,
			cname:req.body.cname,
		})

		db.user.save(user1,(err,result)=>{
			if(err){
				console.log("Error connecting to database");
				return res.status(500).send({msg:'Sorry database is busy right now or cannot connect'});
			}else{
				console.log("User saved in database during registration "+ result);
				res.render('login.ejs',{name:result.uname});
			}
		})


}
