angular.module("mainApp")
    .controller("immigrationProgramsCtrl", ["postRequest", "URLS", "getAllCountries", /*"getCategories", "getPrograms", "getProgramSteps",*/
        "$scope", "$location",
        function(postRequest, URLS, getAllCountries, /*getCategories, getPrograms, getProgramSteps,*/ $scope, $location) {
            
            $scope.mode = {value: "clean"};
            $scope.programMenuVisibility = false;
            $scope.programMenuBtnsVisibility = false;
            
            $scope.programSteps = {steps: []};
            
            $scope.btnText ={steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides"};

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
                    // postRequest(urlSteps, $scope.programSelected).then(function (response) {
                    //     // $scope.programSteps = response.programSteps;
                    //     $scope.programSteps.steps = response.response;
                    // });
                    $scope.programSteps.steps = [
                        {"id":3,"step":{"id":3,"name":"Mail the application","description":"description3"},"stepOrder":3,"description":"description3","fileName":"description3"},
                        {"id":1,"step":{"id":1,"name":"name1","description":"description1"},"stepOrder":1,"description":"description1","fileName":"description1"},
                        {"id":2,"step":{"id":2,"name":"name2","description":"description2"},"stepOrder":2,"description":"description2","fileName":"description2"}
                    ];

                    postRequest(urlDocuments, $scope.programSelected).then(function (response) {
                        $scope.programDocuments = response.response;
                    })
                }
            };

            $scope.getAllCountries = function() {
                getAllCountries().then(function (response) {
                    // $scope.countries = $scope.countries.slice(0, 1);
                    // arrayConcatSrvs.arrayConcated($scope.countries, response.countries);
                    $scope.countries = response.countries;
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
                postRequest(url, [$scope.countrySelected, {category: $scope.categorySelected}])
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

            $scope.steps = function () {
                $scope.mode.value = "dirty";
                $scope.btnText.steps = "Steps:"
            }

        }]);
