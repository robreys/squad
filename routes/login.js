var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	userModel.findOne({email: email, password: password},
		function(err, user) {
			if (err) console.log(err);
			//user not found
			if (!user) {
				res.redirect('/login?err=invalid');
			}
			//user found
			else {
				//create user session
				req.session.user_id = user._id;
				res.redirect('/home');
			}
		});
	var users = data.users;
	console.log(users);
});

module.exports = router;