# Project 1: CODENAMES #

## Pseudocode ##
1. Define required constants
- Define an object to track all the card value types (blue=1,red=-1,neutral=0,bomb=100)
- Define an array that holds all the random words
2. Define required variables to track the game state
- Use a board array to hold all of the cards on the grid
- Use a scoreKeeper object to track how many of each card type still in game
- Use a variable to track currentHints given by prompt
- Use a turn variable to track which team gets to play
- Use a winner variable to track if a player has won and if so, who?
3. Store elements on the page that will be accessed more than once by the code
- Store the board, holding 25 total cards
- Store the score board
- Store key element, containing the answer to the board
4. Upon load, the app should:
- Initialize the state variables
    - Initialize turn variable by randomly choosing which team goes first
    - Initialize board by filling it with values for blue,red,neutral,and bomb
        - Starting team will receive an extra card
    - Initialize winner as null, since there is no winner at the start
- Render those values to the page
    - Render the board
        - Loop over the array, assigning each of the spaces a value
            - The values and their amounts will be taken from the two objects that track them all
            - The color of the card will change to red, blue, gray, or black if they’ve been flipped
            - The words on the card will appear, taken from the array of random words
    - Render the score board
        - Update the values for how many cards each team has left
            - Values will be taken from the object that tracks them
    - Render key
        - Key will be rendered with the same values assigned to the board
        - It will be default style.display: none
            - When key button is hovered, style.display: contents
- Wait for user input
    - Initially, prompt user for Hint Number
        - Print out `You have ${Hint Number} + 1 bonus guess!`
        - Prompt can’t accept values lower than 1
    - After, allow player to click cards
5. Handle a player clicking a card
- Find card through ID in HTML to obtain index
- If the card has already been flipped, return
- If winner is not null, return
- Set card to flipped
    - This will reveal the card value (blue,red,neutral,bomb)
- Set card.style.color = transparent
    - This will hide the text of the card indefinitely
- Check the card value that was clicked and do one of the following
    - If card value === turn (you picked your team’s card)
        - Remove 1 from your team’s amount from scoreKeeper
        - If scoreKeeper object for your team hits 0, winner = turn
        - Remove 1 from currentHints
            - You will have more opportunities to guess
        - If currentHints = 0 then turn = -turn
    - If card value === -turn (you picked the other team’s card)
        - Remove 1 from enemy team’s amount from scoreKeeper
        - If scoreKeeper object for enemy team hits 0, winner = -turn
        - Set currentHints = 0
        - If currentHints = 0 then turn = -turn
            - You picked an enemy card, ending your turn
    - If card value === 0 (you picked a neutral space)
        - Set currentHints to 0
        - If currentHints = 0 then turn = -turn
            - You picked a neutral space, ending your turn
    - If card value ===100 (you picked the bomb)
        - Winner = (turn *= -turn;)
            - Current turn player loses
Render board, scoreboard, and hints message
6. Handle a player hovering over a card
- Set card.style.color = black (or whatever else I set the default
    - This will reveal the text of “flipped” cards when hovered
- Create border to indicate which card you intend to click
    - Card.style.borderstyle and card.style.borderwidth
    - This would be inactive when hovering over flipped cards
7. Handle a player hovering “Reveal key” button
- On key object, set style.display: contents
- On release, set style.display: hide 
8. Handle a player clicking the replay/new game button
- Run init()

## User Stories ##
- As a user
    - I want to be able to click on the cards on the grid
        - To see if my team’s point is there
    - I want to be able to check the key
        - To help myself create clues for my team
    - I want to see the current score
        - So I can tell what choices to make based off how close i am to winning or losing
    - I want to have a bunch of different random words and combinations
        - So that I can have a varied game every time
    - I want a replay button
        - So that I can play the game again after I win/lose
    - I want sound effects for clicking cards or buttons
        - So that I can get good feedback when I input clicks
    - I want the ability to pass my turn
        - So that I don’t have to take risks if I’m not confident
- As a software engineer
    - I want to add event listeners for the cards you can click
        - So that I can switch states of each card when clicked
    - I want a button you can click or hover to present the key
        - So that it becomes visible
    - I want a large array of random words
        - So that the card grid will remain varied each time its created
    - I want a 5x5 grid of cards
        - So I can print the randomized words onto them
    - I want a team’s turn to end when they guess a neutral or enemy team’s card
        - Because that’s how the game works
    - I want to switch the players turn after they use up all their guess
        - Because that’s how the game works
    - I want the game to end when a team runs out of cards or the bomb is clicked
        - Because that’s how the game works
    - I want a button that skips to the next team's turn
        - So that players can pass their turn if they want to

## Wireframe ##
![Here's my wireframe for CODENAMES](img/project1%20wireframe.PNG)