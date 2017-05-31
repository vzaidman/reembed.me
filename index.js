const express = require('express')
const request = require('request')
const cors = require('cors')

const Datastore = require('nedb')
const urijs = require('urijs')

const PORT = process.env.PORT || 80
const HOST = process.env.HOST || 'localhost'
const BASE_URL = urijs(`http://${HOST}:${PORT}`).normalize().toString()

const db = new Datastore({ filename: path.join(__dirname, 'database.db'), autoload: true })

const app = express()

app.use(cors())

app.get('/favicon.ico', function(req, res){
  res.sendFile('favicon.ico', {root: __dirname + '/public'})
})

app.get('/api/v1/fetchWebsite', function(req, res){
  const url = req.query.url
  const headers = {
    'Accept': 'text/html;charset=utf-8',
    'Accept-Charset': 'utf-8'
  }
  req.pipe(request({url , headers})).pipe(res)
})

app.post('/api/v1/requestReembed', function(req, res){
  const reembedFields = req.params
  db.insert(reembedFields, function(err, newDoc){
    if(err){
      res.error(err)
      return
    }

    const id = newDoc.id
    const reembeddedUrl = BASE_URL + newDoc.id
    res.send(reembeddedUrl)
  })
})

app.use('/images', express.static(__dirname + '/public/images'))

app.use('/', express.static(__dirname + '/public/client'))

app.get('*', function(req, res){
  res.sendFile('redirect.html', {root: __dirname + '/public'})
})

app.listen(BASE_URL, function () {
  console.log('Example app listening on port', app.get('port'))
})