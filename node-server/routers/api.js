var express = require('express');
var app = express();

var Cookies = require('cookies');

var router = express.Router();

// var mongodb = require('mongodb')

var userModel = require('../models/user.js')

var responseData;
router.use( function(req, res, next) {
    responseData = {
        code: 0,
        message: '',
        sucess: false,
        data: null
    }

    next();
} );




//注册逻辑

/**
 * 1.用户名不能为空 ，密码，确认密码不能为空
 * 
 * 2.两次密码是够一致
 * 
 * 3.查询用户是否被注册了
 * 
 *      数据库查询
 * 
 */
router.post('/user/register', function(req, res, next){
    
    var reqData = req.body;
    var username = reqData.username;
    var password = reqData.password;
    var repassword = reqData.repassword;

    
    //判断用户名是否为空
    if( username == ''){
        responseData.code = 200;
        responseData.message = '用户名不能为空';
        responseData.sucess = false;
        responseData.data = [];
        res.json(responseData);
        return;
    }
    //密码不能为空
    if( password == ''){
        responseData.code = 200;
        responseData.message = '密码不能为空';
        responseData.sucess = false;
        responseData.data = [];
        res.json(responseData);
        return;
    }

    //两次输入的密码不一致
    if( password !==  repassword){
        responseData.code = 200;
        responseData.message = '两次输入的密码不一致';
        responseData.sucess = false;
        responseData.data = [];
        res.json(responseData);
        return;
    }

    // 判断当前用户是否被注册
    // console.log(mongodb.Db)
    userModel.findOne({
        username: username
    })
    .then(function(userInfo){
        //用户已经被注册`
        if( userInfo ){
            responseData.code = 200;
            responseData.message = '用户已经被注册了';
            responseData.sucess = false;
            responseData.data = [];
            res.json(responseData)
            return;
        }
        //保存到数据库中
        let user = new userModel({
            username: username,
            password: password
        });
        user.save();
        //注册成功
        responseData.code = 200;
        responseData.message = '注册成功';
        responseData.sucess = true;
        responseData.data = [];
        res.json(responseData);
        return;
    })

})


//登陆逻辑

/**
 * 1.用户名不能为空 ，密码，确认密码不能为空
 * 
 * 2.两次密码是够一致
 * 
 * 3.查询用户是否被注册了
 * 
 *      数据库查询
 * 
 */

router.post('/user/login', function(req, res, next){
    req.cookies = new Cookies(req, res);
    var reqData = req.body;
    var username = reqData.username;
    var password = reqData.password;

    if(!username || !password){
        responseData.code = 200;
        responseData.message = '用户名或者密码不能为空';
        responseData.sucess = false;
        responseData.data = [];
        res.json(responseData)
        return;
    }

    userModel.findOne({
        username: username,
        password: password
    })

    .then(function(userInfo){
        //用户名或者密码错误`
        if(!userInfo || userInfo.username != username || userInfo.password != password ){
            responseData.code = 200;
            responseData.message = '用户名或者密码错误';
            responseData.sucess = false;
            responseData.data = [];
            res.json(responseData)
            return;
        }
        //登陆成功
        responseData.code = 200;
        responseData.message = '登陆成功';
        responseData.sucess = true;
        responseData.data = [];

        responseData.userInfo = {
            id: userInfo._id,
            username: userInfo.username,
            password: userInfo.password
        }
        req.cookies.set('userInfo', JSON.stringify(responseData.userInfo) ,{"httpOnly": false})
        res.json(responseData)
    })

    // if( !username || !password){
    //     responseData.code = 200;
    //     responseData.message = '用户名或密码不能为空';
    //     responseData.sucess = true;
    //     responseData.data = [];
    //     res.json(responseData)
    //     return;
    // }
 })

 //登录退出逻辑

 router.post('/user/logout', function(req, res, next){
    // var reqData = req.body;
    req.cookies = new Cookies(req, res);

    req.cookies.set('userInfo', null ,{"httpOnly": false});

    responseData.code = 200;
    responseData.message = '退出登录成功';
    responseData.sucess = true;
    responseData.data = [];
    
    res.json(responseData)


 })
/**
 * 测试逻辑
 */

 router.get('/test', function(req, res, next){
    //测试成功
    responseData.code = 200;
    responseData.message = '测试成功';
    responseData.sucess = true;
    responseData.data = [];
    res.json(responseData)
 })

module.exports = router;