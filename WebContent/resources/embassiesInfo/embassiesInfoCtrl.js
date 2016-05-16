angular.module("mainApp")
    .controller("embassiesInfoCtrl", ["getAllCountries", "getEmbassyLocation", "getEmbassyData", "$scope", "$location",
        function(getAllCountries, getEmbassyLocation, getEmbassyData, $scope, $location) {

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
                    arrayConcat($scope.embassyCountries, response.countries);
                })
            };

            $scope.getEmbassyLocation = function () {
                getEmbassyLocation($scope.embassyCountrySelected).then(function (response) {
                    $scope.embassyLocations = $scope.embassyLocations.slice(0, 1);
                    arrayConcat($scope.embassyLocations, response.locations)
                })
            };
            
            $scope.getEmbassyData = function () {
                getEmbassyData([$scope.embassyCountrySelected, $scope.embassyLocationSelected])
                    .then(function (response) {
                        $scope.embassyData = response.embassyData;
                })
            };

            function arrayConcat(base, pushedArray) {
                for(var i = 0; i < pushedArray.length; i++) {
                    base.push(pushedArray[i]);
                }
            }

            $scope.getEmbassyCountry();

            $scope.accordion = {
                current: null
            };

            // $scope.embassies = [{type: "type1", phone: "phone1"}, {type: "type2", phone: "phone2"}, {type: "type3", phone: "phone3"}];
            
    }]);
