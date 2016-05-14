angular.module("countriesInfo", [])
    .factory("getAllCountries", ["$http", function($http) {
        return function () {
            return $http.get("http://localhost:8080/yimin/api/countries")
                .then(function(response) {
                    return {
                        countries: response.data
                    }
                })
        }
    }]);