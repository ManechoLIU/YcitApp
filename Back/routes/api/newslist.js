var express = require('express');
var router = express.Router();
var db = require('../../config/db.js').mongoUrl;
var NewsList = require('../../models/NewsList');
var MongoClient = require('mongodb').MongoClient;
router.get('/', function (err, db) {
    // res.send("hello")

    findData(db, function(result) {
        //显示结果
        console.log(result);
       
    });

})
var findData = function(db, callback) {  
    //获得指定的集合 
    var collection =db.client('NewsList');
   
    collection.find({}).toArray(function(err, result) { 
        //如果存在错误
        if(err)
        {
            console.log('Error:'+ err);
            return;
        } 
        //调用传入的回调方法，将操作结果返回
        callback(result);
    });
}
// router.get('/newslist', function (req, res, next) {
//     NewsList.find({}, function (err, resData) {
//         if (err) {
//             res.end("Error");
//             // console.log(err);
//             return next(err);
//         }
//         console.log("result:"+resData);
//         res.render({
//             testData:resData
//         });

//     })
// });
// var findData = function (db, callback) {

//     // var collection = db.collection('NewsList');
//     NewsList.find({},(function (err, result) {
//         //如果存在错误
//         if (err) {
//             console.log('Error:' + err);
//             return;
//         }
//         //调用传入的回调方法，将操作结果返回
//         callback(result);
//     }));
// }

// router.get('/', function (err, db) {
//     findData(db, function (result) {
//         //显示结果
//         console.log("result:"+result);

//     });
// });
module.exports = router;