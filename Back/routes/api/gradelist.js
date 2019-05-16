var express = require('express');
var router = express.Router();
var GradeList = require('../../models/GradeList');
// var MongoClient = require('mongodb').MongoClient;

router.get('/', function (req, res) {
    GradeList.find({}, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});
router.post('/add',(req,res)=>{
    var profileFileldes = {};
    if(req.body.isbn) profileFileldes.isbn = req.body.isbn;
    if(req.body.num) profileFileldes.num = req.body.num;
    if(req.body.course) profileFileldes.course = req.body.course;
    if(req.body.credit) profileFileldes.credit = req.body.credit;
    if(req.body.attribute) profileFileldes.attribute = req.body.attribute;
    if(req.body.mark) profileFileldes.mark = req.body.mark;
    if(req.body.GPA) profileFileldes.GPA = req.body.GPA;
    // if(req.body.extra_params){
    //     let extra_params = req.body.extra_params;
    //     if(JSON.stringify(extra_params) === '{}'){
    //         profileFileldes.extra_param = {"exports": "extra_params是扩展字段"};
    //     } else {
    //         profileFileldes.extra_params = req.body.extra_params
    //     }
    // }
    new GradeList(profileFileldes).save().then(profile => {
        res.json({
            data:profile,
            status:2
        })
    }).catch(err=>res.status(400).json({
        msg:err,
        status:0
    }))
});
module.exports = router;