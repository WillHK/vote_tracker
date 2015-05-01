var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/secret', function(req, res) {
  res.status(200).send('The secret is that kittens are aliens who feed on human admiration. Don\'t let them feed on you.');
})

app.get('/*', function(req, res) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(process.env.PORT || 5000, function() {
  console.log('Server Operational.');
});
