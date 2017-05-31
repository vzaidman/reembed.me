const path = require('path')
const express = require('express')
const request = require('request')
const cors = require('cors')
const bodyParser = require('body-parser')

const Datastore = require('nedb')
const urijs = require('urijs')

const PORT = process.env.PORT || 5555
const HOST = process.env.HOST || 'localhost'
const BASE_URL = urijs(`http://${HOST}:${PORT}`).normalize().toString()

const db = new Datastore({ filename: path.join(__dirname, 'database.db'), autoload: true })

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.set('view engine', 'jade')
app.set('views', __dirname + '/public')

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
  const reembedFields = req.body
  db.insert(reembedFields, function(err, newDoc){
    if(err){
      res.error(err)
      return
    }
    const id = newDoc._id
    res.send(id)
  })
})

app.use('/images', express.static(__dirname + '/public/images'))

app.use('/', express.static(__dirname + '/public/client'))

app.get('/:id', function(req, res){
  const id = req.params.id
  db.findOne({ _id: id }, function (err, doc) {
    if(err){
      res.error(err)
      return
    }

    if(!doc){
      res.sendFile('not-found.html', {root: __dirname + '/public'})
      return
    }

    res.render('redirect.jade', doc)
  });
})

app.listen(PORT, function () {
  console.log('Example app listening on port', PORT)
})