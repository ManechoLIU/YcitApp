var express = require('express');
var router = express.Router();
var UserList = require('../../models/UserList');
// var MongoClient = require('mongodb').MongoClient;

router.get('/', function (req, res) {
    UserList.find({}, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});
router.post('/add',(req,res)=>{
    var profileFileldes = {};
    if(req.body.name) profileFileldes.name = req.body.name;
    if(req.body.sex) profileFileldes.sex = req.body.sex;
    if(req.body.headImg) profileFileldes.headImg = req.body.headImg;
    if(req.body.birthday) profileFileldes.birthday = req.body.birthday;
    if(req.body.major) profileFileldes.major = req.body.major;
    if(req.body.class) profileFileldes.class = req.body.class;
    if(req.body.phone) profileFileldes.phone = req.body.phone;
    if(req.body.email) profileFileldes.email = req.body.email;
    // if(req.body.extra_params){
    //     let extra_params = req.body.extra_params;
    //     if(JSON.stringify(extra_params) === '{}'){
    //         profileFileldes.extra_param = {"exports": "extra_params是扩展字段"};
    //     } else {
    //         profileFileldes.extra_params = req.body.extra_params
    //     }
    // }
    new UserList(profileFileldes).save().then(profile => {
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