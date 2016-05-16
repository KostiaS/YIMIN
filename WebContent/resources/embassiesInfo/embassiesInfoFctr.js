angular.module("getInfo")
    .factory("getEmbassyLocation", ["$http", function($http) {
        return function (embassyCountrySelected) {
            return $http.post("http://localhost:8080/yimin/api/list_of_countries_by_embassy", embassyCountrySelected)
                .then(function(response) {
                    return {
                        locations: response.data
                    }
                })
        }
    }])
    .factory("getEmbassyData", ["$http", function ($http) {
        return function (postData) {
            return $http.post("http://localhost:8080/yimin/api/embassies_in_country", postData)
                .then(function (response) {
                    return {
                        embassyData: response.data
                    }
                })

        }
    }]);