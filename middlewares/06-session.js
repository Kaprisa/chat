import session from 'koa-session'
import config from 'config'
import MySqlStore from 'koa2-mysql-session'

export default app => app.use(session({
    store: new MySqlStore(config.db),
    rolling: true,
    cookie: {
        httpOnly:  true,
        path:      '/',
        overwrite: true,
        signed:    false,
        maxAge:    3600 * 4 * 1e3
    }
}, app))
