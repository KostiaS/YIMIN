angular.module("mainApp")
    .controller("immigrationProgramsCtrl", ["URLS", "getRequest", "postRequest", "authService", "session",
        "$scope", "$rootScope", "$location", "$q",
        function(URLS, getRequest, postRequest, authService, session, $scope, $rootScope, $location, $q) {
            
            $scope.mode = {
                value: "clean",
                btnAddProgram: false,
                textProgramInWay: false,
                yourPrograms: session.yourProgramsMarker,
                chooseNewProgramBtnState: session.chooseNewProgramBtnState,
                programMenuVisibility: false,
                yourProgramInfoState: false,
                complete: false
            };

            $scope.pendingRequestForFillingForm = {value: false};
            
            $scope.programMenuBtnsVisibility = false;
            
            $scope.programSteps = {steps: []};
            $scope.programDocuments = {docs: []};
            $scope.documentSelected = {doc: {}};
            $scope.programSelected = {prog: null};
            
            $scope.btnText = {
                clean: {steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides"},
                dirty: {
                    steps: {steps: "Steps:", requirements: "Requirements", formsAndGuides: "Forms and guides"},
                    requirements: {steps: "Steps", requirements: "Requirements:", formsAndGuides: "Forms and guides"},
                    formsAndGuides: {steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides:"}
                },
                show: {steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides"}
            };
            
            $scope.yourImmigrationPrograms = session.listOfPrograms;
            
            $scope.viewTrigger = function () {
                if(authService.isAuthenticated()) {
                    $scope.btnDescripText = {
                        text: "To get a program suitable to you click",
                        btn: "Filter by requirements"
                    };
                    $scope.addProgramToYourWayButtonTrigger();
                    if(session.listOfPrograms != null) {
                        if($scope.mode.complete == "true") {
                            if(!$scope.mode.textProgramInWay) {
                                $scope.mode.complete = "addProgramToWay"
                            } else {
                                $scope.mode.complete = "fillForm";
                            }
                        }
                    }

                } else {
                    $scope.btnDescripText = {
                        text: "Click Your Way to get a program suitable to you",
                        btn: "Your Way"
                    };
                    $scope.mode.btnAddProgram = false;
                    $scope.mode.textProgramInWay = false;
                    if($scope.mode.complete == "addProgramToWay") {
                        $scope.mode.complete = "true";
                    }
                }
            };

            $scope.addProgramToYourWayButtonTrigger = function () {
                $scope.yourImmigrationPrograms = session.listOfPrograms;
                if(authService.isAuthenticated()) {
                    if(session.listOfPrograms == null && $scope.programSelected.prog != null && $scope.mode.yourProgramInfoState == false) {
                        $scope.mode.btnAddProgram = true;
                        $scope.mode.textProgramInWay = false;
                    } else {
                        if(session.listOfPrograms != null && $scope.programSelected.prog != null && $scope.mode.yourProgramInfoState == false) {
                            var flag = false;
                            for(var i = 0; i < session.listOfPrograms.length; i++) {
                                if(session.listOfPrograms[i].program.programId == $scope.programSelected.prog.programId) {
                                    flag = true;
                                    break;
                                }
                            }
                            if(flag) {
                                $scope.mode.btnAddProgram = false;
                                $scope.mode.textProgramInWay = true;
                            } else {
                                $scope.mode.btnAddProgram = true;
                                $scope.mode.textProgramInWay = false;
                            }

                            if($scope.mode.complete == "true") {
                                if(!$scope.mode.textProgramInWay) {
                                    $scope.mode.complete = "addProgramToWay"
                                }/* else {
                                    $scope.mode.complete = "fillForm";
                                }*/
                            }

                            if($scope.pendingRequestForFillingForm.value == true && $scope.mode.complete == "false") {
                                $scope.pendingRequestForFillingForm.value = false;
                            }
                            if($scope.pendingRequestForFillingForm.value == true && $scope.mode.complete == "true") {
                                $scope.mode.complete = "fillForm";
                                session.setDocumentSelected($scope.documentSelected.doc);
                                session.setProgramSelected($scope.programSelected.prog);
                                $location.path("/yourway/immigration/programs");
                            }
                            
                            // flag ? $scope.mode.btnAddProgram = false : $scope.mode.btnAddProgram = true;
                        } else {
                            $scope.mode.btnAddProgram = false;
                            $scope.mode.textProgramInWay = false;
                        }
                    }
                } else {
                    $scope.mode.btnAddProgram = false;
                    $scope.mode.textProgramInWay = false;
                }
            } ;
            
            $scope.$watch(function () {
                return authService.isAuthenticated();
            }, function () {
                $scope.viewTrigger();
            });

            $scope.$watch(function () {
                return session.listOfPrograms;
            }, function () {
                $scope.addProgramToYourWayButtonTrigger();
            });

            // $scope.$watch(function(scope) {
            //     return scope.mode.chooseNewProgramBtnState
            // },
            //     function() {}
            // );

            $scope.clickHandler = function () {
                authService.isAuthenticated() ? $location.path("/programs/choose-by-requirements") : $scope.goToYourWayView();
            };

            $scope.updateCountrySelect = function () {
                $scope.getCategories();
                $scope.programSelected.prog = null;
                if($scope.categorySelected != null) {
                    $scope.mode.programMenuVisibility = false;
                    $scope.mode.value = "clean";
                }
            };
            
            $scope.updateCategorySelect = function () {
                $scope.mode.programMenuVisibility = false;
                $scope.programSelected.prog = null;
                $scope.getPrograms();
            };

            $scope.updateProgramSelect = function() {
                var urlSteps = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.STEPS;
                var urlDocuments = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.LIST_OF_DOC;
                $scope.mode.complete = false;
                if($scope.programSelected.prog != null) {
                    resetDocumentPreview();
                    if(authService.isAuthenticated()) {
                        $scope.addProgramToYourWayButtonTrigger();
                    }
                    $scope.mode.programMenuVisibility = true;
                    postRequest(urlSteps, $scope.programSelected.prog).then(function (response) {
                        // $scope.programSteps = response.programSteps;
                        $scope.programSteps.steps = response.response;
                    });
                    postRequest(urlDocuments, $scope.programSelected.prog).then(function (response) {
                       $scope.programDocuments.docs = response.response;
                        // $scope.broadcastProgramDocuments();
                        // $scope.broadcastProgramDocuments();
                    });

                    // postRequest(urlRequirements, $scope.programSelected.prog).then(function (response) {
                    //     $scope.programRequirements.requirements = response.response;
                    // })

                    //---Only for testing---
                    // $scope.programSteps.steps = [
                    //     {"id":3,"step":{"id":3,"name":"Mail the application","description":"description3"},"stepOrder":3,"description":"description3","fileName":"description3"},
                    //     {"id":1,"step":{"id":1,"name":"name1","description":"description1"},"stepOrder":1,"description":"description1","fileName":"description1"},
                    //     {"id":2,"step":{"id":2,"name":"name2","description":"description2"},"stepOrder":2,"description":"description2","fileName":"description2"}
                    // ];
                    //---Only for testing---
                }
            };
            
            function resetDocumentPreview() {
                var imagePreviewElem = angular.element(document.querySelector('#preview'));
                imagePreviewElem.attr('src', '#');
                $scope.documentSelected.doc = null;
            }
            
            // $scope.emitProgramDocuments = function () {
            //     $scope.$emit("programDocuments", {
            //         programDocuments: $scope.programDocuments
            //     });
            // };

            // $scope.broadcastProgramDocuments = function () {
            //     $rootScope.$broadcast("programDocuments", {
            //         programDocuments: $scope.programDocuments
            //     });
            // };

            $scope.getAllCountries = function() {
                getRequest(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.COUNTRIES, "")
                    .then(function (response) {
                        // $scope.countries = $scope.countries.slice(0, 1);
                        // arrayConcatSrvs.arrayConcated($scope.countries, response.countries);
                        $scope.countries = response.response;
                        $scope.countrySelected = $scope.countryForImmigration;
                        if ($scope.countrySelected != null) {
                            $scope.updateCountrySelect()
                        } 
                    })
            };

            $scope.getCategories = function () {
                var url = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                            + URLS.CATEGORIES_OF_PROGRAM_BY_COUNTRY;
                postRequest(url, {countryId: $scope.countrySelected.countryId}).then(function (response) {
                    $scope.categories = response.response;
                // getCategories($scope.countrySelected).then(function (response) {
                //     $scope.categories = response.categories;
                })
            };

            $scope.getPrograms = function () {
                var url = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                            + URLS.IMMIGRATION_PROGRAMS;
                postRequest(url,
                        {param: [{countryId: $scope.countrySelected.countryId}, {category: $scope.categorySelected}]})
                    .then(function (response) {
                        $scope.programs = response.response;
                // getPrograms([$scope.countrySelected, {category: $scope.categorySelected}]).then(function (response) {
                //     $scope.programs = response.programs;
                    });
            };

            $scope.getAllCountries();

            $scope.$on("countryForImmigration", function (event, args) {
                $scope.countryForImmigration = args.countryForImmigration;
            });

            $scope.programMenuUrl = {url: null};

            $scope.viewsUrls = {
                steps: "resources/immigrationPrograms/programMenuViews/programSteps.html",
                requirements: "resources/immigrationPrograms/programMenuViews/programRequirements.html",
                formsAndGuides: "resources/immigrationPrograms/programMenuViews/programFormsAndGuides.html",
                completeForm: "resources/immigrationPrograms/programMenuViews/completeForm.html"
            };

            $scope.programMenuHandler = function (url, btnText) {
                $scope.mode.complete = false;
                resetDocumentPreview();
                $scope.btnText.show.steps = btnText.steps;
                $scope.btnText.show.formsAndGuides = btnText.formsAndGuides;
                $scope.btnText.show.requirements = btnText.requirements;
                $scope.programMenuUrl.url = url;
                if($scope.mode.value == "clean") {
                    $scope.mode.value = "dirty";
                }
                // $scope.documentSelected.doc = {};
            };

            $scope.addProgramToYourWay = function () {
                var url = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                    + URLS.ADD_PROGRAM_IN_WAY;
                postRequest(url, {"param":[{"personId":session.userId}, {"programId": $scope.programSelected.prog.programId}]})
                    .then(function (response) {
                        updateProgramsInWay();
                    })
            };

            function updateProgramsInWay() {
                var url = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                    + URLS.GET_PROGRAMS_LIST_FROM_WAY;
                postRequest(url, {personId: session.userId})
                    .then(function (response) {
                        session.addUpdateListOfPrograms(response.response);

                        if($scope.pendingRequestForFillingForm.value == true && $scope.mode.complete == "addProgramToWay") {
                            session.setDocumentSelected($scope.documentSelected.doc);
                            session.setProgramSelected($scope.programSelected.prog);
                            $location.path("/yourway/immigration/programs");
                        }

                    })
            }

            $scope.getFulfillment = function (item) {
                if(authService.isAuthenticated() && item) {
                    var index = $scope.yourImmigrationPrograms.indexOf(item);
                    var id = $scope.yourImmigrationPrograms[index].program.programId;
                    for (var i = 0; i < session.fulfillment.length; i++) {
                        if(id == session.fulfillment[i].programId) {
                            return session.fulfillment[i].fulfillment;
                        }
                    }
                }
            };
            
            $scope.removeProgramFromWay = function (item) {
                var index = $scope.yourImmigrationPrograms.indexOf(item);
                var id = $scope.yourImmigrationPrograms[index].program.programId;
                var url = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                    + URLS.DELETE_PROGRAM_FROM_WAY;
                postRequest(url, {param: [{personId: session.userId}, {programId: id}]})
                    .then(function (response) {
                        $scope.yourImmigrationPrograms.splice(index, 1);
                        $scope.yourImmigrationPrograms.length == 0
                            ? session.addUpdateListOfPrograms(null)
                            : session.addUpdateListOfPrograms($scope.yourImmigrationPrograms);
                    })
            };

            $scope.showProgramInformation = function (item) {
                session.setIndex(null);
                $scope.index = $scope.yourImmigrationPrograms.indexOf(item);
                $scope.programSelected.prog = $scope.yourImmigrationPrograms[$scope.index].program;

                session.chooseNewProgramButtonState(false);
                $scope.mode.chooseNewProgramBtnState = session.chooseNewProgramBtnState;
                $scope.mode.yourProgramInfoState = true;
                session.programsMarker("picked");
                $scope.mode.yourPrograms = session.yourProgramsMarker;
                $scope.updateProgramSelect();
            };

            $scope.goToProgramInformation = function () {
                var j = 0;
                while ($scope.yourImmigrationPrograms[j].program.programId != $scope.programSelected.prog.programId) {
                    j++;
                }
                session.setIndex(j);
                var programsFulfillment = [];
                getProgramsFulfillment(programsFulfillment);
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
                    if(!session.documentSelected) {
                        session.chooseNewProgramButtonState(false);
                        $scope.mode.chooseNewProgramBtnState = session.chooseNewProgramBtnState;
                        session.programsMarker("picked");
                        $scope.mode.yourPrograms = session.yourProgramsMarker;
                        session.setProgramSelected($scope.programSelected.prog);
                        $location.path("/yourway/immigration/programs");
                    } else {
                        $scope.mode.yourPrograms = "picked";
                        $scope.mode.programMenuVisibility = true;
                        $scope.programMenuUrl.url = $scope.viewsUrls.formsAndGuides;
                        $scope.mode.textProgramInWay = false;
                        $scope.mode.value = "dirty";
                        $scope.mode.complete = "fillForm";
                    }
                });
            }

            if(session.index) {
                $scope.index = session.index;
                $scope.mode.yourProgramInfoState = true;
                $scope.programSelected.prog = session.programSelected;
                $scope.updateProgramSelect();
            }

            if(session.documentSelected) {
                $scope.programSelected.prog = session.programSelected;
                $scope.documentSelected.doc = session.documentSelected;
                var j = 0;
                while ($scope.yourImmigrationPrograms[j].program.programId != $scope.programSelected.prog.programId) {
                    j++;
                }
                $scope.index = j;
                var programsFulfillment = [];
                getProgramsFulfillment(programsFulfillment);
            }

            $scope.goToAllPrograms = function () {
                session.chooseNewProgramButtonState(true);
                $scope.mode.chooseNewProgramBtnState = session.chooseNewProgramBtnState;
                $scope.mode.yourProgramInfoState = false;
                session.programsMarker(true);
                $scope.mode.yourPrograms = session.yourProgramsMarker;
                $scope.programSelected.prog = null;
                $scope.mode.programMenuVisibility = false;
                $scope.mode.value = "clean";
            };


            // $scope.steps = function () {
            //     $scope.btnText.steps = "Steps:";
            //     $scope.btnText.formsAndGuides = "Forms and guides";
            //     $scope.btnText.requirements = "Requirements";
            //     $scope.programMenuUrl.url = "resources/immigrationPrograms/programMenuViews/programSteps.html";
            //     if($scope.mode.value = "clean") {
            //         $scope.mode.value = "dirty";
            //     }
            // };
            //
            // $scope.formsAndGuides = function () {
            //     $scope.btnText.formsAndGuides = "Forms and guides:";
            //     $scope.btnText.steps = "Steps";
            //     $scope.btnText.requirements = "Requirements";
            //     $scope.programMenuUrl.url = "resources/immigrationPrograms/programMenuViews/programFormsAndGuides.html";
            //     if($scope.mode.value = "clean") {
            //         $scope.mode.value = "dirty";
            //     }
            // }

        }]);
