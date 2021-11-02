<template>
    <div class="assign-page">
        <Header></Header>

        <div class="container mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="text">รายชื่อพนักงาน</h1>
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

            <!-- <b-form class="background bg-dark">
                <div class="table-wrap">
                    <table class="table .table-responsive table-sm table-bordered table-hover table-striped table-dark">
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
                            <tr v-for="(user, index) in resultQuery" :key="index" v-if="user.role == 'EMPLOYEE'">
                                <td><b-form-checkbox  />{{ user.id }}</td>
                                <td>{{ user.role }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.contact_number }}</td>
                                <td>{{ user.bank_account }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </b-form> -->

            <div class="table-wrap bg-dark">
                <b-table selected-variant="" :bordered="true" :hover="true" :dark="true" :items="resultQuery" :fields="fields" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected">
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

                    <template #cell(assigned)="{ rowSelected }">
                        <template v-if="rowSelected">
                            <span class="sr-only">สั่งแล้ว</span>
                        </template>
                        <template v-else>
                            <span aria-hidden="true">&nbsp;</span>
                            <span class="sr-only">-</span>
                        </template>
                    </template>
                </b-table>
            </div>

            <b-container class="bv-example-row">
                <b-row align-h="between">
                    <b-col cols="4">
                        <div class="p-2">
                            <b-button class="m-1 bg-success" size="sm" @click="selectAllRows">เลือกทั้งหมด</b-button>
                            <b-button class="m-1 bg-danger" size="sm" @click="clearSelected">ยกเลิกทั้งหมด</b-button>
                        </div>
                            
                    </b-col>
                    <b-col cols="4" class="d-flex justify-content-end">
                        <div class="button m-1">
                            <b-button type="submit" @click="onSubmit" variant="primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                </svg>
                                สั่งงาน
                            </b-button> 
                        </div>
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

export default {
    name:'AssignWork',
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
            userRole: ['EMPLOYEE', 'PARTNER', 'ADMIN'],
            selectedRole: 'EMPLOYEE',
            form: {
                name: "",
                email: "",
                password: "",
                contact_number: "",
                bank_account: "",
            },
            fields: ['selected', 'id', 'role', 'name', 'contact_number'],
            selected: [],
        }
    },
    async created(){
        // await this.fetchEmployeee();
        await this.fetchCanAssigned();
    },
    methods:{
        // async fetchEmployeee() {
        //     await AdminStore.dispatch('fetchEmployeee')
        //     this.allUsers = AdminStore.getters.users;
        // },
        async fetchCanAssigned() {
            let date = new Date().toLocaleDateString('en-CA')
            await AdminStore.dispatch('fetchCanAssigned', date)
            this.allUsers = AdminStore.getters.users;
            this.searchList = AdminStore.getters.users;
            this.currentUser = AuthService.getUser()
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
            if (this.selected == "") {
                this.$swal("การสั่งงานไม่สำเร็จ", "ไม่สามารถสั่งงานได้", "error");
            } else {
                let payload = {
                    data: this.selected,
                    admin: this.currentUser.id
                }
                console.log(payload);
                let res = await AdminStore.dispatch('assignWork', payload);
                if (res.success) {
                    this.$swal("การสั่งงานสำเร็จ", "คุณได้สั่งพนักงานเก็บผลไม้แล้ว", "success");
                    await this.fetchCanAssigned();
                } else {
                    this.$swal("การสั่งงานไม่สำเร็จ", "ไม่สามารถสั่งงานได้", "error");
                }
            }
            
            
        }
    },
    computed: {
        resultQuery() {
            if(this.searchUser) {
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
        //background-color: #DE89BE;
        background-color: #5C2751;
    }
</style>