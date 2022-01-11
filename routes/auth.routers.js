var express = require('express');
var router = express.Router();
var  auth_ctl= require('../controllers/auth.controller');
router.get('/', auth_ctl.index)
router.get('/list', auth_ctl.list)
router.put('/:id',auth_ctl.update);
router.delete('/:id',auth_ctl.delete);
router.post('/',auth_ctl.insert);
module.exports = router;