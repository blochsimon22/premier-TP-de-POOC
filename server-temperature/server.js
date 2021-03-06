const express = require('express')
const app = express()
const port = 3000

//On initialise notre utilitaire node pour communiquer avec le capteur 
//(capteur = sensor en anglais)
const sensor = require('ds18b20');
//Identifiant de notre capteur, remplacez les X par ce que vous avez eu précédemment.
const sensorId = '28-01131a3eb0d1';
//On lit la température en provenance du capteur.
var temperature = sensor.temperatureSync(sensorId);
//On affiche dans le terminal la température.
console.log('La température est de ' + temperature);

const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
//Création d'une variable qui va nous permettre d'accéder à un GPIO du raspberry  
//⚠️ Le nombre passé en paramètre correspond au numéro de GPIO et non au numéro de la pin.
const ledr = new Gpio(18, 'out');
const ledb = new Gpio(24, 'out');



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

//On retrouve le même comportement que notre serveur précédent
app.get('/', (request, response) => {

  //Ici on indique que nous voulons transformer notre fichier index.mustache en HTML
  response.render('index');
})

app.get('/hello/:name', (request, response) => {

  //De la même manière nous transformons notre fichier hello.mustache en HTML en passant des paramètres.
  response.render('hello', {name: request.params.name});
})

app.listen(port, (err) => {
  if (err) {
    return console.log('Erreur du serveur : ', err)
  }

  //On utilise l'utilitaire OS pour récupérer le nom de notre raspberry.
  console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);
})


app.get('/', (request, response) => {
//Ici on indique que nous voulons transformer notre fichier index.mustache en HTML
    response.render('index')
  })

app.get('/temp', (request, response) => {

	var temperature = sensor.temperatureSync(sensorId);
	response.render('temp', {temperature});
        
})

app.get('/on', (request, response) => {

        console.log('Led On');
        led.writeSync(1);
        response.render('pooc');
})

app.get('/off', (request, response) => {

        console.log('Led Off');
        led.writeSync(0);
        response.render('pooc');
})



process.on('SIGINT', () => {
  led.unexport();
});
