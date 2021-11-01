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
    }
}