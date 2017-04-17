var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))

app.get('/favicon.ico', function(req, res){
  res.sendFile('favicon.ico', {root: __dirname + '/public'})
})

app.get('/redirect/*', function(req, res){
  res.sendFile('redirect.html', {root: __dirname + '/public'})
})

app.use('/images', express.static(__dirname + '/public/images'))

app.use('/', express.static(__dirname + '/public/client'))

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'))
})