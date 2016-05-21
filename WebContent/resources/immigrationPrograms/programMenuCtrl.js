angular.module("mainApp")
    .controller("programMenuCtrl", ["$scope", function ($scope) {

        $scope.programMenuUrl = "resources/immigrationPrograms/programMenuViews/programSteps.html";
        
        $scope.programStepDescription = function (description) {
            $scope.programStepDescriptionVisibility = true;
            $scope.stepDescriptionTmp = description;
        };
        
    }]);
