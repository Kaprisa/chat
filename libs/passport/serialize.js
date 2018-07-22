import User from '../../db/models/User'
import passport from 'koa-passport'

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.find(id)
    done(null, user)
})
