import path from 'path'
import fs from 'fs'
import Router from 'koa-router'

const router = new Router({
    prefix: `/api`
})

const p = `../controllers/`

const controllers = fs.readdirSync(path.resolve(__dirname, p))
controllers.forEach(c => require(p + c).default(router))

export default router.routes()

