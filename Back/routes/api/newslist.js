var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var NewsList = require('../../models/NewsList');
// var MongoClient = require('mongodb').MongoClient;

router.get('/', function (req, res) {
    NewsList.find({}, function (err, data) {
        if (err) throw err;
        res.send(data)
    });
});
router.get('/item/:id',(req,res)=>{
    console.log("req:"+req.body)
    const id=req.params.id
    console.log("id:===="+id)
    
    
    NewsList.findOne({_id:id}).then(profile=>{
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


router.get('/getNewsById', function (req, res) {
    // var _id=mongoose.Types.ObjectId()
    // var _id='5cdbc395eb69ceff027a4c33'
    NewsList.find({ _id: '5cdbc395eb69ceff027a4c33' }, function (err, data) {

        if (err) throw err;
        res.send(data);
        console.log(data);

    })
});
router.post('/add', (req, res) => {
    var profileFileldes = {};
    if (req.body.id) profileFileldes.id = req.body.id;
    if (req.body.date) profileFileldes.date = req.body.date;
    if (req.body.writer) profileFileldes.writer = req.body.writer;
    if (req.body.icon) profileFileldes.icon = req.body.icon;
    if (req.body.title) profileFileldes.title = req.body.title;
    if (req.body.content) profileFileldes.content = req.body.content;
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
            data: profile,
            status: 2
        })
    }).catch(err => res.status(400).json({
        msg: err,
        status: 0
    }))
});

router.get('/pages', (req, res) => {
    // let tag = {state:1};
    // if(req.query.tag) tag.tags = req.query.tag;
    // if(req.query.writer) tag.writer = req.query.writer;
    let page = parseInt(req.query.page);
    let rows = req.query.rows;
    let count = 0;
    let skip = 0;
    let limit = 0;
    if (page <= 1) {
        skip = 0;
    } else {
        skip = rows * page - rows
    }
    //获取所有的数据计算个数
    NewsList.find({}).then(profile => {
        count = profile.length;
    }).then(() => {
        //总页数 大于当前页数
        if (Math.ceil(count / rows) >= page) {
            if (Math.ceil(count / rows) == page) {
                limit = count
            } else {
                limit = parseInt(rows)
            }
        } else {
            return res.json({
                data: [],
                status: 1,
                msg: '没有数据'
            });
        }
        NewsList.find({ _id: '5cdbc395eb69ceff027a4c36' }).skip(skip).limit(limit).sort({ date: -1 }).then(profile => {
            if (!profile) {
                return res.json({
                    data: [],
                    toatl: 0,
                    page: page,
                    status: 1,
                });
            }
            res.json({
                data: profile,
                toatl: count,
                page: page,
                status: 2,
            })
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
});
module.exports = router;