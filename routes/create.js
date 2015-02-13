var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('create');
});

router.post('/', function(req, res) {
	var squads = data.squads;

	var user = data.users[req.session.user_id];
	console.log(user);

	var squad = {
		id: squads.length,
		name: req.body.name,
		description: req.body.description,
		feed: [],
		tags: [req.body.tags],
		members: [],
		admin: user,
		cover: "http://www.dukesquad.com/sites/default/files/imagecache/slideshow_full/duke_squad_10_2.jpg"
	};

	squads.push(squad);
	user.squads.push(squad);
	res.redirect('/squad/' + (squads.length - 1));
});

module.exports = router;