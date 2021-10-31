<template>
    <div class="employee-page">
        <Header></Header>

        <div>
            employee
        </div>
        
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name:'Employee',
    components: {
        Header,
    },
}
</script>

<style lang="scss" scoped>
    .employee-page {
        background-color: #F1FFB1;
        height: 100vh;
    }
</style>