import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Employee from '../views/Employee.vue'
import AssignWork from '../views/AssignWork.vue'
import CalculateDelivery from '../views/CalculateDelivery.vue'
import CreateInvoice from '../views/CreateInvoice.vue'
import PayWages from '../views/PayWages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee
  },
  {
    path: '/assign',
    name: 'AssignWork',
    component: AssignWork
  },
  {
    path: '/delivery',
    name: 'CalculateDelivery',
    component: CalculateDelivery
  },
  {
    path: '/delivery/invoice',
    name: 'CreateInvoice',
    component: CreateInvoice
  },
  {
    path: '/pay',
    name: 'PayWages',
    component: PayWages
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
