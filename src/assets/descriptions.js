let descriptify = (effects) => {
	let out = [];

	if ("attack" in effects) out.push(conversions.attack[effects.attack]);
	if ("otherAttack" in effects) out.push(conversions.otherAttack[effects.otherAttack]);
	if ("otherSocial" in effects) out.push(conversions.otherSocial[effects.otherSocial]);
	if ("abilities" in effects) out.push(conversions.abilities[effects.abilities]);
	if ("str" in effects) out.push(conversions.str[effects.str]);
	if ("strSave" in effects) out.push(conversions.strSave[effects.strSave]);
	if ("dex" in effects) out.push(conversions.dex[effects.dex]);
	if ("dexSave" in effects) out.push(conversions.dexSave[effects.dexSave]);
	if ("resistances" in effects) {
		for (let resistance of effects.resistances) out.push("You have resistance against " + resistance + " damage types .");
	}

	return out;
}

let conversions = {
	attack: {
		advantage: "You have Advantage on attacks.",
		disadvantage: "You have Disadvantage on attacks.",
		fail: "You automatically fail at your attacks.",
		succeed: "You automatically succeed at your attacks.",
		critical: "You automatically score criticals when you attack.",
	},
	otherAttack: {
		advantage: "Enemies attack you with Advantage.",
		disadvantage: "Enemies attack you with Disadvantage.",
		fail: "Enemies automatically fail their attacks on you.",
		succeed: "Enemies automatically succeed their attacks at you.",
		critical: "Enemies automatically score critical hits on you.",
	},
	otherSocial: {
		advantage: "Enemies make social checks against you with Advantage.",
		disadvantage: "Enemies make social checks against you with Disavantage.",
		succeed: "Enemies succeed at their social checks made against you.",
		fail: "Enemies fail their social checks made against you.",
	},
	abilities: {
		advantage: "You make ability checks at Advantage.",
		disadvantage: "You make ability checks at Disavantage.",
		fail: "Your ability checks automatically fail.",
		succeed: "Your ability checks automatically succeed.",
	},
	movement: {
		false: "You cannot move."
	},
	str: {
		advantage: "You make Strength ability checks at Advantage.",
		disadvantage: "You make Strength ability checks at Disadvantage.",
		fail: "Your Strength ability checks automatically fail.",
	},
	strSave: {
		advantage: "You make Strength saving throws at Advantage.",
		disadvantage: "You make Strength saving throws at Disadvantage.",
		fail: "Your Strength saving throws automatically fail.",
	},
	dex: {
		advantage: "You make Dexterity ability checks at Advantage.",
		disadvantage: "You make Dexterity ability checks at Disadvantage.",
		fail: "Your Dexterity ability checks automatically fail.",
	},
	dexSave: {
		advantage: "You make Dexterity saving throws at Advantage.",
		disadvantage: "You make Dexterity saving throws at Disadvantage.",
		fail: "Your Dexterity saving throws automatically fail.",
	},
}

export default descriptify;