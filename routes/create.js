var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('create', {user_id: req.session.user_id});
});

router.post('/', function(req, res) {
	if (!req.session.user_id) {
		res.redirect('/login');
	}
	var tags = req.body.tags.match(/\b[\w]+\b/g);
	//create squad
	(new squadModel({
		name: req.body.name,
		description: req.body.description,
		feed: [],
		tags: tags,
		members: [],
		admin: req.session.user_id,
		cover: "http://www.dukesquad.com/sites/default/files/imagecache/slideshow_full/duke_squad_10_2.jpg"
	})).save(function(err, squad) {
		if (err) console.log(err);
		//add squad to user
		userModel.findByIdAndUpdate(req.session.user_id, {
			$addToSet: {squads: squad._id}
		}, {
			safe: true, upsert: false
		}, function(err) {
			if (err) console.log(err);
			res.redirect('/squad/' + squad._id);
		});
	});
});

module.exports = router;