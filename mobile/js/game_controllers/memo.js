var memorygamediv = "#bdmemorygame";
var boxopened = "";
var imgopened = "";
var count = 0;
var found =  0;
var serverurl = 'http://localhost:1921/aj/memory.ashx';
var params = {};
var gameOverPage = '../index.html';

function createButton(label, func){
	$(".menu", $(memorygamediv)).append('<a href="javascript: ' + func + '" class="button startBtn">Starte das Spiel!</a>');
}

function clearMenu(){
	$(".menu", $(memorygamediv)).empty();
}

function displayText(text){
	$("#hinttext", $(memorygamediv)).empty();
	$("#hinttext", $(memorygamediv)).prepend(text);
}

function setPicsAndLinks(){
	
	var hor = options.hor;
	var vert = options.vert;
	serverurl = options.serverurl || serverurl;
	params.id = options.id;
	params.mode = options.mode;
	var cardNumber = 0;
	var pictureNumber = 0;
	
	for (var i=0; i<hor*vert; i++) {
		if (pictureNumber == hor * vert / 2) pictureNumber = 0;
		$(".card:eq(" + cardNumber + ")", $(memorygamediv)).attr("id","card" + (cardNumber+1));
		$(".card img:eq(" + cardNumber + ")", $(memorygamediv)).attr("src",options.pics[pictureNumber].img);
		cardNumber++;
		pictureNumber++;
	}

}

function createCards(){

	var hor = options.hor;
	options.facebook = options.facebook || {};
	var vert = options.vert;
	var table = '<table align="center">';
	       	
	for (var i=0; i<hor; i++) {
		table += '<tr>';
		for	(var j=0; j<vert; j++) {
			table += '<td><div class="card"><a target="_blank"><img /></a></div></td>';
		}
		table += '</tr>';
	}
	table += '</table>';

	$(".memorycards", $(memorygamediv)).append(table);
	
	setPicsAndLinks();
	
	//Gr��e der Karten
	var width = "95px";
	if (options.vert > 4) width = "65px"; 
	
	$(".card", $(memorygamediv)).css('height', width);
	$(".card", $(memorygamediv)).css('width', width);
	$(".card img", $(memorygamediv)).css('height', width);
	
	$(".card", $(memorygamediv)).css('background-image', 'url("' + options.logo + '")');
}

function enableCards() {
    $(".card", $(memorygamediv)).bind("click", openCard);
	$(".card", $(memorygamediv)).addClass("clickable");
}

function disableCards() {
    $(".card", $(memorygamediv)).unbind("click", openCard);
	$(".card", $(memorygamediv)).removeClass("clickable");
}

function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function shuffle() {

	var children = $(".card", $(memorygamediv)).children();
    var array_img = new Array();

    for (var i=0; i<children.length; i++) {
        array_img[i] = $(".card:eq(" + i + ")", $(memorygamediv)).clone();
    }

    for (var k=0; k<children.length; k++) {
    	randIndex = randomFromTo(0, array_img.length - 1);
        $(".card:eq(" + k + ")", $(memorygamediv)).replaceWith(array_img[randIndex]);
        array_img.splice(randIndex, 1);
    }
}

function resetGame() {
	
	$(".memorycards", $(memorygamediv)).fadeOut(1);

	setPicsAndLinks();
    shuffle();
    $("img", $(memorygamediv)).hide();
    $("img", $(memorygamediv)).removeClass("opacity");
    
    count = 0;
    $("#msg", $(memorygamediv)).remove();
    if (options.mode == "count") $("#count", $(memorygamediv)).html("" + count);
    boxopened = "";
    imgopened = "";
    found = 0;
    
	$("#userdata", $(memorygamediv)).addClass("hide");
	$(".memorycards", $(memorygamediv)).fadeIn(1);

}

function setImageLink(imgsource) {

	for (var i = 0; i < options.pics.length; i++) {
		if (options.pics[i].img == imgsource && options.pics[i].link) {
			$('img[src="' + imgsource + '"]', $(memorygamediv)).parent().attr('href', options.pics[i].link);
		}
	}
}

function openCard() {

    count++;

    id = $(this).attr("id");

    if ($("#"+id+" img", $(memorygamediv)).is(":hidden")) {
        disableCards();

        $("#"+id+" img", $(memorygamediv)).slideDown('fast');

        if (options.mode == "gutschein") {

        	found++;
            
            //Serverkommunikation Fang den Gutschein
            displayText("Warten auf Antwort vom Server...");
            var currentopened = $("#"+id+" img", $(memorygamediv)).attr("src").split('/').pop();
        	var obj = { card: currentopened };
        	for (var p in params){
        		if (params.hasOwnProperty(p)){
        			obj[p] = params[p];
        		}
        	}

            $.getJSON(serverurl + '?callback=?', {'q': 'click', 'd' : $.toJSON(obj)}, 
        	function (data, textStatus, jqXHR){
                displayText("&nbsp;");
        		if (data){
                    $("#"+id+" img", $(memorygamediv)).attr("src",options.gutschein);
                    $("#"+id+" a", $(memorygamediv)).removeAttr("href");
        		if (count == 9) {
                            msg = '<span id="msg">Finish</span>';
                            $("span.button", $(memorygamediv)).empty();
                            $("span.button", $(memorygamediv)).prepend(msg);
                            $("#result", $(memorygamediv)).val("Gutschein");
                            userForm();
        			} else {
	                    msg = '<span id="msg">Game Over! </span>';
	                    $("span.button", $(memorygamediv)).empty();
	                    $("span.button", $(memorygamediv)).prepend(msg);
        			}
        		} else {
	                setTimeout(function() {
                        enableCards();
                    }, 300);
        		}
        	});

        } else {
        	
            if (imgopened == "") {
                boxopened = id;
                imgopened = $("#"+id+" img", $(memorygamediv)).attr("src");
                setTimeout(function() {
                    enableCards();
                }, 300);
            } else {
                var currentopened = $("#"+id+" img", $(memorygamediv)).attr("src");
                if (imgopened != currentopened) {
                    // kein Paar
                    setTimeout(function() {
                        $("#"+id+" img", $(memorygamediv)).slideUp('fast');
                        $("#"+boxopened+" img", $(memorygamediv)).slideUp('fast');
                        boxopened = "";
                        imgopened = "";
                    }, 400);
                } else {
                    // Paar gefunden
                    $("#"+id+" img", $(memorygamediv)).addClass("opacity");
                    $("#"+boxopened+" img", $(memorygamediv)).addClass("opacity");
                    setImageLink(imgopened);
                    found++;
                    boxopened = "";
                    imgopened = "";
                }
                
                setTimeout(function() {
                    enableCards();
                }, 400);
                
            }

            if (options.mode == "count") $("#count", $(memorygamediv)).html("" + count);

            if (found == options.hor * options.vert / 2) {
                // fills the form fields according to the result and sends the form
            	$('.appNavigator').submit();          	
            }
    	}
    }
}

function userForm() {
	$("#userdata", $(memorygamediv)).removeClass("hide");
	displayText($(options.senden_text_template).html());
}

function postOnFacebook() {
    displayText("Posten auf Facebook...");

	//Achtung: Funktion fehlerhaft bei mehrmaligem Aufruf, sobald die folgende Variable au�erhalb der Funktion steht.
    var facebookhighscore = {
	       		method: 'feed',
	       		display: 'popup',
	       		name: options.facebook.name || 'Bilandia Memory',
	       		description: 'Ich habe beim Bilandia Memory einen Highscore erreicht.',
	       		link: options.facebook.link || 'http://www.bilandia.de/',
	       		picture: options.facebook.picture || 'http://www.bilandia.de/images.v1/bdLogoLarge.png'
 		};

	if (options.mode == "time") {
		facebookhighscore.description = 'Ich habe beim Bilandia Memory einen Highscore von ' + time + ' Sekunden erreicht.';
	} else if (options.mode == "count") {
		facebookhighscore.description = 'Ich habe beim Bilandia Memory einen Highscore von ' + count + ' Versuchen erreicht.';
	}
	FB.ui(facebookhighscore, function(response) {
	    if (response && response.post_id) {
	    	displayText('Erfolgreich auf Facebook gepostet.');
	      } else {
	    	displayText('Posting auf Facebook abgebrochen.');
	      }
	    });
}

function validateInput() {
	 
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var username = $("input[id$='username']", $(memorygamediv)).val();
    var email = $("#email", $(memorygamediv)).val();
    
    if(!username || !email || !emailReg.test(email)) {
    	displayText("Fehlerhafte Eingaben bitte korrigieren.");
        return false;
    }

    return true;
}

function sendResult() {
	if (!validateInput()) {
		return;
	}
	
	$("#userdata", $(memorygamediv)).addClass("hide");
	
    //Serverkommunikation Highscore/Gutschein
    displayText("Warten auf Antwort vom Server...");

	var obj = $("#userdata form", $(memorygamediv)).serializeObject();
	for (var p in params){
		if (params.hasOwnProperty(p)){
			obj[p] = params[p];
		}
	}
	//obj.mode = options.mode;
	var senddata = $.toJSON(obj);
	
	$.getJSON(serverurl + '?callback=?', {'q': 'save', 'd' : senddata}, 
	function (data, textStatus, jqXHR){
        displayText("&nbsp;");
		if (data){
		if (options.end_text_template){
			endMenu(); return;
		}
			if (options.mode == "gutschein") startGame();
			else startMenu();
		}
	});

}

function displayHighscore() {
	
	$("#hinttext", $(memorygamediv)).fadeOut(1);
	$(".memorycards", $(memorygamediv)).fadeOut(300);
    displayText("Warten auf Antwort vom Server...");

	obj = {};
	for (var p in params){
		if (params.hasOwnProperty(p)){
			obj[p] = params[p];
		}
	}
	$.getJSON(serverurl + '?callback=?', {'q': 'highscore', 'd' : $.toJSON(obj)}, 
	function (data, textStatus, jqXHR){
        displayText("&nbsp;");
		if (data){
			//data[0].Entries[0].Username;
			var string = 'Highscore auf Zeit: ';
			string += '<div class="highscore"><table><tr><th>Zeit</th><th></th><th>Name</th></tr>';
			for (var j = 0; j < data[0].Entries.length; j++) {
				string += '<tr>';
				string += '<td>' + data[0].Entries[j].Value + '</td><td></td>';
				string += '<td>' + data[0].Entries[j].Username + '</td>';
				string += '</tr>';
			}
			string += '</table></div>';

			string += 'Highscore auf Versuche: ';
			string += '<div class="highscore"><table><tr><th>Anzahl</th><th></th><th>Name</th></tr>';
			for (var j = 0; j < data[1].Entries.length; j++) {
				string += '<tr>';
				string += '<td>' + data[1].Entries[j].Value + '</td><td></td>';
				string += '<td>' + data[1].Entries[j].Username + '</td>';
				string += '</tr>';
			}
			string += '</table></div>';
			displayText(string);
		}
	});

    setTimeout(function() {
    	$("#hinttext", $(memorygamediv)).fadeIn();
    }, 300);

}

 function startGame() {
	resetGame();
	
	clearMenu();

    shuffle();
    enableCards();


    displayText("Warten auf Antwort vom Server...");
    var obj = {};
	for (var p in params){
		if (params.hasOwnProperty(p)){
			obj[p] = params[p];
		}
	}
    //Reset-Call an Server
    $.getJSON(serverurl + '?callback=?', {'q': 'reset', 'd' : $.toJSON(obj)}, 
        	function (data, textStatus, jqXHR){
    			displayText("&nbsp;");
        		if (data){
        		}
        	});

	$(".memorycards", $(memorygamediv)).removeClass("hide");

}

	// Startet Spiel auf Versuche
function startGameWithClicks() {
	options.mode = "count";
	startGame();
}

function startMenu() {
	resetGame();
    disableCards();

	clearMenu();
	
	for(var i = 0; i<options.buttons_menu.length; i++) {
		createButton(options.buttons_menu[i].label, options.buttons_menu[i].action);
	}

	displayText(options.startmenu_text);
	$('#freetext').empty().prepend($(options.freier_text_template).html());
}

function endMenu(){
    resetGame();
	$(".memorycards", $(memorygamediv)).fadeOut(300);
    clearMenu();
	createButton("Neu starten", "startGame()");
	var newP = document.createElement("div");
	newP.className = 'takemesomewhere'; 
	$('#freetext').empty().prepend($(options.end_text_template).html());
}

$(document).ready(function() {
	
	$(".header", $(memorygamediv)).empty().append(options.header_text);
	if (options.freier_text_template){
		$("#freetext", $(memorygamediv)).empty().append($(options.freier_text_template).html());
	}
	//Fang den Gutschein
	if (options.mode == "gutschein") {
		options.hor=3;
		options.vert=3;
		createCards();
        startGame();
	}
	else {	//Normaler Modus
		createCards();
    	startMenu();
	}
	
});

