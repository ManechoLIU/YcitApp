var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//创建 Schema
var GradeListSchema = new Schema({

    isbn: {
        type: String,
        // required:true
    },
    num: {  //日期
        type: String,
        // required:true
    },
    course: {
        type: String,
        // required:true
    },
    credit: {
        type: String,
        // required:true
    },
    attribute: {     //标题
        type: String,
        // required:true
    },
    mark: {     //内容
        type: String,
        // required:true
    },
    GPA: {     //内容
        type: String,
        // required:true
    },
});

module.exports = GradeList = mongoose.model('GradeList', GradeListSchema);
