import { query } from '../connection'
import crypto from 'crypto'
import errorHandler from '../../helpers/errorHandler'
import config from 'config'

class User {
    static getFields() {
        return ['name', 'email']
    }
    static async create({ name, email, password, image }) {
        try {
            const salt = crypto.randomBytes(config.crypto.hash.length).toString('base64')
            const user = await query('INSERT INTO users SET name=?, email=?, password_hash=?, salt=?, image=?;', [
                name,
                email,
                crypto.pbkdf2Sync(password, salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha1'),
                salt,
                image
            ])
            const row = await query('SELECT LAST_INSERT_ID() as id')
            return row[0]
        } catch (e) {
            errorHandler(e)
            throw e
        }
    }
    static async get(condition = 1) {
        try {
            return await query(`SELECT * FROM users where ${condition}`)
        } catch (e) {
            errorHandler(e)
            return []
        }
    }
    static async find(id, field = 'id') {
        const rows = await User.get(`${field}='${id}'`)
        return rows.length > 0 ? rows[0] : null
    }
    static async checkPassword(user, password) {
        return crypto.pbkdf2Sync(password, user.salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha1') === user.passwordHash
    }
}

module.exports = User
