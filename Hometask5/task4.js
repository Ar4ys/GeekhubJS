const log = (fun, ...logData) => (...args) => {
	const result = fun(...args)
	console.log(...logData, result)
	return result
}

// 1. isPrime - Returns true or false, indicating whether the given number is prime.
isPrime = log(isPrime, "isPrime:")
isPrime(0)                          // false
isPrime(1)                          // false
isPrime(17)                         // true
isPrime(10000000000000)             // false

function isPrime(num) {
	const definitelyPrime = [2, 3, 5, 7]
	return !(
		num === 1
		|| definitelyPrime.includes(num)
		|| definitelyPrime.some(prime => num % prime === 0))
}

// 2. factorial - Returns a number that is the factorial of the given number.
const factorial = log(function fact(num) {
	if (num <= 0)
		return 1
	else
		return num * fact(--num)
}, "factorial:")

factorial(0)                        // 1
factorial(1)                        // 1
factorial(6)                        // 720


// 3. fib - Returns the nth Fibonacci number.
fib = log(fibonacci, "fibonacci:")
fib(0)                              // 0
fib(1)                              // 1
fib(10)                             // 55
fib(20)                             // 6765

function fibonacci(num) {
	let a = 0
	let b = 1

	for (let i = 0; i < num; i++) {
		let c = b
		b += a
		a = c
	}

	return a
}

// 4. isSorted - Returns true or false, indicating whether the given array of numbers is sorted.
isSorted = log(isSorted, "isSorted:")
isSorted([])                        // true
isSorted([-Infinity, -5, 0, 3, 9])  // true
isSorted([3, 9, -3, 10])            // false

function isSorted(array) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] > array[i+1])
			return false
	}

	return true
}

// 5. reverse - Reverses the given string (yes, using the built in reverse function is cheating).
reverse = log(reverse, "reverse:")
reverse('')                         // ''
reverse('abcdef')                   // 'fedcba'

function reverse(str) {
	return str
		.split("")
		.map((_, i, arr) => arr[arr.length-i-1])
		.join("")
}

// 6. indexOf - Implement the indexOf function for arrays.
indexOf = log(indexOf, "indexOf:")
indexOf([1, 2, 3], 1)               // 0
indexOf([1, 2, 3], 4)               // -1

function indexOf(arr, target) {
	for (let i = 0; i < arr.length; i++)
		if (arr[i] === target)
			return i

	return -1
}

// 7. isPalindrome - Return true or false indicating whether the given string is a plaindrone (case and space insensitive).
isPalindrome = log(isPalindrome, "isPalindrome:")
isPalindrome('')                                // true
isPalindrome('abcdcba')                         // true
isPalindrome('abcd')                            // false
isPalindrome('A man a plan a canal Panama')     // true

function isPalindrome(str) {
	const preparedString = str.toLowerCase().replace(/ /g, "")
	const palindromedString = preparedString.split("").reverse().join("")
	return preparedString === palindromedString
}

// 8. missing - Takes an unsorted array of unique numbers from 1 through some number n,
// and returns the missing number in the sequence (there are either no missing numbers,
// or exactly one missing number). Can you do it in O(N) time?
// Hint: There’s a clever formula you can use.
missing = log(missing, "missing:")
missing([])                         // undefined
missing([1, 4, 3])                  // 2
missing([2, 3, 4])                  // 1
missing([5, 1, 4, 2])               // 3
missing([1, 2, 3, 4])               // undefined

function missing(arr) {
	const iterator = Array(arr.length).keys()
	iterator.next() // Skip 0
	const arrWithoutMissing = [...iterator]
	for (const num of arrWithoutMissing)
		if (!arr.includes(num))
			return num
	return undefined
}

// 9. isBalanced - Takes a string and returns true or false indicating whether its curly braces are balanced.
isBalanced = log(isBalanced, "isBalanced:")
isBalanced('}{')                      // false
isBalanced('{{}')                     // false
isBalanced('{}{}')                    // false
isBalanced('foo { bar { baz } boo }') // true
isBalanced('foo { bar { baz }')       // false
isBalanced('foo { bar } }')           // false

function isBalanced(input) {
	let string = input.match(/[{}]/g).join("")
	while (string !== null) {
		if (string === "{}")
			return true

		const match = string.match(/{(.+)}/)
		string = match && match[1]
	}

	return false
}
