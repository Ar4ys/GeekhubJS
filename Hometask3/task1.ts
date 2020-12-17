type Init<T> = () => T
type Condition<T> = (initValues: T) => boolean
type FinalExpression<T> = (initValues: T) => T
type Callback<T> = (initValues: T) => any

function fFor<T>(
		init: Init<T>,
		condition: Condition<T>,
		finalExpression: FinalExpression<T>,
		callback: Callback<T>
): void {
	const initValues: T = init()

	if (condition(initValues)) {
		callback(initValues)
		finalExpression(initValues)
		fFor(() => initValues, condition, finalExpression, callback)
	}
}