module.exports = app => {
  app.route('/sobre')
    .get((req, res) => {
        res.render('Sobre.ejs')
    }) 
}