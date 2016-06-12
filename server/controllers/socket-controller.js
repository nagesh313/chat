module.exports.newSocketConnection = function (socket) {
    console.log('a user connected');
    socket.on('chat message', function (msg) {
        socket.broadcast.emit(msg);
        console.log('broadcast');
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
};