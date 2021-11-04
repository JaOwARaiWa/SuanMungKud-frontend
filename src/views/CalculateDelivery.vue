<template>
    <div class="delivery-page">
        <Header></Header>

        <div class="container mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="text-dark">รายชื่อลูกค้า</h1>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-3 mb-2">
                        <label for="search" class="text">ค้นหาจากชื่อ</label>
                        <input v-model="searchUser" type="text" class="flex field" placeholder="กรอกชื่อเพื่อค้นหา">
                    </div>
                    <div class="col-lg-3 mt-4 goright">
                        <h3>น้ำหนัก</h3>
                    </div>
                    <div class="col-lg-3 mt-4">
                        <input v-model="weight" type="number" class="flex field" placeholder="กรอกน้ำหนัก">
                    </div>
                    <div class="col-lg-3 mt-4">
                        <h3>กิโลกรัม</h3>
                    </div>
                </div>
            </div>

            <div class="table-wrap bg-dark">
                <b-table selected-variant="" :select-mode="selectMode" :bordered="true" :dark="true" :items="resultQuery" :fields="fields" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected">
                    <template #cell(selected)="{ rowSelected }">
                        <template v-if="rowSelected">
                            <span aria-hidden="true">&check;</span>
                            <span class="sr-only">เลือก</span>
                        </template>
                        <template v-else>
                            <span aria-hidden="true">&nbsp;</span>
                            <span class="sr-only">ยังไม่ได้เลือก</span>
                        </template>
                    </template>
                </b-table>
            </div>

            <b-container class="bv-example-row">
                <b-row align-h="between">
                    <b-col cols="4">
                    </b-col>
                    <b-col cols="4" class="d-flex justify-content-end">
                        <div class="button m-1">
                            <b-button type="submit" @click="onCheck" variant="primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                </svg>
                                สร้างใบส่งสินค้า
                            </b-button>
                        </div>
                    </b-col>
                </b-row>

                <b-modal v-model="show" size="xl" title="ใบส่งสินค้า">
                    <b-container>
                        <div class="text-center pt-2">
                            <h2>{{ this.suan }}</h2>
                        </div>

                        <b-row>
                            <b-col class="pt-4 pb-3">
                                <h5>ส่งจาก: คุณ {{ this.currentUser.name }}</h5>
                                <h5>ถึง: คุณ {{ this.partner.name }}</h5>
                                <h5>วันที่: {{ this.detail.date }}</h5>
                            </b-col>
                            <b-col class="pt-4 pb-3">
                                <h5>ติดต่อ: {{ this.currentUser.contact_number }} </h5>
                                <h5>ติดต่อ: {{ this.partner.contact }}</h5>
                            </b-col>
                        </b-row>
                        
                        <b-table :bordered="true" :light="true" :items="invoice" :fields="invoiceFields"></b-table>

                        <div class="d-flex justify-content-between">
                            <h5>สถานะ: -</h5>
                            <h5>ราคารวม {{ this.detail.price }} บาท</h5>
                        </div>
                        
                    </b-container>

                    <template #modal-footer>
                        <div class="w-100 d-flex flex-row-reverse">
                            <b-button type="submit" variant="success" size="sm" class="float-right" @click="onSubmit">
                                สร้าง
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </b-container>   
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AdminStore from "@/store/Admin"
import AuthUser from '@/store/AuthUser'

export default {
    name: 'CalculateDelivery',
    components: {
        Header,
    },
    data() {
        return {
            currentUser: {},
            alreadyAssigned: [],
            searchUser: null,
            allUsers: [],
            searchList: [],
            show: false,
            fields: [
                { key: 'selected', label: 'เลือก' },
                'id',
                { key: 'role', label: 'ตำแหน่ง' },
                { key: 'name', label: 'ชื่อ' },
                { key: 'contact_number', label: 'เบอร์ติดต่อ'},
            ],
            invoiceFields: [
                { key:'product', label: 'สินค้าที่ส่ง'}, 
                { key:'weight', label: 'น้ำหนัก'},
                { key:'crate', label: 'จำนวนลัง'},
                { key:'delivery', label: 'รอบการขนส่ง'},
                { key:'price', label: 'ราคา'}, 
            ],
            selectMode: 'single',
            selected: {},
            weight: '',
            suan: 'SUANMUNGKUD',
            partner: {
                name: "",
                contact: ""
            },
            invoice: [],
            detail: {
                product: "มังคุด",
                weight: 0,
                crate: 0,
                delivery: 0,
                price: "",
                date: "",
            },
        }
    },
    async created(){
        await this.fetchPartner();
    },
    methods: {
        async fetchPartner() {
            await AdminStore.dispatch('fetchPartner')
            this.allUsers = AdminStore.getters.users;
            this.currentUser = AuthUser.getters.user
        },
        onRowSelected(items) {
            this.selected = items
        },
        onCheck() {
            if (this.weight == "" || this.weight == null || this.weight.startsWith("0") || this.weight.includes("-") || this.weight.includes("+") || this.weight <= 0) {
                this.$swal("ไม่สามารถทำรายการได้", "โปรดตรวจสอบข้อมูลอีกครั้ง", "error");
            } else {
                if (this.selected.length == 0 || this.selected == null || this.selected == undefined || this.selected[0] == undefined) {
                    this.$swal("ไม่สามารถทำรายการได้", "โปรดตรวจสอบข้อมูลอีกครั้ง", "error");
                } else {
                        this.detail.date = new Date().toLocaleDateString('en-CA');
                        this.detail.crate = Math.ceil(this.weight / 25);
                        this.detail.delivery = Math.ceil(this.detail.crate / 42);
                        this.detail.price = (this.weight * 35).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                        this.detail.weight = this.weight * 1;
                        this.partner.name = this.selected[0].name;
                        this.partner.contact = this.selected[0].contact_number;
                        this.show = true;
                    if (this.invoice.length == 0) {
                        this.invoice.push(this.detail);
                    }
                }
            }
        },
        async onSubmit() {
            if (this.weight == "" || this.weight == null || this.weight.startsWith("0") || this.weight.includes("-") || this.weight.includes("+") || this.weight <= 0) {
                this.$swal("ไม่สามารถทำรายการได้", "โปรดตรวจสอบข้อมูลอีกครั้ง", "error");
            } else {
                if (this.selected.length == 0) {
                    this.$swal("ไม่สามารถทำรายการได้", "โปรดตรวจสอบข้อมูลอีกครั้ง", "error");
                } else {
                    let payload = {
                        crate: this.detail.crate,
                        delivery: this.detail.delivery,
                        weight: this.detail.weight,
                        price: (this.weight * 35).toFixed(2) * 1.0,
                        create_by: this.currentUser.id,
                        sent_to: this.selected[0].id,
                    }
                    let res = await AdminStore.dispatch('createInvoice', payload)
                    if (res.success) {
                        this.show = false;
                        this.$swal("สร้างใบส่งสินค้าสำเร็จ", "ทำการส่งใบส่งสินค้าให้ลูกค้า", "success");
                    } else {
                        this.$swal("สร้างใบส่งสินค้าไม่สำเร็จ", "โปรดตรวจสอบข้อมูลอีกครั้ง", "error");
                    }
                }
            } 
        }
    },
    computed: {
        resultQuery() {
            if (this.searchUser) {
                return this.allUsers.filter((item) => {
                    return this.searchUser.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                })
            } else {
                return this.allUsers;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .delivery-page {
        background-color: #F1FFB1;
        height: 100vh;
    }
    .table-wrap {
        height: 350px;
        overflow-y: auto;
    }
    .table > tbody > tr.b-row-selected
        /deep/ .table > tbody > tr.b-table-row-selected,
        /deep/ .table > tbody > tr.b-table-row-selected > td,
        /deep/ .table > tbody > tr.b-table-row-selected > th {
        background-color: #5C2751;
    }
    .field {
        width: 100%;
        height: 40px;
        margin-left: 10px;
        margin-right: 5px;
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
    .box {
        margin-left: 20px;
    }
    .goright {
        text-align: end;
    }
</style>