var http = require('http');
var fs = require("fs");
var url = require('url') ;
var express=require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const REST_PORT = (process.env.PORT || 5000);
const DEV_CONFIG = process.env.DEVELOPMENT_CONFIG == 'true';
app.use(bodyParser.json())
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/demo/view/index.html'));
});
app.post('/', functio(req, res) {
  console.log("Recieved : "+JSON.stringify(req.body));
})
app.use(express.static(path.join(__dirname, 'demo/js')));
app.listen(REST_PORT);
