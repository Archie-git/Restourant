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



//获取会员列表
router.get('/member-list', (req, res) => {
    let sql = "SELECT * FROM customer WHERE status IN (1, 2, 3) and deleted=0";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//根据id或姓名搜索客户
router.get('/member-search', (req, res) => {
    let sql = '';
    if(isNaN(req.query.value)){
        sql = "SELECT * FROM customer WHERE status IN (1,2,3) AND name LIKE '%"+req.query.value+"%'"
    }else{
        sql = model.getSearchSQL('customer', {id: req.query.value})
    }
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//根据id删除会员记录
router.get('/delete', (req, res) => {
    let sql = "UPDATE customer SET deleted=1 WHERE id="+req.query.id;
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
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "更新会员成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});

//微信小程序获取登录用户信息,如果用户不存在则注册用户，最后返回用户信息
router.post('/login', (req, res) => {
    let sql1 = "SELECT * FROM customer WHERE openid='"+req.body.openid+"'";
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
//顾客下单成功时，修改customer表中的orderid表格
router.post('/orderid-update', (req, res) => {
    let sql1 = "SELECT * FROM customer WHERE id="+req.body.id;
    model.querySQL(sql1).then(ret => {
        if(ret.length === 1){
            let data = req.body;
            data.orderid = ret[0].orderid.length === 0 ? req.body.orderid :  ret[0].orderid+','+req.body.orderid;
            data.integral = data.integral + ret[0].integral;
            let sql2 = model.getUpdateSQL('customer', data);
            // let sql2 = "UPDATE customer SET orderid=\""+orderid+"\" WHERE id="+req.body.id;
            model.querySQL(sql2).then(() => {
                res.send({status: 0, msg: "下单成功"})
            }, err => {
                res.send({status:1, msg: err})
            })
        }
    }, err => {
        res.send({status: 1, msg: err})
    })
});










module.exports = router;