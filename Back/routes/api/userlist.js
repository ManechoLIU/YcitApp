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
    if(req.body.username) profileFileldes.username = req.body.username;
    if(req.body.name) profileFileldes.name = req.body.name;
    if(req.body.sno) profileFileldes.sno = req.body.sno;
    if(req.body.sex) profileFileldes.sex = req.body.sex;
    if(req.body.headImg) profileFileldes.headImg = req.body.headImg;
    if(req.body.birthday) profileFileldes.birthday = req.body.birthday;
    if(req.body.major) profileFileldes.major = req.body.major;
    if(req.body.classes) profileFileldes.classes = req.body.classes;
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

//修改用户信息
router.post('/edit',(req,res)=>{
    console.log("888888")
    console.log(req.body)
    const id = req.body.id;
    // const id = "5cde60c3a450c928f8718a0f";
    const userInfo = {};
    if(req.body.headImg) userInfo.headImg = req.body.headImg;
    if(req.body.username) userInfo.username = req.body.username;
    if(req.body.name) userInfo.name = req.body.name;
    if(req.body.sno) userInfo.sno = req.body.sno;
    if(req.body.pwd) userInfo.pwd = req.body.pwd;
    if(req.body.sex) userInfo.sex = req.body.sex;
    if(req.body.headImg) userInfo.headImg = req.body.headImg;
    if(req.body.birthday) userInfo.birthday = req.body.birthday;
    if(req.body.major) userInfo.major = req.body.major;
    if(req.body.classes) userInfo.classes = req.body.classes;
    if(req.body.phone) userInfo.phone = req.body.phone;
    if(req.body.email) userInfo.email = req.body.email;
   
    // if(req.body.extra_params){
    //     if(JSON.stringify(req.body.extra_params) === '{}'){
    //         userInfo.extra_param = {"exports": "extra_params是扩展字段"};
    //     } else {
    //         userInfo.extra_params = req.body.extra_params
    //     }
    // }
    //查询数据库
    UserList.findOne({_id:id}).then(user=>{
        if(!user){
            return res.json({
                status:1,   //请求失败
                msg:'该用户不存在'
            });
        }
        UserList.findOneAndUpdate(
            {_id:id},
            {$set:userInfo},
            {new:true}
        ).then(upUser => {
            res.json({
                data:upUser,
                status:2
            })
        }).catch(err=>res.status(404).json({
            msg:'修改用户信息失败',
            status:1
        }))
    })
})

module.exports = router;