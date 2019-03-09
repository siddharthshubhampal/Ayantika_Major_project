// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Nav from './components/Nav.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('Nav', Nav)

// Change these URLs to match your deployment API Gateway URL and S3 bucket! (NOTE NO TRAILING SLASH)
Vue.prototype.$API = 'https://jd1wwyl3n9.execute-api.us-east-1.amazonaws.com/dev'
Vue.prototype.$PHOTOS_URL = 'https://facematcher.jbes.dev/enroll'

// The photos URL format is:
// - For an S3 bucket: 'https://s3.amazonaws.com/BUCKET_NAME/enroll'
// - For a Cloudfront distribution: 'https://d12345.cloudfront.net/enroll'
// - For a custom domain name: https://facematcher.jbes.dev/enroll

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
