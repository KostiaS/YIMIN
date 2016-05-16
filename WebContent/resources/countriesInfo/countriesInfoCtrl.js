angular.module("mainApp")
    .controller("countriesInfoCtrl", ["getAllCountries", "$scope", "$rootScope", "$location",
        function(getAllCountries, $scope, $rootScope, $location) {

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
                    concatCountries(response.countries);
                })
            };

            function concatCountries(countries) {
                for(var i = 0; i < countries.length; i++) {
                    $scope.countries.push(countries[i]);
                }
            }

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
