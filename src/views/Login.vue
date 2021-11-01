<template>
    <div class="page-background">
        <div class="login-title">
            <h1 class="app-name">
                <span class="suan">SUAN</span>
                <span class="mungkud">MUNGKUD</span>
            </h1>
        </div>
        
        <div class="mungkud-frame">
            <div class="leaf-img">
                <img class="leaf" src="..\assets\images\mangoteenLeaf.png" alt="leaf" >
            </div>

            <dir class="form">
                <form @submit.prevent="login">
                    <div class="information">
                        <div class="field-input">
                            <p class="label">Email
                            <span v-if="this.errors === 'fields required' || this.errors === 'email required'" class="warning">!</span></p>
                            <input 
                                class="field" 
                                v-bind:class="{'error': this.errors === 'fields required' || this.errors === 'email required'}"
                                type="text"
                                v-model="form.email"
                                placeholder="Enter your email"
                            >
                        </div>

                        <div class="field-input">
                            <p class="label">Password
                            <span v-if="this.errors === 'fields required' || this.errors === 'password required'" class="warning">!</span></p>
                            <input 
                                class="field" 
                                v-bind:class="{'error': this.errors === 'fields required' || this.errors === 'password required'}"
                                type="password"
                                v-model="form.password"
                                placeholder="Enter your password"
                            >
                        </div>

                    </div>

                    <div class="login-button">
                        <button type="submit" class="button">Login</button>
                    </div>

                </form>
            </dir>
        </div>
    </div>
</template>

<script>
import AuthUser from '../store/AuthUser'

export default {
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
            errors: "",
        }
    },
    methods: {
        async login(e) {

            e.preventDefault()
            this.errors = ""

            if (this.form.email == "" || this.form.password == "") {
                if (this.form.email == "" && this.form.password != "") {
                    // this.errors = 'email required'
                    // this.$swal("Please enter your email", "Check if you already enter email or not", "error")
                    this.errors = 'fields required'
                    this.$swal("Please fill out all fields", "You have to enter your email and password to login", "error")

                } else if (this.form.password == "" && this.form.email != "") {
                    // this.errors = 'password required'
                    // this.$swal("Please enter your password", "Check if you already enter password or not", "error")
                    this.errors = 'fields required'
                    this.$swal("Please fill out all fields", "You have to enter your email and password to login", "error")

                } else if (this.form.email == "" && this.form.password == "") {
                    this.errors = 'fields required'
                    this.$swal("Please fill out all fields", "You have to enter your email and password to login", "error")

                } 
            } else {
                let payload = {
                    email: this.form.email,
                    password: this.form.password
                }
                let res = await AuthUser.dispatch('login', payload)
                if (res.success) {
                    this.$swal("Login successfully", `Welcome, ${res.user.name}`, "success")
                    this.$router.push('/home')

                } else {
                    this.errors = 'email or password invalid.'
                    this.$swal("Login failed", "Please check your email and password", "error")
                    this.clearForm()

                }
            }
        },
        clearForm() {
            this.form = {
                username: "",
                password: ""
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .page-background {
        background-color: #F1FFB1;
        width: 100vw;
        min-height: 100vh;
    }
    .login-title {
        padding-top: 30px;
    }
    .app-name {
        font-size: 8em;
        text-align: center;
        text-shadow: 3px 5px 5px rgba(0, 0, 0, .75);

        .suan {
            color: #FFFFFF;
        }

        .mungkud {
            color: #DE89BE;
        }
    }
    .mungkud-frame {
        background-color: #5C2751;
        border-radius: 100%;
        width: 450px;
        height: 450px;
        text-align: center;
        margin: 0 auto;
        transform: translate(0, 20%);

        .leaf-img {
            transform: translate(0, -40%);

            .leaf {
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 60%;
            }
        }

        .form {
            transform: translate(0, -50%);
            padding: 0;
            color: #FFFFFF;
            width: 70%;
            height: 60%;
            margin: 0 auto;

            .information {
                margin-top: 20px;

                .field-input {
                    .label {
                        font-size: 2em;
                        text-align: left;
                        margin: 0;
                    }

                    .field {
                        width: 100%;
                        height: 40px;
                        margin-top: 5px;
                        margin-bottom: 15px;
                        padding-left: 10px;
                        background-color: #BDA0BC;
                        border: 2px solid #FFFFFF;
                        border-radius: 10px;
                    }

                    ::placeholder {
                        color: #FFFFFF;
                        opacity: .6;
                    }
                    
                    [type=text] {
                        color: #FFFFFF;
                        opacity: 1;
                        font-size: 1.25em;
                    }

                    [type=password] {
                        color: #FFFFFF;
                        opacity: 1;
                        font-size: 1.25em;
                    }
                }
            }

            .login-button {
                .button {
                    background-color: #DE89BE;
                    color: #FFFFFF;
                    width: 40%;
                    height: 40px;
                    margin-top: 10px;
                    border-radius: 10px;
                }
            }
        }
    }

</style>
