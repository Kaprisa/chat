import App from '../components/App'
import Home from '../pages/Home'
import Login from '../pages/Login'

export default [

    { path: '/', component: App, children: [
            {path: '', component: Home },
            {path: '/login', component: Login, meta: {type: 'login', reuse: false, redirect: ''} },
            {path: '/register', component: Login, meta: {type: 'register', reuse: false, redirect: 'login'} },
    ]}
]
