/*----- Constant Variables -----*/
const CARD_VALUES = {
    blue: 1,
    red: -1,
    neutral: 0,
    bomb: 100,
    blueVal: 8,
    redVal: 8,
    neutralVal: 7,
    bombVal: 1

}

const RND_WORDS = [
    "Slap", "Ring", "Muscle", "Winner", "Baby", "Horse", "Water", "Mouse", "Phone",
    "Night", "Lesson", "Doctor", "Genius", "Soul", "Roast", "Fly", "Door", "Dinner", "Rain",
    "Jet", "Television", "Ocean", "Wave", "Brain", "Nose", "Tongue", "Microphone",
    "Tool", "Hammer", "Screw", "Soldier", "War", "Love", "Death", "Life", "Moon", "Sun"
]

/*----- State Variables -----*/
let board;
const scoreKeeper = {
    1: 0,
    "-1": 0
}
let currentHints;
let turn;
let winner;

/*----- Cached Elements -----*/
const cardEls = document.querySelectorAll("#grid > div");
const boardEl = document.getElementById("grid");
const passBtn = document.getElementById("pass");
const resetBtn = document.getElementById("new");
const h2El = document.querySelector("h2");
const inputEl = document.querySelector("input");

/*----- Event Listeneres -----*/
boardEl.addEventListener("click", handleFlip, false);
inputEl.addEventListener("input", updateHints);
/*----- Functions -----*/

init();

function init(){
    

    turn = (0.5 > Math.random() ? 1 : -1);
    if (turn === 1){ // Player going first get an extra card
        scoreKeeper["1"] = CARD_VALUES.blueVal + 1;
        scoreKeeper["-1"] = CARD_VALUES.redVal;
    }
    else{
        scoreKeeper["-1"] = CARD_VALUES.redVal + 1;
        scoreKeeper["1"] = CARD_VALUES.blueVal;
    }
    createBoard();
    currentHints = 0;
    winner = null;
    render();
}

function createBoard(){
    if (turn === 1){
        board = [1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,100];
    } else if (turn === -1){
        board = [1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,100];
    }
    board.sort(() => Math.random() - 0.5); //online forum post helped me with this
    for (let i = 0; i < board.length; i++){
        cardEls[i].setAttribute("team", board[i]);
        cardEls[i].setAttribute("flipped", "down")
    }
}

function render(){
    renderGrid();
    renderMessage();
    renderButtons();
}

function renderGrid(){
     
}

function renderMessage(){
    if (!winner){
        if (currentHints === 0){
            if (turn === 1){
                h2El.innerText =   `Blue Team's Turn. Enter Hint Count: `
            }else if (turn === -1){
                h2El.innerText =   `Red Team's Turn. Enter Hint Count: `
            }
        } else if (currentHints > 2){
            h2El.innerText = `You have ${currentHints - 1} guesses left + 1 bonus guess`
        } else if (currentHints === 2){
            h2El.innerText = `You have ${currentHints - 1} guess left + 1 bonus guess`
        } else if (currentHints === 1){
            h2El.innerText = "You still have a bonus guess!";
        }
    } else {
        if (winner === 1){
            h2El.innerText = "Blue Team wins the game!"
            h2El.style.color = "blue";
        }
        else if (winner === -1){
            h2El.innerText = "Red Team wins the game!"
            h2El.style.color = "Red";
        }
    }
}

function renderButtons(){
    if (!winner){
    inputEl.style.display = "inline";
    inputEl.value = "";
    }
}

function handleFlip(event){
    if (event.target.tagName === "DIV" && currentHints > 0){
        let flipState = event.target.getAttribute("flipped");
        let cardValue = event.target.getAttribute("team");
        if (flipState === "down"){
            event.target.setAttribute("flipped", "up");
            if (cardValue == 1) event.target.style.backgroundColor = "blue";
            else if (cardValue == -1) event.target.style.backgroundColor = "red";
            else if (cardValue == 0) event.target.style.backgroundColor = "gray";
            else event.target.style.backgroundColor = "black";
            getWinner(cardValue);
            render();
        }
        else  if (flipState === "up"){
            return;
        }
    }
}

function updateHints(event){
     
    if (currentHints === 0){
        if (isNaN(event.target.value) || event.target.value < 1){
            console.log("ABSOLUTELY NOT");
            event.target.value = "";
        } else {
            currentHints = event.target.value;
            currentHints++;
            if (currentHints - 1 > 1){
            h2El.innerText = `You have ${currentHints - 1} guesses + 1 bonus guess!`;
            } else {
                h2El.innerText = `You have ${currentHints - 1} guess + 1 bonus guess!`;
            }
            inputEl.style.display = "none";

        }
    }
}

function getWinner (cardVal){

    console.log(turn);
    if (cardVal == turn){   // Clicked your team's card
        scoreKeeper[turn]--;
        if (scoreKeeper[turn] > 0){
            if (currentHints > 1){
                currentHints--;
            } else
            {
                currentHints = 0;
                turn *= -1;
            }
        } else {
            winnerResults(turn);
        }
    } else if (cardVal == -turn){ // Clicked enemy team's card
        scoreKeeper[-turn]--;
        if (scoreKeeper[-turn] > 0){
            currentHints = 0;
            turn *= -1;
        } else {
            winnerResults(-turn);
        }
    } else if (cardVal == 0){ // Clicked neutral card
        currentHints = 0;
        turn *= -1;
    } else { // Clicked bomb
        winnerResults(-turn);
    }
}

function winnerResults(turnPlayer){
    if (turnPlayer == 1){
        winner = 1;
    } else if (turnPlayer == -1){
        winner = -1;
    }
    render();
}