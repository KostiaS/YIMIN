angular.module("mainApp")
    .controller("programMenuCtrl", ["URLS", "authService", "getRequest", "postRequest", "session", "eventListener",
        "$scope", "$rootScope", "$location",
        function (URLS, authService, getRequest, postRequest, session, eventListener, $scope, $rootScope, $location) {

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
                postRequest(urlDoc, {"docId": $scope.documentSelected.doc.docId}).then(function (response) {
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
                var urlPersonCustomData = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                    + URLS.PERSONAL_DATA;
                getRequest(urlPersonCustomData, session.userId)
                    .then(function (response) {
                        $scope.personData = response.response;
                        var urlDocumentFields = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                            + URLS.GET_DOCUMENT_FIELDS;
                        postRequest(urlDocumentFields, {docId: item.docId})
                            .then(function (response) {
                                $scope.listOfDocumentFields = response.response;
                                var urlCustomData = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                                    + URLS.LIST_PCD_FIELDS_BY_DOC;
                                postRequest(urlCustomData, {param:[{personId: session.userId},{docId: item.docId}]})
                                    .then(function (response) {
                                        $scope.listOfPersonCustomData = response.response;
                                        $scope.documentFields = [];
                                        for(var i = 0; i < $scope.listOfDocumentFields.length; i++) {
                                            for(var key in $scope.personData) {
                                                if($scope.listOfDocumentFields[i].name == key) {
                                                    $scope.documentFields.push({name: key, possibleValues: null, value: $scope.personData[key]})
                                                }
                                            }
                                        }
                                        for(var i = 0; i < $scope.listOfPersonCustomData.length; i++) {
                                            $scope.documentFields.push($scope.listOfPersonCustomData[i]);
                                        }
                                    })
                                
                            })
                    })
                
            }
            
            $scope.viewDownloadForm = function (item) {
                $scope.mode.complete = "viewDownloadForm";
                var urlDoc = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                    + URLS.GET_DOC;
                postRequest(urlDoc, {"docId": item}).then(function (response) {
                    $scope.programDocument = response.response;
                    $scope.downloadedFormSrc = 'data:image/jpg;base64,' + $scope.programDocument;
                    
                    var urlMask = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.GET_MASK;
                    postRequest(urlMask, {"docId": item}).then(function (response) {
                        $scope.mask = response.response;
                        $scope.decode = atob($scope.mask);
                        // console.log($scope.decode);
                        // $scope.viewDownloadFormUrl = 'data:text/html;base64,' + $scope.mask;
                        eventListener.prepForBroadcast($scope.decode);
                        setCSS();
                        putCustomDataInForm(item);

                        // $scope.viewDownloadFormUrl = $scope.decode;

                        /*                    $rootScope.$on("$includeContentLoaded", function (event, args) {
                         setCSS();
                         putCustomDataInForm(item);
                         });*/
                    });
                });
                

                // $scope.viewDownloadFormUrl = "resources/mask-2.html";

            };

            function setCSS() {
                $(".wrapper").css("background-image", "url("+$scope.downloadedFormSrc+")");
                $("#right-menu").width();
                var resultWidth = ($("#right-menu").width() - 20) / 2;
                var initWidth = $("#formToFill").width();
                var zoom = (resultWidth / initWidth) * 100;
                zoom = zoom + "%";
                $(".zoom").css("zoom", zoom);
                // $("#formToFill").addClass("zoom");
            }
            
            function putCustomDataInForm(item) {
                if(item == $scope.documentSelected.doc && $scope.documentFields) {
                    
                } else if(item == $scope.documentSelected.doc.docId && $scope.documentFields) {
                    for(var i = 0; i < $scope.documentFields.length; i++) {
                        $("#" + $scope.documentFields[i].name).val($scope.documentFields[i].value);
                    }
                } else {
                    getPersonCustomData(item);
                }
            }

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
