angular.module("commonServices")
    .factory("authService", function ($http, session) {
        var authSrvs = {};
        authSrvs.isAuthenticated = function () {
            return !!session.userId;
        };
        return authSrvs;
    });
