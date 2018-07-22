import 'babel-polyfill'
import Koa from 'koa'
const app = new Koa()

import path from 'path'
import fs from 'fs'

import config from 'config'

app.keys = [config.secret]

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort()
middlewares.forEach(m => require('./middlewares/' + m).default(app))

require('./routes').default(app)

import socket from './libs/socket'
const server = app.listen(config.get('port'))
socket(server)
