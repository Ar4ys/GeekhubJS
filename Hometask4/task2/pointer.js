class Pointer {
	constructor(row, column) {
		this.cell = [row, column]
		this.previousCell = this.cell
		this.direction = "right"
	}

	moveForward() {
		const moves = {
			up: ([row, column]) => [--row, column],
			down: ([row, column]) => [++row, column],
			right: ([row, column]) => [row, ++column],
			left: ([row, column]) => [row, --column]
		}

		const nextCell = moves[this.direction](this.cell)
		this.previousCell = this.cell
		this.cell = nextCell

		return this
	}

	rotate() {
		const directions = ["right", "down", "left", "up"]
		const nextDirextionIndex = directions.indexOf(this.direction)+1
		this.direction = nextDirextionIndex > 3
			? directions[0]
			: directions[nextDirextionIndex]

		return this
	}

	getCurrentCell() {
		return this.cell
	}

	getCurrentAxis() {
		const directions = {
			up: "y",
			down: "y",
			right: "x",
			left: "x"
		}

		return directions[this.direction]
	}
}

module.exports = { Pointer } 
