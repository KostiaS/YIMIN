angular.module("mainApp")
    .controller("yourWayCtrl", ["authService", "URLS", "postRequest", "session", "$scope", "$rootScope", "$http", "$location",
        function(authService, URLS, postRequest, session, $scope, $rootScope, $http, $location) {

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

            $scope.goToYourImmigrationView = function () {
                if(session.listOfPrograms) {
                    session.programsMarker(true);
                    // getProgramsFulfillment();
                    $location.path("/yourway/immigration/programs");
                } else {
                    session.programsMarker(null);
                    $location.path("/yourway/immigration");
                }
            };

            function getProgramsFulfillment() {
                var url = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING +
                        URLS.GET_VALUATION_OF_WAY_PROG;
                var programsFullfillment = [];
                for(var i = 0; i <session.listOfPrograms.length; i++) {
                    var programId = session.listOfPrograms[i].program.programId;
                    postRequest(
                        url,
                        {"param": [
                            {"personId": session.userId},
                            {"programId": programId}
                        ]}
                    ).then(function (response) {
                        console.log(response.response);
                        programsFullfillment.push({
                            progarmId: programId,
                            fulfillment: response.response});
                    })
                }
                // console.log(programsFullfillment);
                // session.programsFulfillment(programsFullfillment);
            }
    }]);
