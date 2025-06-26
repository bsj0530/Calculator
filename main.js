const $numberButtons = document.querySelectorAll('[data-number]')
const $operationButtons = document.querySelectorAll('[data-operation]')
const $allclearButtons = document.querySelector('[data-all-clear]')
const $deleteButtons = document.querySelector('[data-delete]')
const $equalsButtons = document.querySelector('[data-equals]')
const $previousDisplay = document.querySelector('[data-previous-operand]')
const $currentDisplay = document.querySelector('[data-current-operand]')

let currentNumberStr = '';
let previousNumberStr = '';
let operation = null;

function getDisplaynumber(numberStr) {
        let floatNumber = parseFloat(numberStr);
        if (isNaN(floatNumber)) {
            return
        }
        let displayNumber = floatNumber.toLocaleString('en', {
            maximumFractionDigits: 10,
        });
        return displayNumber
}

function updateDisplay() {
        $currentDisplay.textContent = getDisplaynumber(currentNumberStr);
        if (operation) {
        $previousDisplay.textContent = getDisplaynumber(previousNumberStr) + ' ' + operation;
        } else {
            $previousDisplay.textContent = '';
        }
};

$numberButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        console.log(e.target.textContent);
        let numberStr = e.target.textContent;
        if (numberStr === '.' && currentNumberStr.includes('.')) {
            return;
        }
        currentNumberStr = currentNumberStr + numberStr;

        //표시하기
        updateDisplay();
    });
});

$operationButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        console.log(e.target.textContent)
        previousNumberStr = currentNumberStr
        currentNumberStr = '';
        operation = e.target.textContent
        //표시하기
        updateDisplay();
    });
});

function compute(){
    let prev = parseFloat(previousNumberStr);
    let curr = parseFloat(currentNumberStr);
    if (isNaN(prev) || isNaN(curr)) {
        return;
    }
    let result = null;
    switch (operation) {
        case '+':
            result = prev + curr
            break;
        case '-':
            result = prev - curr
            break;
        case 'x':
            result = prev * curr
            break;
        case '÷':
            result = prev / curr
            break;
    }
    currentNumberStr = result;
    operation = null;
    previousNumberStr = '';

}

function clear() {
    currentNumberStr = '';
    previousNumberStr = '';
    operation = null;
}


$equalsButtons.addEventListener('click', function() {
    compute();
    updateDisplay();
});

$allclearButtons.addEventListener('click', function() {
    clear()
    updateDisplay()
});

function deleteDisplayNumber() {
    currentNumberStr = currentNumberStr.slice(0, -1)
}

$deleteButtons.addEventListener('click', function() {
    deleteDisplayNumber()
    updateDisplay()
});


