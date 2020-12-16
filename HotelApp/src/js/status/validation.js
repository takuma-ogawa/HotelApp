export default {
    validation: {

        is_intager_filling_zero: function (value) {

            var check = /^\d*$/;

            return this.validation(check, value);
        },
        is_intager_positive: function (value) {

            var check = /^([1-9]\d*|0)$/;

            return this.validation(check, value);

        },
        is_intager: function (value) {

            var check = /^[+,-]?([1-9]\d*|0)$/;

            return this.validation(check, value);

        },
        is_tel_nonhyphen: function (value) {

            var check = /^[0-9]{10}$/;

            return this.validation(check, value);

        },
        validation: function (check, value) {

            if (check.test(value)) {
                return true;
            }

            return false;

        },
        
        

    },
    error_message: {

        is_intager_filling_zero: function (name) {

            return `${name}は半角数字である必要があります`;

        },

        is_intager: function (name) {

            return `${name}は整数である必要があります`;

        }

    }
}