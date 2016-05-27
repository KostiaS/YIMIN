angular.module("mainApp")
    .controller("personalDataCtrl", ["URLS", "getRequest", "session", "$scope",
        function (URLS, getRequest, session, $scope) {
            $scope.getPersonData = function () {
                getRequest(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.PERSONAL_DATA, session.userId).then(function (response) {
                    $scope.personData = response.response;
                    $scope.sex = function () {
                        $scope.personData.gender == m ? $scope.sex = "male" : $scope.sex = "female"
                    }
                })
            };
            $scope.getPersonData();
    }]);