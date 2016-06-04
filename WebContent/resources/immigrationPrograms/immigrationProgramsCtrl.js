angular.module("mainApp")
    .controller("immigrationProgramsCtrl", ["URLS", "getRequest", "postRequest", "authService", "session", /*"getCategories", "getPrograms", "getProgramSteps",*/
        "$scope", "$rootScope", "$location",
        function(URLS, getRequest, postRequest, authService, session,/*getCategories, getPrograms, getProgramSteps,*/ $scope, $rootScope, $location) {
            
            $scope.mode = {value: "clean", btnAddProgram: false, textProgramInWay: false};
            $scope.programMenuVisibility = false;
            $scope.programMenuBtnsVisibility = false;
            
            $scope.programSteps = {steps: []};
            $scope.programDocuments = {docs: []};
            $scope.documentSelected = {doc: {}};
            $scope.programSelected = null;
            
            $scope.btnText = {
                clean: {steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides"},
                dirty: {
                    steps: {steps: "Steps:", requirements: "Requirements", formsAndGuides: "Forms and guides"},
                    requirements: {steps: "Steps", requirements: "Requirements:", formsAndGuides: "Forms and guides"},
                    formsAndGuides: {steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides:"}
                },
                show: {steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides"}
            };
            
            
            $scope.viewTrigger = function () {
                if(authService.isAuthenticated()) {
                    $scope.btnDescripText = {
                        text: "To get a program suitable to you click",
                        btn: "Filter by requirements"
                    };
                } else {
                    $scope.btnDescripText = {
                        text: "Click Your Way to get a program suitable to you",
                        btn: "Your Way"
                    };
                }
            };

            $scope.addProgramToYourWayButtonTrigger = function () {
                if(!!session.listOfPrograms && $scope.programSelected != null) {
                    var flag = false;
                    for(var i = 0; i < session.listOfPrograms.length; i++) {
                        if(session.listOfPrograms[i].program.programId == $scope.programSelected.programId) {
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
                    // flag ? $scope.mode.btnAddProgram = false : $scope.mode.btnAddProgram = true;
                } else {
                    $scope.mode.btnAddProgram = false;
                    $scope.mode.textProgramInWay = false;
                }
            };
            
            $scope.$watch(function () {
                return authService.isAuthenticated();
            }, function () {
                $scope.viewTrigger();
            });

            $scope.$watch(function () {
                return !!session.listOfPrograms;
            }, function () {
                $scope.addProgramToYourWayButtonTrigger();
            });

            $scope.clickHandler = function () {
                authService.isAuthenticated() ? $location.path("/programs/choose-by-requirements") : $scope.goToYourWayView();
            };

            $scope.updateCountrySelect = function () {
                $scope.getCategories();
                $scope.programSelected = null;
                if($scope.categorySelected != null) {
                    $scope.programMenuVisibility = false;
                    $scope.mode.value = "clean";
                }
            };
            
            $scope.updateCategorySelect = function () {
                $scope.getPrograms();
            };

            $scope.updateProgramSelect = function() {
                var urlSteps = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.STEPS;
                var urlDocuments = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.LIST_OF_DOC;
                if($scope.programSelected != null) {
                    $scope.addProgramToYourWayButtonTrigger();
                    $scope.programMenuVisibility = true;
                    postRequest(urlSteps, $scope.programSelected).then(function (response) {
                        // $scope.programSteps = response.programSteps;
                        $scope.programSteps.steps = response.response;
                    });
                    postRequest(urlDocuments, $scope.programSelected).then(function (response) {
                       $scope.programDocuments.docs = response.response;
                        // $scope.broadcastProgramDocuments();
                        // $scope.broadcastProgramDocuments();
                    });

                    // postRequest(urlRequirements, $scope.programSelected).then(function (response) {
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
                postRequest(url, $scope.countrySelected).then(function (response) {
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
                postRequest(url, {"param":[{"personId":session.userId}, {"programId": $scope.programSelected.programId}]})
                    .then(function (response) {})
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
