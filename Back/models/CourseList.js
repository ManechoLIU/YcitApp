var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//创建 Schema
var CourseListSchema = new Schema({

    fID: {
        type: String,
        // required:true
    },
    fclassName: {  //日期
        type: String,
        // required:true
    },
    fPlace: {
        type: String,
        // required:true
    },
    fTeachar: {
        type: String,
        // required:true
    },
    fzhouqi: {     //标题
        type: String,
        // required:true
    },
    fClasstime: {     //内容
        type: String,
        // required:true
    },
    fweek: {     //内容
        type: String,
        // required:true
    },
});

module.exports = CourseList = mongoose.model('CourseList', CourseListSchema);
