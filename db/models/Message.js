const query = require('../connection').query
const errorHandler = require('../../helpers/errorHandler')

class Message {
    static getFields() {
        return ['from_id', 'to_id', 'text', 'created_at']
    }
    static async create({ from_id, to_id, text }) {
        try {
            Date.now()
            await query(`INSERT INTO messages SET from_id=?, to_id=?, created_at=NOW(), text=?;`, [from_id, to_id, text])
            return 'Сообщение успешно добавлено'
        } catch (e) {
            errorHandler(e)
            return e.message
        }
    }
    static async destroy({ id }) {
        try {
            await query(`DELETE messages WHERE id=?;`, [id])
            return 'Сообщение успешно удалено!'
        } catch (e) {
            errorHandler(e)
            return e.message
        }
    }
    static async get({ from_id, to_id }) {
        try {
            return await query('SELECT * FROM messages WHERE from_id=? AND to_id=? OR from_id=? AND to_id=? ORDER BY created_at;', [from_id, to_id, to_id, from_id])
        } catch (e) {
            errorHandler(e)
            return []
        }
    }
    static async last({ from_id, to_id }) {
        try {
            return await query('SELECT * FROM messages WHERE from_id=? AND to_id=? OR from_id=? AND to_id=? ORDER BY created_at limit 1;', [from_id, to_id, to_id, from_id])
        } catch (e) {
            errorHandler(e)
            return []
        }
    }
    static async count({ condition = 1 }) {
        try {
            const row = await query(`SELECT COUNT(*) as count FROM messages where ${condition}`)
            return row[0].count
        } catch (e) {
            errorHandler(e)
            return 0
        }
    }
}

module.exports = Message
