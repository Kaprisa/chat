import pug from 'pug'
import config from 'config'
import path from 'path'

export default app => app.use(async function(ctx, next) {
    ctx.render = function(templatePath, locals) {
        locals = locals || {}
        locals.public_path = path.resolve(__dirname, '../public')
        const templatePathResolved = path.join(config.template.root, templatePath + '.pug')
        return pug.renderFile(templatePathResolved, locals)
    }
    await next()
})
