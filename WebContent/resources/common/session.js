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

            this.addUpdateListOfPrograms(null);
            this.programsMarker(null);
            this.programsFulfillment(null);
            this.programInformationState(false);
            this.chooseNewProgramButtonState(false);
            this.setIndex(null);
            this.setProgramSelected(null);
            this.setDocumentSelected(null);
        };
        
        this.addUpdateListOfPrograms = function (listOfPrograms) {
            this.listOfPrograms = listOfPrograms;
        };
        
        this.programsMarker = function (value) {
            this.yourProgramsMarker = value;
        };

        this.programsFulfillment = function (fulfillment) {
            this.fulfillment = fulfillment;
        };

        this.programInformationState = function (yourProgramInfoState) {
            this.yourProgramInfoState = yourProgramInfoState;
        };
        
        this.chooseNewProgramButtonState = function (chooseNewProgramBtnState) {
            this.chooseNewProgramBtnState = chooseNewProgramBtnState;
        };
        
        this.setIndex = function (index) {
            this.index = index;
        };
        
        this.setProgramSelected = function (programSelected) {
            this.programSelected = programSelected;
        };
        
        this.setDocumentSelected = function (documentSelected) {
            this.documentSelected = documentSelected;
        };
        
    });
