angular.module("mainApp")
    .controller("yourWayCtrl", ["authService", "$scope", "$rootScope", "$http", "$location",
        function(authService, $scope, $rootScope, $http, $location) {

        //$scope.$on("authorizationBroadcasted", function(event, args) {
        //    $scope.authorization = args.authorization;
        //    console.log("good"/*args.authorization*/);
        //});
        
        // $scope.authorization = false;
        // $scope.$on("authorization", function(event, args) {
        //     $scope.authorization = args.authorization;
        //     console.log($scope.authorization);
        //     $scope.viewTrigger();
        //
        // });
        $scope.viewTrigger = function() {
            // $scope.authorization.status
            authService.isAuthenticated()
                ? $scope.yourWayViewUrl = "resources/yourWay/yourWayAuthorizedView.html"
                : $scope.yourWayViewUrl = "resources/yourWay/yourWayNotAuthorizedView.html";
        };

        $scope.$watch(function () {
            return authService.isAuthenticated();
        }, function () {
            $scope.viewTrigger();
        });

        $scope.goToPersonalDataView = function () {
            $location.path("/yourway/personal-data");
        };

    }]);
