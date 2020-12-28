class Tag extends DraggableInBoundary {
	constructor(node, parentElement) {
		super(node, parentElement)
		this.button = this.node.querySelector("button")
		this.state = "idle"
		this.wasMouseOnMe = false

		this.node.addEventListener("click", this.activate.bind(this))
		document.addEventListener("click", this.deactivate.bind(this))
		this.button.addEventListener("click", this.delete.bind(this))
	}

	onMouseDown() {
		this.wasMouseOnMe = true
		if (this.state === "active")
			super.onMouseDown(...arguments)
	}

	onMouseMove() {
		super.onMouseMove(...arguments)
		const { width } = this.button.getBoundingClientRect()
		const { right } = this.node.getBoundingClientRect()

		const tagRight = right + width

		if (tagRight >= this.parentBoundary.right) 
			this.toggleButtonPosition(true)
		else
			this.toggleButtonPosition(false)
	}

	activate() {
		this.state = "active"
		this.toggleButton(true)
	}

	deactivate({ target }) {
		// Click is fired onMouseUp, so it doesn't matter,
		// where mouse button was pressed, tag will change state to idle
		// if you resolve button out of it's bounds.
		if (this.node === target.parentElement || this.wasMouseOnMe) {
			this.wasMouseOnMe = false
			return
		}

		this.state = "idle"
		this.toggleButton(false)
	}

	toggleButton(state) {
		this.button.classList.toggle("hidden", !state)
	}

	toggleButtonPosition(state) {
		this.button.classList.toggle("right", !state)
		this.button.classList.toggle("left", state)
	}

	delete() {
		this.node.remove()
	}
}
