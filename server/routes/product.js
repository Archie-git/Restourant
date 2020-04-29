let express = require('express');
let router = express.Router();
let model = require('../model');

//获取商品列表
router.get('/list', (req, res) => {
    let sql = "SELECT * FROM product";
    model.querySQL(sql).then((ret) => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//获取已上架的商品列表
router.get('/list-onsale', (req, res) => {
    let sql = "SELECT * FROM product WHERE onsale=1";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//删除商品
router.post('/delete', (req, res) => {
    let sql = "DELETE FROM product WHERE id IN("+req.body.id+")";
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "删除成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新商品表中的数据
router.post('/update', (req, res) => {
    let sql = model.getUpdateSQL('product', req.body);
    console.log(sql);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "更新成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//添加商品
router.post('/add', (req, res) => {
    let sql = model.getAddSQL('product', req.body);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "添加成功"})
    }, () => {
        res.send({statue: 1, msg: err})
    })
});
//根据商品名称或货号，商品平类，商品状态搜索商品
router.post('/search', (req, res) => {
    let data = req.body;
    if(data.hasOwnProperty('nameOrNumber')){
        data.name = data.nameOrNumber;
        delete data.nameOrNumber;
        let sql = model.getSearchSQL('product', data);
        model.querySQL(sql).then(ret => {
            if(ret.length === 0){
                data.number = data.name;
                delete data.name;
                let sql = model.getSearchSQL('product', data);
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
//微信小程序中根据商品名称搜索商品
router.get('/search-name', (req, res) => {
    let sql = "SELECT * FROM product WHERE name LIKE '%"+req.query.name+"%'"+" AND onsale=1";
    console.log(sql);
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//微信小程序中根据id搜索商品
router.get('/search-id', (req, res) => {
    let sql = "SELECT * FROM product WHERE id="+req.query.id;
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret[0]})
    }, err => {
        res.send({status: 1, msg: err})
    })
});









module.exports = router;