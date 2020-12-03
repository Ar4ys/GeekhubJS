const { Perform } = require("./perform")

class TaskPerform extends Perform {
	then(...args) {
		const lastArg = args[args.length - 1]
		if (typeof lastArg !== "function")
			throw new TypeError("Last argument must be a function")
		return super.then(value => lastArg(...args.slice(0, -1), value))
	}
}

function perform(...args) {
	const lastArg = args[args.length - 1]
	return new TaskPerform(resolve => resolve(lastArg(...args.slice(0, -1))))
}

perform(20, (value) => {
	console.log("a", value) // 20
	const param = 1;
	console.log("b", param); // 1
	return param;
}).then('a', 'b', (a, b, param) => {
	console.log("c", ++param); // 2
	return param;
}).then((param) => { // param === 2
	console.log("d", ++param); // 3
	return param;
});