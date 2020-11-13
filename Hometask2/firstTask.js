function minMaxSumOfArr(arr) {
	let max = arr[0]
	let min = arr[0]
	let sum = arr[0]

	for (let i = 1; i < arr.length; i++) {
		const num = arr[i]
		if (isNaN(num) || num === undefined || num === null)
			continue

		max = Math.max(max, num)	
		min = Math.min(min, num)	
		sum += num
	}

	return { max, min, sum }
}

const testArrs = [
	[3, 0, -5, 1, 44, -12, 3, 0, 0, 1, 2, -3, -3, 2, 1, 4, -2 - 3 - 1],
	[-1,-8,-2],
	[1,7,3],
	[1,undefined,3,5,-3],
	[1,NaN,3,5,-3]
]

testArrs.forEach(arr => console.log(minMaxSumOfArr(arr)))