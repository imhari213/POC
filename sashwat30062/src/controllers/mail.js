'use strict';
const nodemailer = require('nodemailer');
//const hostname = require('os').hostname;
const generate = require('./generator');
const ejs = require('ejs');
// const FirebaseTokenGenerator = require("firebase-token-generator");
// const tokenGenerator = new FirebaseTokenGenerator("<Digital lync sashwat by mahesh279>");
const bit = require('./bitcore.js');

exports.mail = (req,res)=>{

    //const hostname = req.get('host');
    // this.hostname = hostname;
    // console.log(hostname);

    //const token = tokenGenerator.createToken({uid: "1", some: "arbitrary", data: generate.email});
   // console.log(token);
    this.link = "https://blockchain.info/tx/"+bit.tr.result.txid;

    ejs.renderFile('wallet.ejs',{email:this.link},function(err, html){
    if (err){ 

    console.log(err);

    return res.status(404).send("Something wrong in server!! couldn't send mail content properly");

    } // Handle error

    console.log(`HTML: ${html}`);

    let transporter = nodemailer.createTransport({
        service:'gmail',
        secure: true, 
        auth: {
            user: 'maheshswamymeegada@gmail.com',
            pass: 'SwamyMahesh@279'
    }
});

    let mailOptions = {
        from: 'maheshswamymeegada@gmail.com', 
        to: generate.email, 
        subject: 'Sashwat development team', 
        text: 'Sashwat product message storing', 
        html: html 
};

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
         console.log(error);
         return res.status(404).send("Mesage sending failed");
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('dashboard.ejs');
});

})
}
