var express = require('express');
var router = express.Router();

router.get('/', require('./routes/index'));
router.use('/login', require('./routes/login'));
router.use('/signup', require('./routes/signup'));
router.get('/home', require('./routes/home'));
router.use('/create', require('./routes/create'));
router.get('/find', require('./routes/find'));
router.use('/user', require('./routes/user'));
router.use('/squad', require('./routes/squad'));
router.use('/invite', require('./routes/invite'));

router.get('/help', require('./routes/help'));

/*
router.get('/test', require('./routes/test'));
router.get('/test-login', require('./routes/test-login'));*/

//redesigned page
router.get('/redesigned', function(req, res) {
	res.render('redesigned');
});


module.exports = router;