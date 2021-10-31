<template>
    <div class="invoice-page">
        <Header></Header>

        <div>
            invoice
        </div>

    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name:'CreateInvoice',
    components: {
        Header,
    },
}
</script>

<style lang="scss" scoped>
    .invoice-page {
        background-color: #F1FFB1;
        height: 100vh;
    }
</style>