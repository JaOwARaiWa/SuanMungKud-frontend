<template>
    <div class="home-page">
        <Header></Header>
        
        <div class="home-background">
            <div class="home-menu">
                <div class="menu" @click="go('/list')" v-if="this.role == 'ADMIN'">
                    <b-icon icon="person" class="icon" />
                    <h3 class="text">User Management</h3>
                </div>

                <div class="menu" @click="go('/assign')" v-if="this.role == 'ADMIN'">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-clipboard-plus icon" viewBox="0 0 16 16">
                        <path class="extra" fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg>
                    <h3 class="text">Assign Work</h3>
                </div>

                <div class="menu" @click="go('/delivery')" v-if="this.role == 'ADMIN'">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-calculator icon" viewBox="0 0 16 16">
                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                        <path class="extra" d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"/>
                    </svg>
                    <h3 class="text">Calculate Delivery</h3>
                </div>

                <div class="menu" @click="go('/pay')" v-if="this.role == 'ADMIN'">
                    <b-iconstack class="icon">
                        <b-icon stacked icon="wallet"></b-icon>
                        <b-icon stacked icon="arrow-left-right" shift-v="-1.5" scale="0.5" class="extra"></b-icon>
                    </b-iconstack>
                    <h3 class="text">Pay Wages</h3>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AuthUser from "@/store/AuthUser"

export default {
    name:'Home',
    components: {
        Header,
    },
    data() {
        return {
            role: AuthUser.getters.user.role,
        }
    },
    mounted() {
        if (!this.isAuthen()) {
            this.$swal("Restricted area", "Please login before access", "warning")
            this.$router.push("/")
        }
    },
    methods:{
        isAuthen() {
            if (AuthUser.getters.user != null) {
                return AuthUser.getters.isAuthen
            }
        },
        async go(path) {
            this.$router.push(path)
        }
    },
}
</script>

<style lang="scss" scoped>
    .home-page {
        background-color: #F1FFB1;
        height: 100vh;

        .home-menu {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            text-align: center;
            padding: 50px 50px 50px 50px;
            height: 84vh;
            margin: 0;

            .menu {
                width: 60%;
                height: 80%;
                align-self: center;
                margin: auto;
                cursor: pointer;

                .icon {
                    width: 100px;
                    height: 100px;
                    color: #000000;

                    .extra {
                        color: #DE89BE;
                    }
                }

                .text {
                    color: #5C2751;
                    margin: 20px;
                }           
            }

            .menu:hover {
                .icon {
                    width: 100px;
                    height: 100px;
                    color: #DE89BE;

                    .extra {
                        color: #5C2751;
                    }
                }

                .text {
                    color: #DE89BE;
                } 
            }
        }
    }

</style>