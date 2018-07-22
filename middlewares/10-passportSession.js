import passport from 'koa-passport'

export default app => app.use(passport.session())
