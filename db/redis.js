import redis from 'redis'
import config from 'config'
import util from 'util'
import errorHandler from '../helpers/errorHandler'

const client = redis.createClient(config.redis.url)

client.get = util.promisify(client.get)

export const getCached = async (key) => {
    try {
        const cached = await client.get(key)
        if (cached)
            return JSON.parse(JSON.parse(cached).data)
        return null
    } catch (e) {
        errorHandler(e)
        return null
    }
}

export const setCached = async (key, data) => {
    try {
        await client.set(key, JSON.stringify({data}))
    } catch (e) {
        errorHandler(e)
    }
}

export const flush = async _ => {
    try {
        await client.flushdb()
    } catch (e) {
        errorHandler(e)
    }
}
