import Router from 'koa-router'
const router = new Router()
import routes from './routes'

export default app => {
    router.get(/\/([\w])*/, async ctx => {
        ctx.body = await ctx.render('index')
    })
    app.use(routes)
    app.use(router.routes())
}
