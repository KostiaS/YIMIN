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
    }])
    .factory("eventListener", function ($rootScope) {
        var eventListener = {};

        eventListener.message = null;

        eventListener.prepForBroadcast = function(msg) {
            this.message = msg;
            this.broadcastItem();
        };

        eventListener.broadcastItem = function () {
            $rootScope.$broadcast("handleBroadcast");
        };
        return eventListener;
    });
