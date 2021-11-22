module.exports = app => {
  app.route('/index')
    .get((req, res) => { 
      db.collection('internados').find().toArray((err, results) => {
        if(err) return console.log(err)

        res.render('index.ejs', {data: results})
      })
      
  })
}