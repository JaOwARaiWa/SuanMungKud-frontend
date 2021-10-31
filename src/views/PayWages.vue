<template>
    <div class="pay-page">
        <Header></Header>

        <div>
            pay
        </div>
        
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name:'PayWages',
    components: {
        Header,
    },
}
</script>

<style lang="scss" scoped>
    .pay-page {
        background-color: #F1FFB1;
        height: 100vh;
    }
</style>