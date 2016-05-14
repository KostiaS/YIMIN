angular.module("mainApp")
    .controller("yourWayCtrl", ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {

        //$scope.$on("authorizationBroadcasted", function(event, args) {
        //    $scope.authorization = args.authorization;
        //    console.log("good"/*args.authorization*/);
        //});

        $scope.authorization = false;
        $scope.$on("authorization", function(event, args) {
            $scope.authorization = args.authorization;
            console.log($scope.authorization);
            $scope.viewTrigger();

        });
        $scope.viewTrigger = function() {
            if($scope.authorization == false) {
                $scope.yourWayViewUrl = "resources/yourWay/yourWayAuthorizedView.html";
            } else {
                $scope.yourWayViewUrl = "resources/yourWay/yourWayNotAuthorizedView.html";
            }
        };

        $scope.viewTrigger();

    }]);
