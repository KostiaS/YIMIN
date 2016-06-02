angular.module("mainApp")
    .controller("immigrationProgramsCtrl", ["URLS", "getRequest", "postRequest", /*"getCategories", "getPrograms", "getProgramSteps",*/
        "$scope", "$rootScope", "$location",
        function(URLS, getRequest, postRequest, /*getCategories, getPrograms, getProgramSteps,*/ $scope, $rootScope, $location) {
            
            $scope.mode = {value: "clean"};
            $scope.programMenuVisibility = false;
            $scope.programMenuBtnsVisibility = false;
            
            $scope.programSteps = {steps: []};
            $scope.programDocuments = {docs: []};
            $scope.documentSelected = {doc: {}};
            
            $scope.btnText = {
                clean: {steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides"},
                dirty: {
                    steps: {steps: "Steps:", requirements: "Requirements", formsAndGuides: "Forms and guides"},
                    requirements: {steps: "Steps", requirements: "Requirements:", formsAndGuides: "Forms and guides"},
                    formsAndGuides: {steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides:"}
                },
                show: {steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides"}
            };

            $scope.updateCountrySelect = function () {
                $scope.getCategories();
                if($scope.categorySelected != null) {
                    $scope.programMenuVisibility = false;
                    $scope.mode.value = "clean";
                }
            };
            
            $scope.updateCategorySelect = function () {
                $scope.getPrograms();
            };

            $scope.updateProgramSelect = function() {
                if($scope.programSelected != null) {
                    $scope.programMenuVisibility = true;
                }
                var urlSteps = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.STEPS;
                var urlDocuments = URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.LIST_OF_DOC;
                if($scope.programSelected != null) {
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
                            + URLS.IMIGRATION_PROGRAMS;
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
