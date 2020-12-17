const log = (fun) => (...args) => {
	const result = fun(...args)
	console.log(result)
	return result
}

// 1. isPrime - Returns true or false, indicating whether the given number is prime.
isPrime = log(isPrime)
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
factorial(0)                        // 1
factorial(1)                        // 1
factorial(6)                        // 720

function factorial() {}

// 3. fib - Returns the nth Fibonacci number.
fib(0)                              // 0
fib(1)                              // 1
fib(10)                             // 55
fib(20)                             // 6765

function fib() {}

// 4. isSorted - Returns true or false, indicating whether the given array of numbers is sorted.
isSorted([])                        // true
isSorted([-Infinity, -5, 0, 3, 9])  // true
isSorted([3, 9, -3, 10])            // false

function isSorted() {}

// 5. reverse - Reverses the given string (yes, using the built in reverse function is cheating).
reverse('')                         // ''
reverse('abcdef')                   // 'fedcba'

function reverse() {}

// 6. indexOf - Implement the indexOf function for arrays.
indexOf([1, 2, 3], 1)               // 0
indexOf([1, 2, 3], 4)               // -1

function indexOf() {}

// 7. isPalindrome - Return true or false indicating whether the given string is a plaindrone (case and space insensitive).
isPalindrome('')                                // true
isPalindrome('abcdcba')                         // true
isPalindrome('abcd')                            // false
isPalindrome('A man a plan a canal Panama')     // true

function isPalindrome() {}

// 8. missing - Takes an unsorted array of unique numbers (ie. no repeats) from 1 through some number n, and returns the missing number in the sequence (there are either no missing numbers, or exactly one missing number). Can you do it in O(N) time? Hint: There’s a clever formula you can use.
missing([])                         // undefined
missing([1, 4, 3])                  // 2
missing([2, 3, 4])                  // 1
missing([5, 1, 4, 2])               // 3
missing([1, 2, 3, 4])               // undefined

function missing() {}

// 9. isBalanced - Takes a string and returns true or false indicating whether its curly braces are balanced.
isBalanced('}{')                      // false
isBalanced('{{}')                     // false
isBalanced('{}{}')                    // false
isBalanced('foo { bar { baz } boo }') // true
isBalanced('foo { bar { baz }')       // false
isBalanced('foo { bar } }')           // false

function isBalanced() {}
