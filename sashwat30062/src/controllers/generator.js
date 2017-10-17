'use strict';

const bitcoin = require('bitcoinjs-lib');
const keyPair = bitcoin.ECPair.makeRandom();
const blocktrail = require('blocktrail-sdk');
const bodyParser = require('body-parser');
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);
var mongojs = require('mongojs');
var Certi = require('../models/certi');
const db = mongojs('mydb',['certi']);
const second = require('./bitcore');

const key = "3fd6a9e7e1ed1ace2fff04bac0c65eb0c78e3acd";

const secret = "af3f0d0ed5bbc1a1c5043fa6128d90e7bff97643";


exports.generator = (req,res)=>{

	const client = blocktrail.BlocktrailSDK({apiKey: key, apiSecret: secret, network: "BTC", testnet: false});

	console.log(keyPair.toWIF())
	console.log(keyPair.getAddress())

	module.exports.privatekey = keyPair.toWIF();
	module.exports.address = keyPair.getAddress();
	

	// const email = req.body.email;
	// const data = req.body.data;

	// console.log(email);
	// console.log(data);

	const new_certi = new Certi({

		email : req.body.email,
		data:req.body.data,
		//addresstrail:req.body.addresstrail,

	})

	db.certi.save(new_certi,(err)=>{
		if(err){
			console.log("Error in saving certificate");
			return res.status(500).send({msg:'Certificate is not saved in database please reload and try again'});
		}else{
			console.log("Certificate saved successfully");

			console.log(req.body.email);
			console.log(req.body.data);
			//console.log(req.body.addresstrail);
			//module.exports.add = req.body.addresstrail;
			module.exports.data = req.body.data;
			module.exports.email = req.body.email;
			// console.log(add);
			// console.log(data);
			const sending = client.initWallet("sashwat","sashwat",function(err,wallet){
          if(err){
            console.log(err);

            return res.status(501).send({msg:'Sorry about bad behaviour of server. Something problem with initiation of wallet'});
            
          }else{
            console.log("----------");
           
            
            //console.log(address+"is the addr");
            var pay = {};
            pay[keyPair.getAddress()] = blocktrail.toSatoshi(0.0001);
              wallet.pay(pay,function(err, transaction1){
                if(err){
                  console.log("Error " +err);
                  return res.status(500).send('Internal server occured during first transaction');
                }else{
                  console.log("result is "+transaction1);

                 	  setTimeoutPromise(36000).then(() => {
  						      second.second();
					});

                }
              })
          }
        })
		}
	})
}


