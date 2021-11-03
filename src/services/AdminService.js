import Axios from "axios"
import AuthService from '@/services/AuthService'

const api_endpoint = process.env.VUE_APP_MUNGKUD_ENDPOINT || "http://localhost:8000"

export default {
    async getAllUser() {
        try {
            let url = `${api_endpoint}/api/admin/all-users`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        } catch (e) {
            
        }
    },

    async getEmployee() {
        try {
            let url = `${api_endpoint}/api/admin/all-employees`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        } catch (e) {
            
        }
    },

    async getPartner() {
        try {
            let url = `${api_endpoint}/api/admin/all-partners`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        } catch (e) {
            
        }
    },

    async getMyWork(id) {
        try {
            let url = `${api_endpoint}/api/admin/my-work/${id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            if (res.data.message == "no assignment")
            {
               return {
                   success: false,
                   data: res.data.message
                }
            } else {
                return {
                    success: true,
                    data: res.data.work
                }
            }
        } catch (e) {
            
        }
    },

    async getMyInvoice(id) {
        try {
            let url = `${api_endpoint}/api/admin/my-invoice/${id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            if (res.data.message == "no invoice")
            {
               return {
                   success: false,
                   data: res.data.message
                }
            } else {
                return {
                    success: true,
                    data: res.data.invoice
                }
            }
        } catch (e) {
            
        }
    },

    async getTodayInvoice(date) {
        try {
            let url = `${api_endpoint}/api/admin/today-invoice/${date}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        } catch (e) {
            
        }
    },

    async getAlreadyAssigned(date) {
        try {
            let url = `${api_endpoint}/api/admin/already-assigned/${date}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        } catch (e) {
            
        }
    },

    async accepted(id) {
        try {
            let url = `${api_endpoint}/api/admin/accept-invoice/${id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, "", header)
            if (res.data.message == "done")
            {
               return {
                   success: true,
                }
            } else {
                return {
                    success: false,
                }
            }
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },

    async workDone(id) {
        try {
            let url = `${api_endpoint}/api/admin/done-work/${id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, "", header)
            if (res.data.message == "done")
            {
               return {
                   success: true,
                }
            } else {
                return {
                    success: false,
                }
            }
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },

    async updatePaymentStatus(id) {
        try {
            let url = `${api_endpoint}/api/admin/update-payment-status/${id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, "", header)
            if (res.data.message == "updated")
            {
               return {
                   success: true,
                }
            } else {
                return {
                    success: false,
                }
            }
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },

    async getCanAssigned(date) {
        try {
            let url = `${api_endpoint}/api/admin/can-assigned/${date}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        } catch (e) {
            
        }
    },

    async assignWork(data) {
        try {
            let url = `${api_endpoint}/api/admin/assign-work`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, data, header)
            if (res.data.message == "assigned success")
            {
               return {
                   success: true,
                   data: res.data
                }
            } else {
                return {
                    success: false,
                }
            }
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },

    async deleteUser(id) {
        try {
            let url = `${api_endpoint}/api/admin/delete-user/${id}`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, "", header);
            if (res.status === 200)
            {
               return {
                   success: true,
                   data: res
               }
            } else {
                return {
                    success: false,
                }
            }
        } catch (e) {
            
        }
    },

    async createUser(newUser) {
        try {
            let url = `${api_endpoint}/api/admin/create-user`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, newUser, header)
            if (res.data.message == "create success")
            {
               return {
                   success: true,
                   data: res.data.new_user
               }
            } else {
                return {
                    success: false,
                }
            }
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    },

    async createInvoice(newInvoice) {
        try {
            let url = `${api_endpoint}/api/admin/create-invoice`;
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, newInvoice, header)
            if (res.status === 200)
            {
               return {
                   success: true,
                   data: res.data
               }
            } else {
                return {
                    success: false,
                }
            }
        } catch (e) {
            if (e.response.status === 400) {
                console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message
                }
            } else {
                console.error(e.response)
                return {
                    success: false,
                    message: "Unknown error: " + e.response
                }
            }
        }
    }
}