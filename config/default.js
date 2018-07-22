const defer = require('config/defer').deferConfig
const path = require('path')

module.exports = {
    jsonLimit: '56kb',
    port: 3000,
    secret: 'secret',
    jwtSecret: 'jwtSecret',
    root: process.cwd(),
    db: {
        user: 'root',
        password: 'root',
        database: 'chat',
        port: '8889',
        host: 'localhost'
    },
    template: {
        root: defer(function(cfg) {
            return path.join(cfg.root, 'views')
        })
    },
    redis: {
        url: 'redis://127.0.0.1:6379'
    },
    crypto: {
        hash: {
            length: 128,
            iterations: process.env.NODE_ENV === 'production' ? 12000 : 1
        }
    },
}
