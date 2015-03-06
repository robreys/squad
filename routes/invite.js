var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
	woopra.track(version + '_ver_recruit_member');
	//create new message
	(new messageModel({
		author: req.body.from,
		message: 'You have received an invitation!',
		timestamp: Date.now()
	})).save(function(err, message) {
		if (err) console.log(Err);
		//append notification to user
		userModel.findByIdAndUpdate(req.body.to, {
			$push: {notifications: message._id}
		}, function(err) {
			if (err) console.log(err);
			res.json();
		});
	});

});

module.exports = router;