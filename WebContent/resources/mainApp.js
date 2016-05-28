angular.module("mainApp", ["ngRoute", "commonHttpRequests", "commonServices"])
    .constant("URLS", {
        "URL": "http://localhost",
        "PORT": "8080",
        "ROOT_CONTEXT": "/yimin",
        "REQUEST_MAPPING": "/api",
        
        "SIGN_IN": "/sign_in",
        "SIGN_UP": "/sign_up",
        "COUNTRIES": "/countries",
        "LIST_OF_COUNTRIES_BY_EMBASSY": "/list_of_countries_by_embassy",
        "EMBASSIES_IN_COUNTRY": "/embassies_in_country",
        "CATEGORIES_OF_PROGRAM_BY_COUNTRY": "/category_of_program_by_country",
        "IMIGRATION_PROGRAMS": "/imigration_programs",
        "STEPS": "/steps",
        "LIST_OF_DOC": "/list_of_documents",
        "GET_DOC": "/get_doc",
        "PERSONAL_DATA": "/person_data",
        "SAVE_PERSON_DATA": "/save_person_data"
    })
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/yourway", {templateUrl: "resources/yourWay/yourWay.html"})
            .when("/programs", {templateUrl: "resources/immigrationPrograms/immigrationPrograms.html"})
            .when("/embassies", {templateUrl: "resources/embassiesInfo/embassiesInfo.html"})
            .when("/countries", {templateUrl: "resources/countriesInfo/countriesInfo.html"})
            .when("/registration", {templateUrl: "resources/registration/registration.html"})
            .when("/programs/countries-and-categories", {templateUrl: "resources/registration/registration.html"})
            .when("/programs/requirements", {templateUrl: "resources/registration/registration.html"})
            .when("/yourway/personal-data", {templateUrl: "resources/yourWay/personalData/personalData.html"});
    })
    .directive('pwCheck', [function () {
        return {
            scope: true,
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
                    });
                });
            }
        }
    }])
    .controller("mainAppCtrl", ["$scope", "$rootScope", "$location", function($scope, $rootScope, $location) {

        $scope.goToYourWayView = function() {
            $location.path("/yourway");
        };

        $scope.goToImmigrationProgramsView = function() {
            $scope.countryForImmigration = null;
            $location.path("/programs");
        };

        $scope.goToEmbassiesInfoView = function() {
            $location.path("/embassies");
        };

        $scope.goToCoutriesInfoView = function() {
            $location.path("/countries");
        };

        // $scope.$on("authorization", function(event, args) {
        //     $scope.authorization.status = args.authorization;
        //     $scope.broadcastAuthorization();
        // });
        //
        // $scope.broadcastAuthorization = function() {
        //     $rootScope.$broadcast("authorizationBroadcasted", {
        //         authorization: $scope.authorization.status
        //     });
        // };

        $scope.$on("pickedCountryForImmigration", function (event, args) {
            $scope.countryForImmigration = args.countryForImmigration;
            $scope.$broadcastCountryForImmigration();
        });

        $scope.$broadcastCountryForImmigration = function () {
            $rootScope.$broadcast("countryForImmigration", {
                countryForImmigration: $scope.countryForImmigration
            });
        };
        
        $scope.authorization = {status: false};
        // $scope.authorization.status ? $scope.authorization.status = true : $scope.authorization.status = false;
        
        // $scope.countryForImmigration = {country: {}};

    }]);
