var db = require('../config/db.config'); 
var authModel={}
authModel.getAll=function(result){
    db.query("SELECT * FROM mqtt_user",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}
authModel.insertAuth=function(newAuth,result)
{
    db.query("INSERT INTO mqtt_user SET ?",newAuth,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
authModel.updateAuth=function(authId,data,result){
    db.query("UPDATE mqtt_user SET  ? WHERE id="+authId,data,function(err,rows){
        if(err){
            result(err); return;
        }
        return result(null,rows);

    });
}

authModel.deleteAuth=function(authId,result){
    db.query("DELETE FROM mqtt_user WHERE id = ?",authId,function(err,rows){
        if(err){
            result(err); return;
        }
        return result(null,rows);

    });
}
module.exports=authModel;
