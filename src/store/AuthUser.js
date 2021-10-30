import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/AuthService'

Vue.use(Vuex)

const auth_key = "auth-mungkud"
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialState = {
    user: auth ? auth.user : "",
    jwt: auth ? auth.jwt : "",
    isAuthen: auth ? true : false,
}

export default new Vuex.Store({
    state: initialState,

    mutations: {
        loginSuccess(state, payload) {
            state.user = payload.user
            state.jwt = payload.jwt
            state.isAuthen = true
        },
        logoutSuccess(state) {
            state.user = ""
            state.jwt = ""
            state.isAuthen = false
        },
    },

    actions: {
        async login({ commit }, payload) {
            let res = await AuthService.login(payload)
            if (res.success) {
                commit("loginSuccess", res)
                return res
            } else {
                return "failed"
            }
        },
        async logout({ commit }) {
            let res = await AuthService.logout()
            if (res.success) {
               commit("logoutSuccess")
                return res
            } else {
                return "failed"
            }
        },
    },

    getters: {
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen,
    },

    modules: {}
})