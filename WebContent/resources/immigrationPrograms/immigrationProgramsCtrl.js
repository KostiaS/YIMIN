angular.module("mainApp")
    .controller("immigrationProgramsCtrl", ["getAllCountries", "getCategories", "getPrograms", "$scope", "$location",
        function(getAllCountries, getCategories, getPrograms, $scope, $location) {
            
            $scope.programMenuVisibility = false;

            $scope.updateCountrySelect = function () {
                $scope.getCategories();
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
                })
            };
            
            $scope.getCategories = function () {
                getCategories($scope.countrySelected).then(function (response) {
                    $scope.categories = response.categories;
                })
            };

            $scope.getAllCountries();

            $scope.$on("countryForImmigration", function (event, args) {
                $scope.countryForImmigration = args.countryForImmigration;
            });

        }]);
