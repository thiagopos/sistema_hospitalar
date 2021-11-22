module.exports = app => {
  app.route('/interfaceFAA')
    .get((req, res) => {
      res.redirect('/index')
    })
    
    .post((req, res) => {
      const cpf = req.body.cpf      
      
      db.collection('pacientes').findOne({cpf: cpf}, (err, result) => {
        if (err) return console.log(err)
        if(result !== null){
          res.render('regFAA.ejs', {data: result})          
        }
      })      
    })    
}