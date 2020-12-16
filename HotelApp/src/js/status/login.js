export default {
    logout: function (VueComponent) {

        VueComponent.$store.commit('resetLoginInfo');

        VueComponent.$router.push("/");

    },
    login: function (VueComponent, loginInfo) {
        VueComponent.$store.commit('updateLoginInfo', loginInfo);
    }

}