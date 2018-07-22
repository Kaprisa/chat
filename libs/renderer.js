import fs from 'fs'
import { createRenderer } from 'vue-server-renderer'

const renderer = createRenderer({
    template: fs.readFileSync('./src/index.html', 'utf-8')
})
