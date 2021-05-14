import express from 'express'
import cors from 'cors'
import os from 'os'
import fs from 'fs'
import path from 'path'
import Busboy from 'busboy'
import { connect } from './utils/db'

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 4000

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

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('file')
    const saveTo = path.join(os.tmpdir(), path.basename(fieldname))
    file.pipe(fs.createWriteStream(saveTo))
  })
  busboy.on('finish', function () {
    return res.status(200).end()
  })

  return req.pipe(busboy)
})

export const start = async () => {
  const db = process.env.MONGO_DB
  await connect(db)
  const server = app.listen(port, () => {
    console.log('Server listening on port: ' + port)
  })
}
