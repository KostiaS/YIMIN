angular.module("commonServices")
    .factory("sessionDataService", function ($http, session) {
        var sessionDataSrvs = {};
        sessionDataSrvs.isCreated = function () {
            return !!session.listOfPrograms;
        };
        return sessionDataSrvs;
    });
