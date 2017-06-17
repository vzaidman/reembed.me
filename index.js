const path = require('path')
const express = require('express')
const request = require('request')
const cors = require('cors')
const bodyParser = require('body-parser')
const normalizeUrl = require('normalize-url')

const Datastore = require('nedb')

const PORT = process.env.PORT || 3000

const db = new Datastore({ filename: __dirname + '/database.db', autoload: true })

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.set('view engine', 'jade')
app.set('views', __dirname + '/public')

app.use('/', express.static(__dirname + '/public'))
app.use('/', express.static(__dirname + '/client-dist'))

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
  const origin = req.headers.origin
  db.insert(reembedFields, function(err, newDoc){
    if(err){
      res.error(err)
      return
    }
    const id = newDoc._id
    res.send({reembeddedUrl: normalizeUrl(`${origin}/${id}`)})
  })
})


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
  })
})

app.listen(PORT, function () {
  console.log('app listening on port', PORT)
})
