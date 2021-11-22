module.exports = app => {
  app.route('/cadPct')
    .get((req, res) => {
        res.render('cadPct.ejs', {data: ""})
    })
    
    .post((req, res) => {      
      const pct = req.body

      db.collection('pacientes').insertOne( pct, err => {
        if(err) return console.log(err)

        console.log(`Paciente ${pct.nome} registrado com sucesso.`)

        db.collection('internados').find().toArray((err, lista) => {
          if(err) return console.log(err)    
          res.render('index.ejs', {data: lista, message:"Paciente cadastrado com sucesso"})
        }) 
      })
    })
}