angular.module("mainApp")
    .controller("programMenuCtrl", ["URLS", "authService", "postRequest", "session", "$scope", "$location",
        function (URLS, authService, postRequest, session, $scope, $location) {

            $scope.init = function () {
                // $scope.documentSelected = {doc: null};
                // $scope.mode = {complete: "false"};
            };

            $scope.$watch("documentSelected.doc", function () {
                $scope.downloadCompleteBtnsVisibilityHandler()
            });
            
            $scope.programStepDescription = function (description) {
                if($scope.mode.yourPrograms != "picked") {
                    $scope.programStepDescriptionVisibility = true;
                    $scope.stepDescriptionTmp = description;
                }
            };

            $scope.updateDocumentSelect = function () {
                if($scope.documentSelected.doc) $scope.getDocument();
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

            //Authorization
            // $scope.viewTrigger = function() {
            //     $scope.authorization.status
            //         ? $scope.goToYourWayView()
            //         : console.log("authorization error");
            // };

            // $scope.$watch("authorization.status", function () {
            //     $scope.viewTrigger();
            // });

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

            $scope.completeForm = function (item) {
                if(!item) {
                    $scope.pendingRequestForFillingForm.value = true;
                    if(!authService.isAuthenticated()) $scope.mode.complete = "true";
                    else {
                        if(!$scope.mode.textProgramInWay) {
                            $scope.mode.complete = "addProgramToWay"
                        } else {
                            session.setDocumentSelected($scope.documentSelected.doc);
                            session.setProgramSelected($scope.programSelected.prog);
                            $location.path("/yourway/immigration/programs");
                        }
                    }
                } else {
                    $scope.documentSelected.doc = item;
                    $scope.mode.complete = "fillForm";
                    getPersonCustomData(item);
                }

            };
            
            function getPersonCustomData(item) {
                var url = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                    + URLS.GET_DOCUMENT_FIELDS;
                postRequest(url, {docId: item.docId}).then(function (response) {
                    $scope.listOfDocumentFields = response.response;
                }).then(function () {
                    var url = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.LIST_PCD_FIELDS_BY_DOC;
                    postRequest(url, {param:[{personId: session.userId},{docId: item.docId}]})
                        .then(function (response) {
                            $scope.listOfPersonCustomData = response.response;
                        })
                })
                
            }
            
            $scope.viewDownloadForm = function () {
                
            };

            $scope.updateForm = function () {

            };
            
            // $scope.$watch(function () {
            //     return authService.isAuthenticated();
            // }, function () {
            //     pendingRequestForFillingFormHandler();
            // });
            //
            // function pendingRequestForFillingFormHandler() {
            //    
            // }

            // $scope.markStepFulfillment = [];

            // $scope.downloadForm = function () {
            //    
            // }
            
        }]);
