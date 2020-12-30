class Calculator {
	constructor(initialValue = 0) {
		this.value = initialValue
	}

	add(...args) {
		args.forEach(value => this.value += value)
		return this
	}

	subtract(...args) {
		args.forEach(value => this.value -= value)
		return this
	}

	multiply(...args) {
		args.forEach(value => this.value *= value)
		return this
	}

	divide(...args) {
		args.forEach(value => this.value /= value)
		return this
	}

	result() {
		return this.value
	}
}

const calculate = initialValue => new Calculator(initialValue)

const result = calculate(3).add(2).multiply(2).result() // 10
console.log(result)
