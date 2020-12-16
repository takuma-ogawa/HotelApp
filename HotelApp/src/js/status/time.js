export default {

    filling_zero: function (time) {

        if (time < 10) {
            var zero_time = "0" + String(time);
        } else {
            var zero_time = String(time);
        }
        return zero_time;

    },
    time_edit: function (time_, param) {


        if (typeof time_ == "object") {
            var time = time_;

        } else if (typeof time_ == "string") {
            var time = new Date(time_);
        }

        var time_edit_year = String(time.getFullYear());
        var time_edit_month = this.filling_zero(time.getMonth() + 1);
        var time_edit_day = this.filling_zero(time.getDate());
        var time_edit_hour = this.filling_zero(time.getHours());
        var time_edit_minutes = this.filling_zero(time.getMinutes());

        if (param == 1) {
            var time_edit = time_edit_year + "-" + time_edit_month + "-" + time_edit_day + "T" + time_edit_hour + ":" + time_edit_minutes + ":00";
        } else if (param == 2) {

            var time_edit = time_edit_month + "/" + time_edit_day + "　" + time_edit_hour + ":" + time_edit_minutes;
        } else if (param == 3) {

            var time_edit = time_edit_hour + ":" + time_edit_minutes;
        } else if (param == 4) {
            var time_edit = time_edit_year + "-" + time_edit_month + "-" + time_edit_day;

        } else if (param == 5) {
            var time_edit = time_edit_year + "/" + time_edit_month + "/" + time_edit_day;
        } else if (param == 6) {
            var time_edit = time_edit_year + "年" + time_edit_month + "月" + time_edit_day + "日";
        }

        return time_edit;
    },
    compareDate: function (startDate, endDate) {

        if (new Date(startDate).getTime() <= new Date(endDate).getTime()) {

            return true;

        } else {

            return false;
        }

    },
    nowJapanDate: function () {
        return new Date(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }));
    },
    nowJapanDateJapaStyle: function () {

        var japan_date = this.nowJapanDate();

        return this.time_edit(japan_date, 6);

    },
    nowJapanDateInput: function () {

        var japan_date = this.nowJapanDate();

        return this.time_edit(japan_date, 4);

    },
    nowJapanYear: function () {

        var date_string = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });

        var japan_date = new Date(date_string);

        if (japan_date.getMonth() + 1 <= 3 && japan_date.getDate() <= 31) {

            return japan_date.getFullYear() - 1;

        } else  {

            return japan_date.getFullYear();

        }

    },
    JapanYear: function (input_date) {

        var japan_date = input_date;

        if (japan_date.getMonth() + 1 <= 3 && japan_date.getDate() <= 31) {

            return japan_date.getFullYear() - 1;

        } else {

            return japan_date.getFullYear();

        }

    },


}