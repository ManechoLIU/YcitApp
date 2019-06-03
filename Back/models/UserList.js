var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//创建 Schema
var UserListSchema = new Schema({
    username:String,
    name: String,
    sno: String,
    pwd:String,
    sex: String,
    headImg:String,
    birthday: String,
    major: String,
    classes: String,
    phone: String,
    email: String
});

module.exports = UserList = mongoose.model('UserList', UserListSchema);
