const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/api', function (req, res) {
    res.send('Connected to API');
  })

app.listen(3000)