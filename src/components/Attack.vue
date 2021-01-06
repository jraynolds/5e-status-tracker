<template>
	<v-container>
		<v-btn 
			text
			:color="color"
			:disabled="isDisabled"
			small
		>
			{{ title }}
		</v-btn>
		<v-icon :color="color">
			{{ icon }}
		</v-icon>
	</v-container>
</template>

<script>
export default {
	props: [ "title", "searchStr", "activeSources" ],
	computed: {
		state() {
			let attackMods = [];

			for (let source of this.activeSources) {
				if (this.searchStr in source.effects) attackMods.push(source.effects[this.searchStr]);
			}

			return this.normalizeStatus(attackMods);
		},
		color() {
			if (this.state == "advantage") return "green";
			if (this.state == "disadvantage") return "red";
			return "";
		},
		isDisabled() {
			if (this.state == "fail") return true;
			return false;
		},
		icon() {
			if (this.state == "fail") return "mdi-cancel";
			if (this.state == "advantage") return "mdi-thumb-up";
			if (this.state == "disadvantage") return "mdi-thumb-down";
			return "";
		}
	},
	methods: {
		normalizeStatus(effects) {
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