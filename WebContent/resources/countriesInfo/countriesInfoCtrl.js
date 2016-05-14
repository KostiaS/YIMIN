angular.module("mainApp")
    .controller("countriesInfoCtrl", ["getAllCountries", "$scope", "$location",
        function(getAllCountries, $scope, $location) {

            $scope.immigtateToThisCountryBtnVisibility = false;
            $scope.wikiIframe = false;

            $scope.updateSelect = function() {
                $scope.immigtateToThisCountryBtnVisibility = true;
                $scope.wikiIframe = true;
            };

            $scope.goToImmigrationProgramsView = function() {
                $location.path("/programs");
            };

            $scope.countries = [
                {id: -1, name: "Select country", link: ""}
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

            $scope.getAllCountries();
            
    }]);
