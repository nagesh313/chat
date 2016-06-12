'use strict';

/**
 * @ngdoc function
 * @name chatAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chatAppApp
 */
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
        var addNewText = function (text) {
            var chat = new Chat();
            chat.chatText = text;
            chat.createdTime = new Date();
            chat.chatFrom = 'Nagesh';
            chat.$save(function (result) {
                //socket.emit('chat message', text);
                printChat(text);
            });
        };
       /* socket.on('chat message', function (msg) {
     console.log("chat message");
     printChat(msg.chatText);
 });*/

    }]);