var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('create');
});

router.post('/', function(req, res) {
	var squads = data.squads;

	var user = data.users[req.session.user_id];
	console.log(user);

	squads.push({
		id: squads.length,
		name: req.body.name,
		description: req.body.description,
		feed: [],
		tags: ['basketball'],
		members: [],
		admin: user
	});

	res.redirect('/squad/' + (squads.length - 1));
});

module.exports = router;