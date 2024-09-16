const buttons = document.querySelectorAll('button');
let displayVal = '0';
let firstNum = null;
let secondNum = null;
let firstAction = null;
let secondAction = null;
let result = null;

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.key}']`);
    key.click();
});


function updateText(){
    const display = document.getElementById('text-box');
   display.innerText = displayVal
   if (displayVal.length > 9){
    display.innerText = displayVal.substring(0, 9)
   }
}

updateText(); 

function clickButton() {
    for (let i =0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(){
            if(buttons[i].classList.contains('num')){
                inputNum(buttons[i].value);
                updateText();
            }else if (buttons[i].classList.contains('action')){
                inputAction(buttons[i].value);
            }else if (buttons[i].classList.contains('equal')){
                inputEquals();
                updateText();
            }else if (buttons[i].classList.contains('decimal')){
                inputDecimal(buttons[i].value);
                updateText();
            }else if (buttons[i].classList.contains('percentage')){
                inputPercentage(buttons[i].value);
                updateText();
            }else if (buttons[i].classList.contains('sign')){
                inputSign(buttons[i].value);
                updateText();
            }else if (buttons[i].classList.contains('clear')){
                clearDisplay();
                updateText();
            }

            
        })
    }
}
clickButton();

function inputNum(num){  
    if (firstNum === null){
        if(displayVal === '0' || displayVal ===0){
            //1st click - handles first num input
            displayVal = num;
        } else if (displayVal === firstNum){
            displayVal = num;
        } else {
            displayVal += num;
        }
    } else{
        //3rd/5th click - inputs to secondNum
        if (displayVal === firstNum){
            displayVal = num;
        }else {
            displayVal += num;
        }
    }
}

function inputAction(action){
    if(firstAction != null && secondAction === null){
        //4th click - handles input of second operator
        secondAction = action;
        secondNum = displayVal;
        result = operate(Number(firstNum), Number(secondNum), firstAction);
        displayVal = roundAccurately(result, 15).toString();
        firstNum = displayVal;
        result = null;
    } else if (firstAction != null && secondAction !=null) {
        //6th click - new secondOperator;
        secondNum = displayVal
        result = operate(Number(firstNum), Number(secondNum), firstAction);
        secondAction = action;
        displayVal = roundAccurately(result, 15).toString()
        firstNum = displayVal;
        result = null;
    } else {
        //2nd click - handles first operator
        firstAction = action;
        firstNum = displayVal;
    }

}

function inputEquals(){
    if(firstAction === null){
        displayVal = displayVal;
    }else if (secondAction != null){
        //handles the final result apparently 
        secondNum = displayVal;
        result = operate(Number(firstNum), Number(secondNum), secondAction);
        if(result === 'lmao'){
            displayVal = 'lmao';
    }else {
        displayVal = roundAccurately(result, 15).toString();
        firstNum = displayVal;
        secondNum = null;
        firstAction = null;
        secondAction = null;
        result = null;
    }
  } else {
    //handles first operatoin
    secondNum = displayVal;
    result = operate(Number(firstNum), Number(secondNum), firstAction);
    if(result ==='lmao'){
        displayVal = 'lmao';
    }else {
        displayVal = roundAccurately(result, 15).toString();
        firstNum = displayVal
        secondNum = null;
        firstAction = null;
        secondAction = null;
        result = null;
    }
  }
}

function inputDecimal(dot) {
    if(displayVal === firstNum || displayVal === secondNum) {
        displayVal = '0';
        displayVal += dot;
    }else if (!displayVal.includes(dot)) {
        displayVal += dot;
    }
}

function inputPercentage(){
    displayVal = (parseFloat(displayVal)/100).toString();
}

function inputSign() {
    if (displayVal === 'NaN' || displayVal === '0') {
        displayVal = '0'; // Reset to zero if NaN or zero
    } else {
        displayVal = (parseFloat(displayVal) * -1).toString();
    }
}


function clearDisplay(){
    displayVal = '0';
    firstNum = null;
    secondNum = null;
    firstAction = null;
    secondAction = null;
    result = null;
    updateText();
}

function inputBackspace(){
    if(firstNum != null){
        firstNum = null;
        updateText();
    }
}


function operate(x, y, op){
    if(op === '+') {
        return x + y;
    } else if(op === '-'){
        return x - y;
    }else if (op === '*'){
        return x * y;
    }else if (op === '/'){
       if ( y === 0) {
        return 'lmao'; 
    }else {
        return x / y;
    }
}
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

function backspace() {
    if (displayVal.length > 1) {
        displayVal = displayVal.slice(0, -1);
    } else {
        displayVal = '0';
    }
    updateText();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Delete') {
        clearDisplay();
    } else {
        const key = document.querySelector(`button[data-key='${event.key}']`);
        if (key) key.click();
    }
});