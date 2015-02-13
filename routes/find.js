module.exports = function(req, res){
  res.render('find', {
		session_user: req.session.user,
		squads: data.squads
	});
};