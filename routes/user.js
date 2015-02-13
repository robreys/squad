module.exports = function(req, res){
  res.render('user', data.users[req.params.id]);
};