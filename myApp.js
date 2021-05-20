var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');
require('dotenv').config();
var bodyParser = require('body-parser');

app.use(function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

bGround.log("Hello World");
console.log("Hello World");

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html");
  });

app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));

// app.get("/json", function(req, res){
//     res.json(
//         {
//             "message": "Hello json"
//         }
//     );
// });

app.get("/json", function(req, res){
    var jsonResponse = {"message" : "Hello json"};

    if(process.env.MESSAGE_STYLE === "uppercase"){
        jsonResponse.message = jsonResponse.message.toLocaleUpperCase()
    }
        res.json(jsonResponse);    
});

function getTheCurrentTimeString(){
    return new Date().toString();
} 

app.get("/now", function(req, res, next){
    req.time = getTheCurrentTimeString();
    next();
}, function(req, res){
    res.json({time:req.time});
});

app.get("/:word/echo", function(req, res){
    res.json({echo:req.params.word});

});

app.get("/name", function(req, res){
    res.json({name:req.query.first + " " + req.query.last});

});

app.post(function(req, res,){
    res.json({name: req.body.first + " " +req.body.last});
});


































 module.exports = app;