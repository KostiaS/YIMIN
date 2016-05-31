angular.module("mainApp")
    .controller("personalDataCtrl", ["URLS", "getRequest", "postRequest", "session", "$scope",
        function (URLS, getRequest, postRequest, session, $scope) {

            $scope.personDataDirty = {};
            $scope.sexDirty = {};
            $scope.birthdayDirty = {};

            $scope.getPersonData = function () {
                getRequest(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.PERSONAL_DATA, session.userId).then(function (response) {
                    $scope.personData = response.response;
                    sexToString();
                    splitBirthday();
                })
            }();
            
            $scope.mode = {value: "getData"};
            
            $scope.setPersonData = function () {
                angular.copy($scope.personData, $scope.personDataDirty);
                angular.copy($scope.sex, $scope.sexDirty);
                angular.copy($scope.birthday, $scope.birthdayDirty);
                $scope.mode.value = "setData";
            };

            $scope.savePersonData = function () {
                sexToChar("dirty");
                concatBirthday("dirty");
                angular.copy($scope.personDataDirty, $scope.personData);
                postRequest(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.SAVE_PERSON_DATA, $scope.personData).then(function (response) {
                    sexToString();
                    splitBirthday();
                    $scope.mode.value = "getData";
                })
            };
            
            $scope.cancel = function () {
                $scope.mode.value = "getData";
            };
            
            function sexToString() {
                $scope.personData.gender == "m" ? $scope.sex = {value: "male"} : $scope.sex = {value: "female"}
            }

            function sexToChar(status) {
                status == "dirty"
                    ? $scope.sexDirty.value == "male" ? $scope.personDataDirty.gender = "m" : $scope.personDataDirty.gender = "f"
                    : $scope.sex.value == "male" ? $scope.personData.gender = "m" : $scope.personData.gender = "f";
            }

            function splitBirthday() {
                $scope.dateArray = $scope.personData.birthdate.split('-');
                $scope.birthday = {year: $scope.dateArray[0], month: $scope.dateArray[1], day: $scope.dateArray[2]};
            }

            function concatBirthday(status) {
                status == "dirty"
                    ? $scope.personDataDirty.birthdate
                        = $scope.birthdayDirty.year + "-" + $scope.birthdayDirty.month + "-" + $scope.birthdayDirty.day
                    : $scope.personData.birthdate = $scope.dateArray[0] + "-" + $scope.dateArray[1] + "-" + $scope.dateArray[2];
            }
    }]);