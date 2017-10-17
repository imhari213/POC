'use strict';

var nodemailer = require('nodemailer');

exports.contact = function (req, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        auth: {
            user: 'maheshswamymeegada@gmail.com',
            pass: 'SwamyMahesh@279'
        }
    });

    var mailOptions = {
        from: req.body.email,
        to: 'maheshswamymeegada@gmail.com',
        subject: 'Website contact us form',
        text: req.body.message
        //html: '<b>Hello world ?</b>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            //return console.log(error);
            return res.status(404).send({ msg: 'Contact Mail sending failed' });
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        console.log('contact us mail sent to required user');

        return res.status(200).send({ msg: 'successfully sent!! please check your mail after sometime for reply from our team' });
    });
};