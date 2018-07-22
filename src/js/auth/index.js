import  Vue from 'vue'
import Auth from './Auth'
import axios from 'axios'

const instance = axios.create({})

instance.defaults.headers.common['Accept'] = 'application/json'

Vue.prototype.$auth = new Auth(instance)
Vue.prototype.$axios = instance
