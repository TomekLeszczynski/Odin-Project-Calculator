const operators = document.querySelectorAll('[data-operator]')
const display = document.querySelector('.main-line')
const numberButtons = document.querySelectorAll('[data-digit]')
const commaBtn = document.querySelector('[data-point]')
const equalBtn = document.querySelector('[data-equal]')
const backspaceBtn = document.querySelector('[data-backspace]')
const resetBtn = document.querySelector('[data-reset]')

let operandA
let operandB
let operator
let result
let displayToClear = false

function clearDisplay() {
	display.textContent = ''
	displayToClear = false
}
function reset() {
	display.textContent = ''
	operandA = ''
	operandB = ''
	operator = ''
	result = ''
	displayToClear = false
}
function fixInputData() {
	display.textContent = display.textContent.toString().slice(0, -1)
}
function checkDivideByZero() {
	if (operator === '/' && operandB == 0) {
		alert("Can't divide by 0!")
		reset()
		return
	}
}
function appendPoint() {
	if (displayToClear) clearDisplay()
	if (display.textContent.includes('.')) return
	if (display.textContent === '') display.textContent = '0'
	display.textContent += '.'
}
function appendNumbers(number) {
	if (displayToClear || display.textContent === '0') clearDisplay()
	display.textContent += number
}
function setOperation(operatorKey) {
	if (result) operandA = result
	if (operator) evaluate()
	result = ''
	operandA = display.textContent
	operator = operatorKey
	displayToClear = true
}
function evaluate() {
	if (result || displayToClear) return
	operandB = display.textContent
	checkDivideByZero()
	doTheMath(Number(operandA), Number(operandB))
}
function doTheMath(a, b) {
	clearDisplay()
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
	display.textContent = Math.round(result * 1000) / 1000
	displayToClear = true
}

function handleKeyboard(e) {
	if (e.key >= 0 && e.key <= 9) appendNumbers(e.key)
	if (e.key == '.') appendPoint()
	if (e.key == '+' || e.key == '-' || e.key === '*' || e.key == '/') setOperation(e.key)
	if (e.key == '=' || e.key == 'Enter') evaluate()
	if (e.key == 'Escape' || e.key == 'c') reset()
}

numberButtons.forEach(num => num.addEventListener('click', () => appendNumbers(num.textContent)))
operators.forEach(operator => operator.addEventListener('click', () => setOperation(operator.textContent)))
equalBtn.addEventListener('click', evaluate)
backspaceBtn.addEventListener('click', fixInputData)
resetBtn.addEventListener('click', reset)
commaBtn.addEventListener('click', appendPoint)
window.addEventListener('keydown', handleKeyboard)
