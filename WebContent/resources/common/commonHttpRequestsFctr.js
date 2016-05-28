angular.module("commonHttpRequests", [])
    .factory("authorizationSrvs", ["URLS", "$http", function (URLS, $http) {
        return function (userDetails) {
            return $http.post(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.SIGN_IN, userDetails)
                .then(function (response) {
                    return {
                        authorization: response.data
                    }
                })
        }
    }])
    // .factory("getAllCountries", ["URLS", "$http", function(URLS, $http) {
    //     return function () {
    //         return $http.get(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.COUNTRIES)
    //             .then(function(response) {
    //                 return {
    //                     countries: response.data
    //                 }
    //             })
    //     }
    // }])
    .factory("getRequest", ["URLS", "$http", function(URLS, $http) {
        return function (url, suffix) {
            return $http.get(url + "/" + suffix)
                .then(function(response) {
                    return {
                        response: response.data
                    }
                })
        }
    }])
    .factory("postRequest", ["URLS", "$http", function (URLS, $http) {
        return function (url, postArg) {
            return $http.post(url, postArg)
                .then(function (response) {
                    return {
                        response: response.data
                    }
                })
        }
    }]);

