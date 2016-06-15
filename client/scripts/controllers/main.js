'use strict';

/**
 * @ngdoc function
 * @name chatAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatAppApp
 */
var socket = io.connect('http://localhost:3000');

angular.module('chatApp', ['ngResource'])
    .controller('chatCtrl', ['$scope', '$resource', function ($scope, $resource) {
        var Chat = $resource('/api/chat');
        $scope.count = 1;
        Chat.query(function (results) {
            angular.forEach(results, function (data) {
                printChat(data.chatText);
                console.log(data.chatText);
            });
        });
        $scope.submitText = function () {
            addNewText($scope.chatText);
            $scope.chatText = "";
        };
        var printChat = function (text) {
            var list = document.getElementById('chats');
            var newLI = document.createElement('li');
            newLI.innerHTML = '<p>' + text + '</p>';
            list.appendChild(newLI);
            setTimeout(function () {
                newLI.className = newLI.className + " show";
            }, 10);

        };
        socket.on('Chat BroadCast', function (data) {
            console.log('Chat BroadCast');
            printChat(data);
        });
        var addNewText = function (text) {
            var chat = new Chat();
            chat.chatText = text;
            chat.createdTime = new Date();
            chat.chatFrom = 'Nagesh';
            chat.$save(function (result) {
                console.log('Chat BroadCast');
                socket.emit('New Chat', text);
                printChat(text);
            });
        };
    }]);