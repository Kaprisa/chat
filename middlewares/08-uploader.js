import uploader from 'koa2-file-upload'

const options = {
    "url": '/api/upload',
    "storeDir": 'images',
    "provider": "local",
    "mimetypes": ['image/png','image/jpg', 'image/jpeg'],
    "folder": "public"
}

export default app => app.use(uploader(options))
