angular.module("mainApp", ["ngRoute"])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.when("/yourway", {
            templateUrl: "resources/yourWay/yourWay.html"
        });
    })
    .controller("mainAppCtrl", ["$scope", "$location", function($scope, $location) {
        $scope.goToYourWayView = function() {
            $location.path("/yourway");
        }
    }]);
