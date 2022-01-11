var modelauth = require('../models/auth.models');
var authController={}
const sha256 = require('sha256')
authController.index=function(req,res,next){
    res.render('auth/index');
}
authController.list=function(req,res,next){
    modelauth.getAll(function(err,lists){
        if(err){
                throw err;
        }else{
            res.json({list:lists})
            // res.render('auth/index',{list:lists});
        }
       
    });
}
authController.update=function(req,res){
    var authId=req.params.id;
    var data ={
        "username":req.body.username,
        "password":sha256(req.body.password)
    }
    modelauth.updateAuth(authId,data,function(err,result){
        // if(result.affectedRows==1){
        //     res.json({"status":"success"})
        // }else{
        //     res.json({"status":"error"})
        // }
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"})
        }
    });
}
authController.delete=function(req,res){
    var authId=req.params.id;
    modelauth.deleteAuth(authId,function(err,result){
        if(result.affectedRows==1){
            res.json({"status":"success"})
        }else{
            res.json({"status":"error"})
        }
    });
}
authController.insert=function(req,res){
    var data ={
        "username":req.body.username,
        "password":sha256(req.body.password)
    }
    modelauth.insertAuth(data,function(err,rs){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success","id":rs.insertId})
        }
    });
}
module.exports = authController;