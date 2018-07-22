import crypto from 'crypto'

export default (str) =>  {
    return crypto.createHash('md5').update(str).digest('hex').substring(0, 24)
}
