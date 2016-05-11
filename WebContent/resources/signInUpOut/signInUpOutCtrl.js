angular.module("mainApp")
    .controller("signInUpOutCtrl", ["$scope", "$http", "$window", function($scope, $http, $window) {
        $scope.signInUpOutUrl = "resources/signInUpOut/signInUpView.html";
        $scope.signInUpOutUrlTrigger = function() {
            $scope.signInUpOutUrl = "resources/signInUpOut/signOutView.html"
        };

        $scope.signInUser = function(userDetails, isValid) {
            if(isValid) {
            	console.log(userDetails);
//            	$scope.jsonUserDetails = angular.toJson($scope.userDetails);
                $http.post('http://localhost:8080/yimin/api/authenticate', userDetails)
                    .then(
                        function(data, status, headers, config) {
                        console.log(data);
                        $window.sessionStorage.token = data.token;
                        $scope.message = 'Welcome';
                        },
                        function(data, status, headers, config) {
                            delete $window.sessionStorage.token;
                            $scope.message = 'Error: Invalid email or password';
                        }
                    )
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
                }
            }
        }
    }]);
