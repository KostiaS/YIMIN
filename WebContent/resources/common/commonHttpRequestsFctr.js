angular.module("commonHttpRequests", [])
    .factory("getAllCountries", ["URLS", "$http", function(URLS, $http) {
        return function () {
            return $http.get(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING + URLS.COUNTRIES)
                .then(function(response) {
                    return {
                        countries: response.data
                    }
                })
        }
    }]);