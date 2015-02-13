module.exports = function(req, res){
	req.session.user = req.params.id;
  res.render('home', data.users[req.params.id]);
};