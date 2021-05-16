import express from 'express'
import cors from 'cors'
import path from 'path'
import Busboy from 'busboy'
import mongodb from 'mongodb'
import mongoose from 'mongoose'
import { connection } from './utils/db'

const port = process.env.PORT || 4000
const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" accept=".dem" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `)
})

app.post('/', async (req, res) => {
  const busboy = new Busboy({ headers: req.headers })
  const bucket = new mongodb.GridFSBucket(mongoose.connection.db, {
    bucketName: 'dem'
    // chunkSizeBytes: 261120
  })
  let ops = 0
  const dec = () => --ops || res.status(200).end("That's all folks!")

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    ops++
    const saveTo = path.join('.', filename)
    file.pipe(bucket.openUploadStream(saveTo)).on('finish', dec)
  })
  busboy.on('finish', dec)

  return req.pipe(busboy)
})

export const start = async () => {
  const mongodb_uri = process.env.MONGO_DB
  const db = await connection(mongodb_uri)
  const server = app.listen(port, () => {
    console.log('Server listening on port: ' + port)
  })
}
