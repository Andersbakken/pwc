/*global angular, Firebase, setInterval*/
angular.module('Application', [ 'ngRoute' ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'PasswordsController',
            templateUrl: 'views/passwords.html'
        });
    }])

    .controller('MainController', [function() {
    }])

    .controller('PasswordsController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
        $scope.inProgress = false;
        $scope.passwords = [];
        $scope.hidden = [];
        $scope.filter = "";
        $scope.isValid = function() {
            return true;
            return !$scope.passwords.some(function(password) {
                return !password.title || !password.site || !password.password;
            });
        };
        $scope.updateFilter = function() {
            for (var i=0; i<$scope.passwords.length; ++i) {
                $scope.hidden[i] = ($scope.passwords[i].title.indexOf($scope.filter) == -1
                                    && $scope.passwords[i].site.indexOf($scope.filter) == -1
                                    && $scope.passwords[i].password.indexOf($scope.filter) == -1);
            }
        };
        $scope.addPassword = function() {
            // console.log(JSON.stringify($scope.passwords, undefined, 4));
            $scope.passwords.push({ title: "", site: "", password: "" });
            $scope.hidden.push(false);
        };
        $scope.removePassword = function(idx) {
            $scope.passwords.splice(idx, 1);
            $scope.hidden.splice(idx, 1);
        };
        $scope.submitPasswords = function() {
            console.log(JSON.stringify($scope.passwords, undefined, 4));
            $scope.inProgress = true;
            $http.post('/passwords.json', { passwords: $scope.passwords })
                .success(function() {
                    $scope.inProgress = false;
                })
                .error(function() {
                    $scope.inProgress = false;
                    alert("YOU FAILED!");
                });


            // var copy = [];
            // $scope.passwords.forEach(function(password) {

            // });
        };
        $http.get('/passwords.json').success(function(data, status, headers, config) {
            $scope.passwords = data;
            $scope.hidden = $scope.passwords.map(function() { return false; });
        });
    }]);

