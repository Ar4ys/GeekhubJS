const TamagotchiStates = {
	idle: "idle",
	playing: "playing",
	sleeping: "sleeping",
	ded: "ded",
	runAway: "runAway"
}

class Tamagotchi {
	constructor(name) {
		const def = defineField.bind(this, this)
		this.name = name
		this.state = TamagotchiStates.idle

		def(health)
		def(food)
		def(aqua)
		def(happiness)
		def(energy)
	}

	feed() {
		this.food += 25
	}

	drink() {
		this.aqua += 15
	}

	async sleep() {
		this.state = TamagotchiStates.sleeping
		this.energy = 100
		this.happiness += 10
		await later(5000)
		this.state = TamagotchiStates.idle
	}

	pat() {
		this.happiness += 25
	}

	async playing() {
		this.state = TamagotchiStates.playing
		this.happiness += 25
		this.energy -= 25
		await later(5000)
		this.state = TamagotchiStates.idle
	}

	die() {
		this.state = TamagotchiStates.ded
	}

	runAway() {
		this.state = TamagotchiStates.runAway
	}

	update() {
		this.food -= 5
		this.aqua -= 5
		this.happiness -= 5
		this.energy -= 1
	}
}

function defineField(object, fieldName) {
	let storedValue = 0
	Object.defineProperty(
		object,
		fieldName,
		{
			get: () => storedValue,
			set: value => {
				if (value > 100)
					storedValue = 100
				else if (value < 0)
					storedValue = 0
				else
					storedValue = value
			}
		}
	);
}

function later(time, value) {
	return new Promise(resolve => setTimeout(resolve, time, value))
}