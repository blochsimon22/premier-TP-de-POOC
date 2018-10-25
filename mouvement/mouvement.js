//Initialisation de l'utilitaire Onoff pour gérer
//les GPIOs du raspberry
const Gpio = require('onoff').Gpio;
const sleep = require('sleep');
//Initialisation de notre GPIO 17 pour recevoir un signal
//Contrairement à nos LEDs avec lesquelles on envoyait un signal
var sensor = new Gpio(17, 'in', 'both');
const ledr = new Gpio(18, 'out');
const ledb = new Gpio(24, 'out');
const bzr = new Gpio(22, 'out');

//Fonction pour quitter le script
function exit() {
	sensor.unexport();
	process.exit();
}

//Ici on "surveille" le GPIOs 17 (correspondant au capteur)
//Dès qu'il y a du mouvement cette partie du code sera exécuté.
sensor.watch(function (err, value) {
	if(err) exit();
	//Si le capteur détecte du mouvement 
	//On affiche 'Mouvement détecté'
	if(value == 1) {
		console.log('Mouvement détecté !');
		ledr.writeSync(1);
		bzr.writeSync(1);
		sleep.sleep(1);
		ledr.writeSync(0);
		bzr.writeSync(0);
	}

	 else {
		console.log('fin du mouvement');
	}
});
