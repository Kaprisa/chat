import crypto from 'crypto'

export default (str) =>  {
    return crypto.createHash('md5').update(str).digest('hex').substring(0, 24)
}

// export const withTime = (str) => {
//     const time = Math.floor(Date.now() / 1000).toString(16)
//     while (time.length < 8) {
//
//     }
// }
