var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', require('./routers/api'))



// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/blog";
 
mongoose.connect(url, { 'useNewUrlParser': true }, function(err, db) {
  if (err) throw err;
  console.log("数据库已连接!");
  //监听http请求
        
  app.listen(8888)
});