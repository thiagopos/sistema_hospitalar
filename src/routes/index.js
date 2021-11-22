module.exports = app => {
  app.route('/index')
    .get((req, res) => {
      db.collection('usuario').findOne({usuario: user.usuario}, (err, result) => {
        if(err) return console.log(err)
        if(result.senha === user.senha){
          res.render('index.ejs', {data: result.nome})
        }else{
          res.render('login.ejs', {data: "Dados incorretos"})
        }
      })
      res.render('index.ejs')
  })
}