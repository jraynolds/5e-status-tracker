<template>
	<v-app>
		<v-app-bar
			app
			color="primary"
			dark
		>
		</v-app-bar>

		<v-main>
			<v-container>
				<v-row>
					<v-col cols="6">
						<v-card class="text-center pb-8">
							<v-img>
								<v-icon size="300">
									mdi-account
								</v-icon>
							</v-img>
							<v-expand-transition>
								<v-container v-show="saves.length > 0">
									<v-card-title class="justify-center align-center my-n8">
										Saves:
									</v-card-title>
									<v-row class="text-center pr-10">
										<v-col cols="2" v-for="ability of abilities" :key="ability">
											<Ability 
												:ability="ability" 
												:activeSources="activeSources"
												:type="'saves'" />
										</v-col>
									</v-row>
								</v-container>
							</v-expand-transition>
							<v-expand-transition>
								<v-container v-show="checks.length > 0">
									<v-card-title class="justify-center align-center my-n8">
										Checks:
									</v-card-title>
									<v-row class="text-center pr-10">
										<v-col cols="2" v-for="ability of abilities" :key="ability">
											<Ability 
												:ability="ability" 
												:activeSources="activeSources"
												:type="'checks'" />
										</v-col>
									</v-row>
								</v-container>
							</v-expand-transition>
							<v-row class="text-center px-4 mb-4">
								<v-col cols="6" v-for="actionType of actionTypes" :key="actionType.title">
									<ActionType 
										:title="actionType.title"
										:color="actionType.color"
										:isYourTurn="isYourTurn"
										:icon="actionType.icon"
										:availability="actionType.availability"
										:uses="actionType.uses"
										:activeSources="activeSources"
									/>
								</v-col>
							</v-row>
							<v-expand-transition>
								<v-row class="mx-0" v-show="attacks.length > 0 || otherAttacks.length > 0">
									<v-col cols="6">
										<Attack
											:title="'Your Attacks'"
											:searchStr="'attack'"
											:activeSources="activeSources"
										/>
									</v-col>
									<v-col cols="6">
										<Attack
											:title="'Others\' Attacks'"
											:searchStr="'otherAttack'"
											:activeSources="activeSources"
										/>
									</v-col>
								</v-row>
							</v-expand-transition>
							<Readout
								:show="resistances.length > 0"
								:title="'Resistances'"
								:items="resistances"
								:seeSources="false" 
							/>
							<Readout
								:show="false"
								:title="'Vulnerabilities'"
								:items="statusDescriptions"
								:seeSources="false" 
							/>
							<Readout
								:show="statusDescriptions.length > 0"
								:title="'Status Effects'"
								:items="statusDescriptions"
								:seeSources="true" 
							/>
						</v-card>
					</v-col>
					<v-col cols="6">
						<v-card>
							<v-row class="ma-0 align-center">
								<v-spacer />
								<v-btn 
									text
									x-large
									@click="isYourTurn = false"
									:style="[isYourTurn ? {opacity: 0.5} : {opacity: 1}]"
								>
									Not your turn
								</v-btn>
								<v-switch 
									v-model="isYourTurn" 
									class="mx-2 mt-4 mb-n3" 
									style="transform: scale(1.5);"
								/>
								<v-btn 
									text
									x-large
									@click="isYourTurn = true"
									:style="[!isYourTurn ? {opacity: 0.5} : {opacity: 1}]"
									color="primary"
								>
									Your turn
								</v-btn>
								<v-spacer />
							</v-row>
							<v-card-title>
								Status Effects
							</v-card-title>
							<v-container>Negative</v-container>
							<v-btn-toggle v-model="statusToggled.negative" multiple>
								<v-row class="ma-0 flex-wrap">
									<v-col v-for="status of statuses.negative" :key="status.title" cols="3">
										<Status 
											:icon="status.icon" 
											:title="status.title" 
											:effects="status.effects"
											:descriptions="status.descriptions"
											:rotate="status.rotate"
											:opacity="status.opacity"
										/>
									</v-col>
								</v-row>
							</v-btn-toggle>
							<v-container>Positive</v-container>
							<v-btn-toggle v-model="statusToggled.positive" multiple>
								<v-row class="ma-0 flex-wrap">
									<v-col v-for="status of statuses.positive" :key="status.title" cols="3">
										<Status 
											:icon="status.icon" 
											:title="status.title" 
											:effects="status.effects"
											:descriptions="status.descriptions"
											:rotate="status.rotate"
											:opacity="status.opacity"
										/>
									</v-col>
								</v-row>
							</v-btn-toggle>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>

import Ability from "@/components/Ability.vue"
import ActionType from "@/components/ActionType.vue"
import Status from "@/components/Status.vue"
import Readout from "@/components/Readout.vue"
import Attack from "@/components/Attack.vue"
import statusTypes from "@/assets/statusTypes.json"
import descriptify from "@/assets/descriptions.js"

export default {
	name: 'App',

	components: {
		Ability,
		ActionType,
		Status,
		Readout,
		Attack
	},

	data: () => ({
		abilities: [ "str", "dex", "con", "cha", "int", "wis" ],
		actionTypes: [
			{ 
				title: "action", 
				color: "blue", 
				isClicked: false, 
				onTurn: true, 
				uses: [ "Attacks", "Spells", "Class features", "Dodging", "Hiding", "Much more" ],
				icon: "sword",
				availability: "Available once any time during your turn."
			},
			{ 
				title: "bonusAction", 
				color: "green", 
				isClicked: false, 
				onTurn: true, 
				uses: [ "Spellcasts", "Class features" ],
				icon: "octagram",
				availability: "Available once any time during your turn."
			},
			{ 
				title: "movement",
				color: "orange", 
				isClicked: false, 
				onTurn: true, 
				uses: [ "Moving" ],
				icon: "run",
				availability: "Available piecemeal any time throughout your turn."
			},
			{ 
				title: "reaction", 
				color: "purple", 
				isClicked: false , 
				onTurn: false, 
				uses: [ "Opportunity attacks", "Readied actions", "Spellcasts" ],
				icon: "exclamation",
				availability: "Available once per round, anytime."
			},
		],
		isYourTurn: true,
		defaultMovement: 30,
		statusToggled: {
			negative: [],
			positive: []
		},
		statuses: statusTypes
	}),
	computed: {
		activeSources() {
			let sources = [];
			
			for (let index of this.statusToggled.negative) {
				let source = this.statuses.negative[index];
				sources.push(source);
			}
			for (let index of this.statusToggled.positive) {
				let source = this.statuses.positive[index];
				sources.push(source);
			}

			return sources;
		},
		statusDescriptions() {
			let descriptions = [];

			for (let source of this.activeSources) {
				let points = [];
				for (let conversion of descriptify(source.effects)) points.push(conversion);
				for (let description of source.descriptions) points.push(description);
				descriptions.push({ title: source.title, points: points });
			}

			return descriptions;
		},
		resistances() {
			let resists = [];

			for (let source of this.activeSources) {
				if ("resistances" in source.effects) {
					for (let resist of source.effects.resistances) {
						resists.push(resist);
					}
				}
			}

			return resists;
		},
		attacks() {
			let attacks = [];

			for (let source of this.activeSources) {
				if ("attack" in source.effects) {
					attacks.push(source.effects.attack);
				}
			}

			return attacks;
		},
		otherAttacks() {
			let otherAttacks = [];

			for (let source of this.activeSources) {
				if ("otherAttack" in source.effects) {
					otherAttacks.push(source.effects.otherAttack);
				}
			}

			return otherAttacks;
		},
		saves() {
			let saves = [];

			for (let source of this.activeSources) {
				if ("strSave" in source.effects) {
					saves.push(source.effects.strSave);
				}
				if ("dexSave" in source.effects) {
					saves.push(source.effects.dexSave);
				}
				if ("saves" in source.effects) {
					saves.push(source.effects.saves);
				}
			}

			return saves;
		},
		checks() {
			let checks = [];

			for (let source of this.activeSources) {
				if ("str" in source.effects) {
					checks.push(source.effects.str);
				}
				if ("dex" in source.effects) {
					checks.push(source.effects.dex);
				}
				if ("abilities" in source.effects) {
					checks.push(source.effects.abilities);
				}
			}

			return checks;
		}
	},
	methods: {
		consoleLog(out) {
			console.log(out);
		},
	}
};
</script>
