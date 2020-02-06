//set starting vars
var rollCount = 0;
var maxAmount = 0 ;
var rollCountAtMaxAmount = 0;
var startingBet = 0;



function loadGame() {    
    getStartingBet();
}


function getStartingBet() {


    //get bet
    let amount = document.getElementById('bet-amount').value;
    startingBet = amount;
    //tell js amount is a number
    amount = parseFloat(amount);

    //if amount is valid play the game
    if(isValidAmount(amount)) {
        playGame(amount);
    }
    
}


function playGame(amount) {
    maxAmount = amount;
    
    //as long as amount is greater than 0, keep playing
    while(amount > 0) {
    
        rollCount++;
        let rollAmount = rollDice() + rollDice();

        if(rollAmount === 7) {
            amount += 4;
        }else {
            amount-=1;
        }

        //check if current amount is max
        if(amount > maxAmount) {
            maxAmount = amount;
            rollCountAtMaxAmount = rollCount;
        }

        console.log(amount);

    }


    //if rollCountAtMaxAmount === 0, player never won any money
    // if(rollCountAtMaxAmount === 0) {
    //     // maxAmount = maxAmount - 1;
    //     rollCountAtMaxAmount = 0;
    // }


    //amount is zero, end the game and show results
    showResults();

    
}


function showResults() {

    //make starting bet and maxAmount two decimals
    startingBet = parseFloat(startingBet).toFixed(2);
    maxAmount = parseFloat(maxAmount).toFixed(2);

    //set html table values
    document.getElementById('starting-bet').innerHTML = '$' + startingBet ;
    document.getElementById('total-rolls').innerHTML = rollCount;
    document.getElementById('highest-amount').innerHTML ='$'+  maxAmount;
    document.getElementById('highest-amount-rollcount').innerHTML = rollCountAtMaxAmount;

    console.log('max amount was: ' + maxAmount + ' happend at rollcount: ' + rollCountAtMaxAmount);
    //reset variables for next game
    maxAmount = 0;
    rollCountAtMaxAmount =0;
    rollCount = 0;

    //show the table
    document.getElementById('results').style.display = 'block'; 

    //change text for play button and reset the bet amount
    document.getElementById('play-button').innerHTML = 'Play Again';
    document.getElementById('play-button').style.width = "170px";
    document.getElementById('bet-amount').value = '';

}


function rollDice() {
    //role six sided die
    let die = Math.floor(Math.random() * 6) + 1;  
    return die;
}



function isValidAmount(amount) {
    //get possible error ids
    let negativeError = document.getElementById('negative');
    let formatError = document.getElementById('poorly-formatted');
    let emptyError = document.getElementById('empty-bet');
    let minAmountError = document.getElementById('min-amount');

    //clear any errors that may already be displayed
    clearErrors(negativeError, formatError, emptyError, minAmountError);

    //validate amount
    if(amount < 0) {
        negativeError.style.display = 'block';
        return false;
    }else if(isNaN(amount) || amount === 0) {
        emptyError.style.display = 'block';
        return false;
    }else if(amount != amount.toFixed(2)) {
        formatError.style.display = 'block';
        return false;
    }else if(amount < 1) {
        minAmountError.style.display = 'block';
        return false;
    }else{
        return true;
    }

}


function clearErrors(...erors) {
    erors.forEach(errorr => {
        errorr.style.display = 'none';
    });
}