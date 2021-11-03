import Vue from 'vue'
import Vuex from 'vuex'
import AdminService from '@/services/AdminService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },

    getters: {
        datas: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload;
        },
        push(state, payload) {
            state.data = payload
        },
        clear(state) {
            state.data = []
        }
    },

    actions: {
        async fetchAlreadyAssigned({ commit }, date) {
            let payload = await AdminService.getAlreadyAssigned(date);
            if (payload.data.message == "no already assigned") {
                return "nothing"
            }
            commit("fetch", payload.data.work)
        },

        async clearData({ commit }) {
            commit("clear")
        },
    },

    modules: {
        //
    }
});