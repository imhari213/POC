const express = require('express');
const router = express.Router();


class Router{

	constructor(){
		this.router = router;
		this.getRoutes();
	}

	getRoutes(){
		this.router.get('/',(req,res)=>{
			res.send('<h1>Hello Mahesh</h1>');
		})

		this.router.get('/wallet',function(req,res){
  			res.render('wallet.ejs',{email:""});
		})

		this.router.get('/register',function(req,res){
  			res.render('register.ejs');
		})

		this.router.get('/login',function(req,res){
  			res.render('login.ejs',{name:""},{u1:""});
		})

		this.router.get('/dashboard',function(req,res){
  			res.render('dashboard.ejs',{user:""});
		})

		this.router.get('/contact',function(req,res){
			res.render('contactus.ejs');
		})
	}
}

module.exports = new Router().router;