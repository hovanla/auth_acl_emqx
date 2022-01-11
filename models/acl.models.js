var db = require('../config/db.config'); 
var aclModel={}
aclModel.getlistClient=function(result){
    db.query("SELECT * FROM mqtt_acl WHERE clientid IS NOT NULL",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}
aclModel.insert= function(data,result)
{
    var strwhere = "";
    let allow = "";
    let access = "";
    for (const key in data) {
        if(typeof data[key]!="undefined"){
            if(key=="allow"){
                allow = data[key];
                continue;
            }  
            if(key=="access"){
                access = data[key];
                continue;
            }   
            strwhere +=key+"='"+data[key]+"' AND "
        }
        
      }
    strwhere = strwhere.slice(0,-4)
    sql = "SELECT * FROM mqtt_acl WHERE " + strwhere
    db.query(sql, function(err, results) {
        if (err) throw err;
        if(results.length==2){
            results.forEach(element => {
                if(element['access' ]== access && allow == element["allow"]){
                    return result("exist",null);
                }
                if(access == "3"){
                    return deleteid(element["id"])
                    // db.query("DELETE FROM mqtt_acl WHERE id = ?",element["id"],function(err,rows){
                    //     if(err){
                    //         return result(err);
                    //     }
                    // });
                }
                if(element['access']== access && allow != element["allow"]){
                    data['access']="3";
                    db.query("UPDATE mqtt_acl SET  ? WHERE id="+element['id'],data,function(err,rows){
                        if(err){
                            return result(err); 
                        }else{
                            let idremove = element['id'] != results[0]["id"]?results[0]["id"]:results[1]["id"]
                            let rs = deleteid(idremove) 
                            if(rs == "err"){
                                return result("err");
                            }else{
                                return result(null,rows);
                            }
                            // db.query("DELETE FROM mqtt_acl WHERE id = ?",idremove,function(err,rows){
                            //     if(err){
                            //         return result(err);
                            //     }
                            //     return result(null,rows);
                        
                            // });
                        }
                    });
                }
           });
           if(access == "3"){
            db.query("INSERT INTO mqtt_acl SET ?",data,function(err,res){
                if(err){
                    return result(err,null);
                }else{
                    return result(null,res);
                }
            });
           }
        }
        if(results.length==1){
            if(results[0]['access']==access && results[0]['allow']!=allow){
                let rs = update(results[0]['id'],data)
                if(rs == "err"){
                    return result("err");
                }else{
                    return result(null,rs);
                }
                // db.query("UPDATE mqtt_acl SET  ? WHERE id="+results[0]['id'],data,function(err,rows){
                //     if(err){
                //         result(err); return;
                //     }
                //     return result(null,rows);
                // });
            }else if(results[0]['access']!=access){
                if(results[0]['access']==3){
                    if(results[0]['allow']==allow){
                        console.log("exist")
                        return result("exist",null);
                    }else{
                        let temp_access = access==1?2:1;
                        let temp_allow = allow==1?0:1;
                        data['access']=temp_access;
                        data['allow']=temp_allow;
                        db.query("UPDATE mqtt_acl SET  ? WHERE id="+results[0]['id'],data,function(err,rows){
                            if(err){
                                return result(err);
                            }else{
                                data['access']=access;
                                data['allow']=allow;
                                db.query("INSERT INTO mqtt_acl SET ?",data,function(err,res){
                                    if(err){
                                        return result(err,null);
                                    }else{
                                        return result(null,res);
                                    }
                                });
                            }
                        });
                    }
                }else{
                    if(allow==results[0]['allow'] || access == "3"){
                        data['access']="3";
                        let rs = update(results[0]['id'],data);
                        if(rs == "err"){
                            return result("err");
                        }else{
                            return result(null,rs);
                        }
                        // db.query("UPDATE mqtt_acl SET  ? WHERE id="+results[0]['id'],data,function(err,rows){
                        //     if(err){
                        //         result(err); return;
                        //     }
                        //     return result(null,rows);
                        // });
                    }else{
                        db.query("INSERT INTO mqtt_acl SET ?",data,function(err,res){
                            if(err){
                                return result(err,null);
                            }else{
                                return result(null,res);
                            }
                        });
                    }
                }
                
            }else{
                return result("exist",null);
            }
        }
        if(results.length==0){
            console.log("test")
            db.query("INSERT INTO mqtt_acl SET ?",data,function(err,res){
                if(err){
                    return result(err,null);
                }else{
                    return result(null,res);
                }
            });
        }
      });
}
function deleteid(id){
    db.query("DELETE FROM mqtt_acl WHERE id = ?",id,function(err,rows){
        if(err){
            return "err"; 
        }else{
            return rows;
        }
    });
}
function update(id,data){
    db.query("UPDATE mqtt_acl SET  ? WHERE id="+id,data,function(err,rows){
        if(err){
            return "err"; 
        }else{
            return rows;
        }
        // if(err){
        //     result(err); return;
        // }
        // return result(null,rows);
    });
}
aclModel.delete=function(id,result){
    db.query("DELETE FROM mqtt_acl WHERE id = ?",id,function(err,rows){
        if(err)
            return result(err); 
       
        return result(rows);

    });
}
/////////////////////////////////////////////////////////
aclModel.getlistUs=function(result){
    db.query("SELECT * FROM mqtt_acl WHERE username IS NOT NULL AND username !='$all'",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}
/////////////////////////////////////////////////////////
aclModel.getlistAllUs=function(result){
    db.query("SELECT * FROM mqtt_acl WHERE username='$all'",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}

module.exports=aclModel;
