<template>
    <nav class="header-background">
        <div class="header">
            <div class="back" v-if="this.$router.currentRoute.path != '/home'">
                <b-icon icon="chevron-left" class="back-icon" @click.prevent="back" />
            </div>

            <div class="non-back" v-if="this.$router.currentRoute.path == '/home'"></div>

            <h1 class="app-name">
                <span class="suan">SUAN</span>
                <span class="mungkud">MUNGKUD</span>
            </h1>

            <h1 class="user-name">{{ this.user.name }}</h1>

            <div class="logout">
                <b-icon icon="box-arrow-right" class="logout-icon" @click.prevent="logout" />
            </div>
        </div>
    </nav>
</template>

<script>
import AuthUser from '@/store/AuthUser'

export default {
    data() {
        return {
            user: {
                name: AuthUser.getters.user.name,
            }
        }
    },
    components:{

    },
    methods:{
        async logout() {
            let res = await AuthUser.dispatch("logout")
            if (res.success) {
                this.$swal("Logout successfully", "See you again next time", "success")
                this.$router.push("/")
            }
        },
        async back(){
            this.$router.go(-1)
        },
    },
}
</script>

<style lang="scss" scoped>
    .header-background {
        background-color: #5C2751;
        height: 120px;
    }
    .header {
        padding-top: 20px;
        width: 50%;
        display: flex;
    }
    .back {
        padding-left: 30px;

        .back-icon {
            width: 80px;
            height: 80px;
            color: #FFFFFF;
            cursor: pointer;
        }

        :hover {
            color: #F1FFB1;
        }           
    }
    .non-back {
        padding-left: 110px;
    }
    .app-name {
        font-size: 4em;
        text-align: center;
        text-shadow: 3px 5px 5px rgba(0, 0, 0, .75);
        width: 40%;
        padding-left: 60px;

        .suan {
            color: #FFFFFF;
        }

        .mungkud {
            color: #DE89BE;
        }
    }
    .user-name {
        color: #FFFFFF;
        transform: translate(350%, 12.5%);
    }
    .logout {
        transform: translate(800%, -10%);

        .logout-icon {
            width: 100px;
            height: 100px;
            color: #FFFFFF;
            cursor: pointer;
        }
        
        :hover {
            color: #F1FFB1;
        }                 
    }


</style>