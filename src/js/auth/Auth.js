import router from '../router'

export default class Auth {

    static authenticated
    static path
    static pending

    constructor(axios) {
        this.axios = axios
        this.user = {}
        let token = localStorage.getItem('token')
        if (token) {
            Auth.pending = true
            this.axios.defaults.headers.common['Authorization'] = token
            this.check(token)
        } else {
            Auth.authenticated = false
        }
    }

    check(token) {
        this.axios.get('/api/check').then(({data}) => {
            if (!data)
                throw Error('Not authenticated')
            Auth.pending = false
            this.user = data
            this.token = token
            this.axios.defaults.headers.common['Authorization'] = this.token
            Auth.authenticated = true
            router.push(Auth.path)
        }).catch(err => {
            Auth.pending = false
            localStorage.removeItem('token')
            Auth.authenticated = false
            router.push('/login')
        })
    }

    auth(data, type) {
        return new Promise((resolve, reject) => {
            this.axios.post(`/api/${type}`, data)
                .then(res => {
                    if (type === 'login')
                        this.setData(res)
                    resolve(res.data.message)
                })
                .catch(({ response }) => {
                    const error =
                        response &&
                        response.data &&
                        response.data.message
                            ? response.data.message : `Ошибка ${type === 'register' ? 'регистрации' : 'авторизации'}`
                    reject(error)
                })
        })
    }

    logout() {
        Auth.authenticated = false
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        router.push('/login')
    }

    setData({data}) {
        this.token = `${data['token']}`
        this.axios.defaults.headers.common['Authorization'] = this.token
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.user.id)
        this.user = data.user
        Auth.authenticated = true
    }
}
