module.exports = app => {
  app.route('/regFAA')
    
    .post((req, res) => {
      const pct = req.body
      
      pct.faa = geraFAA()

      db.collection('atendimento').insertOne( pct, err => {
        if(err) return console.log(err)
          console.log(`Atendimento registrado com sucesso.`)      
          db.collection('internados').find().toArray((err, lista) => {
            if(err) return console.log(err)    
            res.render('index.ejs', {data: lista, message:"Atendimento cadastrado com sucesso."})
          })          
      })
    })

    const geraFAA = () => {
      const max = 4999
      const min = 1000      
      return Math.floor(Math.random() * (max - min) + min)
    }
}