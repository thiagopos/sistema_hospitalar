module.exports = app => {
  app.route('/index')  
    .get((req, res) => { 
      db.collection('internados').find().toArray((err, lista) => {
        if(err) return console.log(err)

        res.render('index.ejs', {data: lista, message: "Pacientes Internados"})
      })      
  })
}