angular.module("mainApp")
    .controller("countriesInfoCtrl", ["getAllCountries", "arrayConcatSrvs", "$scope", "$rootScope", "$location",
        function(getAllCountries, arrayConcatSrvs, $scope, $rootScope, $location) {
            
            $scope.immigrateToThisCountryBtnVisibility = false;
            $scope.wikiIframe = false;

            $scope.updateSelect = function() {
                $scope.immigrateToThisCountryBtnVisibility = true;
                $scope.wikiIframe = true;
            };

            $scope.countries = [
                {countryId: -1, name: "Select country", link: ""}
            ];

            $scope.selected = $scope.countries[0];
            
            $scope.getAllCountries = function() {
                getAllCountries().then(function(response) {
                    arrayConcatSrvs.arrayConcated($scope.countries, response.countries);
                })
            };

            $scope.goToImmigrationProgramsView = function() {
                $scope.emitCountryForImmigration();
                $location.path("/programs");
            };

            $scope.emitCountryForImmigration = function() {
                $scope.$emit("pickedCountryForImmigration", {
                    countryForImmigration: $scope.selected});
            };
            
            $scope.getAllCountries();
            
    }]);
