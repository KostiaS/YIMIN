angular.module("mainApp")
    .controller("signInUpOutCtrl", ["authorizationSrvs", "$scope", "$rootScope", "$http", "$window", "$location",
            function(authorizationSrvs, $scope, $rootScope, $http, $window, $location) {
                
                $scope.signInUpOutUrlTrigger = function() {
                    $scope.authorization.status
                        ? $scope.signInUpOutUrl = "resources/signInUpOut/signOutView.html"
                        : $scope.signInUpOutUrl = "resources/signInUpOut/signInUpView.html";
                };
                
                $scope.$watch("authorization.status", function () {
                    $scope.signInUpOutUrlTrigger();
                });
                

                //$scope.sendAuthorization = function() {
                //
                //    $rootScope.$broadcast("authorization", {
                //        authorization: $scope.authorization
                //    });
                //    //console.log($scope.authorization);
                //};

                // $scope.emitAuthorization = function() {
                //     $scope.$emit("authorization", {
                //         authorization: $scope.authorization.status
                //     });
                // };

                $scope.signInUser = function(userDetails, isValid) {
                    if(isValid) {

                        //--Start---Authorization plug!---
                        authorizationSrvs(userDetails).then(function (response) {
                            $scope.authorization.status = response.authorization;
                            // $scope.emitAuthorization();
                            // $scope.signInUpOutUrlTrigger();
                        });
                        //--End---Authorization plug!---

                        //$scope.jsonUserDetails = angular.toJson(userDetails);
                        //console.log($scope.jsonUserDetails);
                        //console.log(userDetails);

                        //--Start---Working code for authorization!---
                        //$http.post("http://localhost:8080/yimin/api/authenticate", userDetails)
                        //    .then(
                        //        function(data, status, headers, config) {
                        //        $window.sessionStorage.token = data.token;
                        //        $scope.message = 'Welcome';
                        //        },
                        //        function(data, status, headers, config) {
                        //            delete $window.sessionStorage.token;
                        //            $scope.message = 'Error: Invalid email or password';
                        //        }
                        //    )
                        //---End---Working code for authorization!---
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
                };

                $scope.signOut = function () {
                    $scope.authorization.status = false;
                };

                $scope.signUp = function () {
                    $location.path("/registration");
                }
                
            }]);
