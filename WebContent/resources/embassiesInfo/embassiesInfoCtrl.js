angular.module("mainApp")
    .controller("embassiesInfoCtrl", ["getAllCountries", "getEmbassyLocation", "getEmbassyData", "arrayConcatSrvs", "$scope", "$location",
        function(getAllCountries, getEmbassyLocation, getEmbassyData, arrayConcatSrvs, $scope, $location) {

            $scope.immigrateToThisCountryBtnVisibility = false;
            $scope.embassiesInfoVisibility = false;

            $scope.updateEmbassyCountrySelect = function() {
                $scope.getEmbassyLocation();
            };

            $scope.updateEmbassyLocationSelect = function() {
                $scope.immigrateToThisCountryBtnVisibility = true;
                $scope.embassiesInfoVisibility = true;
                $scope.getEmbassyData();
            };
            
            $scope.goToImmigrationProgramsView = function() {
                $scope.emitCountryForImmigration();
                $location.path("/programs");
            };

            $scope.emitCountryForImmigration = function() {
                $scope.$emit("pickedCountryForImmigration", {
                    countryForImmigration: $scope.embassyCountrySelected});
            };

            $scope.embassyCountries = [
                {countryId: -1, name: "Select embassy", link: ""}
            ];

            $scope.embassyLocations = [
                {countryId: -1, name: "Select country", link: ""}
            ];

            $scope.embassyCountrySelected = $scope.embassyCountries[0];
            $scope.embassyLocationSelected = $scope.embassyLocations[0];
            
            $scope.getEmbassyCountry = function() {
                getAllCountries().then(function(response) {
                    $scope.embassyCountries = $scope.embassyCountries.slice(0, 1);
                    $scope.embassyCountries = arrayConcatSrvs.arrayConcated($scope.embassyCountries, response.countries);
                })
            };

            $scope.getEmbassyLocation = function () {
                getEmbassyLocation($scope.embassyCountrySelected).then(function (response) {
                    $scope.embassyLocations = $scope.embassyLocations.slice(0, 1);
                    $scope.embassyLocations = arrayConcatSrvs.arrayConcated($scope.embassyLocations, response.locations);
                })
            };
            
            $scope.getEmbassyData = function () {
                getEmbassyData([$scope.embassyCountrySelected, $scope.embassyLocationSelected])
                    .then(function (response) {
                        $scope.embassyData = response.embassyData;
                })
            };

            $scope.getEmbassyCountry();

            $scope.accordion = {
                current: null
            };

/*            $scope.embassies = [
                {type: "type1", phone: "phone1", fax: "fax1", email: "email1", address: "address1"},
                {type: "type2", phone: "phone2", fax: "fax2", email: "email2", address: "address2"},
                {type: "type3", phone: "phone3", fax: "fax3", email: "email3", address: "address3"},
                {type: "type4", phone: "phone4", fax: "fax4", email: "email4", address: "address4"}
            ];*/
            
    }]);
