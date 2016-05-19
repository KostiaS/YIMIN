angular.module("mainApp")
    .controller("yourWayCtrl", ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {

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
            $scope.authorization.status
                ? $scope.yourWayViewUrl = "resources/yourWay/yourWayAuthorizedView.html"
                : $scope.yourWayViewUrl = "resources/yourWay/yourWayNotAuthorizedView.html";
        };

        $scope.$watch("authorization.status", function () {
            $scope.viewTrigger();
        });

    }]);
