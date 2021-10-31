<template>
    <div class="delivery-page">
        <Header></Header>

        <div>
            delivery
        </div>

    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name: 'CalculateDelivery',
    components: {
        Header,
    },
}
</script>

<style lang="scss" scoped>
    .delivery-page {
        background-color: #F1FFB1;
        height: 100vh;
    }
</style>