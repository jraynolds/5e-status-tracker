<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-btn 
				style="width: 100%;"
				x-large 
				@click="isClicked = !isClicked"
				:color="!isAvailable ? 'gray' : color"
				:disabled="isDisabled"
				v-bind="attrs"
				v-on="on"
			>
				<v-icon left>{{ "mdi-" + icon }}</v-icon>{{ titleify(title) }}
			</v-btn>
		</template>
		<v-card-title><em>{{ availability }}</em></v-card-title>
		<v-row>
			<v-col cols="6">
				Uses:
				<ul>
					<li v-for="use of uses" :key="use">{{ use }}</li>
				</ul>
			</v-col>
			<v-col cols="6">
				Effects:
				<ul>
					<li v-for="mitigator in mitigators" :key="mitigator.source">
						<font :color="mitigator.isPositive ? 'green' : 'red' ">{{ mitigator.source }}</font>
					</li>
				</ul>
			</v-col>
		</v-row>
	</v-tooltip>
</template>

<script>
export default {
	props: [ "title", "color", "isYourTurn", "icon", "availability", "uses", "activeSources" ],
	
	data: () => ({
		isClicked: false
	}),

	computed: {
		isAvailable() {
			if (this.isClicked) return false;
			if (!this.isYourTurn && this.title != "reaction") return false;
			for (let source of this.activeSources) {
				if (
					this.title in source.effects && 
					source.effects[this.title] == false
				) return false;
			}
			return true;
		},
		isDisabled() {
			if (!this.isYourTurn && this.title != "reaction") return true;
			for (let source of this.activeSources) {
				if (
					this.title in source.effects && 
					source.effects[this.title] == false
				) return true;
			}
			return false;
		},
		mitigators() {
			let mitigators = [];

			if (this.isClicked) mitigators.push({ source: "Already used.", isPositive: false });
			if (!this.isYourTurn && this.title != "reaction") {
				mitigators.push({ source: "Not your turn.", isPositive: false });
			}
			for (let source of this.activeSources) {
				if (this.title in source.effects && source.effects[this.title] == false) {
					mitigators.push({ 
						source: source.title, 
						isPositive: source.effects.action 
					})
				}
			}

			return mitigators;
		}
	},

	methods: {
		titleify(string) {
			if (string == "bonusAction") return "Bonus Action";
			return string.substring(0, 1).toUpperCase() + string.substring(1);
		}
	}
}
</script>

<style>

</style>