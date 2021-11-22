module.exports = app => {
  app.route('/')
    .get((req, res) => {
        res.render('login.ejs', {data: ""})
    })
    
    .post((req, res) => {
      const user = req.body      
      db.collection('usuario').findOne({usuario: user.usuario}, (err, result) => {
        if(err) return console.log(err)
        if(result.senha === user.senha){
          res.render('index.ejs', {data: result.nome})
        }else{
          res.render('login.ejs', {data: "Dados incorretos"})
        }
      })
    })
}