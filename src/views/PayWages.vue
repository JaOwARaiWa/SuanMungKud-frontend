<template>
    <div class="pay-page">
        <Header></Header>

        <div class="container mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <h1 class="text-dark">รายการใบส่งสินค้า</h1>
                    </div>
                    <div class="col-3"></div>
                    <div class="col-5">
                        <h1 class="text-dark">รายชื่อพนักงาน</h1>
                    </div>
                </div>

            </div>

            <b-row>
                <div class="col-6 table-wrap bg-dark">
                    <b-table selected-variant="" :select-mode="selectMode" :bordered="true" :dark="true" :items="todayInvoice" :fields="pn_fields" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected">
                    </b-table>
                </div>

                <div class="col-1"></div>

                <div class="col-5 table-wrap bg-dark">
                    <b-table selected-variant="" :bordered="true" :dark="true" :items="alreadyAssignedEmployee" :fields="em_fields" responsive="sm">
                    </b-table>
                </div>
            </b-row>
            

            <b-container class="bv-example-row">
                <b-row align-h="between">
                    <b-col cols="2">
                        <div class="p-2" @click="openInvoice">
                            <b-button class="m-1 bg-info" size="sm">ดูใบส่งสินค้า</b-button>
                        </div>
                    </b-col>
                    <b-col cols="5">
                        <div class="p-2">
                            <h5 class="p-2 text-dark">น้ำหนักทั้งหมด: {{ this.total_weight }} กิโลกรัม</h5>
                        </div>
                    </b-col>
                    <b-col cols="4" class="d-flex justify-content-end">
                        <div class="button m-1">
                            <b-button type="submit" :disabled="prevent()" @click="onSubmit" variant="primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                                </svg>
                                จ่ายค่าจ้าง
                            </b-button> 
                        </div>
                    </b-col>
                </b-row>

                <b-modal v-model="showInvoice" size="xl" title="ใบส่งสินค้า">
                    <b-container>
                        <div class="text-center pt-2">
                            <h2>{{ this.suan }}</h2>
                        </div>

                        <b-row>
                            <b-col class="pt-4 pb-3">
                                <h5>ส่งจาก: {{ this.partner.from_name }}</h5>
                                <h5>ถึง: คุณ {{ this.partner.to_name }}</h5>
                                <h5>วันที่: {{ this.detail.date }}</h5>
                            </b-col>
                            <b-col class="pt-4 pb-3">
                                <h5>ติดต่อ: {{ this.partner.from_contact }}</h5>
                                <h5>ติดต่อ: {{ this.partner.to_contact }}</h5>
                            </b-col>
                        </b-row>
                        
                        <b-table :bordered="true" :light="true" :items="invoice" :fields="invoiceFields"></b-table>

                        <div class="d-flex justify-content-between">
                            <h5>สถานะ: {{ this.detail.status }}</h5>
                            <h5>ราคารวม {{ this.detail.price }} บาท</h5>
                        </div>
                        
                    </b-container>

                    <template #modal-footer>
                        <div class="w-100 d-flex flex-row-reverse">
                            <b-button type="submit" variant="info" size="sm" class="float-right text-light" @click="close">
                                ปิด
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
import EmployeeStore from "@/store/Employee"
import InvoiceStore from "@/store/Invoice"

export default {
    name:'PayWages',
    components: {
        Header,
    },
        data() {
        return {
            currentUser: {},
            alreadyAssignedEmployee: [],
            todayInvoice: [],
            searchUser: null,
            allUsers: [],
            searchList: [],
            show: false,
            fields: ['name', 'contact_number', 'status'],
            selected: [],
            selectMode: 'single',
            em_fields: [
                { key: 'user_id.name', label: 'พนักงาน'},
                { key: 'user_id.contact_number', label: 'เบอร์ติดต่อ' },
                { key: 'is_finished', label: 'สถานะ' },
            ],
            pn_fields: [
                { key: 'invoice.date', label: 'วันที่' },,
                { key: 'invoice.weight', label: 'น้ำหนัก' },
                { key: 'sent_to.name', label: 'ลูกค้า' },
                { key: 'invoice.status', label: 'สถานะ'}
            ],
            invoiceFields: [
                { key:'product', label: 'สินค้าที่ส่ง'}, 
                { key:'weight', label: 'น้ำหนัก'},
                { key:'crate', label: 'จำนวนลัง'},
                { key:'delivery', label: 'รอบการขนส่ง'},
                { key:'price', label: 'ราคา'}, 
            ],
            weight: '',
            suan: 'SUANMUNGKUD',
            partner: {
                to_name: "",
                to_contact: "",
                from_name: "",
                from_contact: "",
            },
            invoice: [],
            detail: {
                product: "มังคุด",
                weight: 0,
                crate: 0,
                delivery: 0,
                price: "",
                status: "",
                date: "",
                from: "",
                contact: ""
            },
            showInvoice: false,
            total_weight: 0,
        }
    },
    async created(){
        await this.fetchAlreadyAssigned();
        await this.fetchTodayInvoice();
    },
    methods:{
        async fetchAlreadyAssigned() {
            let date = new Date().toLocaleDateString('en-CA')
            await EmployeeStore.dispatch('fetchAlreadyAssigned', date)
            this.alreadyAssignedEmployee = EmployeeStore.getters.datas;
        },
        async fetchTodayInvoice() {
            let date = new Date().toLocaleDateString('en-CA')
            await InvoiceStore.dispatch('fetchTodayInvoice', date)
            this.todayInvoice = InvoiceStore.getters.datas;
            if (this.todayInvoice != null) {
                this.total_weight = 0
                await this.todayInvoice.forEach( item => {
                    this.total_weight += item.invoice.weight
                });
            }
        },
        prevent() {
            if (this.total_weight == 0) {
                return true
            }// } else if (this.alreadyAssignedEmployee[0].work_id.payment_status == "จ่ายค่าจ้างแล้ว") {
            //     return true
            // }
            return false
        },
        openInvoice() {
            if (this.selected.length == 0) {
                return this.$swal("ไม่สามารถเปิดใบส่งสินค้าได้", "กรุณาเลือกใบส่งสินค้า", "error")
            }
            console.log(this.selected[0].sent_to)
            this.detail.date = this.selected[0].invoice.date
            this.detail.from = this.selected[0].create_by.name
            this.detail.contact = this.selected[0].create_by.contact_number
            this.detail.crate = this.selected[0].invoice.crate;
            this.detail.delivery = this.selected[0].invoice.delivery;
            this.detail.price = (this.selected[0].invoice.price).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            this.detail.weight = this.selected[0].invoice.weight;
            this.partner.to_name = this.selected[0].sent_to.name;
            this.partner.to_contact = this.selected[0].sent_to.contact_number;
            this.partner.from_name = this.selected[0].create_by.name;
            this.partner.from_contact = this.selected[0].create_by.contact_number;
            this.detail.status = this.selected[0].invoice.status;
            if (this.invoice.length == 0) {
                this.invoice.push(this.detail);
            } else {
                this.invoice.pop();
                this.invoice.push(this.detail);
            }
            this.showInvoice = true;
        },
        close() {
            this.showInvoice = false
        },
        onRowSelected(items) {
            this.selected = items
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
        async onSubmit() {
            if (this.todaInvoice != null || this.alreadyAssignedEmployee != null) {
                await AdminStore.dispatch('updatePaymentStatus', this.alreadyAssignedEmployee[0].work_id.id)
                this.fetchAlreadyAssigned()
                this.fetchTodayInvoice()
                return this.$swal("ทำรายการสำเร็จ", "กำลังดำเนินการโอนเงินให้พนักงานที่ทำงานเสร็จสิ้น", "success");
            } else {
                return this.$swal("ไม่สามารถจ่ายเงินได้", "เนื่องจากข้อมูลยังไม่ถูกต้อง", "error");
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .pay-page {
        background-color: #F1FFB1;
        height: 100vh;
    }
    .assign-page {
        background-color: #F1FFB1;
        height: 100vh;
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
</style>