'use strict';

var express = require('express');
var bitcore = require('bitcore-lib');
var pushtx = require('blockchain.info/pushtx');
var blocktrail = require('blocktrail-sdk');
var util = require('util');
var setTimeoutPromise = util.promisify(setTimeout);
var generate = require('./generator');
var request = require('request');
var path = require('path');
var Mail = require('./mail');

var key = "3fd6a9e7e1ed1ace2fff04bac0c65eb0c78e3acd";

var secret = "af3f0d0ed5bbc1a1c5043fa6128d90e7bff97643";

var app = express();

exports.second = function () {

	var client = blocktrail.BlocktrailSDK({ apiKey: key, apiSecret: secret, network: "BTC", testnet: false });

	var private2 = generate.privatekey;
	var address = generate.address;
	var data1 = generate.data;
	var add = generate.add;

	console.log(private2);
	console.log(data1);
	console.log(address);
	//console.log(add);

	client.addressTransactions(address, function (err, addressTxs) {
		if (err) {

			console.log("Error in something");
			return res.status(500).send({ msg: 'Internal server error' });
		} else {
			console.log(addressTxs);

			console.log(JSON.stringify(addressTxs.data));
			//	console.log(data.hash);
			console.log(addressTxs.data[0].hash);
			console.log(addressTxs.data[0].inputs[0].output_hash);
			console.log(addressTxs.data[0].outputs[0].script_hex);
			//	console.log(addressTxs.data);

			var privateKey = new bitcore.PrivateKey(private2);
			var utxo = {
				"txId": addressTxs.data[0].inputs[0].output_hash,
				"outputIndex": 0,
				"address": address,
				"script": addressTxs.data[0].outputs[0].script_hex,
				"satoshis": 10000
			};

			var transaction = new bitcore.Transaction().from(utxo).addData(data1) // Add OP_RETURN data
			.sign(privateKey);

			console.log(transaction.toString());
			module.exports.tr = transaction.toString();
			setTimeoutPromise(36000).then(function () {
				Mail.mail();
				pushtx.pushtx(tr);
			});
		}
	});
};