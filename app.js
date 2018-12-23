var express = require('express');
var formidable = require('formidable');
fs = require('fs');
var app = express();

// 路由


app.get('/',function(req,res){
    res.send("Hello World!")
})

// 访问本地静态资源
app.use('/public',express.static('public'));

// 提交文件
app.post('/upload',function(req,res){
    var form = new formidable.IncomingForm();

    console.log("About to parse");

    form.parse(req,function(error,fields,files){
        console.log("parseing done");
        console.log(files.upload.path);

        fs.writeFileSync('public/test.png',fs.readFileSync(files.upload.path));

        res.redirect('/public/upload.html');
    })
})

var server = app.listen(3000,function(req,res){
    console.log("Example app listening at http")
})