angular.module("mainApp", ["ngRoute", "commonHttpRequests", "commonServices", "ngSanitize"])
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
        "IMMIGRATION_PROGRAMS": "/immigration_programs",
        "STEPS": "/steps",
        "LIST_OF_DOC": "/list_of_documents",
        "GET_DOC": "/get_doc",
        "GET_MASK": "/get_mask",
        "PERSONAL_DATA": "/person_data",
        "SAVE_PERSON_DATA": "/save_person_data",
        "GET_CUSTOM_DATA": "/get_custom_data",
        "UPDATE_CUSTOM_DATA_VALUE": "/save_custom_data",
        "ADD_PROGRAM_IN_WAY": "/add_program_in_way",
        "GET_PROGRAMS_LIST_FROM_WAY": "/get_programs_list_from_way",
        "DELETE_PROGRAM_FROM_WAY": "/delete_program_from_way",
        "GET_VALUATION_OF_WAY_PROG": "/get_valuation_of_way_prog",
        "GET_DOCUMENT_FIELDS": "/get_document_fields",
        "ADD_PRS_DOC_IN_WAY": "/add_prs_doc_in_way",
        "GET_LIST_OF_REQUIRED_DOC": "/get_list_of_required_doc",
        "SET_IS_READY_IN_WAYDOC": "/set_is_ready_in_waydoc",
        "LIST_PCD_FIELDS_BY_DOC": "/list_pcd_fields_by_doc"
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
            .when("/yourway/personal-data", {templateUrl: "resources/yourWay/personalData/personalData.html"})
            .when("/yourway/immigration", {templateUrl: "resources/yourWay/yourImmigration/immigrationProgramsStart.html"})
            .when("/programs/choose-by-requirements", {templateUrl: "resources/immigrationPrograms/chooseByRequirements/chooseByRequirements.html"})
            .when("/yourway/immigration/programs", {templateUrl: "resources/immigrationPrograms/immigrationPrograms.html"})
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
    .directive('docDownload', function() {
        return {
            restrict: 'E',
            templateUrl: 'resources/immigrationPrograms/programMenuViews/downloadForm.tpl.html',
            scope: true,
            link: function (scope, element, attr) {
                var anchor = element.children()[0];
                scope.downloadForm = function () {
                    var data = scope[attr.formRef];
                    $(anchor).attr({
                        href: data,
                        download: attr.filename
                    });
                };
            }
        };
    })
    .directive('viewForm', ["eventListener", "$compile", function (eventListener, $compile) {
        return {
            restrict: 'E',
            // controller: function($scope, $attrs, $element, $compile, eventListener) {
            //     $scope.$on('handleBroadcast', function() {
            //         this.message = eventListener.message;
            //         console.log(this.message);
            //         $scope.linkFn = $compile($scope.message);
            //
            //     });
            // },
            link: function ($scope, element, controller) {
                $scope.$on('handleBroadcast', function () {
                    var message = eventListener.message;
                    var dom = angular.element(message);
                    var compileFn = $compile(dom);
                    compileFn($scope);
                    element.append(dom);
                    // var content = scope.linkFn(scope);
                    // element.append(scope.linkFn);
                    // console.log(controller.message);
                    // var linkFn = $compile(scope.message);
                    // var content = linkFn(scope);
                    // element.append(content);
                });
                // replace: true
            }
        }
    }])
    .controller("mainAppCtrl", ["session", "$scope", "$rootScope", "$location",
            function(session, $scope, $rootScope, $location) {

        $scope.goToYourWayView = function() {
            $location.path("/yourway");
        };

        $scope.goToImmigrationProgramsView = function() {
            session.programsMarker(null);
            session.chooseNewProgramButtonState(false);
            $scope.countryForImmigration = null;
            session.setIndex(null);
            session.setDocumentSelected(null);
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
