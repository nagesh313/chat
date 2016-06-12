var mongoose = require('mongoose');
module.exports = mongoose.model('Chat', {
    chatText: String,
    createdTime: Date,
    chatFrom: String
});