var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
			first_name: String,
			last_name: String,
			email: String,
			password: String,
			tags: [ String ],
			squads: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Squad' } ]
});

module.exports = mongoose.model('User', userSchema);