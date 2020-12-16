export default {
    change: {
        changeDisabled: function (input_array) {
            //要素を取得した配列を渡す
            for (var i = 0; i < input_array.length; i++) {
                var input = input_array[i]

                input.disabled = true
            }
        },
        changeUndisabled: function (input_array) {
            //要素を取得した配列を渡す
            for (var i = 0; i < input_array.length; i++) {
                var input = input_array[i]

                input.disabled = false
            }
        },
        changeDiasbledElementUI: function (input_array) {
            //要素を取得した配列を渡す
            for (var i in input_array) {
                var input = input_array[i]

                input.disabled = true;
                input.classList.add("is-disabled");
            }
        },
        changeUndiasbledElementUI: function (input_array) {
            //要素を取得した配列を渡す
            for (var i = 0; i < input_array.length; i++) {
                var input = input_array[i]

                input.disabled = false;
                input.classList.remove("is-disabled");
            }
        },
        changeChecked: function (input_array) {
            //要素を取得した配列を渡す
            for (var i = 0; i < input_array.length; i++) {
                var input = input_array[i]

                input.checked = true
            }
        },
        changeUnchecked: function (input_array) {
            //要素を取得した配列を渡す
            for (var i = 0; i < input_array.length; i++) {
                var input = input_array[i]

                input.checked = false
            }
        },
        changeValue: function (input_array, value) {
            //要素を取得した配列を渡す
            for (var i = 0; i < input_array.length; i++) {
                var input = input_array[i]

                input.value = value;
            }
        },
        emptyValue: function (input_array) {
            //要素を取得した配列を渡す
            for (var i = 0; i < input_array.length; i++) {
                var input = input_array[i]

                input.value = "";
            }

        },
        emptyValueByData: function (vueObject,property_name_array) {

            //v-modelで登録しているものに対して、プロパティ名を配列に入れて渡す
            for (var i in property_name_array) {
                vueObject.data[`${property_name_array[i]}`] = "";


            }

        }

    }
}