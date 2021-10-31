import Axios from "axios"

const auth_key = "auth-mungkud"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""

const api_endpoint = process.env.VUE_APP_MUNGKUD_ENDPOINT || "http://localhost:8000"

export default {
    getApiHeader() {
        if (this.jwt !== undefined && this.jwt !== "") {
            return {
                headers: {
                    Authorization: `Bearer ${this.jwt}`
                }
            }
        } else {
            this.jwt = JSON.parse(localStorage.getItem(auth_key)).jwt
            return {
                headers: {
                    Authorization: `Bearer ${this.jwt}`
                }
            }
        }
    },

    getUser() {
        return user
    },

    getJwt() {
        return jwt
    },

    async login(payload) {
        try {
            let url = `${api_endpoint}/api/auth/login`
            let res = await Axios.post(url, payload)
            if (res.status === 200) {
                let user = {
                    jwt: res.data.access_token,
                    user: res.data.user
                }
                localStorage.setItem(auth_key, JSON.stringify(user))
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.access_token
                }
            } else {
                console.log("NOT 200", res)
                return {
                    sucess: false,
                    message: "failed"
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

    logout() {
        localStorage.removeItem(auth_key)
        return {
            success: true,
            message: "Logout successfully"
        }
    },
}