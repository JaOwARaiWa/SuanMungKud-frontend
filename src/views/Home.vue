<template>
    <div class="home-page">
        <Header />
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
        }
    },
}
</script>

<style>

</style>