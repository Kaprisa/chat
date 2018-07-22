import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import User from '../../db/models/User'

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async (req, email, password, done) => {
        const user = await User.find(email, 'email')
        if (!user || !User.checkPassword(user, password))
            return done(null, false, {message: 'Нет такого пользователя или пароль неверен'})
        return done(null, user)
    }))
