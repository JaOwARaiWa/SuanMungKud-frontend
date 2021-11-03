<template>
    <div class="list-page">
        <Header></Header>

        <div class="container mt-4">
            <div class="container">
                <div class="row" v-if="role() == 'ADMIN'">
                    <div class="col-lg-12">
                        <h1 class="text">รายชื่อผู้ใช้</h1>
                    </div>
                </div>

                <div class="row" v-if="role() == 'EMPLOYEE'">
                    <div class="col-lg-12 mt-5 mb-3">
                        <h1 class="text">งานที่ได้รับมอบหมายวันนี้</h1>
                    </div>
                </div>

                <div class="row" v-if="role() == 'PARTNER'">
                    <div class="col-lg-12 mt-5 mb-3">
                        <h1 class="text">ใบส่งสินค้าที่ได้รับวันนี้</h1>
                    </div>
                </div>

                <div class="row" v-if="role() == 'ADMIN'">
                    <div class="col-lg-3 mb-2">
                        <label for="search" class="text">ค้นหาจากชื่อ</label>
                        <input v-model="searchUser" type="text" class="flex field" placeholder="กรอกชื่อเพื่อค้นหา">
                    </div>
                    <div class="col-lg-9"></div>
                </div>

            </div>

            <div class="table-wrap bg-dark">
                <b-table selected-variant="" :select-mode="selectMode" :bordered="true" :hover="true" :dark="true" :items="resultQuery" :fields="fields" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected" v-if="role() == 'ADMIN'">
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
                <b-table selected-variant="" :select-mode="selectMode" :bordered="true" :hover="true" :dark="true" :items="allUsers" :fields="em_fields" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected" v-if="role() == 'EMPLOYEE'">
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
                <b-table selected-variant="" :select-mode="selectMode" :bordered="true" :hover="true" :dark="true" :items="allUsers" :fields="pn_fields" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected" v-if="role() == 'PARTNER'">
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
                        <div class="p-2" v-if="role() == 'ADMIN'">
                            <b-button class="m-1 bg-danger" size="sm" @click="deleteSelected">ลบผู้ใช้ที่เลือก</b-button>
                        </div>
                        <div class="p-2" v-if="role() == 'PARTNER'" @click="openInvoice">
                            <b-button class="m-1 bg-info" size="sm">ดูใบส่งสินค้า</b-button>
                        </div>
                    </b-col>
                    <b-col cols="4 m-2" class="d-flex justify-content-end">

                            <button type="button" class="btn btn-primary" @click=" show = true" v-if="role() == 'ADMIN'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"></path>
                                </svg>
                                เพิ่มผู้ใช้
                            </button>

                            <button type="button" class="btn btn-primary" @click="workDone" v-if="role() == 'EMPLOYEE'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                </svg>
                                เสร็จสิ้น
                            </button>

                            <button type="button" class="btn btn-primary" @click="accepted" v-if="role() == 'PARTNER'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-check" viewBox="0 0 16 16">
                                    <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                </svg>
                                ได้รับสินค้า
                            </button>

                            <b-modal v-model="showInvoice" size="xl" title="ใบส่งของ">
                                <b-container>
                                    <div class="text-center pt-2">
                                        <h2>{{ this.suan }}</h2>
                                    </div>

                                    <b-row>
                                        <b-col class="pt-4 pb-3">
                                            <h5>ส่งจาก: {{ this.detail.from }}</h5>
                                            <h5>ถึง: คุณ {{ this.partner.name }}</h5>
                                            <h5>วันที่: {{ this.detail.date }}</h5>
                                        </b-col>
                                        <b-col class="pt-4 pb-3">
                                            <h5>ติดต่อ: {{ this.detail.contact }}</h5>
                                            <h5>ติดต่อ: {{ this.partner.contact }}</h5>
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

                            <b-modal v-model="show" title="เพิ่มผู้ใช้ใหม่">
                                <b-container>
                                    <b-form @submit.stop.prevent="onSubmit" class="need-validation" novalidate>

                                        <b-form-group label="ชื่อ">
                                            <b-form-input v-model="$v.form.name.$model" class="text-dark" :state="validateState('name')" aria-describedby="input-1-live-feedback" />
                                            <b-form-invalid-feedback id="input-1-live-feedback">ต้องการอย่างน้อย 2 ตัวอักษร</b-form-invalid-feedback>
                                        </b-form-group>

                                        <b-form-group label="Email">
                                            <b-form-input v-model="$v.form.email.$model" class="text-dark" :state="validateState('email')" aria-describedby="input-1-live-feedback" />
                                            <b-form-invalid-feedback id="input-1-live-feedback">ต้องเป็นอีเมลล์</b-form-invalid-feedback>
                                        </b-form-group>

                                        <b-form-group label="Password">
                                            <b-form-input type="password" v-model="$v.form.password.$model" class="text-dark" :state="validateState('password')" aria-describedby="input-1-live-feedback" />
                                            <b-form-invalid-feedback id="input-1-live-feedback">ต้องการอย่างน้อย 8 ตัวอักษร</b-form-invalid-feedback>
                                        </b-form-group>

                                        <b-form-group label="เบอร์ติดต่อ">
                                            <b-form-input v-model="$v.form.contact_number.$model" class="text-dark" :state="validateState('contact_number')" aria-describedby="input-1-live-feedback" />
                                            <b-form-invalid-feedback id="input-1-live-feedback">ต้องการอย่างน้อย 10 ตัวอักษร</b-form-invalid-feedback>
                                        </b-form-group>

                                        <b-form-group label="เลขบัญชี">
                                            <b-form-input v-model="$v.form.bank_account.$model" class="text-dark" :state="validateState('bank_account')" aria-describedby="input-1-live-feedback" />
                                            <b-form-invalid-feedback id="input-1-live-feedback">ต้องการอย่างน้อย 10 ตัวอักษร</b-form-invalid-feedback>
                                        </b-form-group>

                                        <b-form-group id="example-input-group-2" label="ตำแหน่ง">
                                            <b-form-select v-model="selectedRole" :options="userRole" />
                                        </b-form-group>

                                    </b-form>
                                </b-container>

                                <template #modal-footer>
                                    <div class="w-100 d-flex flex-row-reverse">
                                        <b-button type="submit" variant="success" size="sm" class="float-right" @click="onSubmit">
                                            เพิ่ม
                                        </b-button>
                                    </div>
                                </template>
                            </b-modal>
  
                    </b-col>
                </b-row>
            </b-container>

            
        </div>
        
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AdminStore from "@/store/Admin"
import AuthUser from '@/store/AuthUser'
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
    name:'List',
    mixins: [validationMixin],
    components: {
        Header,
    },
    data() {
        return {
            currentUser: {},
            searchUser: null,
            allUsers: [],
            searchList: [],
            show: false,
            showInvoice: false,
            userRole: ['EMPLOYEE', 'PARTNER', 'ADMIN'],
            selectedRole: 'EMPLOYEE',
            form: {
                name: "",
                email: "",
                password: "",
                contact_number: "",
                bank_account: "",
            },
            fields: ['selected', 'id', 'role', 'name', 'email', 'contact_number', 'bank_account'],
            em_fields: ['selected', 'date', { key: 'work_id.name', label: 'detail' }, 'is_finished'],
            pn_fields: [
                'selected',
                'date',
                { key: 'invoice.weight', label: 'weight' },
                { key: 'invoice.crate', label: 'crate' },
                { key: 'invoice.delivery', label: 'delivery'},
                { key: 'invoice.price', label: 'price' },
                { key: 'invoice.status', label: 'status'}],
            selectMode: 'single',
            selected: [],

            invoiceFields: ['product', 'weight', 'crate', 'delivery', 'price'],
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
                status: "",
                date: "",
                from: "",
                contact: ""
            },
        }
    },
    async created() {
        await this.thisUser()

        if (this.currentUser.role == "ADMIN") {
            await this.fetchAllUser()
        } else if (this.currentUser.role == "EMPLOYEE") {
            await this.fetchMyWork()
        } else if (this.currentUser.role == "PARTNER") {
            await this.fetchMyInvoice()
        }
    },
    validations: {
        form: {
            name: {
                required,
                minLength: minLength(2)
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            },
            contact_number: {
                required,
                minLength: minLength(10)
            },
            bank_account: {
                required,
                minLength: minLength(10)
            },
        }
    },
    methods: {
        async thisUser() {
            this.currentUser = await AuthUser.getters.user
        },
        async fetchAllUser() {
            await AdminStore.dispatch('fetchAllUser')
            this.searchList = AdminStore.getters.users
            this.allUsers = AdminStore.getters.users
            this.currentUser = AuthUser.getters.user
        },
        async fetchMyWork() {
            let res = await AdminStore.dispatch('fetchMyWork', this.currentUser.id)
            console.log(res);
            this.searchList = AdminStore.getters.users
            this.allUsers = AdminStore.getters.users
            this.currentUser = AuthUser.getters.user
        },
        async fetchMyInvoice() {
            await AdminStore.dispatch('fetchMyInvoice', this.currentUser.id)
            this.searchList = AdminStore.getters.users
            this.allUsers = AdminStore.getters.users
            this.currentUser = AuthUser.getters.user
        },
        openInvoice() {
            if (this.selected.length == 0) {
                return this.$swal("ไม่สามารถเปิดใบส่งของได้", "กรุณาเลือกใบส่งของ", "error")
            }
            this.detail.date = this.selected[0].invoice.date
            this.detail.from = this.selected[0].create_by.name
            this.detail.contact = this.selected[0].create_by.contact_number
            this.detail.crate = this.selected[0].invoice.crate;
            this.detail.delivery = this.selected[0].invoice.delivery;
            this.detail.price = (this.selected[0].invoice.price).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            this.detail.weight = this.selected[0].invoice.weight;
            this.partner.name = this.currentUser.name;
            this.partner.contact = this.currentUser.contact_number;
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
        role() {
            if (this.currentUser.role == "ADMIN") {
                return "ADMIN"
            } else if (this.currentUser.role == "EMPLOYEE") {
                return "EMPLOYEE"
            } else if (this.currentUser.role == "PARTNER") {
                return "PARTNER"
            }
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        onRowSelected(items) {
            this.selected = items
        },
        async deleteSelected() {
            if (this.selected.length == 0 || this.selected[0].id == this.currentUser.id) {
                this.$swal("ไม่สามารถลบผู้ใช้ได้", `กรุณาตรวจสอบผู้ใช้ที่ต้องการลบอีกครั้ง`, "error")
            } else {
                let res = await AdminStore.dispatch('deleteUser', this.selected)
                if (res.success) {
                    this.show = false;
                    this.$swal("ลบผู้ใช้สำเร็จ", `ได้ลบผู้ใช้ออกจากระบบแล้ว`, "success")
                    await this.fetchAllUser()
                } else {
                    this.$swal("ลบผู้ใช้ไม่สำเร็จ", `ไม่สามารถลบผู้ใช้นี้ได้`, "error")
                }                
            }
        },
        async onSubmit() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            } else {
                let payload = {
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password,
                    contact_number: this.form.contact_number,
                    bank_account: this.form.bank_account,
                    role: this.selectedRole
                }
                let res = await AdminStore.dispatch('createUser', payload)
                if (res.success) {
                    this.show = false;
                    this.$swal("เพิ่มผู้ใช้ใหม่สำเร็จ", `ได้เพิ่มคุณ ${res.data.name} ในตำแหน่ง ${res.data.role} แล้ว`, "success")
                    await this.fetchAllUser()
                } else {
                    this.$swal("เพิ่มผู้ใช้ไม่สำเร็จ", `โปรดตรวจสอบข้อมูลอีกครั้ง`, "error")
                }
            }
        },
        async workDone() {
            if (this.allUsers.length == 0 || this.selected.length == 0|| this.selected[0].is_finished == "เสร็จสิ้น") {
                this.$swal("ไม่สามารถทำรายการได้", `กรุณาตรวจสอบข้อมูลอีกครั้ง`, "error")
            } else {
                let res = await AdminStore.dispatch('workDone', this.allUsers[0].id)
                if (res.success) {
                    this.$swal("การทำงานเสร็จสิ้น", `คุณได้ทำงานที่ได้รับมอบหมายแล้ว`, "success")
                    await this.fetchMyWork()
                } else {
                    this.$swal("ไม่สามารถทำรายการได้", `โปรfตรวจสอบข้อมูลอีกครั้ง`, "error")
                }
            }
        },
        async accepted() {
            if (this.selected.length == 0 || this.selected[0].invoice.status == "ได้รับสินค้าแล้ว") {
                this.$swal("ไม่สามารถทำรายการได้", `โปรดตรวจสอบข้อมูลอีกครั้ง`, "error")
            } else {
                let res = await AdminStore.dispatch('accepted', this.selected[0].id)
                if (res.success) {
                    this.$swal("คุณได้รับสินค้าแล้ว", `ระบบกำลังทำการโอนเงิน`, "success")
                    await this.fetchMyInvoice()
                } else {
                    this.$swal("ไม่สามารถทำรายการได้", `โปรดตรวจสอบข้อมูลอีกครั้ง`, "error")
                }   
            }
        },
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
    .list-page {
        background-color: #F1FFB1;
        height: 100vh;
    }
    .mt-5 {
        margin-top: 50px !important;
    }
    .table-wrap {
        height: 350px;
        overflow-y: auto;
    }
    .background {
        height: 350px;
    }
    .box {
        text-align: end;
        align-items: flex-end;
        padding-top: 10px;
    }
    .text {
        color: #000000;
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
    .table > tbody > tr.b-row-selected
        /deep/ .table > tbody > tr.b-table-row-selected,
        /deep/ .table > tbody > tr.b-table-row-selected > td,
        /deep/ .table > tbody > tr.b-table-row-selected > th {
        background-color: #5C2751;
    }
</style>