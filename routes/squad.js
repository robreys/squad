var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
	squadModel.findById(req.params.id)
		.populate('admin', '_id first_name last_name')
		.exec(function(err, squad) {
			squad.user_id = req.session.user_id;
			if (squad.admin._id == req.session.user_id) {
				squad.adminMode = true;
			}
			else if (squad.members.indexOf(req.session.user_id) > -1) {
				squad.member = true;
			}
			squadModel.populate(squad, {path: 'members', select: 'id first_name last_name'}, function(err) {
				if (err) console.log(err);
				res.render('squad', squad);
			});
		});
});

router.get('/:id/edit', function(req, res) {
	squadModel.findById(req.params.id, function(err, squad) {
		if (err) console.log(err);
		if (squad.admin != req.session.user_id) {
			res.redirect('/login?err=unauthorized');
		}
		else {
			squad.edit = true;
			squad.tags = squad.tags.join(', ');
			squad.user_id = req.session.user_id;
			res.render('create', squad);
		}
	});
});

router.post('/:id/edit', function(req, res) {
	var tags = req.body.tags.toLowerCase();
	tags = tags.match(/\b[\w]+\b/g);
	squadModel.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		description: req.body.description,
		tags: tags
	}, function(err) {
		if (err) console.log(err);
		res.redirect('/squad/' + req.params.id);
	})
});

router.post('/:id/post', function(req, res) {
	//create new message
	(new messageModel({
		author: req.session.user_id,
		message: req.body.message,
		timestamp: Date.now()
	})).save(function(err, message) {
		if (err) console.log(err);
		//add message to squad feed
		squadModel.findByIdAndUpdate(req.params.id, {
			$push: {feed: message._id}
		}, {
			safe: true, upset: false
		}, function(err) {
			if (err) console.log(err);
			res.redirect('/squad/' + req.params.id);
		});
	});
});

router.get('/:id/join', function(req, res) {
	//add user to squad
	squadModel.findByIdAndUpdate(req.params.id, {
		$addToSet: {members: req.session.user_id}
	}, {
		safe: true, upset: false
	}, function(err) {
		if (err) console.log(err);
		//add squad to user
		userModel.findByIdAndUpdate(req.session.user_id, {
			$addToSet: {squads: req.params.id}
		}, {
			safe: true, upset: false
		}, function(err) {
			if (err) console.log(err);
			res.redirect('/squad/' + req.params.id);
		});
	});
});

router.get('/:id/leave', function(req, res) {
	squadModel.findByIdAndUpdate(req.params.id, {
		$pull: {members: req.session.user_id}
	}, function(err) {
		if (err) console.log(err);
		res.redirect('/squad/' + req.params.id);
	});
});

router.get('/:id/recruit', function(req, res) {
	//retrieve squad
	squadModel.findById(req.params.id, 'admin tags members name', function(err, squad) {
		if (err) console.log(err);
		//unauthorized recruit
		if (squad.admin != req.session.user_id) {
			res.redirect('/squad/' + req.params.id + '?err=unauthorized');
		}
		else {
			squad.members.push(squad.admin);
			//find relevant users
			userModel.find({
				tags: {$in: squad.tags},
				_id: {$nin: squad.members}
			}, {password: 0, email: 0, squads: 0})
				.limit(10)
				.exec(function(err, users) {
					if (err) console.log(err);
					var data = {
						squad_id: req.params.id,
						squad_name: squad.name,
						user_id: req.session.user_id,
						users: users
					};
					res.render('recruit', data);
				});
		}
	});
});

module.exports = router;

//TODO: 'more' route to load more recruit results
