 const express = require('express')
  const app = express()
  const port = 3000

//OS est un utilitaire node qui va nous servir à afficher le nom de notre raspberry
const os = require("os");
//MustacheExpress est notre moteur de template
const mustacheExpress = require('mustache-express');

//Configuration du moteur de template
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//Ici on dit au serveur de servir les fichiers statiques depuis le dossier /public
app.use(express.static('public'))

  app.get('/', (request, response) => {
//Ici on indique que nous voulons transformer notre fichier index.mustache en HTML
    response.render('index')
  })

app.get('/pooc', (request, response) => {

	response.render('pooc')
})

//De la même manière nous transformons notre fichier hello.mustache en HTML en passant des paramètres.
  app.get('/hello/:name', (request, response) => {
response.render('hello', {name: request.params.name});
})
  app.listen(port, (err) => {
    if (err) {
      return console.log('Erreur du serveur : ', err)
    }
    console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);
  })
