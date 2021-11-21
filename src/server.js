const express = require('express')
const app = express()
const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://localhost/hospitalDB"; 
const consign = require('consign')
const port = 3000

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
consign().include('controllers').into(app)

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('hospitalDB')
  app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
  })
})

app.set('view engine', 'ejs')

app.route('/') 
.get((req, res) => {  
  res.render('index.ejs')
})

.post((req, res) => {
  db.collection('data').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Salvo no Banco de Dados')
    res.redirect('/show')
  })
})

app.route('/show')
.get((req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('show.ejs', { data: results })
  })
})

app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname

  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})