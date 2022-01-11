var modelacl = require('../models/acl.models');
var aclController={}
aclController.index=function(req,res,next){
    res.render('acl/index');
}
aclController.listClientId=function(req,res,next){
    modelacl.getlistClient(function(err,lists){
        if(err){
                throw err;
        }else{
            res.json({list:lists})
            // res.render('acl/index',{list:lists});
        }
       
    });
}
aclController.delete=function(req,res){
    var Id=req.params.id;
    modelacl.delete(Id,function(result){
        if(result.affectedRows==1){
            res.json({"status":"success"})
        }else{
            res.json({"status":"error"})
        }
    });
}
aclController.insert=function(req,res){
    var data ={
        "username":req.body.username,
        "clientid":req.body.clientid,
        "topic":req.body.topic,
        "access":req.body.access,
        "allow":req.body.allow
    }
    modelacl.insert(data,function(err,rs){
        if(err){
            if (err=="exist"){
                res.json({"status":"exist"})
            }else{
                res.json({"status":"error"})
            }   
        }else{
            res.json({"status":"success",})
            // res.json({"status":"success","id":rs.insertId})
        }
    });
}
//////////////////////////////////////////
aclController.listUsername=function(req,res,next){
    modelacl.getlistUs(function(err,lists){
        if(err){
                throw err;
        }else{
            res.json({list:lists})
        }
       
    });
}
//////////////////////////////////////////
aclController.listUserAll=function(req,res,next){
    modelacl.getlistAllUs(function(err,lists){
        if(err){
                throw err;
        }else{
            res.json({list:lists})
        }
       
    });
}
module.exports = aclController;