var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
		author: { type: mongoose.Schema.Types.ObjectId },
		message: String,
		timestamp: Date,
		_type: String
});

module.exports = mongoose.model('Message', messageSchema);