var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
		author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		message: String,
		timestamp: Date
});

module.exports = mongoose.model('Message', messageSchema);