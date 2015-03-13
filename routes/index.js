module.exports = function(req, res){
	if (req.session.user_id) {
		req.session.user_id = null;
	}
  res.render('index');
};