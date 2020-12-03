const { Perform } = require("./perform")
const l = console.log

/*
 * This test (and *1) was used to understand, how setTimeout handle errors,
 * how uncatched errors in Promise affect on setTimeout and vise versa
 */
// new Promise((a, b) => setTimeout(() => { b(); /*throw new Error("9S");*/ a() }, 0))

/**
 * These tests were used to understand, how does Promise
 * work under the hood, how it handles dirfferent type of errors, etc.
 */
// const a = new Perform((a, b) => { l("(Perform)"); throw new Error("(throw) Hello there!")})
// const a = new Perform((a, b) => { l("(Perform)"); b(new Error("Hello there!")) })
// const a = new Perform((a, b) => { l("(Perform)"); a("Hello there!") })
// const a = new Perform((a, b) => { l("(Perform)"); a(new Perform(a => a(1))) })

// const a = new Promise((a, b) => { l("(Promise)"); throw new Error("(throw) Hello there!")})
// const a = new Promise((a, b) => { l("(Promise)"); b(new Error("Hello there!"))})
// const a = new Promise((a, b) => { l("(Promise)"); a("Hello there!")})


// a.then(a => (l("(then)", a), new Perform(a => a(1))))
	// .then(a => { l("(then then)", a); throw new Error(2) }, a => (l("(then catch)", a.toString()), 1))
	// .catch(a => (l("(catch)", a), "catched"))
	// .finally(a => { l("(finally after catch)", a); throw new Error("Ooops!") })
	// .then(a => l("(then after finally)", a))
	// .finally(a => l("(finally after then)", a))
	// .catch(a => (l("(catch after finally)"/, a), "catched"))
// l("After promise")

new Promise(resolve => resolve(new Perform(resolve => resolve(1))))
	.then(a => (l("then", a), Promise.reject(2)))
	.catch(a => (l("catch", a), new Perform(a => a(3))))
	.then(a => l("then", a))


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
