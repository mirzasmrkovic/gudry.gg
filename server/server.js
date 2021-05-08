import express from 'express'
import cors from 'cors'
import formidable from 'formidable'

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/form" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" accept=".dem" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `)
})

app.post('/form', async (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req)

  form.on('fileBegin', function (name, file) {
    console.log('begin')
    file.path = __dirname + '/uploads/' + file.name
  })
  form.on('file', function (name, file) {
    console.log(name)
    console.log('Uploaded ' + file.name)
    res.status(200).send(file)
  })
})

export const start = () => {
  const server = app.listen(port, () => {
    console.log('Server listening on port: ' + port)
  })
}
