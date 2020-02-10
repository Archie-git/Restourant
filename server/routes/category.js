let express = require('express');
let router = express.Router();
let model = require('../model');

//获取品类表中的全部数据
router.get('/list', (req, res) => {
    let sql="SELECT * FROM category";
    model.querySQL(sql).then(ret => {
        res.send({status: 0, data: ret})
    },err => {
        res.send({status: 1, msg: err})
    });
});

//更新品类表中的数据
router.post('/update', (req, res) => {
    let updateSql = (keys, values) => {
        let sql = [];
        for (let i = 1; i < keys.length; i++) {
            let value = typeof (values[i]) === "number" ? values[i] : "\"" + values[i] + "\"";
            sql.push(keys[i] + "=" + value)
        }
        sql.join("  and  ");
        return sql;
    };
    let sql="UPDATE category SET "+updateSql(Object.keys(req.body), Object.values(req.body))+" WHERE id="+req.body.id;
    console.log(sql);
    model.querySQL(sql).then(ret => {
        res.send({status: 0, msg: "设置成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});

//根据品类名称搜索品类信息
router.get('/search', (req, res) => {
    let sql = "SELECT * FROM category WHERE name=\""+req.query.name+"\"";
    model.querySQL(sql).then(ret => {
        if(ret.length === 1){
            res.send({status: 0, data: ret})
        }else{
            res.send({status: 1, msg: "搜索失败"})
        }
    }, err => {
        res.send({status: 1, msg: err})
    })
});

//删除品类列表中的某条记录
router.get('/delete', (req,res) => {
    let sql = "DELETE FROM category WHERE id="+req.query.id;
    console.log(sql);
    model.querySQL(sql).then(() => {
        res.send({status: 0, msg: "删除成功"})
    }, err => {
        res.send({status: 1, msg: err})
    })
});

//新增品类记录
router.post('/add', (req, res) => {
   let sql = "INSERT INTO category(name,level,son,amount,isnav,description) values (\""+req.body.name+"\","+req.body.level+","+"0,0,1,\""+req.body.description+"\")";
   console.log(sql);
   model.querySQL(sql).then(() => {
       res.send({status: 0, msg: "添加成功"})
   }, err => {
       res.send({status: 1, msg: err})
   })
});



module.exports = router;




























