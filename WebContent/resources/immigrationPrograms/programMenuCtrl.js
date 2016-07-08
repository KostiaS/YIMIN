angular.module("mainApp")
    .controller("programMenuCtrl", ["URLS", "authService", "getRequest", "postRequest", "session", "eventListener",
        "$scope", "$rootScope", "$location", "$q",
        function (URLS, authService, getRequest, postRequest, session, eventListener, $scope, $rootScope, $location, $q) {
            
            $scope.init = function () {
                // $scope.documentSelected = {doc: null};
                // $scope.mode = {complete: "false"};
            };
            
            $scope.promiseFlag = false;

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
                $scope.mode.progressBar = true;
                var urlDoc = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                    + URLS.GET_DOC;
                postRequest(urlDoc, {"docId": $scope.documentSelected.doc.docId}).then(function (response) {
                    // $scope.programSteps = response.programSteps;
                    $scope.programDocument = response.response;
                    $scope.downloadedFormSrc = 'data:image/jpg;base64,' + $scope.programDocument;
                    $scope.changeSource();
                    $scope.mode.progressBar = false;
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
                var w = $("#previewContainer").width();
                imagePreviewElem.attr('width', w);
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
                    // $scope.mode.complete = "fillForm";
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
                                var promise = postRequest(urlCustomData, {param:[{personId: session.userId},{docId: item.docId}]})
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
                                        if($scope.promiseFlag) {
                                            prepareForm(item.docId);
                                            $scope.promiseFlag = false;
                                        } else {
                                            $scope.mode.complete = "fillForm";
                                        }
                                    });
                            })
                    })
                
            }
            
            $scope.viewDownloadForm = function (item) {
                $scope.mode.complete = "viewDownloadForm";
                if (!$scope.documentSelected.doc) {
                    $scope.documentSelected.doc = item;
                    $scope.promiseFlag = true;
                    getPersonCustomData(item);
                }
                else if (item == $scope.documentSelected.doc.docId) {
                    prepareForm(item);
                }
            };
            
            function prepareForm(item) {
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
                        // setCSS();
                        $scope.setCSS.document();
                        changeEmptyFormSource();
                        putCustomDataInForm(item);
                    });
                });
            }
            
            
            $scope.setCSS.document = function () {
                $(".wrapper").css("background-image", "url("+$scope.downloadedFormSrc+")");
                $("#right-menu").width();
                // var resultWidth = ($("#right-menu").width() - 20) / 2;
                var resultWidth = $("#formContainer").width();
                var initWidth = $("#formToFill").width();
                var zoom = (resultWidth / initWidth) * 100;
                var zoom = zoom + "%";
                $(".zoom").css("zoom", zoom);
            };

            function changeEmptyFormSource() {
                var imagePreviewElem = angular.element(document.querySelector('#previewEmptyForm'));
                imagePreviewElem.attr('src', $scope.downloadedFormSrc);
                var w = $("#formContainer").width();
                imagePreviewElem.attr('width', w);
            }

            function putCustomDataInForm(item) {
/*                if(item == $scope.documentSelected.doc && $scope.documentFields) {
                    
                } else */if(item == $scope.documentSelected.doc.docId && $scope.documentFields) {
                    for(var i = 0; i < $scope.documentFields.length; i++) {
                        $("#" + $scope.documentFields[i].name).val($scope.documentFields[i].value);
                    }
                } else {
                    getPersonCustomData(item);
                }
            }

            $scope.updateForm = function () {

            };

            $scope.downloadForm = function () {
                $scope.modalMode.opened = true;
                var resultLeftPosition = -($(".container").width() - $("#formContainer").width() - 35) + "px";
                $(".zoom").css("zoom", "normal");
                $(".wrapper").css({"position": "absolute", "left": resultLeftPosition, "top": "-261px", "zIndex": "2"});
                // $(".wrapper").css({"position": "absolute", "left": "0", "top": "0"});
                var windowWidth = $(document).width() + "px";
                var windowHeight = $(document).height() + "px";
                $(".modal-background").css({"width": windowWidth, "height": windowHeight});
                $scope.modalMode.modalBackground = true;
            };
            
            $scope.downloadEmptyForm = function () {
                $scope.modalMode.opened = true;
                var resultLeftPosition = -($(".container").width() - $("#right-menu").width() - 35) + "px";
                $("#previewEmptyForm")
                    .css({
                        "position": "absolute", "left": resultLeftPosition, "top": "-261px",
                        "zIndex": "2",
                        "width": "1140px"
                    });
                var windowWidth = $(document).width() + "px";
                var windowHeight = $(document).height() + "px";
                $(".modal-background").css({"width": windowWidth, "height": windowHeight});
                $scope.modalMode.modalBackground = true;
            };
            
            $scope.closeModal = function () {
                if($scope.modalMode.opened) {
                    $scope.setCSS.modalClose();
                }
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
            
        }]);
