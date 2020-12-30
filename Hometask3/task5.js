Array.prototype.myForEach = function(callback, thisArg) {
	if (typeof callback !== "function")
		throw new TypeError("callback must be a function")

	callback = bindThis(callback, thisArg)

	for (let i = 0; i < this.length; i++) {
		callback(this[i], i, this)
	}
}

Array.prototype.myMap = function(callback, thisArg) {
	if (typeof callback !== "function")
		throw new TypeError("callback must be a function")

	callback = bindThis(callback, thisArg)
	const newArr = []

	for (let i = 0; i < this.length; i++) {
		newArr.push(callback(this[i], i, this))
	}

	return newArr
}

Array.prototype.mySort = function(callback) {
	if (this.length < 2)
		return this

	let sortFunc
	if (callback !== undefined)
		sortFunc = callback
	else
		sortFunc = defaultSortFunc

    if (typeof sortFunc !== "function")
        throw new TypeError("callback must be a function")

    let wasSorted = false
    do {
    	wasSorted = false
	    for (let i = 1; i < this.length; i++) {
			const result = callback(this[i-1], this[i])
			if (result > 0) {
				wasSorted = true
				swap(this, i-1, i)
			}
		}
    } while (wasSorted)

	return this
}

function defaultSortFunc(a,b) {
	if (a < b)
		return -1
	else if (a > b)
		return 1
	else
		return 0
}

function swap(array, firstIndex, secondIndex) {
	const firstElement = array[firstIndex]
	array[firstIndex] = array[secondIndex]
	array[secondIndex] = firstElement
}

Array.prototype.myFilter = function(callback, thisArg) {
	if (typeof callback !== "function")
		throw new TypeError("callback must be a function")

	callback = bindThis(callback, thisArg)
	const newArr = []

	for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i, this))
			newArr.push(this[i])
	}

	return newArr
}

Array.prototype.myFind = function(callback, thisArg) {
	if (typeof callback !== "function")
		throw new TypeError("callback must be a function")

	callback = bindThis(callback, thisArg)

	for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i, this))
			return this[i]
	}
}

function bindThis(callback, thisArg) {
	if (thisArg !== undefined && thisArg !== null)
		return callback.bind(thisArg)
	return callback
}
