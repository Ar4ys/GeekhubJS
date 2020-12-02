const resolve = Symbol("resolve")
const reject = Symbol("reject")
const resolveStack = Symbol("resolveStack")
const rejectStack = Symbol("rejectStack")
const finalyStack = Symbol("finalyStack")
const state = Symbol("state")
const value = Symbol("value")
const reason = Symbol("reason")

module.exports.Perform = class Perform {
	constructor(executor) {
		if (typeof executor !== "function")
			throw new TypeError("Executor must be a function");

		this[resolveStack] = []
		this[rejectStack] = []
		this[finalyStack] = []
		this[state] = "pending"

		try {
			executor(
				this[resolve].bind(this),
				this[reject].bind(this)
			)
		} catch(e) {
			this[reject](e)
		}
	}

	/*
	 * Wrap this 2 methods in setTimeout,
	 * so executor will run immediately (sync),
	 * while resolve and reject - async
	 */
	[resolve](value) {
		const timerId = setTimeout(() => {
			clearTimeout(timerId)
			if (this[state] !== "pending") return
			this[state] = "resolved"
			this[value] = value
			this[finalyStack].forEach((callback) => callback())
			this[resolveStack].forEach((callback) => callback(value))
		}, 0)
	}

	[reject](reason) {
		const timerId = setTimeout(() => {
			clearTimeout(timerId)
			if (this[state] !== "pending") return
			this[state] = "rejected"
			this[reason] = reason
			this[finalyStack].forEach((callback) => callback())
			if (this[rejectStack].length === 0)
				console.error("Uncaught (in perform):", reason)
			else
				this[rejectStack].forEach((callback) => callback(reason))
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

			if (this[state] === "pending") {
				this[resolveStack].push(value => resolve(onResolved(value)))
				this[rejectStack].push(resolveOrReject)
			} else if (this[state] === "resolved")
				resolve(onResolved(this[value]))
			else if (this[state] === "rejected")
				resolveOrReject(this[reason])
		})

		return nextPerform
	}

	catch(onRejected) {
		if (typeof onRejected !== "function")
			throw new TypeError("Callback 'onRejected' must be a function");

		const nextPerform = new Perform((resolve, reject) => {
			onRejected = tryCatch(onRejected, reject)
			const resolveOnRejected = reason => resolve(onRejected(reason))
			if (this[state] === "pending") {
				this[resolveStack].push(resolve)
				this[rejectStack].push(resolveOnRejected)
			} else if (this[state] === "resolved")
				resolve(this[value])
			else if (this[state] === "rejected")
				resolveOnRejected(reason)
		})

		return nextPerform
	}

	finally(onFinally) {
		if (typeof onFinally !== "function")
			throw new TypeError("Callback 'onFinally' must be a function");


		const nextPerform = new Perform((resolve, reject) => {
			onFinally = tryCatch(onFinally, reject)

			if (this[state] === "pending") {
				this[resolveStack].push(resolve)
				this[rejectStack].push(reject)
				this[finalyStack].push(onFinally)
			} else if (this[state] === "resolved") {
				onFinally()
				resolve(this[value])
			} else if (this[state] === "rejected") {
				onFinally()
				reject(this[reason])
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
		return new Perform((resolve, reject) => {
			const result = []
			let resolvedPromisesCount = 0
			let promiseOrder = 0
			for (const perform of iterable) {
				perform.then(value => {
					result[promiseOrder] = value
					resolvedPromisesCount++
					if (resolvedPromisesCount === promiseOrder)
						resolve(result)
				}, reject)
				promiseOrder++
			}
		})
	}

	static allSettled(iterable) {
		return new Perform((resolve, reject) => {
			const result = []
			let resolvedPromisesCount = 0
			let promiseOrder = 0

			const onSettled = (status, payloadVarName, promiseOrder) => {
				return payload => {
					result[promiseOrder] = {
						status,
						[payloadVarName]: payload
					}
					resolvedPromisesCount++
					if (resolvedPromisesCount === promiseOrder)
						resolve(result)
				}
			}

			for (const perform of iterable) {
				perform
					.then(onSettled("resolved", "value", promiseOrder))
					.catch(onSettled("rejected", "reason", promiseOrder))
				promiseOrder++
			}
		})
	}

	static race(iterable) {
		return new Perform((resolve, reject) => {
			for (const perform of iterable) {
				perform.then(resolve, reject)
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
