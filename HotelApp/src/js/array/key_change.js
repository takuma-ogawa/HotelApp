export default {

    createValueKey: function (array, codeKey,dataParam) {

        for (var i in array) {

            if (dataParam == "string") {

                array[i].value = String(array[i][codeKey]);

            } else if (dataParam == "int") {

                array[i].value = Number(array[i][codeKey]);

            } else {

                array[i].value = array[i][codeKey];

            }
          
        }

    }

}