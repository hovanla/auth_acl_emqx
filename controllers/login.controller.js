var loginController={};
const axios = require('axios');
const { render } = require('express/lib/response');
loginController.index=function(req,res){
    res.render('login/index')
}
loginController.login=function(req,res){
    // console.log(req.headers)
    let username = req.body.username;
    let password = req.body.password;
    axios.post('http://127.0.0.1:18083/api/v4/auth', {
        username: username,
        password: password
      })
      .then(function (response) {
          if(typeof response.data.code !="undefined"){
              res.json({status:"ok"})
          }else{
              res.json({status:response.data.message})
          }
      })
      .catch(function (error) {
        console.log(error);
      });
}
module.exports = loginController;