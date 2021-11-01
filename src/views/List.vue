<template>
    <div class="list-page">
        <Header></Header>

        <div class="container mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="text">รายชื่อผู้ใช้</h1>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-3 mb-2">
                        <label for="search" class="text">ค้นหาจากชื่อ</label>
                        <input v-model="searchUser" type="text" class="flex field" placeholder="กรอกชื่อเพื่อค้นหา">
                    </div>
                    <div class="col-lg-9"></div>
                </div>

            </div>

            <!-- <div class="background bg-dark">
                <div class="table-wrap">
                    <table class="table table-responsive table-sm table-bordered table-hover table-striped table-dark">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>ตำแหน่ง</th>
                                <th>ชื่อ</th>
                                <th>email</th>
                                <th>เบอร์ติดต่อ</th>
                                <th>เลขบัญชี</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in resultQuery" :key="index">
                                <td>{{ user.id }}</td>
                                <td>{{ user.role }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.contact_number }}</td>
                                <td>{{ user.bank_account }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div> -->

            <div class="table-wrap bg-dark">
                <b-table selected-variant="" :select-mode="selectMode" :bordered="true" :hover="true" :dark="true" :items="resultQuery" :fields="fields" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected">
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
                        <div class="p-2">
                            <b-button class="m-1 bg-danger" size="sm" @click="deleteSelected">ลบผู้ใช้ที่เลือก</b-button>
                        </div>
                    </b-col>
                    <b-col cols="4 m-2" class="d-flex justify-content-end">

                            <button type="button" class="btn btn-primary" @click=" show = true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"></path>
                                </svg>
                                เพิ่มผู้ใช้
                            </button>

                            <b-modal v-model="show" title="เพิ่มผู้ใช้ใหม่">
                                <b-container>
                                    <b-form @submit.stop.prevent="onSubmit" class="need-validation" novalidate>
                                        <!-- <b-row class="mb-1">
                                            <b-col cols="2 col-sm-5">Name</b-col>
                                            <b-col>
                                                <input type="text" style="color: black;" required>
                                            </b-col>
                                        </b-row>

                                        <b-row class="mb-1 text-left">
                                            <b-col cols="2 col-sm-5">Email</b-col>
                                            <b-col>
                                                <input type="text" style="color: black;">
                                            </b-col>
                                        </b-row>

                                        <b-row class="mb-1 text-left">
                                            <b-col cols="2 col-sm-5">Password</b-col>
                                            <b-col>
                                                <input type="text" style="color: black;">
                                            </b-col>
                                        </b-row>

                                        <b-row class="mb-1 text-left">
                                            <b-col cols="2 col-sm-5" class="text-left">Confirm password</b-col>
                                            <b-col>
                                                <input type="text" style="color: black;">
                                            </b-col>
                                        </b-row>

                                        <b-row class="mb-1 text-left">
                                            <b-col cols="2 col-sm-5">Telephone</b-col>
                                            <b-col>
                                                <input type="text" style="color: black;">
                                            </b-col>
                                        </b-row>

                                        <b-row class="mb-1 text-left">
                                            <b-col cols="2 col-sm-5">Bank account</b-col>
                                            <b-col>
                                                <input type="text" style="color: black;">
                                            </b-col>
                                        </b-row>

                                        <b-row class="mb-1 text-left">
                                            <b-col cols="2 col-sm-5">Role</b-col>
                                            <b-col>
                                                <b-form-select v-model="form.role" :options="userRole" value="EMPLOYEE" />
                                            </b-col>
                                        </b-row>  -->

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
import AuthService from '@/services/AuthService'
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
            selectMode: 'single',
            selected: [],
        }
    },
    async created() {
        await this.fetchAllUser()
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
        async fetchAllUser() {
            await AdminStore.dispatch('fetchAllUser')
            this.searchList = AdminStore.getters.users
            this.allUsers = AdminStore.getters.users
            this.currentUser = AuthService.getUser()
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        onRowSelected(items) {
            this.selected = items
        },
        async deleteSelected() {
            if (this.selected[0].id == this.currentUser.id) {
                this.$swal("ไม่สามารถลบผู้ใช้ได้", `ไม่สามารถลบตัวเองออกจากระบบได้`, "error")
            } else {
                let res = await AdminStore.dispatch('deleteUser', this.selected)
                if (res.success) {
                    this.show = false;
                    this.$swal("ลบผู้ใช้สำเร็จ", `ได้ลบผู้ใช้ออกจากระบบแล้วแล้ว`, "success")
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
        //background-color: #DE89BE;
        background-color: #5C2751;
    }
</style>