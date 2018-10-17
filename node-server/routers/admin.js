var express = require('express');
var app = express();

var Cookies = require('cookies');

var router = express.Router();

// var mongodb = require('mongodb')

var userModel = require('../models/user.js')

var catalogModel = require('../models/catalogs.js')

var contentModel = require('../models/content.js')

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
 * 增加分类
 */
router.post('/catalog/add', function(req, res, next){
    var name = req.body.name || '';

    if( !name ){
        responseData.code = 200;
        responseData.message = '类别不能为空 ';
        responseData.sucess = false;
        res.json(responseData);
        return;
    }
    //判断数据库中是否有相同的数据
    catalogModel.findOne({
        name: name
    })
    .then( newName => {
        if( newName ){
            responseData.code = 200;
            responseData.message = '类名以存在';
            responseData.sucess = false;
            res.json(responseData);
            return;
        }
        //保存类别到数据库中
        let catalog = new catalogModel({
            name: name,
        });
        catalog.save();
    
        responseData.code = 200;
        responseData.message = '添加成功';
        responseData.sucess = true;
        res.json(responseData);
        return;
    })
})

/**
 * 查询分类
 */

 router.get('/catalog/list', function(req, res, next){
    catalogModel.find().then(function(list){
        responseData.code = 200;
        responseData.message = '查询成功';
        responseData.sucess = true;
        responseData.data = list;
        res.json(responseData);
        return;
    })
 })

/**
 * 分类修改
 */

router.post('/catalog/edit', function(req, res){
    var id = req.body.id || '';
    var name = req.body.name || '';


    catalogModel.findOne({
        _id: id
    })
    .then( function(catalog){
        if( catalog.name == name ){
            responseData.code = 200;
            responseData.message = '分类信息没有修改保存成功';
            responseData.sucess = true;
            res.json(responseData);
            return;
        }else{
            catalogModel.update(
                {
                    _id: id
                },
                {
                    name: name
                }
            )
            .then(function(){

                responseData.code = 200;
                responseData.message = '修改成功';
                responseData.sucess = true;
                res.json(responseData);
                return;
            })
        }
    })
})

/**
 * 分类删除
 */
router.post('/catalog/delete', function(req, res){
    var id = req.body.id || ''

    if( !id ){
        responseData.code = 200;
        responseData.message = '请选择要删除的数据';
        responseData.sucess = false;
        res.json(responseData);
        return;
    }
    catalogModel.remove({
        _id: id
    })
    .then(function(){
        responseData.code = 200;
        responseData.message = '删除成功';
        responseData.sucess = true;
        res.json(responseData);
        return;
    })
})

/**
 * 内容添加首页
 */

 router.post('/content/add', function(req, res,){
    var reqData = req.body;

    if( !req.body.catalog ){
        responseData.code = 200;
        responseData.message = '内容分类不能为空';
        responseData.sucess = false;
        res.json(responseData);
        return;
    }
    let content = new contentModel({
        catalog: reqData.catalog,
        title: reqData.title,
        description: reqData.description,
        content: reqData.content
    })
    content .save()
    // .then(function(){
        responseData.code = 200;
        responseData.message = '保存成功';
        responseData.sucess = true;
        res.json(responseData);
        return;
    // })

 })

/**
 * 内容查询
 */
router.get('/content/list', function(req, res){

    contentModel.find().then(function( data ){
        responseData.code = 200;
        responseData.message = '查询成功';
        responseData.sucess = true;
        responseData.data = data;
        res.json(responseData); 
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