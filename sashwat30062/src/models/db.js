const mongoose = require('mongoose');

class Db{

	constructor(){
		this.connection();
	}

	connection(){

		mongoose.connect('mongodb://localhost/es6',(err)=>{
			if(err){
				console.log("Error in data base connection");
			}else{
				console.log("Data base succesfully connected");
			}
		});

	}
}

module.exports = new Db().connection;