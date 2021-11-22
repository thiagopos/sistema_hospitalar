module.exports = app => {
  app.route('/historicoInter')
    .get((req, res) => {
        res.render('index.ejs', {message: "Paciente não localizado."})
    })
    
    .post((req, res) => {
      const cpf = req.body.cpf
      db.collection('internacao').find({cpf: cpf}).toArray((err, results) => {
        if (err) return console.log(err)
        if(results.length > 0){         
          res.render('historicoInter.ejs', {data: results})
        } else {
          db.collection('internados').find().toArray((err, lista) => {
            if(err) return console.log(err)
            res.render('index.ejs', {data: lista, message:"Paciente não possuí internações."})
          })          
        }
      })
    })
}