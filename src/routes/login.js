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
          db.collection('internados').find().toArray((err, lista) => {
            if(err) return console.log(err)    
            res.render('index.ejs', {data: lista, message:"Usuário Logado."})
          })   
        }else{           
          res.render('login.ejs', {data: "Dados incorretos"})
        }
      })
    })
}