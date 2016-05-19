angular.module("commonHttpRequests")
    .factory("getEmbassyLocation", ["URLS", "$http", function(URLS, $http) {
        return function (embassyCountrySelected) {
            return $http.post(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.LIST_OF_COUNTRIES_BY_EMBASSY, embassyCountrySelected)
                .then(function (response) {
                    return {
                        locations: response.data
                    }
                })
        }
    }])
    .factory("getEmbassyData", ["URLS", "$http", function (URLS, $http) {
        return function (postData) {
            return $http.post(URLS.URL + ":" + URLS.PORT + URLS.ROOT_CONTEXT + URLS.REQUEST_MAPPING
                        + URLS.EMBASSIES_IN_COUNTRY, postData)
                .then(function (response) {
                    return {
                        embassyData: response.data
                    }
                })

        }
    }]);