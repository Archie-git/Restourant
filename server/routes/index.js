let express = require('express');
let router = express.Router();
let md5 = require('md5');

let model = require('../model');



//GET home page.
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});
//登录
router.post('/login',(req,res) => {
    let {username,password}=req.body;
    let sql="select * from user where username='"+username+"' and password='"+password+"'";
    model.querySQL(sql).then((ret)=>{
        if(ret.length===1){
            res.send({status: 0, data: ret[0]});
        }else{
            res.send({status: 1, msg: '用户名或密码不正确！'})
        }
    },(err)=>{
        res.send({status: 1, msg: err});
    })
});



module.exports = router;
