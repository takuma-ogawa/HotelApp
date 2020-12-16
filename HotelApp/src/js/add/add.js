export default {
    add: {
        //Vueオブジェクトに登録したいhtml要素をID指定で一辺に登録する関数。IDとelement内のプロパティは一緒になる。
        //多階層で登録したい場合も引数を調整すれば可能
        elementRegisterByID: function (register_object,parent_property_name,element_id_array) {

            for (var i = 0; i < element_id_array.length; i++) {

                register_object[parent_property_name][element_id_array[i]] = document.getElementById(element_id_array[i]);

            }

        }


    }
}