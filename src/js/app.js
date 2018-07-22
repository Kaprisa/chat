import Vue from 'vue'

import App from './components/App'

// import store from './store'
import router from './router'

import './auth'

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    data: {
        key: null
    },
    template: '<app />',
    // store,
    router,
})

export default app
