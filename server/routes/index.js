let express = require('express');
let router = express.Router();
let md5=require('md5');

let userModel=require('../models/userModel');



/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});
//登录
router.post('/login',function(req,res){
    let {username,password}=req.body;
    let sql="select * from user where username='"+username+"' and password='"+password+"'";
    console.log(sql);
    userModel.querySQL(sql).then((ret)=>{
        if(ret.length===1){
            res.send({status: 0, data: ret});
        }else{
            res.send({status: 1, msg: '用户名或密码不正确！'})
        }
    },(err)=>{
        res.send(err);
    })
});



module.exports = router;
