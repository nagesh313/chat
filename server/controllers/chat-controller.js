//var Chat = require('../models/Chat');

module.exports.list = function (req, res) {
    console.log("Req processing for list ");
	res.json();
    /*Chat.find({}, function (err, results) {
        console.log(results);
        res.json(results);
    });*/
}
module.exports.addChat = function (req, res) {
    console.log("Req processing for addChat ");
	res.json(req.body);
    /*var chat = new Chat(req.body);
    chat.save(function (err, result) {
        res.json(result);
    });*/
}