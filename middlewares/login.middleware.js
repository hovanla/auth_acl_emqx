const axios = require('axios');
module.exports.requireAuth = async function(req, res, next){
    if(req.method == "GET" && req.path == "/") {
        next();
        return;
    }
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res.set('WWW-Authenticate', 'Basic realm="401"')
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    await axios.post('http://127.0.0.1:18083/api/v4/auth', {
        username: username,
        password: password
      })
      .then(function (response) {
          if(typeof response.data.code !="undefined"){
              return next()
          }else{
            return res.status(401).json({ message: 'Invalid Authentication Credentials' });
          }
      })
      .catch(function (error) {
        console.log(error);
      });
    // const user = await userService.authenticate({ username, password });
    // if (!user) {
    //     return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    // }

    // attach user to request object
    // req.user = user
}