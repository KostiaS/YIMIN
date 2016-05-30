angular.module("mainApp")
    .controller("personalDataCtrl", ["URLS", "getRequest", "session", "$scope",
        function (URLS, getRequest, session, $scope) {
            $scope.getPersonData = function () {
                getRequest(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.PERSONAL_DATA, session.userId).then(function (response) {
                    $scope.personData = response.response;
                    $scope.getSex = function () {
                        $scope.personData.gender == "m" ? $scope.sex = {value: "male"} : $scope.sex = {value: "female"}
                    }();
                    $scope.getBirthdate = function () {
                        var dateArray = $scope.personData.birthdate.split('-');
                        $scope.birthday = {year: dateArray[0], month: dateArray[1], day: dateArray[2]};
                    }();
                })
            }();
            
            $scope.mode = {value: "getData"};
            
            $scope.setPersonData = function () {
                $scope.mode.value = "setData";
            }
    }]);