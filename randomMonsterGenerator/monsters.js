const Rarity = Object.freeze({
    COMMON: 0,
    RARE: 1,
    EPIC: 2,
    CHILD: 3, //celestials only
    ADULT: 4 //celestials only
});

const Class = Object.freeze({
    NATURAL: 0,
    FIRE: 1,
    MAGICAL: 2,
    MYTHICAL: 3,
	SEASONAL: 4,
	ETHEREAL: 5,
	SUPERNATURAL: 6,
	SHUGAFAM: 7,
	WERDO: 8,
	CELESTIAL: 9,
	DIPSTER: 10,
	TITANSOUL: 11,
	DREAMYTHICAL: 12
});

class Monster
{
	rarity;
	class;
	identifier;
	elements;

	hasAir = false;
	hasPlant = false;
	hasEarth = false;
	hasWater = false;
	hasCold = false;
	hasFire = false;

	hasLight = false;
	hasPsychic = false;
	hasFaerie = false;
	hasBone = false;

	hasPlasma = false;
	hasShadow = false;
	hasMech = false;
	hasCrystal = false;
	hasPoison = false;

	hasElectricity = false;
	hasLegendary = false;

	hasMythical = false;
	hasDream = false;

	hasCelestial = false;
	hasDipster = false;
	hasTitansoul = false;
}

const conditionalsDiv = document.getElementById("conditionals");
class Conditional
{
	labelText = "";
	condition;
	label;
	checkbox;

	constructor (label = String, divToAppend = HTMLDivElement, condition = Function, mixed = false)
	{
		this.labelText = label;
		this.condition = condition;

		this.lilDiv = document.createElement("div");
		this.lilDiv.className = "checkboxDiv";
		divToAppend.append(this.lilDiv);

		this.checkbox = document.createElement("input");
		this.checkbox.id = label;
		this.checkbox.name = label;
		this.checkbox.type = "checkbox";
		this.checkbox.checked = true;
		this.lilDiv.append(this.checkbox);
		if (mixed)
		{
			this.checkbox.indeterminate = true;
			this.checkbox.checked = false;

			this.preLabel = document.createElement("span");
			this.preLabel.innerHTML = "MAY&nbsp";
			this.lilDiv.append(this.preLabel);
			this.checkbox.preLabel = this.preLabel;

			this.checkbox.onclick = function()
			{
				if (this.preLabel.innerHTML.startsWith("MAY"))
				{
					this.checked = true;
					this.preLabel.innerHTML = "MUST&nbsp";
				}
				else if (this.preLabel.innerHTML.startsWith("MUST"))
				{
					this.checked = false;
					this.preLabel.innerHTML = "NOT&nbsp";
				}
				else if (this.preLabel.innerHTML.startsWith("NOT"))
				{
					this.indeterminate = true;
					this.preLabel.innerHTML = "MAY&nbsp";
				}
			}
		}

		this.label = document.createElement("label");
		this.label.for = label;
		this.label.innerHTML = label;
		this.lilDiv.append(this.label);
	}
}

let monsters = [];
fetch('monsterImgs.txt')
    .then(response => response.text())
    .then(text =>
        {
			const lines = text.split('\n');

        	for (const line of lines)
			{
				let monster = new Monster;

				monster.file = line.trim();
				monster.source = ("./img/" + line).trim();
				monster.id = line.replace("monster_portrait_square_", "").replace(".avif", "").trim();
				if (monster.id == "ad") //special quibble case
				{
					monster.source = "./img/monster_portrait_square_ad_copy.avif";
					//console.log("quibble");
				}
				monster.elementString = monster.id.replace("_rare", "").replace("_epic", "").replace("_adult", "");

				//rarities
				if (monster.id.endsWith("_rare")) monster.rarity = Rarity.RARE;
				else if (monster.id.includes("_epic")) monster.rarity = Rarity.EPIC; //includes for epic wubboxes
				else if (monster.id.endsWith("_adult")) monster.rarity = Rarity.ADULT;
				else monster.rarity = Rarity.COMMON;

				//classes & element count
				if (monster.elementString.startsWith("z"))
				{
					monster.class = Class.SHUGAFAM;
					monster.identifier = parseInt(monster.elementString.replace("z", ""));
					monster.elements = 1;
					monster.hasLegendary = true;
				}
				else if (monster.elementString.startsWith("x"))
				{
					monster.class = Class.TITANSOUL;
					monster.identifier = parseInt(monster.elementString.replace("x", ""));
					monster.elements = 1;
					monster.hasTitansoul = true;
				}
				else if (monster.elementString.startsWith("VOC"))
				{
					monster.class = Class.WERDO;
					monster.identifier = parseInt(monster.id.replace("VOC_", ""));
					monster.elements = 1;
					monster.hasLegendary = true;
				}
				else if (monster.elementString.startsWith("u")
							|| monster.elementString.startsWith("f"))
				{
					monster.class = Class.SUPERNATURAL;
					monster.elements = 1;
					monster.hasElectricity = true;

					if (monster.elementString.startsWith("f"))
					{
						monster.identifier = monster.elementString.replace("f_", "");
					}
					else
					{
						monster.identifier = parseInt(monster.elementString.replace("u", ""));
					}
				}
				else if (monster.elementString.startsWith("t"))
				{
					monster.class = Class.CELESTIAL;
					if (monster.rarity == Rarity.COMMON) monster.rarity = Rarity.CHILD;
					monster.identifier = parseInt(monster.elementString.replace("t", ""));
					monster.elements = 1;
					monster.hasCelestial = true;
				}
				else if (monster.elementString.startsWith("s"))
				{
					monster.class = Class.SEASONAL;
					monster.identifier = parseInt(monster.elementString.replace("s", ""));
					monster.elements = 1;
				}
				else if (monster.elementString.startsWith("q"))
				{
					monster.class = Class.DIPSTER;
					monster.identifier = parseInt(monster.elementString.replace("q", ""));
					monster.elements = 1;
					monster.hasDipster = true;
				}
				else if (monster.elementString.startsWith("p"))
				{
					monster.class = Class.MYTHICAL;
					monster.identifier = parseInt(monster.elementString.replace("p", ""));
					monster.elements = 1;
					monster.hasMythical = true;
					if (monster.identifier >= 8)
					{
						monster.class = Class.DREAMYTHICAL;
						monster.hasDream = true;
						if (monster.identifier >= 9)
						{
							monster.elements = 2;
						}
						else
						{
							monster.hasMythical = false;
						}
					}
				}
				else if (monster.elementString.includes("g")
							|| monster.elementString.includes("j")
								|| monster.elementString.includes("k")
									|| monster.elementString.includes("l")
										|| monster.elementString.includes("m"))
				{
					monster.class = Class.ETHEREAL;
					monster.elements = monster.elementString.length;
				}
				else if (monster.elementString.includes("r")
							|| monster.elementString.includes("v")
								|| monster.elementString.includes("w")
									|| monster.elementString.includes("y"))
				{
					monster.class = Class.MAGICAL;
					monster.elements = monster.elementString.length;
				}
				else if (monster.elementString.includes("n"))
				{
					monster.class = Class.FIRE;
					monster.elements = monster.elementString.length;
				}
				else
				{
					monster.class = Class.NATURAL;
					monster.elements = monster.elementString.length;
				}

				monsters.push(monster);
			}

			monsters.forEach((monster) =>
			{
				if (monster.class == Class.ETHEREAL
					|| monster.class == Class.MAGICAL
						|| monster.class == Class.FIRE
							|| monster.class == Class.NATURAL)
				{
					monster.hasLight = monster.elementString.includes("w");
					monster.hasPsychic = monster.elementString.includes("r");
					monster.hasFaerie = monster.elementString.includes("y");
					monster.hasBone = monster.elementString.includes("v");

					monster.hasPlasma = monster.elementString.includes("g");
					monster.hasShadow = monster.elementString.includes("j");
					monster.hasMech = monster.elementString.includes("k");
					monster.hasCrystal = monster.elementString.includes("l");
					monster.hasPoison = monster.elementString.includes("m");

					monster.hasAir = monster.elementString.includes("a");
					monster.hasPlant = monster.elementString.includes("b");
					monster.hasEarth = monster.elementString.includes("c");
					monster.hasWater = monster.elementString.includes("d");
					monster.hasCold = monster.elementString.includes("e");
					monster.hasFire = monster.elementString.includes("n");
				}
			});

			//#region rarity
			const rarityConditionalsDiv = document.getElementById("rarityConditionals");

			const rarityCheckAll = document.createElement("button");
			rarityConditionalsDiv.append(rarityCheckAll);
			rarityCheckAll.className = "toggleButton";
			rarityCheckAll.innerHTML = "Toggle All";

			const rarityConditionals =
			[
				new Conditional("Commons", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == Rarity.COMMON} ),
				new Conditional("Rares", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == Rarity.RARE} ),
				new Conditional("Epics", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == Rarity.EPIC} ),
				new Conditional("Young (Celestials Only)", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == Rarity.CHILD} ),
				new Conditional("Adult (Celestials Only)", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == Rarity.ADULT} ),
			];

			rarityCheckAll.onclick = function ()
			{
				if (rarityConditionals.every((conditional) => conditional.checkbox.checked))
				{
					rarityConditionals.forEach((conditional) => conditional.checkbox.checked = false);
				}
				else
				{
					rarityConditionals.forEach((conditional) => conditional.checkbox.checked = true);
				}
			}
			// #endregion

			//#region class
			const classConditionalsDiv = document.getElementById("classConditionals");

			const classCheckAll = document.createElement("button");
			classConditionalsDiv.append(classCheckAll);
			classCheckAll.className = "toggleButton";
			classCheckAll.innerHTML = "Toggle All";

			const classConditionals =
			[
				new Conditional("Naturals", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.NATURAL} ),
				new Conditional("Fire Monsters", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.FIRE} ),
				new Conditional("Magicals", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.MAGICAL} ),
				new Conditional("Mythicals", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.MYTHICAL} ),
				new Conditional("Dreamythicals", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.DREAMYTHICAL} ),
				new Conditional("Ethereal", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.ETHEREAL} ),
				new Conditional("Supernaturals", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.SUPERNATURAL} ),
				new Conditional("Seasonals", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.SEASONAL} ),
				new Conditional("Shugafam", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.SHUGAFAM} ),
				new Conditional("Werdos", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.WERDO} ),
				new Conditional("Dipsters", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.DIPSTER} ),
				new Conditional("Celestials", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.CELESTIAL} ),
				new Conditional("Titansouls", classConditionalsDiv, function(monster = Monster) { return monster.class == Class.TITANSOUL} ),
			];

			classCheckAll.onclick = function ()
			{
				if (classConditionals.every((conditional) => conditional.checkbox.checked))
				{
					classConditionals.forEach((conditional) => conditional.checkbox.checked = false);
				}
				else
				{
					classConditionals.forEach((conditional) => conditional.checkbox.checked = true);
				}
			}
			// #endregion

			//#region element
			const elementConditionalsDiv = document.getElementById("elementConditionals");

			const elementCheckAll = document.createElement("button");
			elementConditionalsDiv.append(elementCheckAll);
			elementCheckAll.className = "toggleButton";
			elementCheckAll.innerHTML = "Toggle All";

			const elementConditionals =
			[
				new Conditional("have Air", elementConditionalsDiv, function(monster = Monster) { return monster.hasAir}, true),
				new Conditional("have Plant", elementConditionalsDiv, function(monster = Monster) { return monster.hasPlant}, true),
				new Conditional("have Earth", elementConditionalsDiv, function(monster = Monster) { return monster.hasEarth}, true),
				new Conditional("have Water", elementConditionalsDiv, function(monster = Monster) { return monster.hasWater}, true),
				new Conditional("have Cold", elementConditionalsDiv, function(monster = Monster) { return monster.hasCold}, true),
				new Conditional("have Fire", elementConditionalsDiv, function(monster = Monster) { return monster.hasFire}, true),

				new Conditional("have Light", elementConditionalsDiv, function(monster = Monster) { return monster.hasLight}, true),
				new Conditional("have Psychic", elementConditionalsDiv, function(monster = Monster) { return monster.hasPsychic}, true),
				new Conditional("have Faerie", elementConditionalsDiv, function(monster = Monster) { return monster.hasFaerie}, true),
				new Conditional("have Bone", elementConditionalsDiv, function(monster = Monster) { return monster.hasBone}, true),

				new Conditional("have Plasma", elementConditionalsDiv, function(monster = Monster) { return monster.hasPlasma}, true),
				new Conditional("have Shadow", elementConditionalsDiv, function(monster = Monster) { return monster.hasShadow}, true),
				new Conditional("have Mech", elementConditionalsDiv, function(monster = Monster) { return monster.hasMech}, true),
				new Conditional("have Crystal", elementConditionalsDiv, function(monster = Monster) { return monster.hasCrystal}, true),
				new Conditional("have Poison", elementConditionalsDiv, function(monster = Monster) { return monster.hasPoison}, true),

				new Conditional("have Electricity", elementConditionalsDiv, function(monster = Monster) { return monster.hasElectricity}, true),
				new Conditional("have Legendary", elementConditionalsDiv, function(monster = Monster) { return monster.hasLegendary}, true),
				new Conditional("have Mythical", elementConditionalsDiv, function(monster = Monster) { return monster.hasMythical}, true),
				new Conditional("have Dream", elementConditionalsDiv, function(monster = Monster) { return monster.hasDream}, true),
				
				new Conditional("have Dipster", elementConditionalsDiv, function(monster = Monster) { return monster.hasDipster}, true),
				new Conditional("have Celestial", elementConditionalsDiv, function(monster = Monster) { return monster.hasCelestial}, true),
				new Conditional("have Titansoul", elementConditionalsDiv, function(monster = Monster) { return monster.hasTitansoul}, true),
			];

			elementCheckAll.onclick = function ()
			{
				if (elementConditionals.every((conditional) => conditional.checkbox.indeterminate))
				{
					elementConditionals.forEach((conditional) =>
					{
						conditional.checkbox.preLabel.innerHTML = "MAY";
						conditional.checkbox.checked = true;
						conditional.checkbox.indeterminate = false;
						conditional.checkbox.onclick();
					});
				}
				else if (elementConditionals.every((conditional) => conditional.checkbox.checked))
				{
					elementConditionals.forEach((conditional) =>
						{
							conditional.checkbox.preLabel.innerHTML = "MUST";
							conditional.checkbox.checked = false;
							conditional.checkbox.indeterminate = false;
							conditional.checkbox.onclick();
						});
				}
				else
				{
					elementConditionals.forEach((conditional) =>
						{
							conditional.checkbox.preLabel.innerHTML = "NOT";
							conditional.checkbox.indeterminate = true;
							conditional.checkbox.onclick();
					});
				}
			}
			// #endregion

			//#region elementCount
			const elementCountConditionalsDiv = document.getElementById("elementCountConditionals");

			const elementCountCheckAll = document.createElement("button");
			elementCountConditionalsDiv.append(elementCountCheckAll);
			elementCountCheckAll.className = "toggleButton";
			elementCountCheckAll.innerHTML = "Toggle All";

			let elementCountConditionals = [];
			for (let i = 1; i < 6; i++)
			{
				elementCountConditionals.push(new Conditional((i == 1) ? "1 Element" : i + " Elements", elementCountConditionalsDiv, function(monster = Monster) { return monster.elements == i} ));
			}

			elementCountCheckAll.onclick = function ()
			{
				if (elementCountConditionals.every((conditional) => conditional.checkbox.checked))
				{
					elementCountConditionals.forEach((conditional) => conditional.checkbox.checked = false);
				}
				else
				{
					elementCountConditionals.forEach((conditional) => conditional.checkbox.checked = true);
				}
			}
			// #endregion

			const generateButton = document.getElementById("generateButton");
			const generatedDiv = document.getElementById("generatedMonsters");
			const monsterCountInput = document.getElementById("monsterCount");
			const monstersGenerated = document.getElementById("monstersGenerated");

			generateButton.onclick = function()
			{
				const filteredMonsters = monsters.filter((monster) => {
					return rarityConditionals.some((conditional) => conditional.condition(monster) && conditional.checkbox.checked)
						&& classConditionals.some((conditional) => conditional.condition(monster) && conditional.checkbox.checked)
							&& elementCountConditionals.some((conditional) => conditional.condition(monster) && conditional.checkbox.checked)
								&& 	(
										elementConditionals.every((conditional) =>
											(conditional.condition(monster) && conditional.checkbox.checked && !conditional.checkbox.indeterminate)
											|| (!conditional.condition(monster) && !conditional.checkbox.checked && !conditional.checkbox.indeterminate)
											|| (conditional.checkbox.indeterminate))
									);
				  });
				
				let filteredMonstersLength = filteredMonsters.length;

				let monsterCount = monsterCountInput.value;

				generatedDiv.innerHTML = "";

				let monstersToShow = [];
				let monsterIterator = monsterCount;

				while (filteredMonsters.length > 0 && monsterIterator > 0)
				{
					let index = Math.floor(Math.random() * filteredMonsters.length)
					monstersToShow.push(filteredMonsters[index]);
					filteredMonsters.splice(index, 1);
					monsterIterator--;
				}

				monstersGenerated.innerHTML = monstersToShow.length + "/" + filteredMonstersLength + " monsters generated";
				for (const monster of monstersToShow)
				{
					const monsterDiv = document.createElement("div");
					monsterDiv.className = "monsterDiv";
					generatedDiv.append(monsterDiv);

					const monsterImg = document.createElement("img");
					monsterImg.src = monster.source;
					monsterImg.className = "monsterImg";
					monsterDiv.append(monsterImg);

					/*
					const monsterName = document.createElement("p");
					monsterName.innerHTML = monster.id;
					monsterName.className = "monsterName";
					monsterDiv.append(monsterName);
					*/
				}
			}
        })
    .catch(error => console.error('Error fetching file:', error));