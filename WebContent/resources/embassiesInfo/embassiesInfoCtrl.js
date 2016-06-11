angular.module("mainApp")
    .controller("embassiesInfoCtrl", ["URLS", "getRequest", "getEmbassyLocation", "getEmbassyData", "session", "$scope", "$location",
        function(URLS, getRequest, getEmbassyLocation, getEmbassyData, session, $scope, $location) {

            $scope.immigrateToThisCountryBtnVisibility = false;
            $scope.embassiesInfoVisibility = false;

            $scope.updateEmbassyCountrySelect = function() {
                $scope.immigrateToThisCountryBtnAccessibility = true;
                $scope.getEmbassyLocation();
            };

            $scope.updateEmbassyLocationSelect = function() {
                if($scope.embassyLocationSelected != null) {
                    $scope.immigrateToThisCountryBtnVisibility = true;
                    $scope.immigrateToThisCountryBtnAccessibility = false;
                    $scope.embassiesInfoVisibility = true;
                    $scope.getEmbassyData();
                }
            };
            
            $scope.goToImmigrationProgramsView = function() {
                session.setIndex(null);
                session.setDocumentSelected(null);
                session.programsMarker(null);
                $scope.emitCountryForImmigration();
                // $scope.countryForImmigration.country = $scope.embassyCountrySelected;
                $location.path("/programs");
            };

            $scope.emitCountryForImmigration = function() {
                $scope.$emit("pickedCountryForImmigration", {
                    countryForImmigration: $scope.embassyCountrySelected});
            };
            
            $scope.getEmbassyCountry = function() {
                getRequest(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.COUNTRIES, "")
                    .then(function(response) {
                        // $scope.embassyCountries = $scope.embassyCountries.slice(0, 1);
                        // $scope.embassyCountries = arrayConcatSrvs.arrayConcated($scope.embassyCountries, response.countries);
                        $scope.embassyCountries = response.response;
                    })
            }();

            $scope.getEmbassyLocation = function () {
                getEmbassyLocation($scope.embassyCountrySelected).then(function (response) {
                    // $scope.embassyLocations = $scope.embassyLocations.slice(0, 1);
                    // $scope.embassyLocations = arrayConcatSrvs.arrayConcated($scope.embassyLocations, response.locations);
                    $scope.embassyLocations = response.locations;
                })
            };
            
            $scope.getEmbassyData = function () {
                getEmbassyData([$scope.embassyCountrySelected, $scope.embassyLocationSelected])
                    .then(function (response) {
                        $scope.embassyData = response.embassyData;
                })
            };

            $scope.accordion = {
                current: null
            };

            /*$scope.embassies = [
                {type: "type1", phone: "phone1", fax: "fax1", email: "email1", address: "address1"},
                {type: "type2", phone: "phone2", fax: "fax2", email: "email2", address: "address2"},
                {type: "type3", phone: "phone3", fax: "fax3", email: "email3", address: "address3"},
                {type: "type4", phone: "phone4", fax: "fax4", email: "email4", address: "address4"}
            ];*/
            
    }]);
