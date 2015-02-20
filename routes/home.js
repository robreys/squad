module.exports = function(req, res){
	userModel
		.findById(req.session.user_id, {
			//don't return password
			password: 0
		})
		.populate('notifications')
		.exec(function(err, user) {
			if (err) console.log(err);
			//user not logged in
			if (!user) {
				res.redirect('/login');
			}
			else {
				squadModel.populate(user.notifications, {path: 'author'} , function(err) {
					if (err) console.log(err);
					res.render('home', user);
				});
				
			}
		});
};