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
        push(state, payload) {
            state.data = payload
        },
        clear(state) {
            state.data = []
        }
    },

    actions: {
        async fetchAllUser({ commit }) {
            let payload = await AdminService.getAllUser();
            commit("fetch", payload.data)
        },
        async fetchMyWork({ commit }, id) {
            let payload = await AdminService.getMyWork(id);
            if (payload.success) {
                commit("fetch", payload.data)
                return payload.data
            }
            commit("clear")
            return payload
        },
        async fetchMyInvoice({ commit }, id) {
            let payload = await AdminService.getMyInvoice(id);
            if (payload.success) {
                commit("fetch", payload.data)
                return payload.data.invoice
            }
            commit("clear")
            return payload
        },
        async workDone({ commit }, id) {
            let payload = await AdminService.workDone(id);
            if (payload.success) {
                commit("clear")
                commit("fetch", payload.data)
                return payload
            }
            return payload
        },
        async accepted({ commit }, id) {
            let payload = await AdminService.accepted(id);
            if (payload.success) {
                commit("clear")
                commit("fetch", payload.data)
                return payload
            }
            return payload
        },
        async updatePaymentStatus({ commit }, id) {
            let payload = await AdminService.updatePaymentStatus(id);
            if (payload.success) {
                return payload
            }
            return payload
        },
        async createUser({ commit }, newUser) {
            let payload = await AdminService.createUser(newUser);
            if (payload.success) {
                commit("push", payload.data)
                return payload
            }
            return payload
        },
        async createInvoice({ commit }, newInvoice) {
            let payload = await AdminService.createInvoice(newInvoice);
            if (payload.success) {
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
            return payload.data
        },
        async fetchEmployeee({ commit }) {
            let payload = await AdminService.getEmployee();
            commit("fetch", payload.data)
        },
        async fetchPartner({ commit }) {
            let payload = await AdminService.getPartner();
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
        },
        async clearData({ commit }) {
            commit("clear")
        },
    },

    modules: {
        //
    }
});