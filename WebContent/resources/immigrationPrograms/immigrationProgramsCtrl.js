angular.module("mainApp")
    .controller("immigrationProgramsCtrl", ["arrayConcatSrvs", "getAllCountries", "$scope", "$location",
        function(arrayConcatSrvs, getAllCountries, $scope, $location) {
            
            $scope.programMenuVisibility = false;

            $scope.updateProgramSelect = function() {
                $scope.programMenuVisibility = true;
            };

            $scope.getAllCountries = function() {
                getAllCountries().then(function(response) {
                    // $scope.countries = $scope.countries.slice(0, 1);
                    // arrayConcatSrvs.arrayConcated($scope.countries, response.countries);
                    $scope.countries = response.countries;
                    $scope.countrySelected = $scope.countryForImmigration;
                })
            };

            $scope.getAllCountries();

            $scope.$on("countryForImmigration", function (event, args) {
                $scope.countryForImmigration = args.countryForImmigration;
            });

        }]);
