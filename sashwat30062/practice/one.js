var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('view engine','ejs');

// app.get('/',function(req,res){

// // for(i=0;i<1000;i++){
// // setTimeout(function () {
// // 	console.log("After 5 sec");
//     res.send("hello World");
// // }, 5000);
// // }	
// })


// setTimeout(function () {
// 	console.log("After 5 sec");
//    app.listen(3000);
//    console.log("hello server");
// }, 5000);

app.get('/',function(req,res){
	var count = 0; 
	var intervalObject = setInterval(function () { 
        count++; 
        console.log(count, 'seconds passed'); 
        if (count == 1) { 
            console.log('exiting'); 
            clearInterval(intervalObject); 
            res.render('index.ejs');
        } 
    }, 5000); 
})
 

app.listen(3000);
console.log("hello server");