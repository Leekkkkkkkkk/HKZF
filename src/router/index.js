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
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/serach',
        component: Search
      },
      {
        path: '/information',
        component: Information
      },
      {
        path: '/account',
        component: Account
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
  }
]

const router = new VueRouter({
  routes
})

export default router
