<template>
	<v-tooltip bottom max-width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn v-bind="attrs" v-on="on">
				<v-icon 
					:style="style"
				>
					{{ "mdi-" + icon }}
				</v-icon>
			</v-btn>
		</template>

		<v-card-title>{{ title }}</v-card-title>
		<v-card-text>
			<ul>
				<li v-for="bullet of bulletPoints" :key="bullet">{{ bullet }}</li>
			</ul>
		</v-card-text>
	</v-tooltip>
</template>

<script>
export default {
	props: [ "icon", "title", "effects", "descriptions", "rotate", "opacity" ],
	computed: {
		bulletPoints() {
			let points = [];
			for (let point of this.convertEffect(this.effects)) points.push(point);
			for (let description of this.descriptions) points.push(description);

			return points;
		},
		style() {
			let style = {};

			if (this.rotate) style.transform = "rotate(" + this.rotate + "deg)";
			if (this.opacity) style.opacity = this.opacity;

			return style;
		}
	},
	methods: {
		convertEffect(effect) {
			let out = [];
			if ("attack" in effect) {
				if (effect.attack == "advantage") out.push("You have Advantage on attacks.");
				if (effect.attack == "disadvantage") out.push("You have Disadvantage on attacks.");
				if (effect.attack == "fail") out.push("You automatically fail at your attacks.");
				if (effect.attack == "succeed") out.push("You automatically succeed at your attacks.");
				if (effect.attack == "critical") out.push("You automatically score criticals when you attack.");
			}
			if ("otherAttack" in effect) {
				if (effect.otherAttack == "advantage") out.push("Enemies attack you with Advantage.");
				if (effect.otherAttack == "disadvantage") out.push("Enemies attack you with Disadvantage.");
				if (effect.otherAttack == "fail") out.push("Enemies automatically fail their attacks on you.");
				if (effect.otherAttack == "succeed") out.push("Enemies automatically succeed their attacks at you.");
				if (effect.otherAttack == "critical") out.push("Enemies automatically score critical hits on you.");
			}
			if ("otherSocial" in effect) {
				if (effect.otherSocial == "advantage") out.push("Enemies make social checks against you with Advantage.");
				if (effect.otherSocial == "disadvantage") out.push("Enemies make social checks against you with Disavantage.");
				if (effect.otherSocial == "fail") out.push("Enemies succeed at their social checks made against you.");
				if (effect.otherSocial == "succeed") out.push("Enemies fail their social checks made against you.");
			}
			if ("abilities" in effect) {
				if (effect.abilities == "advantage") out.push("You make ability checks at Advantage.");
				if (effect.abilities == "disadvantage") out.push("You make ability checks at Disavantage.");
				if (effect.abilities == "fail") out.push("Your ability checks automatically fail.");
				if (effect.abilities == "succeed") out.push("Your ability checks automatically succeed.");
			}
			if ("movement" in effect) {
				if (effect.movement == false) out.push("You cannot move.");
			}
			if ("str" in effect) {
				if (effect.str == "advantage") out.push("You make Strength ability checks at Advantage.");
				if (effect.str == "disadvantage") out.push("You make Strength ability checks at Disadvantage.");
				if (effect.str == "fail") out.push("Your Strength ability checks automatically fail.");
			}
			if ("strSave" in effect) {
				if (effect.strSave == "advantage") out.push("You make Strength saving throws at Advantage.");
				if (effect.strSave == "disadvantage") out.push("You make Strength saving throws at Disadvantage.");
				if (effect.strSave == "fail") out.push("Your Strength saving throws automatically fail.");
			}
			if ("dex" in effect) {
				if (effect.dex == "advantage") out.push("You make Dexterity ability checks at Advantage.");
				if (effect.dex == "disadvantage") out.push("You make Dexterity ability checks at Disadvantage.");
				if (effect.dex == "fail") out.push("Your Dexterity ability checks automatically fail.");
			}
			if ("dexSave" in effect) {
				if (effect.dexSave == "advantage") out.push("You make Dexterity saving throws at Advantage.");
				if (effect.dexSave == "disadvantage") out.push("You make Dexterity saving throws at Disadvantage.");
				if (effect.dexSave == "fail") out.push("Your Dexterity saving throws automatically fail.");
			}
			if ("resistance" in effect) {
				for (let resistance of effect.resistances) out.push("You have resistance against " + resistance + " damage types .");
			}

			return out;
		}
	}
}
</script>

<style>

</style>