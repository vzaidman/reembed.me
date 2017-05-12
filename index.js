const express = require('express')
const request = require('request')

const cors = require('cors')
const app = express()

app.use(cors())

app.set('port', (process.env.PORT || 5000))

app.get('/favicon.ico', function(req, res){
  res.sendFile('favicon.ico', {root: __dirname + '/public'})
})

app.get('/api/v1/fetchWebsite', function(req, res){
  const url = req.query.url
  req.pipe(request(url)).pipe(res)
})

app.use('/images', express.static(__dirname + '/public/images'))

app.use('/', express.static(__dirname + '/public/client'))

app.get('*', function(req, res){
  res.sendFile('redirect.html', {root: __dirname + '/public'})
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'))
})