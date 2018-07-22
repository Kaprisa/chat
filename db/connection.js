const mysql = require('mysql')
const config = require('config')

const { user, password, database, port, host } = config.db

const pool  = mysql.createPool({
    host     : host,
    user     : user,
    password : password,
    database : database,
    port     : port
})

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err)
                reject(err)
            else {
                connection.query(sql, values, (err, rows) => {
                    err ? reject(err) : resolve(rows)
                    connection.release()
                })
            }
        })
    })
}

exports.pool = pool
exports.query = query
