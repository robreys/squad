module.exports = function(req, res){
	if (req.session.user_id) {
		res.render('help', {session: true});
	}
	else {
  	res.render('help');
  }
};