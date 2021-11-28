'use strict';
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
// select currentScore in the document
const currentScore = document.querySelectorAll('.current-score');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let player1ActualScore = 0;
let player2ActualScore = 0;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let currentPlayer = true; // true means player1 and false means player2

// Rolling Dice
rollDice.addEventListener('click', ()=>{
    //the number we get through dice
    const diceNumber =  1 + Math.trunc(Math.random()*10) % 6; // we can also use Math.floor() hear

    // the dice in the document
    const dice = document.querySelector('.dice');

    // set dice image accordingly
    dice.src = `img/dice-${diceNumber}.png`;

    setCurrentScore(diceNumber);
});

const setCurrentScore = function(diceNumber){

    // if the diceNumber is zero than current score should be zero
    // else add the diceNumber to the current score
    if(diceNumber == 1){
        // if the current player is player 1 then do the above with player 1
        // else with player 2
       if(currentPlayer){
           player1CurrentScore = 0;
           currentScore[0].textContent = `${player1CurrentScore}`;
       }
       else{
           player2CurrentScore = 0;
           currentScore[1].textContent = `${player2CurrentScore}`;
       }
    }
    else{
        // add and display the dice number according to the players
        if(currentPlayer){
            player1CurrentScore += diceNumber;
            currentScore[0].textContent = `${player1CurrentScore}`;
        }
        else{
            player2CurrentScore += diceNumber;
            currentScore[1].textContent = `${player2CurrentScore}`;
        }
    }
};

// Implementing HOLD button for changing players
hold.addEventListener('click', function(){

    // Before changing player we need to assign the current score
    // to the actual score according to the plyers
    // and also make the current score zero again
    if(currentPlayer){
        player1ActualScore += player1CurrentScore;
        document.querySelector('#score--0').textContent = `${player1ActualScore}`;

        // setting current score to zero
        player1CurrentScore = 0;
        setCurrentScore(0);

        // here check whether the Actual Score is became 100 or above
        // if it become then the player is winner
        if(player1ActualScore >= 30){
            player1.classList.add('player--winner');
        }
    }
    else{
        player2ActualScore += player2CurrentScore;
        document.querySelector('#score--1').textContent = `${player2ActualScore}`;

        // setting current score to zero
        player2CurrentScore = 0;
        setCurrentScore(0);

        // here check whether the Actual Score is became 100 or above
        // if it become then the player is winner
        if(player2ActualScore >= 30){
            player2.classList.add('player--winner');
        }
    }

    // Now changing current player
    currentPlayer = currentPlayer ? false : true;
    
    // Now if the current player is player 1 then add the player--active css class to player 1
    // and remove the same class from player 2
    // else repeat the opposite
    if(currentPlayer){
        document.querySelector('.player--1').classList.remove('player--active');
        document.querySelector('.player--0').classList.add('player--active');
    }
    else{
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.add('player--active');
    }
    
});

const newGame = document.querySelector('.btn--new');
newGame.addEventListener('click', ()=>{
    
    player2CurrentScore = 0;
    player1ActualScore = 0;

    player2CurrentScore = 0;
    player2ActualScore = 0;

    // set the current score to zero on the dom
    currentPlayer = true;
    setCurrentScore(0);
    currentPlayer = false;
    setCurrentScore(0);
    // set current score to the initial player
    currentPlayer = true;

    // Now set the actual score to zero on the dom
    document.querySelector('#score--0').textContent = `0`;
    document.querySelector('#score--1').textContent = `0`;

    // Removing the player--winner class
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');

    // Remove the player--active class from both 
    // and then add to the initial player
    player1.classList.remove('player--active');
    player2.classList.remove('player--active');
    
    player1.classList.add('player--active');

});