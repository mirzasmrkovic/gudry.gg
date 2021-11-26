import express from 'express'
import cors from 'cors'
import formidable from 'formidable'
import path from 'path'
import Busboy from 'busboy'
import fs from 'fs'
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
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `)
})

// app.post('/', async (req, res) => {
//   const busboy = new Busboy({ headers: req.headers })
//   // const bucket = new mongodb.GridFSBucket(mongoose.connection.db, {
//   //   bucketName: 'dem'
//   //   // chunkSizeBytes: 261120
//   // })
//   let ops = 0
//   const dec = () =>
//     --ops ||
//     (res.status(200).end("That's all folks!") && console.log('FINISHED!'))

//   busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
//     console.log('downloading')
//     ops++
//     const saveTo = path.join(
//       '../../../Library/Application Support/minecraft/saves',
//       filename
//     )
//     file.pipe(fs.createWriteStream(saveTo))
//     // file.pipe(bucket.openUploadStream(saveTo)).on('finish', dec)
//   })
//   busboy.on('finish', dec)

//   return req.pipe(busboy)
// })
app.post('/', async (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req)

  form.on('fileBegin', function (name, file) {
    console.log('begin')
    file.path =
      '../../../Library/Application Support/minecraft/saves' + file.name
  })
  form.on('file', function (name, file) {
    console.log(name)
    console.log('Uploaded ' + file.name)
    res.status(200).send(file)
  })
})

export const start = async () => {
  // const mongodb_uri = process.env.MONGO_DB
  // const options = {
  //   dbName: 'demofile'
  // }
  // const db = await connection(mongodb_uri, options)
  const server = app.listen(port, () => {
    console.log('Server listening on port: ' + port)
  })
}
