class Perform {
	constructor(executor) {
		if (typeof executor !== "function")
			throw new TypeError("Executor must be a function");

		this.resolveStack = []
		this.rejectStack = []
		this.finalyStack = []
		this.state = "pending"

		const resolve = this._resolve.bind(this)
		const reject = this._reject.bind(this)

		try {
			executor(resolve, reject)
		} catch(e) {
			reject(e)
		}
	}

	_resolve(value) {
		const timerId = setTimeout(() => {
			clearTimeout(timerId)
			if (this.state !== "pending") return
			this.state = "resolved"
			this.value = value
			this.finalyStack.forEach((callback) => callback())
			this.resolveStack.forEach((callback) => callback(value))
		}, 0)
	}

	_reject(reason) {
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
			throw new TypeError("Callback 'onRejected' must be a function");

		const nextPerform = new Perform((resolve, reject) => {
			onRejected = tryCatch(onRejected, reject)
			const resolveOnReject = reason => resolve(onRejected(reason))
			if (this.state === "pending") {
				this.resolveStack.push(resolve)
				this.rejectStack.push(resolveOnReject)
			} else if (this.state === "resolved")
				resolve(this.value)
			else if (this.state === "rejected")
				resolveOnReject(reason)
		})

		return nextPerform
	}

	finally(onFinally) {
		if (typeof onFinally !== "function")
			throw new TypeError("Callback 'onFinally' must be a function");


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


const l = console.log

/*
 * This test (and *1) was used to understand, how setTimeout handle errors,
 * how uncatched errors in Promise affect on setTimeout and vise versa
 */
// new Promise((a, b) => setTimeout(() => { b(); /*throw new Error("9S");*/ a() }, 0))

/**
 * These test were used to understand, how does Promise
 * work under the hood, how it handles dirfferent type of errors, etc.
 */
// const a = new Perform((a, b) => { l("(Perform)"); throw new Error("(throw) Hello there!")})
// const a = new Perform((a, b) => { l("(Perform)"); b(new Error("Hello there!")) })
const a = new Perform((a, b) => { l("(Perform)"); a("Hello there!") })

// const a = new Promise((a, b) => { l("(Promise)"); throw new Error("(throw) Hello there!")})
// const a = new Promise((a, b) => { l("(Promise)"); b(new Error("Hello there!"))})
// const a = new Promise((a, b) => { l("(Promise)"); a("Hello there!")})


a.then(a => (l("(then)", a), a))
	.then(a => { l("(then then)", a); throw new Error(2) }, a => (l("(then catch)", a.toString()), 1))
	.catch(a => (l("(catch)", a), "catched"))
	.finally(a => { l("(finally after catch)", a); throw new Error("Ooops!") })
	.then(a => l("(then after finally)", a), a => l("(then catch)", a))
	.finally(a => l("(finally after then)", a))
	.catch(a => (l("(catch after finally)", a), "catched"))
l("After promise")

/* *1 */
// new Promise(a => setTimeout(_ => (l("2B"), a()), 1000))

/**	
 * This test helps to understand, that executor runs immediately (sync), 
 * while resolve/reject callbacks later (async)
 */
// const a = new Perform((a, b) => { l("(Perform)");
// const a = new Promise((a, b) => { l("(Promise)");
// 	const c = []
// 	for (let i = 0; i < 1000000; ++i) {
// 		c.push([ "lol" ])
// 	}
// 	a("Hello there!")
// })
