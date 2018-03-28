var express = require('express');
var path = require('path');
var app = express();

app.get('/', function(req, res){
    res.send("This is the home directory");
});

app.post('/movies/add', function(req, res){

});

app.listen(3000, function(){
    console.log("Server is up and running on port 3000");
});