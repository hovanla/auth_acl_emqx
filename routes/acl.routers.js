var express = require('express');
var router = express.Router();
var  acl_ctl= require('../controllers/acl.controller');
router.get('/',acl_ctl.index)
router.get('/client',acl_ctl.listClientId)
router.post('/',acl_ctl.insert);
router.delete('/:id',acl_ctl.delete);
router.get('/username',acl_ctl.listUsername)
router.get('/alluser',acl_ctl.listUserAll)
module.exports = router;