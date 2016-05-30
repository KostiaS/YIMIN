angular.module("mainApp")
    .controller("registrationCtrl", ["getRequest", "$scope", function (getRequest, $scope) {

        $scope.userPassword = "";
        
        $scope.getAllCountries = function () {
            getRequest().then(function (response) {
                $scope.countries = response.countries;
            })
        };
        
        $scope.getAllCountries();
        
        $scope.registerUser = function(userDetails, isValid) {
            if(isValid) {
                console.log(userDetails);
            }
            else {
                $scope.showError = true;
            }

            $scope.getError = function(error) {
                if(angular.isDefined(error)) {
                    if(error.required) {
                        return "Field can't be empty"
                    }
                    if(error.email) {
                        return "Type email correctly"
                    }
                    if(error.pwmatch) {
                        return "Password mismatches"
                    }
                }
            }
        };
    }]);
