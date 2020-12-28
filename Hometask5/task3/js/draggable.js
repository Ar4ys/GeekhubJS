class Draggable {
	constructor(node) {
		this.node = node
		this.shiftX = 0
		this.shiftY = 0
		this.onMouseMove = this.onMouseMove.bind(this)

		this.node.addEventListener("dragstart", () => false)
		this.node.addEventListener("mousedown", this.onMouseDown.bind(this))
		document.addEventListener("mouseup", this.onMouseUp.bind(this))
	}

	onMouseDown({ clientX, clientY }) {
		const { left, top } = this.node.getBoundingClientRect()
		this.shiftX = clientX - left
		this.shiftY = clientY - top

		document.addEventListener("mousemove", this.onMouseMove)
	}

	onMouseUp() {
		document.removeEventListener("mousemove", this.onMouseMove)
	}

	onMouseMove({ pageX, pageY }) {
		this.node.style.left = pageX - this.shiftX + "px"
		this.node.style.top = pageY - this.shiftY + "px"
	}
}
