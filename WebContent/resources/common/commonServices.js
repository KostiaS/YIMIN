angular.module("commonServices", [])
    .factory("arrayConcatSrvs", [function () {
        return {
            arrayConcated: function (base, pushedArray) {
                for(var i = 0; i < pushedArray.length; i++) {
                    base.push(pushedArray[i]);
                }
                return base;
            }
        }
    }]);
