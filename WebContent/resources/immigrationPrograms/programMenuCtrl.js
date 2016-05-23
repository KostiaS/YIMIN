angular.module("mainApp")
    .controller("programMenuCtrl", ["URLS", "postRequest", "$scope",
        function (URLS, postRequest, $scope) {
            
            $scope.init = function () {
                $scope.documentSelected = {doc: null};
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

        }]);
