
/**
 * Verkefni 7 – Gisk leikur
 *
 * Útfæra leik sem snýst um að giska á tölu milli 0 og 100.
 */

/**
 * global fylki sem geymir fjölda ágiskana í leikjum
 * Ef fylki er tómt hefur engin leikur verið spilaður.
 * Ef fylki er [2, 3] hafa verið spilaðir tveir leikir þar sem:
 *   - Fyrsti kláraðist í tveim ágiskunum
 *   - Seinni kláraðist í þrem ágiskunum
 */
var games = [];
var index = 0;


/**
 * Byrjar leikinn okkar með því að kalla í play().
 * Eftir að að play() klárar, bíður notanda að spila annan leik með confirm()
 * Ef notandi ýtir á "ok" er annar leikur spilaður
 * Ef ýtt er á "cancel" er niðurstöðum leikja skilað með getResults() og alert()
 */
function start() {
  play();
}

/**
 * Spilar einn leik. Sér um að:
 *   - Velja handahófskennda tölu í byrjun með randomNumber()
 *   - Biðja notanda um tölu með prompt()
 *   - Vinna úr inntaki frá notanda með parseGuess()
 *   - Láta vita hversu nálægt eða rétt gisk er með getResponse() og alert()
 *   - Halda utan um fjölda ágiskana
 *   - Vista fjölda ágiskana "games" fylki þegar búið að giska rétt
 *
 * Ef notandi ýtir á "cancel" þegar beðið er um ágiskun skal hætta í leik en
 * ekki vista ágiskanir (nota "break" í lykkju.)
 *
 * Þarf að útfæra með lykkju og flæðistýringum.
 */
function play() {
  games[index] = 0;
  // næsta lína kastar villu sem má sjá í "console" undir DevTools
  var random = randomNumber(100);
  var a = window.prompt("Giskaðu á tölu milli 0 og 100");
  if(!a){
    return;
  }
  var guess = parseGuess(a);

  while(guess != random){
    games[index]++;
    window.alert(getResponse(guess,random));
    a = window.prompt("Giskaðu á tölu milli 0 og 100");
    guess = parseGuess(a);
  }

  window.alert(getResponse(guess,random));
  games[index]++;

  var annanleik = window.confirm("Spila annan leik?");
  if(!annanleik){
    return window.alert(getResults());
  }
  index++;
  play();
}



/**
 * Skilar niðurstöðum um spilaða leiki sem streng.
 * Fjölda leikja er skilað ásamt meðalfjölda giska, t.d.:
 *   "Þú spilaðir 10 leikir
 *    Meðalfjöldi ágiskana var 6"
 * Ath að meðalfjöldi kemur í nýrri línu.
 * Ef enginn leikur var spilaður er "Þú spilaðir engan leik" skilað.
 */
function getResults() {
  if(games.length === 0){
    return "Þú spilaðir engan leik";
  }
  var medalfjoldi = calculateAverage();
  var strmedalfjoldi = medalfjoldi.toString();
  var strlengd = games.length.toString();

  return " þú spilaðir " + strlengd  + " leikir \n Meðalfjöldi ágiskana var " + strmedalfjoldi;


}

/**
 * Reiknar út og skilar meðal ágiskunum í öllum leikjum sem geymdir eru í
 * global breytu "games". Skilar gildi með tveim aukastöfum.
 * Ef games = [3, 4, 4] er niðurstaðan
 * (3 + 4 + 4) / 3 = 3.666666667
 * og er henni skilað sem 3.67
 *
 * Þarf að útfæra með lykkju.
 */
function calculateAverage() {
  var teljari = 0;
  for(var i = 0; i<games.length; i++){
    teljari += games[i];
  }
  return teljari/games.length;
  console.log(teljari/games.length);
}

/**
 * Tekur inn input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
 * Ef ekki er hægt að ná tölu úr input er null skilað.
 */
function parseGuess(input) {
  var number = parseInt(input, 10);
  if(!Number.isInteger(number)){
    return null;
  }
  return number;
}

/**
 * Skilar svari sem birta á notanda sem streng, tekur inn tvær breytur
 *   - guess sem tölu, ágiskun notanda
 *   - correct sem tölu, rétt gildi
 * Ef guess er < 0 eða ekki tala skal skila strengnum "Ekki rétt"
 * Ef guess er nákvæmlega sama og correct skal skila strengnum "Rétt"
 * Ef munur er undir 5 (|correct - guess| < 5) skal skila "Mjög nálægt"
 * Ef munur er undir 10 skal skila "Nálægt"
 * Ef munur er undir 20 skal skila "Frekar langt frá"
 * Ef munur er undir 50 skal skila "Langt frá"
 * Annars skal skila "Mjög langt frá"
 *
 * Þarf að útfæra með flæðistýringu.
 * Math.abs skilar algildi tölu: |a| = Math.abs(a)
 */
function getResponse(guess, correct) {
  if(guess < 0 || guess === null || guess > 100){
    return "Ekki rétt";
  }

  var munur = Math.abs(correct - guess);
  if(guess === correct){

    return "Rétt";
  }
  if(munur < 5){
    return "Mjög nálægt";
  }
  if(munur < 10){
    return "Nálægt";
  }
  if(munur < 20){
    return "Frekar langt frá";
  }
  if(munur < 50){
    return "langt frá";
  }
  if(munur >= 50){
    return "Mjög langt frá";
  }
}

/**
 * Skilar tölu af handahófi frá [0, n]
 */
function randomNumber(n) {
  return Math.floor(Math.random() * (n + 1));
}

// Byrjar leik
start();
