export default {
    add: {
        //Vue�I�u�W�F�N�g�ɓo�^������html�v�f��ID�w��ň�ӂɓo�^����֐��BID��element���̃v���p�e�B�͈ꏏ�ɂȂ�B
        //���K�w�œo�^�������ꍇ�������𒲐�����Ή\
        elementRegisterByID: function (register_object,parent_property_name,element_id_array) {

            for (var i = 0; i < element_id_array.length; i++) {

                register_object[parent_property_name][element_id_array[i]] = document.getElementById(element_id_array[i]);

            }

        }


    }
}