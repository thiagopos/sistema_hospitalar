module.exports = app => {
  app.route('/buscaPct')
    .get((req, res) => {
        res.render('buscaPct.ejs', {data: null, message: null})
    })
    
    .post((req, res) => {
      const pesquisa = req.body.pesquisa
      db.collection('pacientes').find({
        $or:[{ nome: new RegExp(pesquisa, 'i') },
        { cpf: new RegExp(pesquisa, 'i') }]})
        .toArray((err, results) => {
        if (err) return console.log(err)
        if(results !== null){          
          res.render('buscaPct.ejs', {data: results, message: null})
        }
      })
    })
}