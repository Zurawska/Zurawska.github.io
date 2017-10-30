var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock'); });
pickPaper.addEventListener('click', function() { playerPick('paper'); });
pickScissors.addEventListener('click', function() { playerPick('scissors'); });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    hideShowImage = document.getElementById('js-hideShowImage'),
    replaceWelcomeText = document.querySelector('h3');

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            hideShowImage.style.display = 'none';
            replaceWelcomeText.innerText = 'Pick your move';
        break;
        case 'ended':
            newGameBtn.innerText = 'Play again';
            hideShowImage.style.display = 'inline-block';
        case 'notStarted':
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function customPrompt(){
	this.render = function(dialog){
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.display = "block";
		document.getElementById('dialogboxhead').innerHTML = "Value Required";
	    document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxbody').innerHTML += '<br><input id="prompt_value1">';
		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="promptBox.ok()">OK</button> <button onclick="promptBox.cancel()">Cancel</button>';
	};
	this.cancel = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	};
	this.ok = function(){
		var prompt_value1 = document.getElementById('prompt_value1').value;
        player.name = prompt_value1;
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";

        if (player.name) {
            player.score = computer.score = 0;
            gameState = 'started';
            setGameElements();

            playerNameElem.innerHTML = player.name;
            setGamePoints();
        }
	};
}
var promptBox = new customPrompt();

function newGame() {
    promptBox.render('Please enter your name');
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        console.log(player.score++);
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        console.log(computer.score++);
    }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
    endGame(player.name);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function CustomAlert() {
    this.render = function(dialog){
        // var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        // dialogbox.style.left = (winW/2) - (550 * 0.5)+"px";
        // dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-trophy" aria-hidden="true"></i>';
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="alertBox.ok()">OK</button>';
    };
    this.ok = function() {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        document.getElementById('dialogboxhead').innerHTML = ' ';
    };
}

var alertBox = new CustomAlert();

function endGame(playerName) {
    if (player.score == 10) {
        alertBox.render(playerName + ' WIN!');
        gameState = 'ended';
        setGameElements();
    } else if (computer.score == 10) {
        alertBox.render('Computer WIN!');
        gameState = 'ended';
        setGameElements();
    }
}
