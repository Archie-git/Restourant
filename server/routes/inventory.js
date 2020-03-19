let express = require('express');
let router = express.Router();
let model = require('../model');

router.get('/list', (req, res) => {
    let sql = "SELECT * FROM inventory";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    }, err => {
        res.send({status: 1, msg: err})
    })
});

router.post('/update', (req, res) => {
    console.log(req.body);
    let sql = model.getUpdateSQL('inventory', req.body);
    console.log(sql);
    model.querySQL(sql).then(()=>{
        res.send({status: 0, msg: '更新成功'})
    }, err => {
        res.send({status: 1, msg: err})
    })
});

module.exports = router;