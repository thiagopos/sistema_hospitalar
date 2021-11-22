module.exports = app => {
  app.route('/regSaida')
    .get((req, res) => {
        res.render('index.ejs', {message: "Paciente não localizado."})
    })
    
    .post((req, res) => {
      const faa = req.body.faa
      db.collection('internados').findOneAndDelete({faa: faa}, err => {
        if (err) return console.log(err)
        db.collection('internados').find().toArray((err, lista) => {
          if(err) return console.log(err)
          res.render('index.ejs', {data: lista, message:"Alta do paciente registrada."})
        }) 
      })
    })
}