module.exports = function(req, res){
	//retrieve user
	userModel.findById(req.session.user_id, 'tags', function(err, user) {
		if (err) console.log(err);
		//convert tags to lowercase
		user.tags = user.tags.join().toLowerCase().split(',');
		console.log(user.tags);
		//find relevant squads
		squadModel.find({
			tags: {$in: user.tags},
			admin: {$ne: req.session.user_id},
			members: {$ne: req.session.user_id}
		}, {feed: 0, members: 0, admin: 0})
			.limit(10)
			.exec(function(err, squads) {
				if (err) console.log(err);
				res.render('find', {user_id: req.session.user_id, squads: squads});
			});
	});
};
//TODO: implement 'more' function to return next set of squads