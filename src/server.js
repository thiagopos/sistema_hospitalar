const express = require('express')
const app = express()
const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://localhost/hospitalDB"; 
const consign = require('consign')
const port = 3000

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
consign().include('routes').into(app)

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('hospitalDB')
  app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
  })
})



