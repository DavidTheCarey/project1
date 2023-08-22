/*----- Constant Variables -----*/
const CARD_VALUES = {
    blue: 1,
    red: -1,
    neutral: 0,
    bomb: 100,
    blueVal: 9,
    redVal: 9,
    neutralVal: 7,
    bombVal: 1

}

const RND_WORDS = [
    "Slap", "Ring", "Muscle", "Winner", "Baby", "Horse", "Water", "Mouse", "Phone",
    "Night", "Lesson", "Doctor", "Genius", "Soul", "Roast", "Fly", "Door", "Dinner", "Rain",
    "Jet", "Television", "Ocean", "Wave", "Brain", "Nose", "Tongue", "Phone",
    "Tool", "Hammer", "Screw", "Soldier", "War", "Love", "Death", "Life", "Moon", "Sun",
    "Cat", "Dog", "Police", "Truck", "Fire", "Water", "Crown", "Laugh", "Present", "Space",
    "Knife", "Bell", "Flower", "Rock", "Slam", "Hook", "Beat", "Card", "King", "Asia",
    "Europe", "Soda", "Icecream", "Flash", "Comic", "Dream", "Dance", "Nut", "Round",
    "Organ", "Lab", "Root", "Theater", "Heart", "Torch", "China", "Band", "March",
    "Ham", "Tooth", "Force", "Tick", "Circle", "Row", "Teacher", "Hawk", "Stadium"
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
let blueArr = [];
let redArr = [];

/*----- Cached Elements -----*/
const cardEls = document.querySelectorAll("#grid > div");
const boardEl = document.getElementById("grid");
const passBtn = document.getElementById("pass");
const resetBtn = document.getElementById("new");
const h2El = document.querySelector("h2");
const inputEl = document.querySelector("input");
const keyEls = document.querySelectorAll("#key_board > div")
const keyboardEl = document.getElementById("key_board");
const keyBtn = document.getElementById("key");
const scoreRedEls = document.querySelectorAll("#red > div")
const scoreBlueEls = document.querySelectorAll("#blue > div")
const scoreboardBlue = document.getElementById("blue");
const scoreboardRed = document.getElementById("red");
/*----- Event Listeneres -----*/
boardEl.addEventListener("click", handleFlip, false);
inputEl.addEventListener("input", updateHints);
resetBtn.addEventListener("click", init);
passBtn.addEventListener("click", () => getWinner(0));
boardEl.addEventListener("mouseover", (evt) => {
    if (evt.target.style.backgroundColor !== "tan"){
        evt.target.style.color = "white";
    }
})
boardEl.addEventListener("mouseout", (evt) => {
    if (evt.target.style.backgroundColor !== "tan"){
        evt.target.style.color = "transparent";
    }
})
keyBtn.addEventListener("click", () => {
    if (keyboardEl.style.display === "grid"){
        keyboardEl.style.display = "none";
    }
    else if (keyboardEl.style.display = "none"){
        keyboardEl.style.display = "grid";
    }
})
/*----- Functions -----*/

init();

function init(){
    
    
    turn = (0.5 > Math.random() ? 1 : -1); //randomize who goes first
    if (turn === 1){
    scoreKeeper["-1"] = CARD_VALUES.redVal - 1;
    scoreKeeper["1"] = CARD_VALUES.blueVal;
    } else if (turn === -1){
    scoreKeeper["1"] = CARD_VALUES.blueVal - 1;
    scoreKeeper["-1"] = CARD_VALUES.redVal;
    }
    blueArr = [];
    redArr = [];
    for (let i = 0; i < scoreKeeper["1"]; i++){
        blueArr.push(scoreBlueEls[i]);
        scoreBlueEls[i].style.display = "inline";
    } 
    
    for (let i = 0; i < scoreKeeper["-1"]; i++){
        redArr.push(scoreRedEls[i]);
        scoreRedEls[i].style.display = "inline";
    } 

    if (turn === 1){    //remove one from red for going second
        
            scoreRedEls[redArr.length].style.display = "none"; 
            redArr.pop();
        
    }
    else if (turn === -1){ //remove one from blue for going second
        
            scoreBlueEls[blueArr.length].style.display = "none"; 
            blueArr.pop();
        
    }

    createBoard();
    currentHints = 0;
    winner = null;
    render();
}

function createBoard(){
    let wordList = RND_WORDS;
    if (turn === 1){
        board = [1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,100];
    } else if (turn === -1){
        board = [1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,100];
    }
    board.sort(() => Math.random() - 0.5); //online forum post helped me with this
    wordList.sort(() => Math.random() - 0.5);
    for (let i = 0; i < board.length; i++){
        cardEls[i].setAttribute("team", board[i]);
        cardEls[i].setAttribute("flipped", "down")
        cardEls[i].style.color = "black";
        cardEls[i].style.backgroundColor = "tan";
        cardEls[i].innerText = wordList[i].toUpperCase();
        if (board[i] === 1) keyEls[i].style.backgroundColor = "blue";
        else if (board[i] === -1) keyEls[i].style.backgroundColor = "red";
        else if (board[i] === 0) keyEls[i].style.backgroundColor = "darkgray";
        else if (board[i] === 100) keyEls[i].style.backgroundColor = "black";
    }
}

function render(){
    renderGrid();
    renderMessage();
    renderButtons();
}

function renderGrid(){
     keyboardEl.style.display = "none";

    
}

function renderMessage(){
    if (!winner){
        h2El.style.color = "black";
        if (currentHints === 0){
            if (turn === 1){
                h2El.innerText =   `Blue Team's Turn. Enter Hint Count: `
                h2El.style.color = "blue";
            }else if (turn === -1){
                h2El.innerText =   `Red Team's Turn. Enter Hint Count: `
                h2El.style.color = "Red";
            }
        } else if (currentHints > 2){
            h2El.innerText = `You have ${currentHints - 1} guesses left + 1 bonus guess`
        } else if (currentHints === 2){
            h2El.innerText = `You have ${currentHints - 1} guess left + 1 bonus guess`
        } else if (currentHints === 1){
            h2El.innerText = "You still have a bonus guess!";
        }
    } else {
        inputEl.style.display = "none";
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
    if (!winner && currentHints === 0){
    inputEl.style.display = "inline";
    inputEl.value = "";
    }
}

function handleFlip(event){
    if (event.target.tagName === "DIV" && currentHints > 0 && !winner){
        let flipState = event.target.getAttribute("flipped");
        let cardValue = event.target.getAttribute("team");
        if (flipState === "down"){
            event.target.setAttribute("flipped", "up");
            event.target.style.color = "transparent";
            event.target.style.transform = "rotateY(180deg)";
            event.target.style.transition = "transform 0.8s";
            event.target.style.transformstyle = "preserve-3d";
            let flipAnimation = setInterval(() => {  
                if (cardValue == 1) event.target.style.backgroundColor = "blue";
                else if (cardValue == -1) event.target.style.backgroundColor = "red";
                else if (cardValue == 0) event.target.style.backgroundColor = "gray";
                else event.target.style.backgroundColor = "black"; 
                event.target.style.transform = "rotateY(0deg)";
                clearInterval(flipAnimation);
            }, 200);
            getWinner(cardValue);
            
        }
        else  if (flipState === "up"){
            return;
        }
    }
}

function updateHints(event){
     
    if (currentHints === 0){
        if (isNaN(event.target.value) || event.target.value < 1){
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

    if (cardVal == turn){   // Clicked your team's card
        scoreKeeper[turn]--;
        if (turn == 1){blueArr[blueArr.length - 1].style.display = "none"; blueArr.pop();}
        else if (turn == -1) {redArr[redArr.length - 1].style.display = "none"; redArr.pop();}
        if (scoreKeeper[turn] > 0){
            if (currentHints > 1){
                currentHints--;
                render();
            } else
            {
                currentHints = 0;
                turn *= -1;
                render();
            }
        } else {
            winnerResults(turn);
        }
    } else if (cardVal == -turn){ // Clicked enemy team's card
        scoreKeeper[-turn]--;
        if (turn == 1) {redArr[redArr.length - 1].style.display = "none"; redArr.pop();}
        else if (turn == -1) { blueArr[blueArr.length - 1].style.display = "none"; blueArr.pop();}
        if (scoreKeeper[-turn] > 0){
            currentHints = 0;
            turn *= -1;
            render();
        } else {
            winnerResults(-turn);
        }
    } else if (cardVal == 0){ // Clicked neutral card
        currentHints = 0;
        turn *= -1;
        render();
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