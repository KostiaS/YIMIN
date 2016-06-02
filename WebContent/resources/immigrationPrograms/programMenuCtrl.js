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
                $scope.getDocument();
            };

            $scope.getDocument = function () {
                var urlDoc = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                    + URLS.GET_DOC;
                postRequest(urlDoc, {"docId": 1}/*$scope.documentSelected*/).then(function (response) {
                    // $scope.programSteps = response.programSteps;
                    $scope.programDocument = response.response;
                    $scope.downloadedFormSrc = 'data:image/jpg;base64,' + $scope.programDocument;
                    $scope.changeSource();
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
            };
            
            // $scope.downloadedFormSrc = "#";
            
            // $scope.changeSource = function (source) {
            //     var imagePreviewElem = angular.element(document.querySelector('#preview'));
            //     imagePreviewElem.attr('src', source);
            // };
            
            $scope.changeSource = function () {
                var imagePreviewElem = angular.element(document.querySelector('#preview'));
                imagePreviewElem.attr('src', $scope.downloadedFormSrc);
            };

            // $scope.downloadForm = function () {
            //    
            // }
            
        }]);
