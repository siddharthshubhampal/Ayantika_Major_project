import Vue from 'vue'
import WebCam from 'vue-web-cam'
import Router from 'vue-router'
import Main from '@/components/Main'
import Enroll from '@/components/Enroll'
import Verify from '@/components/Verify'

Vue.use(Router)
Vue.use(WebCam)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'home',
      component: Main
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify
    },
    {
      path: '/enroll',
      name: 'enroll',
      component: Enroll
    }
  ]
})
