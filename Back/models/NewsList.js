var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//创建 Schema
var NewsListSchema = new Schema({
    id:{
        type:String
    },
    date:{  //日期
        type:String
    },
    writer:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        required:true
    },
    title:{     //标题
        type:String,
        required:true
    },
    content:{     //内容
        type:String,
        required:true
    },
});

module.exports = NewsList = mongoose.model('NewsList',NewsListSchema);
