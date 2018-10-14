// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBL7C390_6tVTkfQbxZJGXp6RmKXEmwKeY'
  }
})
Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.component('GmapCluster', GmapCluster)
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
