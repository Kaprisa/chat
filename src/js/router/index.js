import routes from './routes'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

import Auth from '../auth/Auth'

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => ['login', 'register', 'error'].includes(r.meta.type)))
        return next()
    Auth.path = to.path
    if (Auth.authenticated || Auth.pending) next()
    else next({ path: '/login' })
})

export default router
