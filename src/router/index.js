import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Information from '@/views/Information'
import Account from '@/views/Account'
import Login from '@/views/Login'
import Favorate from '@/views/Favorate'
import Rent from '@/views/Rent'
import City from '@/views/City'
import Detail from '@/views/Detail'
import Map from '@/views/Map'
import Add from '@/views/Add'
import List from '@/views/List'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/home',
    // 二级路由
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/information',
        component: Information
      },
      {
        path: '/account',
        component: Account
      },
      {
        path: '/list',
        component: List
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/favorate',
    component: Favorate
  },
  {
    path: '/rent',
    component: Rent
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  },
  {
    path: '/map',
    component: Map
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
