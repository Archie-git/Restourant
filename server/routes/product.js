let express = require('express');
let router = express.Router();
let model = require('../model');

//获取未被删除的商品列表
router.get('/list', (req, res) => {
    let sql = "SELECT * FROM product WHERE deleted=0";
    model.querySQL(sql).then((ret) => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//获取已上架的商品列表
router.get('/list-onsale', (req, res) => {
    let sql = "SELECT * FROM product WHERE onsale=1";
    model.querySQL(sql).then((ret) => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//删除商品
router.post('/delete', (req, res) => {
    let sql1 = "UPDATE product SET deleted=1 WHERE id IN("+req.body.id+")";
    model.querySQL(sql1).then(() => {
        if(req.body.category === 999){
            res.send({status: 0, msg: "删除成功"})
        }else{
            let sql2 = "UPDATE category SET son=son-1 WHERE id="+req.body.category;
            model.querySQL(sql2).then(() => {
                res.send({status: 0, msg: "删除成功"})
            }, err => {
                res.send({status: 1, msg: err})
            })
        }
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//更新商品表中的数据
router.post('/update', (req, res) => {
    let sql = model.getUpdateSQL('product', req.body);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "更新成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//添加商品
router.post('/add', (req, res) => {
    let sql1 = model.getAddSQL('product', req.body);
    model.querySQL(sql1).then(() => {
        let sql2 = "UPDATE category SET son=son+1 WHERE id="+req.body.category;
        model.querySQL(sql2).then(() => {
            res.send({status: 0, msg: "添加成功"})
        }, err => {
            res.send({status: 1, msg: err})
        })
    }, () => {
        res.send({statue: 1, msg: err})
    })
});
//筛选搜索商品
router.post('/search', (req, res) => {
    if(req.body.hasOwnProperty('value')){
        let str = '';
        for(let key in req.body){
            if(req.body.hasOwnProperty(key) && key !== 'value') str = ' and '+key+'='+req.body[key];
        }
        let sql = "SELECT * FROM product WHERE number=\'"+req.body.value+"\'"+str;
        model.querySQL(sql).then(ret => {
            if(ret.length === 0){
                sql = "SELECT * FROM product WHERE name LIKE \'%"+req.body.value+"%\'"+str;
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
        let sql=model.getSearchSQL('product', req.body);
        model.querySQL(sql).then(ret => {
            res.send({status: 0, data: ret})
        }, err => {
            res.send({status: 1, msg: err })
        })
    }
});
//小程序中根据名称搜索商品
router.get('/search-name', (req, res) => {
    let sql = "SELECT * FROM product WHERE name LIKE '%"+req.query.name+"%'"+" AND onsale=1";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});
//小程序中根据id搜索商品
router.get('/search-id', (req, res) => {
    let sql = "SELECT * FROM product WHERE id="+req.query.id;
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret[0]})
    }, err => {
        res.send({status: 1, msg: err})
    })
});










module.exports = router;