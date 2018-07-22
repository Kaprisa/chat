import favicon from 'koa-favicon'
import path from 'path'

export default app => app.use(favicon(path.resolve(__dirname, '../public/images/favicon.ico')))
