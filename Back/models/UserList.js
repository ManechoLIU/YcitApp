var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//创建 Schema
var UserListSchema = new Schema({
    name: String,
    sno: String,
    sex: String,
    headImg:String,
    birthday: String,
    major: String,
    class: String,
    phone: String,
    email: String
});

module.exports = UserList = mongoose.model('UserList', UserListSchema);
