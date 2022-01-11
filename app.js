const express = require('express')
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const sessionstorage = require('sessionstorage');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const authRoutes = require('./routes/auth.routers')
const aclRoutes = require('./routes/acl.routers')
const loginRoutes = require('./routes/login.routers')
// using as middleware
var authMiddleware = require('./middlewares/login.middleware')
app.use('/auth',express.static(__dirname + '/public'), authMiddleware.requireAuth, authRoutes)
app.use('/acl',express.static(__dirname + '/public'), authMiddleware.requireAuth, aclRoutes)
app.use('/login',express.static(__dirname + '/public'), loginRoutes)
app.get('/', (req, res) => {
    res.send("Welcome to my web server");
  });
var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});
