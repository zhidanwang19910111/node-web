var mongoose = require('mongoose');


//用户的表结构

var Schema = mongoose.Schema;


var contentSchema = new Schema({
    title: String,
    //关联字段---内容分类的id
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contents'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    addTime: {
        type: Date,
        default: new Date()
    },
    views: {
      type: Number,
      default: 0  
    },
    //简介
    description: {
        type: String,
        default: ''
    },
    //内容
    content: {
        type: String,
        default: ''
    }
    
})

module.exports = contentSchema;