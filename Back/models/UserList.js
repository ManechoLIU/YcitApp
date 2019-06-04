var mongoose = require('mongoose');
var GradeList = mongoose.model('GradeList');
var Schema = mongoose.Schema;

//创建 Schema
var UserListSchema = new Schema({
    username: String,
    name: String,
    sno: String,
    pwd: String,
    sex: String,
    headImg: String,
    birthday: String,
    major: String,
    classes: String,
    phone: String,
    email: String,
    courselist: [{
        fID: String,
        fclassName: String,
        fPlace: String,
        fTeachar: String,
        fzhouqi: String,
        fClasstime: String,
        fweek: String,
    }],
    gradelist: [{
        isbn: String,
        num: String,
        course: String,
        credit: String,
        attribute: String,
        mark: String,
        GPA: String
    }]
});

module.exports = UserList = mongoose.model('UserList', UserListSchema);
