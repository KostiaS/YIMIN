angular.module("mainApp")
    .controller("yourWayCtrl", ["authService", "URLS", "postRequest", "session", "$scope", "$rootScope", "$http", "$q", "$location",
        function(authService, URLS, postRequest, session, $scope, $rootScope, $http, $q, $location) {

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
                    var programsFulfillment = [];
                    getProgramsFulfillment(programsFulfillment);
                    // $location.path("/yourway/immigration/programs");
                } else {
                    session.programsMarker(null);
                    session.setIndex(null);
                    session.setDocumentSelected(null);
                    $location.path("/yourway/immigration");
                }
            };

            function getProgramsFulfillment(programsFulfillment) {
                var promises = [];
                var url = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING +
                    URLS.GET_VALUATION_OF_WAY_PROG;
                for(var i = 0; i <session.listOfPrograms.length; i++) {
                    (function () {
                        var local = i;
                        var programId = session.listOfPrograms[local].program.programId;
                        var promise = postRequest(
                            url,
                            {"param": [
                                {"personId": session.userId},
                                {"programId": programId}
                            ]}
                        ).then(function (response) {
                            programsFulfillment.push({
                                programId: programId,
                                fulfillment: response.response});
                        });
                        promises.push(promise);
                    })();
                }
                $q.all(promises).then(function() {
                    session.programsFulfillment(programsFulfillment);
                    session.chooseNewProgramButtonState(true);
                    session.setIndex(null);
                    session.setDocumentSelected(null);
                    $location.path("/yourway/immigration/programs");
                });
            }
    }]);
