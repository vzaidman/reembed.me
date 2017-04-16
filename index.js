var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))

app.use('/images', express.static(__dirname + '/public/images'))

app.get('*', function(req, res){
  res.sendfile('index.html', {root: __dirname + '/public'});
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'))
})