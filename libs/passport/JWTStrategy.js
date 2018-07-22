import passport from 'koa-passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import User from '../../db/models/User'
import config from 'config'

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.get('jwtSecret')
},
    async (jwtPayload, done) => {
        const user = await User.find(jwtPayload.id)
        if (!user)
            return done(null, false)
        return done(null, user)
    }
))
