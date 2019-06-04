var express = require('express');
var router = express.Router();
var NoteList = require('../../models/NoteList');
// var MongoClient = require('mongodb').MongoClient;

router.get('/', function (req, res) {
    NoteList.find({}, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});

router.get('/item/:id',(req,res)=>{
    console.log("req:"+req.body)
    const id=req.params.id
    console.log("id:===="+id)
    
    
    NoteList.findOne({_id:id}).then(profile=>{
        if(!profile){
            return res.json({
                msg:'没有内容',
                status:1
            });
        }
        res.json({
            data:profile,
            status:2
        })
    }).catch(err =>{
        console.log(err)
        res.status(404).json({
        
            msg:'获取失败',
            status:0
        })
    } )
});

router.post('/add',(req,res)=>{
    var profileFileldes = {};
    if(req.body.title) profileFileldes.title = req.body.title;
    if(req.body.content) profileFileldes.content = req.body.content;
    if(req.body.testImage) profileFileldes.testImage = req.body.testImage;
   
    // if(req.body.extra_params){
    //     let extra_params = req.body.extra_params;
    //     if(JSON.stringify(extra_params) === '{}'){
    //         profileFileldes.extra_param = {"exports": "extra_params是扩展字段"};
    //     } else {
    //         profileFileldes.extra_params = req.body.extra_params
    //     }
    // }
    new NoteList(profileFileldes).save().then(profile => {
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