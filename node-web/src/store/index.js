import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    isLigin: false
}

var getters = {}

var actions = {
    login ( context ) {
        context.commit( 'login' ) 
    },
    logout ( context ) {
        context.commit( 'logout' ) 
    }
}

var mutations = {
    login (state) {
        state.isLogin = true;
    },
    login (state) {
        state.isLogin = false;
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})