angular.module("mainApp")
    .controller("immigrationProgramsCtrl", ["getAllCountries", "getCategories", "getPrograms", "$scope", "$location",
        function(getAllCountries, getCategories, getPrograms, $scope, $location) {

            $scope.mode = {value: "clean"};
            $scope.programMenuVisibility = false;
            $scope.programMenuBtnsVisibility = false;
            
            $scope.btnText ={steps: "Steps", requirements: "Requirements", formsAndGuides: "Forms and guides"};

            $scope.updateCountrySelect = function () {
                $scope.getCategories();
            };
            
            $scope.updateCategorySelect = function () {
                $scope.getPrograms();
            };

            $scope.updateProgramSelect = function() {
                $scope.programMenuVisibility = true;
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
                getCategories($scope.countrySelected).then(function (response) {
                    $scope.categories = response.categories;
                })
            };

            $scope.getPrograms = function () {
                getPrograms([$scope.countrySelected, {category: $scope.categorySelected}]).then(function (response) {
                    $scope.programs = response.programs;
                })
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
