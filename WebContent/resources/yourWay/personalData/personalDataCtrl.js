angular.module("mainApp")
    .controller("personalDataCtrl", ["URLS", "getRequest", "postRequest", "session", "$scope",
        function (URLS, getRequest, postRequest, session, $scope) {

            $scope.showPersonCustomData = false;

            $scope.personDataDirty = {};
            $scope.sexDirty = {};
            $scope.birthdayDirty = {};

            $scope.personCustomDataDirty = [];

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
            
            $scope.viewAdditionalData = function () {
                postRequest(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.GET_CUSTOM_DATA, {personId: session.userId}).then(function (response) {
                    $scope.personCustomData = response.response;
                    fillInputDisabled();
                    fillCounters();
                    fillBtnText();
                    $scope.showPersonCustomData = true;
                })
            };
            
            function fillInputDisabled() {
                $scope.inputDisabled = [$scope.personCustomData.length];
                for (var i = 0; i < $scope.personCustomData.length; i++) {
                    $scope.inputDisabled[i] = true;
                }
            }

            function fillCounters() {
                $scope.counter = [$scope.personCustomData.length];
                for (var i = 0; i < $scope.personCustomData.length; i++) {
                    $scope.counter[i] = 0;
                }
            }

            function fillBtnText() {
                $scope.btnText = [$scope.personCustomData.length];
                for (var i = 0; i < $scope.personCustomData.length; i++) {
                    $scope.btnText[i] = "Change value";
                }
            }

            var flag = false;
            

            $scope.changeCustomData = function (index, item) {
                $scope.counter[index]++;
                if (flag == false) cloneAllPersonCustomData();
                function cloneAllPersonCustomData() {
                    angular.copy($scope.personCustomData, $scope.personCustomDataDirty);
                    flag = true;
                }
                var itemIndex = $scope.personCustomData.indexOf(item);
                if($scope.counter[index] % 2 != 0) {
                    angular.copy($scope.personCustomData[itemIndex], $scope.personCustomDataDirty[itemIndex]);
                    $scope.inputDisabled[index] = false;
                    $scope.btnText[index] = "Cancel";
                } else {
                    angular.copy($scope.personCustomDataDirty[itemIndex], $scope.personCustomData[itemIndex]);
                    $scope.inputDisabled[index] = true;
                    $scope.btnText[index] = "Change value";
                }
            };
            
            $scope.saveChangedCustomData = function (index, item, remove) {
                var itemIndex = $scope.personCustomData.indexOf(item);
                var customData = $scope.personCustomData[itemIndex];
                postRequest(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.UPDATE_CUSTOM_DATA_VALUE, {
                            value: customData.value,
                            fieldNames: {id: customData.fieldNames.id},
                            personCustomDataId: customData.personCustomDataId,
                            personData: {personDataId: customData.personData.personDataId}
                            }).then(function (response) {
                    if(remove != true) { 
                        $scope.counter[index]++;
                        $scope.inputDisabled[index] = true;
                        $scope.btnText[index] = "Change value";
                    }
                })
            };
            
            $scope.checkNotNull = function (item) {
                return item.value != null;
            };
            
            $scope.removeCustomData = function (item) {
                var index = $scope.personCustomData.indexOf(item);
                $scope.personCustomData[index].value = null;
                var remove = true;
                $scope.saveChangedCustomData(index, item, remove);
            }
    }]);