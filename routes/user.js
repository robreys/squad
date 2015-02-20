var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
	userModel.findById(req.params.id, {
		password: 0
	})
	.populate('squads', '_id name')
	.exec(function(err,user) {
		if (err) console.log(err);
		if (user._id == req.session.user_id)
			user.admin = true;
		res.render('user', user);
	});
});

router.get('/:id/edit', function(req, res) {
	userModel.findById(req.params.id, function(err, user) {
		if (err) console.log(err);
		if (user._id != req.session.user_id) {
			res.redirect('/login?err=unauthorized');
		}
		else {
			user.edit = true;
			user.tags = user.tags.join(', ');
			res.render('signup', user);
		}
	});
});
router.post('/:id/edit', function(req, res) {
	//unauthorized edit
	if (req.session.user_id != req.params.id) {
		res.redirect('/user/' + req.params.id + '?err=unauthorized');
	}
	else {
		var update = {};
		if (req.body.type && req.body.type == 'rm-notif') {
			update.$pull = {notifications: req.body.notif_id};
		}
		else {
			if (req.body.email != '') update.email = req.body.email;
			if (req.body.first_name != '') update.first_name = req.body.first_name;
			if (req.body.last_name != '') update.last_name = req.body.last_name;
			if (req.body.password != '') update.password = req.body.password;
			update.tags = req.body.tags.match(/\b[\w]+\b/g);
		}
		userModel.findByIdAndUpdate(req.params.id, update, function(err) {
				if (err) console.log(err);
				if (req.body.type == 'rm-notif') {
					messageModel.findByIdAndRemove(req.body.notif_id, function(err) {
						if (err) console.log(err);
						res.json();
					});
				}
				else
					res.redirect('/user/' + req.params.id + '?edit=success');
			});
	}
});

module.exports = router;
//TODO: edit route