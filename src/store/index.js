
import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home'

Vue.use(Vuex);


//对外暴露仓库
export default new Vuex.Store({
    modules: {
        home
    }
})