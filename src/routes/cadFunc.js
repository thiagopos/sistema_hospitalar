module.exports = app => {
  app.route('/cadFunc')
    .get((req, res) => {
        res.render('cadFunc.ejs', {data: ""})
    })
    
    .post((req, res) => {      
      const user = req.body

      if(user.senha != user.senha2) {
        console.log(user.senha + "   " + user.senha2 + "ein?")
        res.render('cadFunc.ejs', {data: "Senhas não conferem"})
      } else {
        delete user.senha2
      
        db.collection('usuario').insertOne( user, err => {
          if(err) return console.log(err)
  
          console.log(`Usuario ${user.nome} registrado com sucesso.`)
          db.collection('internados').find().toArray((err, lista) => {
            if(err) return console.log(err)    
            res.render('index.ejs', {data: lista, message:"Funcionário cadastrado com sucesso."})
          })
        })
      }
    })
}