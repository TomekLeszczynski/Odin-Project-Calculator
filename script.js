const numberBtns = document.querySelectorAll('[data-digit]')
const operators = document.querySelectorAll('[data-operator]')
const mainDisplay = document.querySelector('.main-line')
const resetBtn = document.querySelector('[data-reset]')
const equalBtn = document.querySelector('[data-equal]')
const backspaceBtn = document.querySelector('[data-backspace]')
const commaBtn = document.querySelector('[data-point]')

let operandA
let operandB
let operator
let result
let clearDisplay = false

function clearMainDisplay() {
	mainDisplay.textContent = ''
	clearDisplay = false
}
function reset() {
	mainDisplay.textContent = ''
	operandA = ''
	operandB = ''
	operator = ''
	result = ''
	clearDisplay = false
}
function fixInputData() {
	mainDisplay.textContent = mainDisplay.textContent.toString().slice(0, -1)
}
function appendPoint() {
	if (clearDisplay) clearMainDisplay()
	if (mainDisplay.textContent.includes('.')) return
	else if (mainDisplay.textContent === '') mainDisplay.textContent = '0'
	mainDisplay.textContent += '.'
}
function evaluate() {
	if (result || clearDisplay) return
	operandB = mainDisplay.textContent
	if (operator === '/' && operandB == 0) {
		alert("Can't divide by 0!")
		reset()
		return
	}
	clearMainDisplay()
	doTheMath(operator, Number(operandA), Number(operandB))
	mainDisplay.textContent = Math.round(result * 1000) / 1000
	clearDisplay = true
}
function appendNums(number) {
	if (clearDisplay || mainDisplay.textContent === '0') clearMainDisplay()
	mainDisplay.textContent += number
}
function setOperation(operatorKey) {
	if (result) {
		operandA = result
	} else if (operator) {
		evaluate()
	}
	result = ''
	operandA = mainDisplay.textContent
	operator = operatorKey
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
			return
	}
}

backspaceBtn.addEventListener('click', fixInputData)
equalBtn.addEventListener('click', evaluate)
resetBtn.addEventListener('click', reset)
numberBtns.forEach(num => num.addEventListener('click', () => appendNums(num.textContent)))
operators.forEach(operator => operator.addEventListener('click', () => setOperation(operator.textContent)))
commaBtn.addEventListener('click', appendPoint)
// window.addEventListener('keydown', handleKeyboard)
