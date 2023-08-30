// Overall this is wonderful work. Things that I noticed are:
// 1. There are 2 different voices coding here. One is a voice that is confident in doing 1 liners
// and separating those statements with `;` when needed. The other voice spreads out their statements
// into multi lines. Choose one of these voices and stick with it. When on the job you will have a style
// guide that the company will want you to code in. This will have rules around exactly what they expect
// their code to look like. This will give use rails around one liners and what voice our JS (or other
// code will have). That being said they also will want consistency in your coding.
// 2. Your functions and variables are very crowded. Leave some blank lines to separate logic. In a
// function you have separate it into sections. Top is usually for variables, middle is for logic, end
// is for return value. Not all functions will have all 3 sections but giving that buffer room is needed
// for human readability.
// 3. Code comments. Your code is lacking comments. Documented code is the best code. Leave a comment
// (just a line long nothing fancy) above your functions saying what they do. If they need a param to be
// a certain thing leave that in a comment. Looping in a function and it's unclear? Leave a comment. Again
// whatever company you end up at will have a guide around what they expect and I've never seen one that
// didn't want you to comment your code. So it's a wonderful habit to start now.
// 4. Formatting. Your code was formatted enough to pass the project expectations but if this was a code
// review for a company this would be handed back until the indentation was fixed. I suggest to download
// a code formatter like Prettier or use a package like JavaScript Standard Style. I ran my Prettier on
// this file just to show off the difference. (My Prettier removes `;` because that's the style I like
// however just know that having `;` is a normal thing and you don't have to remove them in the future)
// 5. The use of `let` instead of `const`. Only use `let` when we need to reassign a variable. If we
// are not reassigning a variable always use `const`. 
/*----- Constant Variables -----*/
const PLACE_ANIMATION = 200
const TEXT_GENERATION_ANIMATION = 300
const CARD_VALUES = {
	blue: 1,
	red: -1,
	neutral: 0,
	bomb: 100,
	blueVal: 9,
	redVal: 9,
	neutralVal: 7,
	bombVal: 1,
}

const SOUNDS = {
	cardFlip: 'https://cdn.freesound.org/previews/240/240776_4107740-lq.mp3',
	backgroundMusic:
		'https://cdn.freesound.org/previews/683/683392_5479102-lq.mp3',
	turnSwitch: 'https://cdn.freesound.org/previews/270/270878_5141652-lq.mp3',
	victory: 'https://cdn.freesound.org/previews/414/414923_3359668-lq.mp3',
}

const RND_WORDS = [
	'Slap',
	'Ring',
	'Muscle',
	'Winner',
	'Baby',
	'Horse',
	'Water',
	'Mouse',
	'Phone',
	'Night',
	'Lesson',
	'Doctor',
	'Genius',
	'Soul',
	'Roast',
	'Fly',
	'Door',
	'Dinner',
	'Rain',
	'Jet',
	'Television',
	'Ocean',
	'Wave',
	'Brain',
	'Nose',
	'Tongue',
	'Phone',
	'Tool',
	'Hammer',
	'Screw',
	'Soldier',
	'War',
	'Love',
	'Death',
	'Life',
	'Moon',
	'Sun',
	'Cat',
	'Dog',
	'Police',
	'Truck',
	'Fire',
	'Water',
	'Crown',
	'Laugh',
	'Present',
	'Space',
	'Knife',
	'Bell',
	'Flower',
	'Rock',
	'Slam',
	'Hook',
	'Beat',
	'Card',
	'King',
	'Asia',
	'Europe',
	'Soda',
	'Icecream',
	'Flash',
	'Comic',
	'Dream',
	'Dance',
	'Nut',
	'Round',
	'Organ',
	'Lab',
	'Root',
	'Theater',
	'Heart',
	'Torch',
	'China',
	'Band',
	'March',
	'Ham',
	'Tooth',
	'Force',
	'Tick',
	'Circle',
	'Row',
	'Teacher',
	'Hawk',
	'Stadium',
	'Cook',
	'Pin',
	'Racket',
	'Winner',
	'Bar',
	'Check',
	'Nail',
	'Mole',
	'Chick',
	'Mine',
]

/*----- State Variables -----*/
let board
const scoreKeeper = {
	1: 0,
	'-1': 0,
}
let currentHints
let turn
let winner
let blueArr = []
let redArr = []
let musicOn = true
let soundsOn = true
let infoScreen = false

/*----- Cached Elements -----*/
const cardEls = document.querySelectorAll('#grid > div')
const boardEl = document.getElementById('grid')
const passBtn = document.getElementById('pass')
const resetBtn = document.getElementById('new')
const h2El = document.querySelector('h2')
const inputEl = document.querySelector('input')
const keyEls = document.querySelectorAll('#key_board > div')
const keyboardEl = document.getElementById('key_board')
const keyBtn = document.getElementById('key')
const scoreRedEls = document.querySelectorAll('#red > div')
const scoreBlueEls = document.querySelectorAll('#blue > div')
const scoreboardBlue = document.getElementById('blue')
const scoreboardRed = document.getElementById('red')
const musicBtn = document.getElementById('music')
const soundBtn = document.getElementById('sound')
const infoSec = document.getElementById('infosec')
const infoBtn = document.getElementById('info')

const flipSnd = new Audio()
const backgroundMusic = new Audio()
const turnSnd = new Audio()
const victorySnd = new Audio()

/*----- Event Listeners -----*/
boardEl.addEventListener('click', handleFlip, false)
inputEl.addEventListener('input', updateHints)
resetBtn.addEventListener('click', init)
passBtn.addEventListener('click', () => getWinner(0))

boardEl.addEventListener('mouseover', (evt) => {
	if (evt.target.style.backgroundColor !== 'tan') {
		evt.target.style.color = 'white'
	}
})

boardEl.addEventListener('mouseout', (evt) => {
	if (evt.target.style.backgroundColor !== 'tan') {
		evt.target.style.color = 'transparent'
	}
})

keyBtn.addEventListener('click', () => {
	if (keyboardEl.style.display === 'grid') {
		keyboardEl.style.display = 'none'
	} else if ((keyboardEl.style.display = 'none')) {
		keyboardEl.style.display = 'grid'
	}
})

musicBtn.addEventListener('click', () => {
	if (musicOn) {
		musicOn = false
		musicBtn.style.backgroundColor = 'darkgrey'
	} else {
		musicOn = true
		musicBtn.style.backgroundColor = 'white'
	}
	initSounds()
})

soundBtn.addEventListener('click', () => {
	if (soundsOn) {
		soundsOn = false
		soundBtn.style.backgroundColor = 'darkgrey'
	} else {
		soundsOn = true
		soundBtn.style.backgroundColor = 'white'
	}
	initSounds()
})

infoBtn.addEventListener('click', () => {
	// if (!infoScreen) - this is better than the === false
	// if (infoScreen === false){
	//     infoScreen = true;
	//     infoSec.style.display = "inline";
	//     infoBtn.style.backgroundColor = "darkgrey";
	//     // else if (infoScreen) - in the if check it will always see if
	// } else if (infoScreen === true){
	//     infoScreen = false;
	//     infoSec.style.display = "none";
	//     infoBtn.style.backgroundColor = "white";
	// }

	// a bit cleaner
	// we first check the false condition and execute the falsy code
	if (!infoScreen) {
		infoScreen = true
		infoSec.style.display = 'inline'
		infoBtn.style.backgroundColor = 'darkgrey'
		// making sure to return here to not run the truthy code
		return
	}

	infoScreen = false
	infoSec.style.display = 'none'
	infoBtn.style.backgroundColor = 'white'
})

/*----- Functions -----*/
init()

function init() {
	turn = 0.5 > Math.random() ? 1 : -1 //randomize who goes first
	setScore()
	createBoard()
	currentHints = 0
	winner = null
	render()
	initSounds()
}

function setScore() {
	blueArr = []
	redArr = []

	if (turn === 1) {
		// removes a point for team going second
		scoreKeeper['-1'] = CARD_VALUES.redVal - 1
		scoreKeeper['1'] = CARD_VALUES.blueVal
	} else if (turn === -1) {
		scoreKeeper['1'] = CARD_VALUES.blueVal - 1
		scoreKeeper['-1'] = CARD_VALUES.redVal
	}

	for (let i = 0; i < scoreKeeper['1']; i++) {
		blueArr.push(scoreBlueEls[i])
		scoreBlueEls[i].style.display = 'inline'
	}

	for (let i = 0; i < scoreKeeper['-1']; i++) {
		redArr.push(scoreRedEls[i])
		scoreRedEls[i].style.display = 'inline'
	}

	// above this you had multi line if and else if statements stay consistent through your coding
	if (turn === 1) scoreRedEls[redArr.length].style.display = 'none'
	else if (turn === -1) scoreBlueEls[blueArr.length].style.display = 'none'
}

function createBoard() {
	let wordList = RND_WORDS

	if (turn === 1)
		board = [
			1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0,
			0, 0, 100,
		]
	else if (turn === -1)
		board = [
			1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0,
			0, 0, 100,
		]

	board.sort(() => Math.random() - 0.5) //online forum post helped me with this
	wordList.sort(() => Math.random() - 0.5)

	for (let i = 0; i < board.length; i++) {
		cardEls[i].setAttribute('team', board[i])
		cardEls[i].setAttribute('flipped', 'down')

		cardEls[i].style.color = 'tan'
		cardEls[i].style.backgroundColor = 'tan'
		cardEls[i].style.transform = 'rotateX(180deg)'
		cardEls[i].style.transition = 'transform 0.2s'
		cardEls[i].style.transformstyle = 'preserve-3d'

		// if we don't need theses varibles to be reassigned later use const
		const placeAnimation = setInterval(() => {
			//flip animation at start
			cardEls[i].style.transform = 'rotateX(0deg)'
			cardEls[i].style.transition = 'transform 0.3s'
			clearInterval(placeAnimation)
			// You should save these numbers at the top in a variable for easy reassignment if needed
		}, PLACE_ANIMATION)

		// same as above
		const generateText = setInterval(() => {
			//adds text to each card
			cardEls[i].innerText = wordList[i].toUpperCase()
			cardEls[i].style.color = 'black'
			clearInterval(generateText)
			// same above
		}, TEXT_GENERATION_ANIMATION)

		if (board[i] === 1) keyEls[i].style.backgroundColor = 'blue' //sets up key
		else if (board[i] === -1) keyEls[i].style.backgroundColor = 'red'
		else if (board[i] === 0) keyEls[i].style.backgroundColor = 'darkgray'
		else if (board[i] === 100) keyEls[i].style.backgroundColor = 'black'
	}
}

function initSounds() {
	backgroundMusic.src = SOUNDS['backgroundMusic']
	victorySnd.src = SOUNDS['victory']
	flipSnd.src = SOUNDS['cardFlip']
	turnSnd.src = SOUNDS['turnSwitch']
	backgroundMusic.loop = true

	if (musicOn) backgroundMusic.volume = 0.2
	else backgroundMusic.volume = 0
	// here you have 2 different ways to declare an if condition in the same function. Pick a style and stick with it
	if (soundsOn) {
		victorySnd.volume = 0.6
		flipSnd.volume = 1
		turnSnd.volume = 1
	} else {
		victorySnd.volume = 0
		flipSnd.volume = 0
		turnSnd.volume = 0
	}

	backgroundMusic.play()
}

function render() {
	renderMessage()
	renderInput()

	keyboardEl.style.display = 'none'
}

function renderMessage() {
	// again in this function where we have a couple of ways to declare an if condition
	// if (!winner){
	//     if (currentHints === 0){
	//         if (turn === 1){
	//             h2El.innerText =   `Blue Team's Turn. Enter Hint Count: `
	//             h2El.style.color = "blue";
	//         } else if (turn === -1){
	//             h2El.innerText =   `Red Team's Turn. Enter Hint Count: `
	//             h2El.style.color = "Red";
	//         }
	//     }
	//     else if (currentHints > 2) h2El.innerText = `You have ${currentHints - 1} guesses left + 1 bonus guess`
	//     else if (currentHints === 2) h2El.innerText = `You have ${currentHints - 1} guess left + 1 bonus guess`
	//     else if (currentHints === 1) h2El.innerText = "You still have a bonus guess!";
	// } else {
	//     inputEl.style.display = "none";
	//     if (winner === 1){
	//         h2El.innerText = "Blue Team wins the game!"
	//         h2El.style.color = "blue";
	//     }
	//     else if (winner === -1){
	//         h2El.innerText = "Red Team wins the game!"
	//         h2El.style.color = "Red";
	//     }
	// }

	// We could refactor this function to be more readable.
	// 1. check if there is a winner
	// 1.a run winner code
	// 1.b return in that if condition for the winner
	// 2. run code that is not related to the winner

	// We remove a layer of if condition and this is a little more readable
	if (winner) {
		inputEl.style.display = 'none'
		if (winner === 1) {
			h2El.innerText = 'Blue Team wins the game!'
			h2El.style.color = 'blue'
			return
		} else if (winner === -1) {
			h2El.innerText = 'Red Team wins the game!'
			h2El.style.color = 'Red'
			return
		}
	}

	if (currentHints === 0) {
		if (turn === 1) {
			h2El.innerText = `Blue Team's Turn. Enter Hint Count: `
			h2El.style.color = 'blue'
		} else if (turn === -1) {
			h2El.innerText = `Red Team's Turn. Enter Hint Count: `
			h2El.style.color = 'Red'
		}
	} else if (currentHints > 2)
		h2El.innerText = `You have ${currentHints - 1} guesses left + 1 bonus guess`
	else if (currentHints === 2)
		h2El.innerText = `You have ${currentHints - 1} guess left + 1 bonus guess`
	else if (currentHints === 1) h2El.innerText = 'You still have a bonus guess!'
}

function renderInput() {
	if (!winner && currentHints === 0) {
		inputEl.style.display = 'inline'
		inputEl.value = ''
	}
}

function handleFlip(event) {
	if (event.target.tagName === 'DIV' && currentHints > 0 && !winner) {
		// always declare variables with const if we don't need to reassign them later
		const flipState = event.target.getAttribute('flipped')
		const cardValue = event.target.getAttribute('team')
		if (flipState === 'down') {
			event.target.setAttribute('flipped', 'up')
			event.target.style.color = 'transparent'

			flipSnd.play()

			event.target.style.transform = 'rotateY(180deg)'
			event.target.style.transition = 'transform 0.8s'
			event.target.style.transformstyle = 'preserve-3d'

			// always declare variables with const if we don't need to reassign them later
			const flipAnimation = setInterval(() => {
				if (cardValue == 1) event.target.style.backgroundColor = 'blue'
				else if (cardValue == -1) event.target.style.backgroundColor = 'red'
				else if (cardValue == 0) event.target.style.backgroundColor = 'gray'
				else event.target.style.backgroundColor = 'black'
				event.target.style.transform = 'rotateY(0deg)'
				clearInterval(flipAnimation)
			}, PLACE_ANIMATION)
			getWinner(cardValue)
		}
		// we can remove this condition it's doing nothing
		// else  if (flipState === "up"){
		//     return;
		// }
	}
}

function updateHints(event) {
	if (currentHints === 0) {
		if (isNaN(event.target.value) || event.target.value < 1) {
			event.target.value = ''
		} else {
			currentHints = event.target.value
			currentHints++
			if (currentHints - 1 > 1) {
				h2El.innerText = `You have ${currentHints - 1} guesses + 1 bonus guess!`
			} else {
				h2El.innerText = `You have ${currentHints - 1} guess + 1 bonus guess!`
			}
			inputEl.style.display = 'none'
		}
	}
}

function getWinner(cardVal) {
	// loose equality is discouraged. Better practice is to turn whatever we are checking into the value you need. So if you need a number use parseInt() if you need a string we have .toString()
	if (cardVal == turn) {
		// Clicked your team's card
		scoreKeeper[turn]--
		if (turn == 1) {
			blueArr[blueArr.length - 1].style.display = 'none'
			blueArr.pop()
		} else if (turn == -1) {
			redArr[redArr.length - 1].style.display = 'none'
			redArr.pop()
		}
		if (scoreKeeper[turn] > 0) {
			if (currentHints > 1) {
				currentHints--
			} else {
				currentHints = 0
				switchTurn()
			}
		} else {
			winnerResults(turn)
		}
	} else if (cardVal == -turn) {
		// Clicked enemy team's card
		scoreKeeper[-turn]--
		if (turn == 1) {
			redArr[redArr.length - 1].style.display = 'none'
			redArr.pop()
		} else if (turn == -1) {
			blueArr[blueArr.length - 1].style.display = 'none'
			blueArr.pop()
		}
		if (scoreKeeper[-turn] > 0) {
			currentHints = 0
			switchTurn()
		} else {
			winnerResults(-turn)
		}
	} else if (cardVal == 0) {
		// Clicked neutral card
		currentHints = 0
		switchTurn()
	} else {
		// Clicked bomb
		winnerResults(-turn)
	}
	render()
}

function switchTurn() {
	turn *= -1
	turnSnd.playbackRate = 1.1
	turnSnd.play()
}

function winnerResults(turnPlayer) {
	if (turnPlayer == 1) {
		winner = 1
	} else if (turnPlayer == -1) {
		winner = -1
	}
	victorySnd.play()
}
