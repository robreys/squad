var express = require('express');
var router = express.Router();

router.get('/', require('./routes/index'));
router.get('/login', require('./routes/login'));
router.get('/signup', require('./routes/signup'));
router.get('/home', require('./routes/home'));
router.get('/create', require('./routes/create'));
router.get('/find', require('./routes/find'));
router.get('/account', require('./routes/account'));
router.get('/team', require('./routes/team'));
router.get('/recruit', require('./routes/recruit'));

module.exports = router;