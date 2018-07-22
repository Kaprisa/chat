import User from '../db/models/User'
import Message from '../db/models/Message'
import passport from 'koa-passport/lib/index'
import asyncForEach from '../helpers/asyncForEach'

export default router => {
    router.get('/users', async (ctx, next) => {
        await passport.authenticate('jwt', {session: false})(ctx, next)
        const current_user = ctx.state.user
        if (!current_user) {
            ctx.status = 400
            ctx.body = {error: 'invalid credentials'}
            return
        }
        const users = await User.get()
        if (!users) {
            ctx.body = []
            return
        }
        await asyncForEach(users, async u => {
            const rows = await Message.last({from_id: current_user.id, to_id: u.id})
            if (rows && rows.length > 0)
                u.last_message = rows[0]
        })
        ctx.body = users
    })
}
