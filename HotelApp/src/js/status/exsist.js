export default {

    is_exsist_by_key: function (value,array) {

        var result;

        var is_exist = false;
        var key;
        for (var i in array) {

            if (i == value) {

                is_exist = true;
                key = i;

            }

        }
        if (is_exist) {
            result = array[key];
        }

        return result;

    },
    is_exsist_by_object_value: function (value, array, array_key) {

        var result;
        var is_exist = false;
        var key;
        for (var i in array) {

            if (!is_exist) {

                if (array[i][array_key] == value) {

                    is_exist = true;
                    key = i;

                }
            }
        }
        if (is_exist) {
            result = array[key];
        }
        return result;

    }



}