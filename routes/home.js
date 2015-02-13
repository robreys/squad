module.exports = function(req, res){
  res.render('home', data.users[req.session.user_id]);
};