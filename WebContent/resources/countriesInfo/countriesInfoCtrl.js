angular.module("mainApp")
    .controller("countriesInfoCtrl", ["URLS", "getRequest", "arrayConcatSrvs", "$scope", "$rootScope", "$location",
        function(URLS, getRequest, arrayConcatSrvs, $scope, $rootScope, $location) {

            $scope.immigrateToThisCountryBtnVisibility = false;
            $scope.wikiIframe = false;

            $scope.updateSelect = function() {
                $scope.immigrateToThisCountryBtnVisibility = true;
                $scope.wikiIframe = true;
            };
            
            $scope.getAllCountries = function() {
                getRequest(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.COUNTRIES, "")
                    .then(function(response) {
                        // arrayConcatSrvs.arrayConcated($scope.countries, response.countries);
                        $scope.countries = response.response;
                    })
            };

            $scope.goToImmigrationProgramsView = function() {
                // $scope.countryForImmigration.country = $scope.selected;
                // console.log($scope.countryForImmigration.country);
                $scope.emitCountryForImmigration();
                $location.path("/programs");
            };

            $scope.emitCountryForImmigration = function() {
                $scope.$emit("pickedCountryForImmigration", {
                    countryForImmigration: $scope.selected});
            };
            
            $scope.getAllCountries();
            
    }]);
