module.exports = function(req, res){
  res.render('signup');
};

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('signup');
});

router.post('/', function(req, res) {
	var email = req.body.email;

	var users = data.users;

	for (var i = 0; i < users.length; i++) {
		if (users[i].email == email) {		
			res.redirect('/signup');
		}
	}

	users.push({
		id: users.length,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: email,
		password: req.body.password,
		tags: ["basketball", "coding"],
		squads: []
	});

	//user not found
	res.redirect('login');
});

module.exports = router;