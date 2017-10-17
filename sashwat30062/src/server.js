'use strict';

const express = require('express');
const app = express();
const ejs = require('ejs');
const join = require('path').join;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var mongojs = require('mongojs');
var db = mongojs('mydb',['user']);
const jwt = require('express-jwt');

//imports from other files

import router from './routes/router';
import api from './routes/api';

class Server{

	constructor(){
		this.app = app;
		this.port = process.env.PORT || 3000;
		this.templates();
		this.config();
		this.router();
		this.run();

		this.middleware();
		this.database();
		
	}

	run(){
		this.app.listen(this.port,'localhost',(err)=>{
			if(err){
				console.log("Error while connecting Server");
			}else{
				console.log('Server successfully started at port ' +this.port);
		}
		})
	}

	config(){
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended:false}));
	}

	templates(){
		this.app.set('views',__dirname + '/views');
		this.app.engine('html',ejs.renderFile);
		this.app.set('view engine','html');
	}

	router(){
		this.app.use('/user',router);
		this.app.use('/user',api);

		console.log("Hello router");
	}

	middleware(){

		this.app.use(jwt({
			secret:'Hello World !',
			credentialsRequired:false,
			getToken:function fromHeaderOrQuerystring(req){
			if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
				return req.headers.authorization.split(' ')[1];
			}else if(req.query && req.query.token){
				return req.query.token;
			}
			return null;	
			}
		}));
	}

	database(){

		mongoose.connect('mongodb://localhost/es6',(err)=>{
			if(err){
				console.log("Error in data base connection");
			}else{
	 			console.log("Data base succesfully connected");
			}
		});

	}
}

new Server();