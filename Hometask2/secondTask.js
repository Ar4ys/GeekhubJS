function sumPuddles(arr) {
	const heightsPoint = arr.indexOf(Math.max(...arr))

	const leftPart = arr
	const rightPart = [
		arr[heightsPoint],
		...arr.splice(heightsPoint + 1)
	].reverse()

	const puddlesArr = [
		findPuddles(leftPart),
		findPuddles(rightPart)
	].flat(Infinity)

	return puddlesArr.reduce((a, b) => a + b)
}

function findPuddles(arr) {
	const result = []

	let heights = [ arr[0] ]
	for (let i = 1; i < arr.length; i++) {
		const maxHeight = arr[i]

		if (maxHeight < heights[0])
			heights.push(maxHeight)
		else {
			result.push(heights.map(height => heights[0] - height))
			heights = [ maxHeight ]
		}
	}

	return result
}

console.log(sumPuddles([2, 5, 1, 3, 1, 2, 1, 7, 7, 6]), 17) 	// 17
console.log(sumPuddles([2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0]), 10) 	// 10
console.log(sumPuddles([7, 0, 1, 3, 4, 1, 2, 1]), 9) 			// 9
console.log(sumPuddles([2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0]), 10) 	// 10
console.log(sumPuddles([2, 2, 1, 2, 2, 3, 0, 1, 2]), 4) 		// 4
console.log(sumPuddles([2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 8]), 24) 	// 24
console.log(sumPuddles([2, 2, 2, 2, 2]), 0) 					// 0
