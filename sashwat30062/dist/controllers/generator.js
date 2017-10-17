'use strict';

var bitcoin = require('bitcoinjs-lib');
var keyPair = bitcoin.ECPair.makeRandom();
var blocktrail = require('blocktrail-sdk');
var bodyParser = require('body-parser');
var util = require('util');
var setTimeoutPromise = util.promisify(setTimeout);
var mongojs = require('mongojs');
var Certi = require('../models/certi');
var db = mongojs('mydb', ['certi']);
var second = require('./bitcore');

var key = "3fd6a9e7e1ed1ace2fff04bac0c65eb0c78e3acd";

var secret = "af3f0d0ed5bbc1a1c5043fa6128d90e7bff97643";

exports.generator = function (req, res) {

	var client = blocktrail.BlocktrailSDK({ apiKey: key, apiSecret: secret, network: "BTC", testnet: false });

	console.log(keyPair.toWIF());
	console.log(keyPair.getAddress());

	module.exports.privatekey = keyPair.toWIF();
	module.exports.address = keyPair.getAddress();

	// const email = req.body.email;
	// const data = req.body.data;

	// console.log(email);
	// console.log(data);

	var new_certi = new Certi({

		email: req.body.email,
		data: req.body.data
		//addresstrail:req.body.addresstrail,

	});

	db.certi.save(new_certi, function (err) {
		if (err) {
			console.log("Error in saving certificate");
			return res.status(500).send({ msg: 'Certificate is not saved in database please reload and try again' });
		} else {
			console.log("Certificate saved successfully");

			console.log(req.body.email);
			console.log(req.body.data);
			//console.log(req.body.addresstrail);
			//module.exports.add = req.body.addresstrail;
			module.exports.data = req.body.data;
			module.exports.email = req.body.email;
			// console.log(add);
			// console.log(data);
			var sending = client.initWallet("sashwat", "sashwat", function (err, wallet) {
				if (err) {
					console.log(err);

					return res.status(501).send({ msg: 'Sorry about bad behaviour of server. Something problem with initiation of wallet' });
				} else {
					console.log("----------");

					//console.log(address+"is the addr");
					var pay = {};
					pay[keyPair.getAddress()] = blocktrail.toSatoshi(0.0001);
					wallet.pay(pay, function (err, transaction1) {
						if (err) {
							console.log("Error " + err);
							return res.status(500).send('Internal server occured during first transaction');
						} else {
							console.log("result is " + transaction1);

							setTimeoutPromise(36000).then(function () {
								second.second();
							});
						}
					});
				}
			});
		}
	});
};