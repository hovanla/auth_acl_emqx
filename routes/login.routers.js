var express = require('express');
var router = express.Router();
var login_ctl= require('../controllers/login.controller');
router.get('/',login_ctl.index)
router.post('/',login_ctl.login)
module.exports = router;