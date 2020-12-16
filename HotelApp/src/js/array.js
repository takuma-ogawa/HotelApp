export default {

    isCodeOverLap: function (value, keyName, array) {

        for (var i = 0; i < array.length; i++) {

            if (value == array[i][keyName]) {
                return true;
            }

        }

        return false;
    },
    addMeisai: function () {

    },

}