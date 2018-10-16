var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

var User = require('./models/user');

var Cookies = require('cookies');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//设置跨域访问
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

//设置cookie

// app.use(function(req, res, next){
  //   req.cookies = new Cookies(req, res);
  
  //   req.userInfo = {};
  
  //   if(req.cookies.get('userInfo')){
    //     try {
      //       req.userInfo = JSON.parse(req.cookies.get('userInfo'))
      
      //       //获取当前用户是否为管理员
      
      //       User.findById(req.userInfo.id).then( userinfo => {
        //         req.userinfo.isAdmin = Boolean( userinfo.isAdmin );
        //         next();
        //       })
        //     }catch(e){
          //       next();
          //     }
          //   }
          //   next();
          // })
          
          
          
  app.use('/admin', require('./routers/admin'));
  
  app.use('/api', require('./routers/api'))
  // var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://127.0.0.1:27017/blog";
  
  mongoose.connect(url, { 'useNewUrlParser': true }, function(err, db) {
    if (err) throw err;
    console.log("数据库已连接!");
  //监听http请求
        
  app.listen(8888)
});