const input = document.querySelector("input")
const output = document.querySelector("p")

let timeoutId = 0
input.addEventListener("input", () => {
	clearTimeout(timeoutId)
	timeoutId = setTimeout(() => {
		clearTimeout(timeoutId)
		output.innerText = input.value
	}, 500)
})
