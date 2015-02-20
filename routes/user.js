var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res){
	userModel.findById(req.params.id, {
		password: 0
	}, function(err,user) {
		if (err) console.log(err);
		res.render('user', user);
	});
});

router.post('/:id/edit', function(req, res) {
	//unauthorized edit
	if (req.session.user_id != req.params.id) {
		res.redirect('/user/' + req.params.id + '?err=unauthorized');
	}
	else {
		userModel.findByIdAndUpdate(req.params.id,
			req.body, function(err) {
				res.redirect('/user/' + req.params.id + 'edit=success');
			});
	}
});

module.exports = router;
//TODO: edit route