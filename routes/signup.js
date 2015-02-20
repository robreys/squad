var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('signup');
});

router.post('/', function(req, res) {
	var email = req.body.email;

	//find user in database
	userModel.findOne({email: email}, function(err, user) {
		if (err) console.log(err);
		//user with email already exists
		if (user) {
			res.redirect('/signup?err=exists');
		}
		//create user
		else {
			var tags = req.body.tags.match(/\b[\w]+\b/g);
			(new userModel({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: email,
				password: req.body.password,
				tags: tags,
				squads: []
			})).save(function(err) {
				if (err) console.log(err);
				//user created
				res.redirect('login');
			});
		}
	});
});

module.exports = router;