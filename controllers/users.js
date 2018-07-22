import User from '../db/models/User'

export default router => {
    router.get('/users', async ctx => {
        ctx.body = await User.get()
    })
}
