const fs = require('fs')
const path = require('path')
const connection = require('./connection')
const query = connection.query
const pool = connection.pool
const asyncForEach = require('../helpers/asyncForEach')

const f = async () => {
    const migrations = fs
        .readdirSync(path.join(__dirname, 'migrations'))
        .sort()
        .reverse()
        .map(m => require('./migrations/' + m))

    await asyncForEach(migrations, async m => await m.down(query))
    await asyncForEach(migrations.reverse(), async m => await m.up(query))

    pool.end(e => e ? console.error(e) : null)
}

f().catch(e => console.error(e))
