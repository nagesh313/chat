var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser'),
    mongoose = require('mongoose');
var chatController = require('./server/controllers/chat-controller');
var socketController = require('./server/controllers/socket-controller');
mongoose.connect('mongodb://localhost:27017/chat');


server.listen(3000, function () {
    console.log('I\'m Listening...');
})

app.use(bodyParser.json());

app.use('/js', express.static(__dirname + "/client/scripts"));
app.get('/', function (req, res) {
    console.log("Req processing for/ ");
    res.sendFile(__dirname + '/client/views/index.html');
});
app.get('/api/chat', chatController.list);
app.post('/api/chat', chatController.addChat);
io.on('connection', function (socket) {

    socket.on('New Chat', function (data) {
        console.log('New Chat');
        console.log(data);
        socket.broadcast.emit('Chat BroadCast', data);

    });
});
/*var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
var chatController = require('./server/controllers/chat-controller');
var socketController = require('./server/controllers/socket-controller');
mongoose.connect('mongodb://localhost:27017/chat');

app.use(bodyParser.json());

app.use('/js', express.static(__dirname + "/client/scripts"));
app.get('/', function (req, res) {
    console.log("Req processing for/ ");
    res.sendFile(__dirname + '/client/views/index.html');
});
app.get('/api/chat', chatController.list);
app.post('/api/chat', chatController.addChat);
app.listen(3000, function () {
    console.log('I\'m Listening...');
})*/