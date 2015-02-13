var express = require('express');
var router = express.Router();

router.get('/', require('./routes/index'));
router.use('/login', require('./routes/login'));
router.use('/signup', require('./routes/signup'));
router.get('/home', require('./routes/home'));
router.get('/create', require('./routes/create'));
router.get('/find', require('./routes/find'));
router.get('/user/:id', require('./routes/user'));
router.get('/squad/:id', require('./routes/squad'));
router.get('/recruit', require('./routes/recruit'));

module.exports = router;