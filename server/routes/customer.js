let express = require('express');
let router = express.Router();
let model = require('../model');

//获取客户列表
router.get('/list', (req, res) => {
    let sql = "SELECT * FROM customer";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//根据id或姓名搜索客户
router.get('/search', (req, res) => {
    let data = req.query;
    if(data.hasOwnProperty('idOrName')){
        data.id = data.idOrName;
        delete data.idOrName;
        let sql = model.getSearchSQL('customer', data);
        model.querySQL(sql).then(ret => {
            if(ret.length === 0){
                data.name = data.id;
                delete data.id;
                let sql = model.getSearchSQL('customer', data);
                model.querySQL(sql).then( ret => {
                    res.send({status: 0, data: ret})
                }, err => {
                    res.send({status: 1, msg: err})
                })
            }else{
                res.send({status: 0, data: ret})
            }
        }, err => {
            res.send({status: 1, msg: err})
        })
    }else{
        let sql=model.getSearchSQL('product', data);
        model.querySQL(sql).then(ret => {
            res.send({status: 0, data: ret})
        }, err => {
            res.send({status: 1, msg: err })
        })
    }
});
//根据id删除会员记录
router.get('/delete', (req, res) => {
    let sql = "DELETE FROM customer WHERE id="+req.query.id;
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "删除会员成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//新增一条会员记录
router.post('/add', (req, res) => {
    let sql = model.getAddSQL('customer', req.body);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "新增会员成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新会员表
router.post('/update', (req, res) => {
    let sql = model.getUpdateSQL('customer', req.body);
    console.log(sql);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "更新会员成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});

//微信小程序获取登录用户信息,如果用户不存在则注册用户，最后返回用户信息
router.get('/login', (req, res) => {
    let sql1 = "SELECT * FROM customer WHERE openid='"+req.query.openid+"'";
    model.querySQL(sql1).then(ret => {
        if(ret.length === 1){
            res.send({status: 0, data: ret[0]})
        }else{
            let data = req.body;
            data.integral = 0;
            data.status = 0;
            data.createtime = new Date().getTime();
            data.note = '非会员用户';
            data.orderid = '';
            data.tel = '';
            delete data.profile;
            let sql2 = model.getAddSQL('customer', data);
            model.querySQL(sql2).then(ret => {
                let sql3 = "SELECT * FROM customer WHERE openid='"+req.body.openid+"'";
                model.querySQL(sql3).then(ret => {
                    res.send({status: 0, data: ret[0]})
                }, err => {
                    res.send({status:1, msg: err})
                })
            }, err => {
                res.send({status:1, msg: err})
            })
        }
    }, err => {
        res.send({status: 1, msg: err})
    })
});






















module.exports = router;