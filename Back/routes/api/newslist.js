var express = require('express');
var router = express.Router();
var NewsList = require('../../models/NewsList');
// var MongoClient = require('mongodb').MongoClient;

router.get('/', function (req, res) {
    NewsList.find({}, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});
router.post('/add',(req,res)=>{
    var profileFileldes = {};
    if(req.body.id) profileFileldes.id = req.body.id;
    if(req.body.date) profileFileldes.date = req.body.date;
    if(req.body.writer) profileFileldes.writer = req.body.writer;
    if(req.body.icon) profileFileldes.icon = req.body.icon;
    if(req.body.title) profileFileldes.title = req.body.title;
    if(req.body.content) profileFileldes.content = req.body.content;
    // if(req.body.extra_params){
    //     let extra_params = req.body.extra_params;
    //     if(JSON.stringify(extra_params) === '{}'){
    //         profileFileldes.extra_param = {"exports": "extra_params是扩展字段"};
    //     } else {
    //         profileFileldes.extra_params = req.body.extra_params
    //     }
    // }
    new NewsList(profileFileldes).save().then(profile => {
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