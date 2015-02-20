var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
	squadModel.findById(req.params.id)
		.populate('members', '_id first_name last_name')
		.populate('admin', '_id first_name last_name')
		.exec(function(err, squad) {
			squad.user_id = req.session.user_id;
			res.render('squad', squad);
		});
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

router.get('/:id/recruit', function(req, res) {
	//retrieve squad
	squadModel.findById(req.params.id, 'admin tags members name', function(err, squad) {
		if (err) console.log(err);
		//unauthorized recruit
		if (squad.admin != req.session.user_id) {
			res.redirect('/squad/' + req.params.id + '?err=unauthorized');
		}
		else {
			console.log(squad);
			var nin = squad.members.push(squad.admin);
			//find relevant squads
			userModel.find({
				tags: {$in: squad.tags},
				_id: {$nin: nin}
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
