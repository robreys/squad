var express = require('express');
var router = express.Router();

router.get('/', require('./routes/index'));
router.get('/login', require('./routes/login'));
router.get('/signup', require('./routes/signup'));
router.get('/home/:id', require('./routes/home'));
router.get('/create', require('./routes/create'));
router.get('/find', require('./routes/find'));
router.get('/user/:id', require('./routes/user'));
router.get('/squad/:id', require('./routes/squad'));
router.get('/recruit', require('./routes/recruit'));

module.exports = router;