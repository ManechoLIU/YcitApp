var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//创建 Schema
var NoteListSchema = new Schema({

    title: String,
    content: String,
    testImage: String,
});

module.exports = NoteList = mongoose.model('NoteList', NoteListSchema);
