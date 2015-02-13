var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
  res.render('squad', data.squads[req.params.id]);
});

router.post('/:id/post', function(req, res) {
	data.squads[req.params.id].feed.push({
		author: data.users[req.session.user_id],
		message: req.body.message
	});
	res.redirect('/squad/' + req.params.id);
});

router.post('/:id/join', function(req, res) {
	var members = data.squads[req.params.id].members;
	var user = data.users[req.session.user_id];
	for (var i = 0; i < members.length; i ++) {
		if (members[i].id == user.id) {
			res.redirect('/squad/' + req.params.id);
		}
	}

	members.push(user);
	res.redirect('/squad/' + req.params.id);
});

module.exports = router;
