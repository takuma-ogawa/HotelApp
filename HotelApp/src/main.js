import Vue from 'vue';
import Dashboard from './layout/DashboardLayout.vue';
import Wrapper from './layout/Wrapper.vue'
import Home from './components/Home.vue';

import router from './router.js'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import Axios from 'axios';
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Login from './pages/Login.vue'



Vue.config.productionTip = true;

Vue.use(ElementUI, { locale })
Vue.use(Axios)
Vue.use(Vuex)
Vue.use(createPersistedState)



Vue.directive('focus-first-on-load', {
    inserted(el, binding, vnode) {
        vnode.elm[0].focus();
    },
});

Vue.directive('focus-next-on-enter', {
    inserted(el, binding, vnode) {
        el.addEventListener('keydown', (ev) => {
            console.log("focusNextOnEnter", ev)
            let index = [...vnode.elm.elements].indexOf(ev.target);

            if (ev.keyCode === 13 && index < vnode.elm.length - 1) {
                ev.preventDefault()
                ev.stopPropagation()
                vnode.elm[index + 1].focus();
            }
        });
    },
});


const initialState = {
    userID: "",
    userName: '',
    userPass: '',
    companyID: "",
    role:"",
    loggedIn: false
}




const store = new Vuex.Store({

    state: {

        login: initialState,
        openedMenuIndex: {
            categoryIndex: "",
            sidebarIndex: "",
        },
        moveRollCallLogInput: {
            ServiceDate: "",
            MemberID:""
        }

    },
    mutations: {
        // State‰Šú‰»—p
        resetLoginInfo: function (state) {
            state.login = {
                userID: "",
                userName: '',
                userPass: '',
                companyID: "",
                role:"",
                loggedIn: false
           }
        },
        updateLoginInfo: function (state, { userID, userName, userPass, companyID, role,loggedIn }) {
            state.login = {
                userID: userID,
                userName: userName,
                userPass: userPass,
                companyID: companyID,
                role: role,
                loggedIn: loggedIn,
            }
        },
        changeOpenedMenuIndex: function (state, { categoryIndex, sidebarIndex }) {

            state.openedMenuIndex.categoryIndex = categoryIndex;
            state.openedMenuIndex.sidebarIndex = sidebarIndex;
        },
        changeMoveRollCallLogInput: function (state, { ServiceDate, MemberID }) {
            state.moveRollCallLogInput = {
                ServiceDate: ServiceDate,
                MemberID: MemberID
            }
        }
        
    },
    plugins: [createPersistedState({ storage: window.sessionStorage })]
});

const app =new Vue({
    router,
    store,
    render: h => h(Wrapper),
    created: function () {

        localStorage.setItem('initialState', JSON.stringify(initialState));
    },
 
}).$mount('#app');


/*
router.beforeEach((to, from, next) => {

    if (to.path == '/') {

        if (app.$store.state.login.loggedIn) {
            next({ path: '/uedaunyu/', component: Home });
        } else {
            next();
        }

    } else {
        if (!app.$store.state.login.loggedIn) {
            next({ path: '/', component: Login });
        } else {
            next();
        }
    }



});
*/