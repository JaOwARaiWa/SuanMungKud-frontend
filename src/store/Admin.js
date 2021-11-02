import Vue from 'vue'
import Vuex from 'vuex'
import AdminService from '@/services/AdminService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },

    getters: {
        users: (state) => state.data
    },

    mutations: {
        fetch(state, payload) {
            state.data = payload;
        },
        push(state, payload){
            state.data = payload
        }
    },

    actions: {
        async fetchAllUser({ commit }) {
            let payload = await AdminService.getAllUser();
            commit("fetch", payload.data)
        },
        async createUser({ commit }, newUser) {
            let payload = await AdminService.createUser(newUser);
            if (payload.success) {
                commit("push", payload.data)
                return payload
            }
            return payload
        },
        async fetchCanAssigned({ commit }, date) {
            let payload = await AdminService.getCanAssigned(date);
            if (payload == null || payload == "" || payload == undefined) {
                return "nothing"
            }
            commit("fetch", payload.data)
        },
        async fetchEmployeee({ commit }) {
            let payload = await AdminService.getEmployee();
            commit("fetch", payload.data)
        },
        async deleteUser({ commit }, payload) {
            let res = await AdminService.deleteUser(payload[0].id);
            if (res.success) {
                commit("fetch", res.data)
                return res
            }
            return res
        },
        async assignWork({ commit }, data) {
            let payload = await AdminService.assignWork(data);
            if (payload.success) {
                return payload;
            }
            return payload;
        }
    },

    modules: {
        //
    }
});