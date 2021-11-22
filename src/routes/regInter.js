module.exports = app => {
  app.route('/regInter')
    
    .post((req, res) => {
      const pct = req.body
      
      pct.rh = pct.cpf.substring(3,8)

      db.collection('internados').insertOne( pct, err => {
        if(err) return console.log(err)
          console.log("Internação registrada")
      })

      db.collection('internacao').insertOne( pct, err => {
        if(err) return console.log(err)
          console.log(`Internação registrado com sucesso.`)
          db.collection('internados').find().toArray((err, lista) => {
            if(err) return console.log(err)    
            res.render('index.ejs', {data: lista, message:"Internação cadastrada com sucesso."})
          })          
      })
    })    
}