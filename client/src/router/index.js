import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Grid from '@/components/Grid'
import Account from '@/components/Account'
import MapView from '@/components/MapView'
import Maptest from '@/components/Maptest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/mapview',
      name: 'mapview',
      component: MapView
    },
    {
      path: '/maptest',
      name: 'maptset',
      component: Maptest
    }
  ]
})
