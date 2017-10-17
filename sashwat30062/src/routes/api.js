const express = require('express');
const router = express.Router();

import register from '../controllers/register';
import login from '../controllers/login';
import generator from '../controllers/generator';
import mail from '../controllers/mail';
//import Transaction from './controllers/transaction';
//import Dashboard from './controllers/dashboard';
import logout from '../controllers/logout';
import contact from '../controllers/contact';

class Api{

	constructor(){
		this.router = router;
		this.postRoutes();
	}

	postRoutes(){

		this.router.post('/register',register.register.bind(express));
		this.router.post('/login',login.login.bind(express));
		this.router.post('/generator',generator.generator.bind(express));
		this.router.post('/mail',mail.mail.bind(express));
		//this.router.post('/logout',logout.logout.bind(express));
		this.router.post('/contact',contact.contact.bind(express));
	}
}

module.exports = new Api().router;