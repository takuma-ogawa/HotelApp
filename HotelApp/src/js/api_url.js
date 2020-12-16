export default {
    ApiUrl: function () {

        this.routeUrl = "http://tenkosystem.azurewebsites.net";
        this.controller = {
            Members: "Members",
            Destinations: "Destinations",
            Vehicles: "Vehicles",
            Diseases: "Diseases",
            Roles: "Roles",
            RollCallMethods: "RollCallMethods",
            AlertSettings: "AlertSettings",


            Instructions: "Instructions",
            MasterMembers: "MasterMembers",
            MasterDestinations: "MasterDestinations",
            MasterVehicles: "MasterVehicles",
            MasterDiseases: "MasterDiseases",
            MasterInstructions: "MasterInstructions",
            MasterAlertSettings: "MasterAlertSettings",

            RollCallLogsInputs: "RollCallLogsInputs",
            RollCallStatus: "RollCallStatus",
            RollCallLogFormOutputs: "RollCallLogFormOutputs",




        };

        this.Login = function (postArray) { return this.createGetUrl("Members", "Login", postArray); };


        this.GetMembers = function (postArray) { return this.createGetUrl("Members", "GetMembers", postArray); };
        this.GetMembersMaster = function (postArray) { return this.createGetUrl("MasterMembers", "Get", postArray); };
        this.IsMemberCodeOverLap = function (postArray) { return this.createGetUrl("Members", "IsCodeOverLap", postArray); };
        this.MemberSearch = function (postArray) { return this.createGetUrl("MasterMembers", "Search", postArray); };
        this.MembersMasterSave = function () { return this.createUrl("MasterMembers", "Save"); };

  
        this.GetDestinations = function (postArray) { return this.createGetUrl("Destinations", "GetDestinations", postArray); };
        this.GetDestinationsMaster = function (postArray) { return this.createGetUrl("MasterDestinations", "Get", postArray); };
        this.IsDestinationCodeOverLap = function (postArray) { return this.createGetUrl("Destinations", "IsCodeOverLap", postArray); };
        this.DestinationSearch = function (postArray) { return this.createGetUrl("MasterDestinations", "Search", postArray); };
        this.DestinationsMasterSave = function () { return this.createUrl("MasterDestinations", "Save"); };

        this.GetVehicles = function (postArray) { return this.createGetUrl("Vehicles", "GetVehicles", postArray); };
        this.GetVehiclesMaster = function (postArray) { return this.createGetUrl("MasterVehicles", "Get", postArray); };
        this.IsVehicleCodeOverLap = function (postArray) { return this.createGetUrl("Vehicles", "IsCodeOverLap", postArray); };
        this.VehicleSearch = function (postArray) { return this.createGetUrl("MasterVehicles", "Search", postArray); };
        this.VehiclesMasterSave = function () { return this.createUrl("MasterVehicles", "Save"); };

        this.GetDiseases = function (postArray) { return this.createGetUrl("Diseases", "GetDiseases", postArray); };
        this.GetDiseasesMaster = function (postArray) { return this.createGetUrl("MasterDiseases", "Get", postArray); };
        this.IsDiseaseCodeOverLap = function (postArray) { return this.createGetUrl("Diseases", "IsCodeOverLap", postArray); };
        this.DiseaseSearch = function (postArray) { return this.createGetUrl("MasterDiseases", "Search", postArray); };
        this.DiseasesMasterSave = function () { return this.createUrl("MasterDiseases", "Save"); };

        this.GetInstructions = function (postArray) { return this.createGetUrl("Instructions", "GetInstructions", postArray); };
        this.GetInstructionsMaster = function (postArray) { return this.createGetUrl("MasterInstructions", "Get", postArray); };
        this.IsInstructionCodeOverLap = function (postArray) { return this.createGetUrl("Instructions", "IsCodeOverLap", postArray); };
        this.InstructionSearch = function (postArray) { return this.createGetUrl("MasterInstructions", "Search", postArray); };
        this.InstructionsMasterSave = function () { return this.createUrl("MasterInstructions", "Save"); };


        this.GetAlertSettings = function (postArray) { return this.createGetUrl("AlertSettings", "GetAlertSettings", postArray); };
        this.GetAlertSettingsMaster = function (postArray) { return this.createGetUrl("MasterAlertSettings", "Get", postArray); };
        this.AlertSettingsMasterSave = function () { return this.createUrl("MasterAlertSettings", "Save"); };


        this.GetRoles = function (postArray) { return this.createGetUrl("Roles", "GetRoles", postArray); };
        this.GetRollCallMethods = function () { return this.createUrl("RollCallMethods", "RollCallMethods"); };

        this.GetRollCallLogInputs = function (postArray) { return this.createGetUrl("RollCallLogsInputs", "ServiceLog", postArray); };
        this.RollCallLogInputsSave = function () { return this.createUrl("RollCallLogsInputs", "Save"); };
        this.RollCallLogInputsDelete = function () { return this.createUrl("RollCallLogsInputs", "Delete"); };
        this.GetRollCallLogInputMasterData = function (postArray) { return this.createGetUrl("RollCallLogsInputs", "MasterData", postArray); };




        this.GetRollCallStatus = function (postArray) { return this.createGetUrl("RollCallStatus", "ServiceLog", postArray); };
        this.RollCallStatusSave = function () { return this.createUrl("RollCallStatus", "Save"); };
        this.RollCallStatusSendEmail = function () { return this.createUrl("RollCallStatus", "Email"); };

        this.GetRollCallStatusMasterData = function (postArray) { return this.createGetUrl("RollCallStatus", "MasterData", postArray); };


        this.GetRollCallLogFormOutputURL = function (postArray) { return this.createGetUrl("RollCallLogFormOutputs", "FormOutput", postArray); };


        this.createUrl = function (controller, action) {
            return this.routeUrl + "/" +"api/" + this.controller[controller] + "/" + action;
        }

        this.createGetUrl = function (controller, action, postArray) {

            var url = this.createUrl(controller, action);

            for (var i = 0; i < postArray.length; i++) {

                var key = postArray[i].key;
                var value = postArray[i].value;


                if (i == 0) {
                    url += "?" + key + "=" + value;
                } else {
                    url += "&" + key + "=" + value;
                }

            }

            return url;
        }




        return this;

    },


}

