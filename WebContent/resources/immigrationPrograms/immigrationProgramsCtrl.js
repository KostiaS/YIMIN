angular.module("mainApp")
    .controller("immigrationProgramsCtrl", ["arrayConcatSrvs", "getAllCountries", "$scope", "$location",
        function(arrayConcatSrvs, getAllCountries, $scope, $location) {

            $scope.programMenuVisibility = false;

            $scope.updateProgramSelect = function() {
                $scope.programMenuVisibility = true;
            };

            $scope.countries = [
                {countryId: -1, name: "Select country  for immigration", link: ""}
            ];

            $scope.selected = $scope.countries[0];

            $scope.getAllCountries = function() {
                getAllCountries().then(function(response) {
                    $scope.countries = $scope.countries.slice(0, 1);
                    arrayConcatSrvs.arrayConcated($scope.countries, response.countries);
                })
            };

            $scope.getAllCountries();

        }]);
