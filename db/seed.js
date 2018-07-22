const connection = require('./connection')
const pool = connection.pool
const query = connection.query
const asyncForEach = require('../helpers/asyncForEach')
const errorHandler = require('../helpers/errorHandler')
const config = require('config')
const crypto = require('crypto')

const f = async _ => {
    const items = [
        {email: 'john@gmail.com', password: '55555555', name: 'John Bill', image: 'profiles/m1.jpg'},
        {email: 'jully@gmail.com', password: '55555555', name: 'Jully Stuard', image: 'profiles/w1.jpg'},
        {email: 'ben@gmail.com', password: '55555555', name: 'Ben Doll', image: 'profiles/m2.jpg'},
        {email: 'bordan@gmail.com', password: '55555555', name: 'Bordan Robberson', image: 'profiles/m3.jpg'},
        {email: 'sabrina@gmail.com', password: '55555555', name: 'Sabrina Chang', image: 'profiles/w2.jpg'},
        {email: 'sofi@gmail.com', password: '55555555', name: 'Sofi Yang', image: 'profiles/w3.jpg'},
        {email: 'lola@gmail.com', password: '55555555', name: 'Lola Doll', image: 'profiles/w4.jpg'}
    ]
    await asyncForEach(items, async ({name, email, password, image}) => {
        const salt = crypto.randomBytes(config.crypto.hash.length).toString('base64')
        await query('INSERT INTO users SET name=?, email=?, password_hash=?, salt=?, image=?;', [
            name,
            email,
            crypto.pbkdf2Sync(password, salt, config.crypto.hash.iterations, config.crypto.hash.length, 'sha1'),
            salt,
            image
        ])
    })
    pool.end(e => e ? errorHandler(e) : null)
}
f().then(_ => null)
