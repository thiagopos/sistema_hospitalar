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

        res.render('regFAA.ejs', {data: pct})       
      
      })
    })
}