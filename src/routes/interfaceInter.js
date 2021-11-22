module.exports = app => {
  app.route('/interfaceInter')
    .get((req, res) => {
      res.redirect('/index')
    })
    
    .post((req, res) => {
      const cpf = req.body.cpf      
      db.collection('atendimento').find({cpf: cpf}).toArray((err, result) => {
        if (err) return console.log(err)
        if(result !== null){
          res.render('regInter.ejs', {data: result[result.length-1]})          
        } else {
          res.render('index.ejs', {mesage: "Paciente não possui FAA"})
        }
      })      
    })    
}