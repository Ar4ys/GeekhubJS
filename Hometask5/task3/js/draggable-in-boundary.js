class DraggableInBoundary extends Draggable {
	constructor(node, parentElement) {
		super(node)
		this.parentElement = parentElement || this.node.parentElement
		this.parentBoundary = this.parentElement.getBoundingClientRect()
	}

	onMouseMove({ pageX, pageY }) {
		this.parentBoundary = this.parentElement.getBoundingClientRect()
		const { clientHeight, clientWidth } = this.node

		const newX = pageX - this.parentBoundary.left - this.shiftX
		const newY = pageY - this.parentBoundary.top - this.shiftY

		const borderX = this.parentBoundary.width - clientWidth
		const borderY = this.parentBoundary.height - clientHeight

		this.moveAt("left", newX, borderX)
		this.moveAt("top", newY, borderY)
	}

	moveAt(type, newPostion, border) {
		if (newPostion < 0)
			this.node.style[type] = "0px"
		else if (newPostion > border)
			this.node.style[type] = border + "px"
		else
			this.node.style[type] = newPostion + "px"
	}
}
