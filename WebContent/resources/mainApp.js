angular.module("mainApp", ["ngRoute", "countriesInfo"])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/yourway", {templateUrl: "resources/yourWay/yourWay.html"})
            .when("/countries", {templateUrl: "resources/countriesInfo/countriesInfo.html"})
            .when("/programs", {templateUrl: "resources/immigrationPrograms/immigrationPrograms.html"})
            .when("/embassies", {templateUrl: "resources/embassiesInfo/embassiesInfo.html"});
    })
    .controller("mainAppCtrl", ["$scope", "$rootScope", "$location", function($scope, $rootScope, $location) {
        $scope.goToYourWayView = function() {
            $location.path("/yourway");
        };

        $scope.goToCoutriesInfoView = function() {
            $location.path("/countries");
        };

        $scope.$on("authorization", function(event, args) {
            $scope.authorization = args.authorization;
            $scope.broadcastAuthorization();
            console.log($scope.authorization);
        });

        $scope.broadcastAuthorization = function() {
            $rootScope.$broadcast("authorizationBroadcasted", {
                authorization: $scope.authorization
            });
        };

    }]);
