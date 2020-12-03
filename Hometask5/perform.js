class Perform {
	constructor(executor) {
		if (typeof executor !== "function")
			throw new TypeError("Executor must be a function")

		this.resolveStack = []
		this.rejectStack = []
		this.finalyStack = []
		this.state = "pending"

		try {
			executor(
				this.resolve.bind(this),
				this.reject.bind(this)
			)
		} catch(e) {
			this.reject(e)
		}
	}

	/*
	 * Wrap this 2 methods in setTimeout,
	 * so executor will run immediately (sync),
	 * while resolve and reject - async
	 */
	resolve(value) {
		const resolvePreform = value => {
			if (this.state !== "pending") return
			this.state = "resolved"
			this.value = value
			this.finalyStack.forEach((callback) => callback())
			this.resolveStack.forEach((callback) => callback(value))
		}

		if (value instanceof Perform || value instanceof Promise)
			value.then(resolvePreform, this.reject.bind(this))
		else {
			const timerId = setTimeout(() => {
				clearTimeout(timerId)
				resolvePreform(value)
			}, 0)
		}
	}

	reject(reason) {
		const timerId = setTimeout(() => {
			clearTimeout(timerId)
			if (this.state !== "pending") return
			this.state = "rejected"
			this.reason = reason
			this.finalyStack.forEach((callback) => callback())
			if (this.rejectStack.length === 0)
				console.error("Uncaught (in perform):", reason)
			else
				this.rejectStack.forEach((callback) => callback(reason))
		}, 0)
	}

	then(onResolved, onRejected) {
		if (typeof onResolved !== "function")
			throw new TypeError("Callback 'onResolved' must be a function")
		if (typeof onRejected !== "function" && onRejected !== undefined)
			throw new TypeError("Callback 'onRejected' must be a function")

		const nextPerform = new Perform((resolve, reject) => {
			onResolved = tryCatch(onResolved, reject)
			onRejected = onRejected && tryCatch(onRejected, reject)
			
			const resolveOrReject = reason => (onRejected)
				? resolve(onRejected(reason))
				: reject(reason)

			if (this.state === "pending") {
				this.resolveStack.push(value => resolve(onResolved(value)))
				this.rejectStack.push(resolveOrReject)
			} else if (this.state === "resolved")
				resolve(onResolved(this.value))
			else if (this.state === "rejected")
				resolveOrReject(this.reason)
		})

		return nextPerform
	}

	catch(onRejected) {
		if (typeof onRejected !== "function")
			throw new TypeError("Callback 'onRejected' must be a function")

		const nextPerform = new Perform((resolve, reject) => {
			onRejected = tryCatch(onRejected, reject)
			const resolveOnRejected = reason => resolve(onRejected(reason))

			if (this.state === "pending") {
				this.resolveStack.push(resolve)
				this.rejectStack.push(resolveOnRejected)
			} else if (this.state === "resolved")
				resolve(this.value)
			else if (this.state === "rejected")
				resolveOnRejected(this.reason)
		})

		return nextPerform
	}

	finally(onFinally) {
		if (typeof onFinally !== "function")
			throw new TypeError("Callback 'onFinally' must be a function")

		const nextPerform = new Perform((resolve, reject) => {
			onFinally = tryCatch(onFinally, reject)

			if (this.state === "pending") {
				this.resolveStack.push(resolve)
				this.rejectStack.push(reject)
				this.finalyStack.push(onFinally)
			} else if (this.state === "resolved") {
				onFinally()
				resolve(this.value)
			} else if (this.state === "rejected") {
				onFinally()
				reject(this.reason)
			}			
		})

		return nextPerform
	}

	static resolve(value) {
		return new Perform(resolve => resolve(value))
	}

	static reject(reason) {
		return new Perform((_, reject) => reject(reason))
	}

	static all(iterable) {
		if (!isIterable(iterable))
			throw new TypeError("Argument of Perform.all is not iterable")
			
		return new Perform((resolve, reject) => {
			const result = []
			let resolvedPromisesCount = 0
			let promiseCount = 0
			for (const perform of iterable) {
				(isPromiseLike(perform)
					? perform
					: Perform.resolve(perform)
				).then(value => {
					result[promiseCount] = value
					resolvedPromisesCount++
					if (resolvedPromisesCount === promiseCount)
						resolve(result)
				}, reject)
				promiseCount++
			}
			if (promiseCount === 0)
				resolve(result)
		})
	}

	static allSettled(iterable) {
		if (!isIterable(iterable))
			throw new TypeError("Argument of Perform.allSettled is not iterable")

		return new Perform((resolve, reject) => {
			const result = []
			let resolvedPromisesCount = 0
			let promiseCount = 0

			const onSettled = (status, payloadVarName, promiseCount) => {
				return payload => {
					result[promiseCount] = {
						status,
						[payloadVarName]: payload
					}
					resolvedPromisesCount++
					if (resolvedPromisesCount === promiseCount)
						resolve(result)
				}
			}

			for (const perform of iterable) {
				(isPromiseLike(perform)
					? perform
					: Perform.resolve(perform)
				).then(onSettled("resolved", "value", promiseCount))
					.catch(onSettled("rejected", "reason", promiseCount))
				promiseCount++
			}
		})
	}

	static race(iterable) {
		if (!isIterable(iterable))
			throw new TypeError("Argument of Perform.race is not iterable")

		return new Perform((resolve, reject) => {
			for (const perform of iterable) {
				(isPromiseLike(perform)
					? perform
					: Perform.resolve(perform)
				).then(resolve, reject)
			}
		})
	}
}

function tryCatch(func, onError = () => {}) {
	return function() {
		try {
			return func(...arguments)
		} catch (e) {
			onError(e)
		}
	}
}

function isIterable(target) {
	return target !== undefined
		&& target !== null
		&& typeof target[Symbol.iterator] === "function"
}

function isPromiseLike(target) {
	return target instanceof Perform
		|| target instanceof Promise
}

module.exports = { Perform }
