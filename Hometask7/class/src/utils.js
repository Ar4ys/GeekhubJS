export function classNameWrapper(Component, className) {
	return props => 
		<Component
			{...props}
			className={className + " " + props.className ?? ""}
		/>
}
