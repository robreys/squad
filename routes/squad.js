var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
  res.render('squad', data.squads[req.params.id]);
});

router.post('/:id/post', function(req, res) {
	data.squads[req.params.id].feed.push({
		author: data.users[req.session.user_id],
		message: req.body.message,
		timestamp: Date.now()
	});
	res.redirect('/squad/' + req.params.id);
});

router.get('/:id/join', function(req, res) {
	var squad = data.squads[req.params.id];
	var user = data.users[req.session.user_id];
	for (var i = 0; i < user.squads; i ++) {
		if (user.squads[i].id == squad.id) {
			res.redirect('/squad/' + req.params.id);
		}
	}
	user.squads.push(squad);
	squad.members.push(user);
	res.redirect('/squad/' + req.params.id);
});

module.exports = router;
