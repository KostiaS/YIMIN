angular.module("commonServices")
    .factory("authService", function ($http, session) {
        var authSrvs = {};
        suthSrvs.isAuthenticated = function () {
            return !!session.userId;
        }
    });
