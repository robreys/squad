var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(req, res) {
	var email = req.body.email;
	var pass = req.body.password;

	var users = data.users;
	console.log(users);

	for (var i = 0; i < users.length; i++) {
		if (users[i].email == email && users[i].password == pass) {
			//prep user object for sending
			var user = users[i];
			user.password = null;
			//create user session
			req.session.user_id = user.id;
		
			res.redirect('/home');
		}
	}

	//user not found
	res.rendirect('login');
});

module.exports = router;