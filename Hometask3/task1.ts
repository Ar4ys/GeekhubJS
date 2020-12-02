type Init<T> = () => T
type Condition<T> = (initValues: T) => boolean
type FinalExpression<T> = (initValues: T) => T
type Callback<T> = (initValues: T) => any

function fFor<T>(
		init: Init<T> | T,
		condition: Condition<T>,
		finalExpression: FinalExpression<T>,
		callback: Callback<T>
): void {
	let initValues: T
	if (typeof init === "function")
		initValues = init()
	else
		initValues = init

	if (condition(initValues)) {
		callback(initValues)
		finalExpression(initValues)
		fFor(initValues, condition, finalExpression, callback)
	}
}