var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//根据token验证获取数据
var app = express();
var newslist = require('./routes/api/newslist');
var courselist = require('./routes/api/courselist');
var gradelist = require('./routes/api/gradelist');
//db 配置
var db = require('./config/db.js').mongoUrl;

//使用body-parser中间件
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

//连接数据库
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    //这个设置后解决警告DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUp
    //弃用的警告是由于MongoDB节点的变化.使用MongoDB默认的findAndModify()，findAndModify（）已经启用
    mongoose.set('useFindAndModify', false);
    console.log('数据库连接成功')
}).catch(err => {
    console.log(err)
});

app.use('/api/newslist', newslist);
app.use('/api/courselist', courselist);
app.use('/api/gradelist', gradelist);
const port = process.env.PORT || 5002;

app.listen(port, () => {
    console.log(`Service running on port ${port}`)
});
