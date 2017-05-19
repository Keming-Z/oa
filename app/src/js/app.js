var app = angular.module('pubmatic', [
    'ngRoute'
])
.config([
    'routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl:'home.html',
                controller:'HomeCtrl'
            });
    }
]);
