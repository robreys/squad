var mongoose = require('mongoose');

var squadSchema = new mongoose.Schema({
			name: String,
			description: String,
			feed: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Message' } ],
			tags: [ String ],
			members: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
			admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
			cover: String
});

module.exports = mongoose.model('Squad', squadSchema);