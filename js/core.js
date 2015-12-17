$(document).ready(function(){
	//alcune variabili globali: il nome della canvas sulla quale scriviamo, il context e il logo
	var canvas = document.getElementById("mainCanvas");
	var ctx = canvas.getContext("2d");
	var img=document.getElementById("logo");
	
    //questi Arrays conterranno x e y dei nodi
	var xi = [];
    var yi = [];
	//Arrays che cotengono i punti iniziali dei nodi, che sono generati random
	var xinit = [1];
	var yinit =[1];
	//questi servono come moltiplicatori  per il wiggling dei nodi
	var xcount = [1];
	var ycount = [1];
	//ks mi segna il numero dei nodi presenti
	var ks = xi.length;
	//xs segna il numero dei nodi in movimento
	var xs = xcount.length;
	//global alpha, fading inidiziale
	var alpha = 0;
	
	//array che contiene tutti i fogli XML da parsare
	var fogli = ["http://ansa.feedsportal.com/c/34225/f/621714/index.rss", 
 			 "http://www.google.com/trends/hottrends/atom/feed?pn=p1",
			"http://www.google.com/trends/hottrends/atom/feed?pn=p9",
			"http://ansa.feedsportal.com/c/34225/f/621689/index.rss"
						];

    //array che contiene le parole PRESENTI
    var xmlParse = ["TU"];
	var arXml = 0;
	
	//Array che contiene le parole presenti nei vari fogli xml
    var xmlParse1 = ["TU"];
	var xmlParse2 = ["TU"];
	var xmlParse3 = ["TU"];
	var xmlParse4 = ["TU"];
	//contiene l'indice random dell'elemento dell'array
    var rXml = 0;
	
	//setto altezza e larghezza della canvas simile a quella della finestra che la contiene. 
	//Questo farà in modo che la canvas occuperà il maggior spazio possibile su tutti i dispositivi e tutti i browser
	ctx.canvas.width  = window.innerWidth - 40;
	ctx.canvas.height = window.innerHeight - (window .innerHeight/5);
	


//al click sulla canvas:
$('#mainCanvas').click(function(e){
		
	//setto un limite a X elementi e se xmlParse contiene almeno un elemento
	if (ks < 100 && xmlParse1.length > 1) {

	//ad ogni click, inserisco negli array: 
	
	//coordinate x e y
    xi.push(e.clientX - this.offsetLeft);
	yi.push(e.clientY - this.offsetTop);
    //coordinate x e y iniziali (sono le stesse di prima, ma non verranno modificate in itinere
	xinit.push(xi[ks]);
    yinit.push(yi[ks]);
	//un counter per il movimento
    xcount.push(1);
    ycount.push(1);

    //genero un numero random che identifica l'array da cui sto pescando
    arXml = Math.floor((Math.random()*4)+ 1);	
    //infine genero un numero casuale che mi servirà per pescare dall'array, che sarà
	//grande al massimo quanto il numero di elementi presenti nell'array scelto in maniera
	//casuale da arXml
	rXml = Math.floor(Math.random()* "xmlParse . arXml".length);	
	//con eval() gli dico di pushare l'elemento pescato random da rXml
	//e dall'array pescato random da arXml
	//all'interno dell'array generale xmlParse
	xmlParse.push(eval("xmlParse"+arXml)[rXml]);

};
});
	
//ora disegnamo sulla canvas, evviva!
function drawIt() {
	
//aggiorno il counter. il lenght mi risponde con il numero di elementi in un array
ks = xi.length;
xs = xcount.length;
//cancello la canvas ad ogni ciclo
ctx.clearRect(0, 0, canvas.width, canvas.height);
//ecco il motore di tutto! per ogni elemento inserito, faccio gestire il movimento e ciò che contiene (nodo + parola/frase)
for (k = 0; k<=ks; k++){
	//muovi l'elemento cambiandone x e y
	ctx.moveTo(xi[k], yi[k] );
	
	//settiamo stile e posizione delle scritte
	//Se pesca "tu" la scritta sarà più grande
	if(xmlParse[k] == "TU") {
	ctx.font="18px Arial";
	} else {
	ctx.font="14px Verdana";
	}
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
	
	//serie di if per posizionare le parole agli angoli della canvas e non farli uscire a metà!
	//se è al margine ovest
	if(xmlParse[k] != undefined) {
	
if (xinit[k] > ctx.canvas.width - ctx.measureText(xmlParse[k]).width ){
	 ctx.fillText(xmlParse[k], xi[k] - ctx.measureText(xmlParse[k]).width - 10 , yi[k] +8);
	 //se è al margine est
}else if (xinit[k] < ctx.measureText(xmlParse[k]).width ){
	ctx.fillText(xmlParse[k], xi[k] + 13 , yi[k] +8);
	//se è al margine sud
}else if (yinit[k] > ctx.canvas.height - 50 ){
	ctx.fillText(xmlParse[k], xi[k] - ctx.measureText(xmlParse[k]).width/2 - 13 , yi[k] - 13);
//in tutti gli altri cas
} else {
	ctx.fillText(xmlParse[k], xi[k] - ctx.measureText(xmlParse[k]).width/2, yi[k] + 23);
};
}



	
	//creazione nuovi nodi
    ctx.beginPath();
	ctx.strokeStyle = "rgba(0,0,0,0)"
	ctx.arc(xi[k], yi[k], 5, 0, 2*Math.PI, false);
	if(xi[k] < ctx.canvas.width / 3) {
	ctx.fillStyle = "rgba(189, 23, 41," + nodeAlpha + ")";
	}else if (xi[k] > ctx.canvas.width - (ctx.canvas.width / 3)) {
	ctx.fillStyle = "rgba(240, 146, 1," + nodeAlpha + ")";
	} else {
	ctx.fillStyle = "rgba(230, 82, 30," + nodeAlpha + ")";
	}
	
	//nodi esterni
	ctx.fill();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle = "rgba(0,0,0,0)"
	ctx.arc(xi[k], yi[k], nodeG, 0, 2*Math.PI, false);
	if(xi[k] < ctx.canvas.width / 3) {
	ctx.fillStyle = "rgba(189, 23, 41," + nodeAlpha - 0.4 + ")";
	}else if (xi[k] > ctx.canvas.width - (ctx.canvas.width / 3)) {
	ctx.fillStyle = "rgba(240, 146, 1," + nodeAlpha - 0.4 + ")";
	} else {
	ctx.fillStyle = "rgba(230, 82, 30," + nodeAlpha - 0.4 + ")";
	}
	
	
	ctx.fill();
	ctx.stroke();
	
	
	//creazione linee
	ctx.beginPath();
	ctx.lineWidth = "1";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.05)"; 
	//questi generano linee con i punti precedenti!
	ctx.lineTo(xi[k+1], yi[k+1] );
	ctx.lineTo(xi[k-1], yi[k-1] );
	ctx.lineTo(xi[k-2], yi[k-2] );
	ctx.lineTo(xi[k+2], yi[k+2] );
	ctx.stroke();
		
};

//qui si genera il movimento dei nodi
//per tutti i nodi presenti:
for (z = 0; z < xs; z++){
//aumenta il counter ad ogni ciclo: se è minore della x iniziale meno cinque o maggiore della x iniziale più 10
//cambia il segno dell'xcount ovver: torna indietro!
if (xi[z] < xinit[z] - 5 || xi[z] > xinit[z] + 10) { 
xcount[z] = xcount[z]*-1;
}; 
xi[z] = xi[z] + xcount[z];

//stessa cosa con la y
if (yi[z] < yinit[z] - 5 || yi[z] > yinit[z] + 5) { 
ycount[z] = ycount[z]*-1;
}; 
yi[z] = yi[z] + ycount[z];
}

//log per il debug, vuoto
console.log();
}
	
//refresh rate del drawIt: 60ms
window.setInterval(drawIt, 60);

//piccola funzione per il fadeIn iniziale
function imgFadeIn() {
//setta l'alpha globale come alpha
	ctx.globalAlpha = alpha;
	//incrementa di un valore piccolissimo ad ogni ciclo, finchè alpha non è uguale ad uno, dopodichè smetti.
	if (alpha < 1) {
	alpha = alpha+0.01;
	}
//disegnami il logo al centro
ctx.drawImage(img, canvas.width/2 - 64 , canvas.height/4);
}

//refresh rate del fade in: 60 ms
window.setInterval(imgFadeIn, 60);

//cambio opacità dei nodi
var nodeAlpha = 0.2;
var nodeCounter = 0.01;

function nodeOpacity () {
nodeAlpha = nodeAlpha + nodeCounter;

if (nodeAlpha > 0.7 || nodeAlpha < 0.1) {
nodeCounter = nodeCounter * -1;
};
}
window.setInterval(nodeOpacity, 60);

//cambio grandezza nodo esterno
var nodeG = 6;
var nodeGCounter = 0.1;

function nodeWidth(){
nodeG = nodeG + nodeGCounter;

if (nodeG > 13 || nodeG < 5) {
nodeGCounter = nodeGCounter * -1;
};
console.log(nodeG);
}

window.setInterval(nodeWidth, 60);


//sua magnificenza JSON! Fammi il parsing di un foglio xml esterno


			


pars(0, xmlParse1);
pars(1, xmlParse2);
pars(2, xmlParse3);
pars(3, xmlParse4);




function pars(f, arr) {
	$.ajax({
		    url: fogli[f],
		    dataType: "xml",
		    type: 'GET',
		    success: function(res) {
				var myXML = res.responseText;
				// qui entra in gioco JSON!
				var JSONConvertedXML = $.xml2json(myXML);
				//fammi il parsing di ogni elemento channel per un numero uguale a quanti elementi channel trovi
				for(var i = 0; i < JSONConvertedXML.channel.item.length; i++){
					
				arr.push(JSONConvertedXML.channel.item[i].title);
				}
			}
				});
				

					
			    
}

});