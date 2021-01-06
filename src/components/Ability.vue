<template>
	<v-container class="d-flex">
		<v-btn 
			text 
			:disabled="isDisabled"
			:color="color"
			class="mr-n2"
		>
			{{ ability }}
		</v-btn>
		<v-icon small :color="color">{{ icon }}</v-icon>
	</v-container>
</template>

<script>
export default {
	props: [ "ability", "activeSources", "type" ],
	computed: {
		color() {
			if (this.state == "disadvantage") return "red";
			if (this.state == "advantage") return "green";
			return "";
		},
		isDisabled() {
			return this.state == "fail";
		},
		icon() {
			if (this.state == "disadvantage") return "mdi-thumb-down";
			if (this.state == "advantage") return "mdi-thumb-up";
			if (this.state == "fail") return "mdi-cancel";
			return "";
		},
		state() {
			let effects = [];

			for (let source of this.activeSources) {
				let title = this.ability;
				if (this.type == "saves") title += "Save";
				if (title in source.effects) {
					effects.push(source.effects[title]);
				}
				if ("abilities" in source.effects && this.type == "checks") {
					effects.push(source.effects.abilities);
				}
			}

			return this.normalizeResults(effects);
		},
	},
	methods: {
		normalizeResults(effects) {
			if (effects.includes("fail")) {
				if (!effects.includes("succeeds")) return "fail";
			}
			if (effects.includes("disadvantage")) {
				if (!effects.includes("advantage")) return "disadvantage";
			}
			if (effects.includes("advantage")) return "advantage"

			return "";
		}
	}
}
</script>

<style>

</style>