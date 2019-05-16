var express = require('express');
var router = express.Router();
var NewsList = require('../../models/CourseList');
// var MongoClient = require('mongodb').MongoClient;

router.get('/', function (req, res) {
    CourseList.find({}, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});
router.post('/add',(req,res)=>{
    var profileFileldes = {};
    if(req.body.fID) profileFileldes.fID = req.body.fID;
    if(req.body.fclassName) profileFileldes.fclassName = req.body.fclassName;
    if(req.body.fPlace) profileFileldes.fPlace = req.body.fPlace;
    if(req.body.fTeachar) profileFileldes.fTeachar = req.body.fTeachar;
    if(req.body.fzhouqi) profileFileldes.fzhouqi = req.body.fzhouqi;
    if(req.body.fClasstime) profileFileldes.fClasstime = req.body.fClasstime;
    if(req.body.fweek) profileFileldes.fweek = req.body.fweek;
    // if(req.body.extra_params){
    //     let extra_params = req.body.extra_params;
    //     if(JSON.stringify(extra_params) === '{}'){
    //         profileFileldes.extra_param = {"exports": "extra_params是扩展字段"};
    //     } else {
    //         profileFileldes.extra_params = req.body.extra_params
    //     }
    // }
    new CourseList(profileFileldes).save().then(profile => {
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