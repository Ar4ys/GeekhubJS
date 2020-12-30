const { Pointer } = require("./pointer")

function matrix(rowsCount, columnsCount, startRow, startColumn) {
	if (isOutOfBounds([startRow, startColumn], rowsCount, columnsCount))
		throw new RangeError("start position can't be out of bounds")

	const rows = new Array(rowsCount)
	for (let i = 0; i < rows.length; i++)
		rows[i] = new Array(columnsCount)

	const pointer = new Pointer(startRow, startColumn)
	const result = [pointer.getCurrentCell()]
	const cellsCount = rowsCount * columnsCount
	const offset = {
		x: 0,
		y: 0
	}

	const currentOffset = { ...offset }

	while (result.length < cellsCount) {
		const axis = pointer.getCurrentAxis()
		const nextCell = pointer.moveForward().getCurrentCell()
		++currentOffset[axis]

		if (!isOutOfBounds(nextCell, rowsCount, columnsCount))
			result.push(nextCell)

		if (currentOffset[axis] > offset[axis]) {
			offset[axis] = currentOffset[axis]
			currentOffset[axis] = 0
			pointer.rotate()
		}
	}

	return result
}

function isOutOfBounds([ row, column ], rowsCount, columnsCount) {
	return row < 0
		|| row >= rowsCount
		|| column < 0
		|| column >= columnsCount
}

module.exports = { matrix }
