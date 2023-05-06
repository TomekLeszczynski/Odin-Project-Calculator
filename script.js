const numberBtns = document.querySelectorAll('[data-digit]')
const operators = document.querySelectorAll('[data-operator]')
const mainDisplay = document.querySelector('.main-line')
const resetBtn = document.querySelector('[data-reset]')
const equalBtn = document.querySelector('[data-equal]')
const backspaceBtn = document.querySelector('[data-backspace]')

let operandA
let operandB
let operator
let result
let clearDisplay = false

function clearMainDisplay() {
	mainDisplay.textContent = ''
}
function reset() {
	mainDisplay.textContent = ''
	operandA = ''
	operandB = ''
	operator = ''
	result = ''
}
function fixInputData() {
	mainDisplay.textContent = mainDisplay.textContent.toString().slice(0, -1)
}

function calculate() {
	operandB = mainDisplay.textContent
	if (operator == '/' && operandB == 0) {
		alert(`can\'t divide by 0`)
		return
	}
	clearMainDisplay()
	doTheMath(operator, Number(operandA), Number(operandB))
	mainDisplay.textContent = Math.round(result * 1000) / 1000
	clearDisplay = true
}

function integrateNums(e) {
	if (clearDisplay || mainDisplay.textContent == 0) clearMainDisplay()
	clearDisplay = false
	mainDisplay.textContent += e.target.textContent
}

function setOperation(e) {
	operandA = mainDisplay.textContent
	operator = e.target.textContent
	clearDisplay = true
}

function doTheMath(operator, a, b) {
	switch (operator) {
		case '+':
			result = a + b
			break
		case '-':
			result = a - b
			break
		case '*':
			result = a * b
			break
		case '/':
			result = a / b
			break
		default:
			alert('unable to operate!')
		// return result
	}
}

backspaceBtn.addEventListener('click', fixInputData)
equalBtn.addEventListener('click', calculate)
resetBtn.addEventListener('click', reset)
numberBtns.forEach(num => num.addEventListener('click', integrateNums))
operators.forEach(operator => operator.addEventListener('click', setOperation))
