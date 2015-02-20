module.exports = function(req, res){
	userModel
		.findById(req.session.user_id, {
			//don't return password
			password: 0
		})
		.populate('squads', '_id name')
		.exec(function(err, user) {
			if (err) console.log(err);
			//user not logged in
			if (!user) {
				res.redirect('/login');
			}
			else {
				res.render('home', user);
			}
		});
};