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

/**
 *  从数据库查询所有的用户列表
 * 
 * limit 限制获取数据条数
 * 
 * skip 忽略数据的条数
 * 1： 1-2 skip 0 (当前页 - 1)*limit
 * 
 */
router.get('/allUser', function(req, res, next){
    //实现后端分页
    var page = Number( req.query.page || 1 );
    var limit = Number( req.query.limit || 1 );
    var pages = 0;
    
    
    userModel.count().then(function(count){
        responseData.totalCount = count;
        
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages)
        
        page = Math.max(page, 1)

        var skip = ( page - 1) * limit;

        userModel.find().limit(limit).skip(skip).then( users => {
            responseData.code = 200;
            responseData.message = '测试成功';
            responseData.sucess = true;
            responseData.data = users;
            res.json(responseData);
        })
    })
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