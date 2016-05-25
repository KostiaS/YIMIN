angular.module("mainApp")
    .controller("programMenuCtrl", ["URLS", "postRequest", "$scope", "$location",
        function (URLS, postRequest, $scope, $location) {

            $scope.init = function () {
                $scope.documentSelected = {doc: null};
                $scope.mode = {complete: "false"};
            };

            $scope.$watch("documentSelected.doc", function () {
                $scope.downloadCompleteBtnsVisibilityHandler()
            });
            
            $scope.programStepDescription = function (description) {
                $scope.programStepDescriptionVisibility = true;
                $scope.stepDescriptionTmp = description;
            };

            $scope.updateDocumentSelect = function () {

            };

            $scope.getDocument = function () {
                var urlDoc = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                    + URLS.GET_DOC;
                postRequest(urlDoc, $scope.documentSelected).then(function (response) {
                    // $scope.programSteps = response.programSteps;
                    $scope.programSteps.steps = response.response;
                });
            };

            $scope.downloadCompleteBtnsVisibilityHandler = function () {
                $scope.documentSelected.doc == null
                    ? $scope.downloadCompleteBtnsVisibility = false
                    : $scope.downloadCompleteBtnsVisibility = true;
            };
            
            $scope.completeForm = function () {
                $scope.mode.complete = "true";
            };


            //Authorization
            $scope.viewTrigger = function() {
                $scope.authorization.status
                    ? $scope.goToYourWayView()
                    : console.log("authorization error");
            };

            $scope.$watch("authorization.status", function () {
                $scope.viewTrigger();
            });

            $scope.goToYourWayView = function() {
                $location.path("/yourway");
            };
            //Authorization

            $scope.signUp = function () {
                $location.path("/registration");
            }

        }]);
