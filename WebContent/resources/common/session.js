angular.module("commonServices")
    .service("session", function () {
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
        
        this.addUpdateListOfPrograms = function (listOfPrograms) {
            this.listOfPrograms = listOfPrograms;
        };
        this.clearListOfPrograms = function () {
            this.listOfPrograms = null;
        }
    });
