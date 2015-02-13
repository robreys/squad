module.exports = function(req, res){
	var squad =  data.squads[req.params.id];
	squad.session_user = req.session.user;
  res.render('squad', squad);
};