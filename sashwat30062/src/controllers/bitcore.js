'use strict';

const express = require('express');
const bitcore = require('bitcore-lib');
const pushtx = require('blockchain.info/pushtx');
const blocktrail = require('blocktrail-sdk');
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);
const generate = require('./generator');
const request= require('request');
const path = require('path');
const Mail = require('./mail');

const key = "3fd6a9e7e1ed1ace2fff04bac0c65eb0c78e3acd";

const secret = "af3f0d0ed5bbc1a1c5043fa6128d90e7bff97643";


const app = express();

exports.second = ()=>{

	const client = blocktrail.BlocktrailSDK({apiKey: key, apiSecret: secret, network: "BTC", testnet: false});

	const private2 = generate.privatekey;
	const address = generate.address;
	const data1 = generate.data;
	const add = generate.add;

	console.log(private2);
	console.log(data1);
	console.log(address);
	//console.log(add);

	client.addressTransactions(address,function(err, addressTxs) {
	if(err){

		console.log("Error in something");
		return res.status(500).send({msg:'Internal server error'});

	}else{
		console.log(addressTxs);

		console.log(JSON.stringify(addressTxs.data));
	//	console.log(data.hash);
		console.log(addressTxs.data[0].hash);
		console.log(addressTxs.data[0].inputs[0].output_hash);
		console.log(addressTxs.data[0].outputs[0].script_hex);
	//	console.log(addressTxs.data);

		const privateKey = new bitcore.PrivateKey(private2);
		const utxo = {
 		 "txId" : addressTxs.data[0].inputs[0].output_hash,
  		 "outputIndex" : 0,
  		 "address" : address,
 		 "script" : addressTxs.data[0].outputs[0].script_hex,
	     "satoshis" :10000
};

		const transaction = new bitcore.Transaction()
    	.from(utxo)
    	.addData(data1) // Add OP_RETURN data
    	.sign(privateKey);

    	console.log(transaction.toString());
		module.exports.tr = transaction.toString();
		setTimeoutPromise(36000).then(() => {
  	      Mail.mail();
  	      pushtx.pushtx(tr);
		});
	}
});

	
		
}