import { Monster, getClasses, getRarities, getMonsters } from "https://monstyrslayr.github.io/msmTools/monsters.js";

const RARITY = getRarities();
const CLASS = getClasses();

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

async function createFilters()
{
    const monsters = await getMonsters();

    let islands = new Set();
    for (const monster of monsters)
    {
        if (monster.islands)
        {
            islands = islands.union(monster.islands);
        }
        else console.log(monster);
    }
    
    //#region rarity
    const rarityConditionalsDiv = document.getElementById("rarityConditionalsCheckboxes");

    const rarityCheckAll = document.createElement("button");
    rarityConditionalsDiv.append(rarityCheckAll);
    rarityCheckAll.className = "toggleButton";
    rarityCheckAll.innerHTML = "Toggle All";

    const rarityConditionals =
    [
        new Conditional("Commons", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == RARITY.COMMON} ),
        new Conditional("Rares", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == RARITY.RARE} ),
        new Conditional("Epics", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == RARITY.EPIC} ),
        new Conditional("Young (Celestials Only)", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == RARITY.CHILD} ),
        new Conditional("Adult (Celestials Only)", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == RARITY.ADULT} ),
        new Conditional("Major (Paironormal Only)", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == RARITY.MAJOR} ),
        new Conditional("Minor (Paironormal Only)", rarityConditionalsDiv, function(monster = Monster) { return monster.rarity == RARITY.MINOR} ),
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
    const classConditionalsDiv = document.getElementById("classConditionalsCheckboxes");

    const classCheckAll = document.createElement("button");
    classConditionalsDiv.append(classCheckAll);
    classCheckAll.className = "toggleButton";
    classCheckAll.innerHTML = "Toggle All";

    const classConditionals =
    [
        new Conditional("Naturals", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.NATURAL} ),
        new Conditional("Fire Monsters", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.FIRE} ),
        new Conditional("Magicals", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.MAGICAL} ),
        new Conditional("Mythicals", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.MYTHICAL} ),
        new Conditional("Dreamythicals", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.DREAMYTHICAL} ),
        new Conditional("Ethereal", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.ETHEREAL} ),
        new Conditional("Supernaturals", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.SUPERNATURAL} ),
        new Conditional("Seasonals", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.SEASONAL} ),
        new Conditional("Shugafam", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.SHUGAFAM} ),
        new Conditional("Werdos", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.WERDO} ),
        new Conditional("Dipsters", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.DIPSTER} ),
        new Conditional("Celestials", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.CELESTIAL} ),
        new Conditional("Titansouls", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.TITANSOUL} ),
        new Conditional("Paironormal", classConditionalsDiv, function(monster = Monster) { return monster.class == CLASS.PAIRONORMAL} ),
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
    const elementConditionalsDiv = document.getElementById("elementConditionalsCheckboxes");

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

        new Conditional("have Control", elementConditionalsDiv, function(monster = Monster) { return monster.hasControl}, true),
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

    //#region island
    const islandConditionalsDiv = document.getElementById("islandConditionalsCheckboxes");

    const islandCheckAll = document.createElement("button");
    islandConditionalsDiv.append(islandCheckAll);
    islandCheckAll.className = "toggleButton";
    islandCheckAll.innerHTML = "Toggle All";

    const islandConditionals = [...islands].map(island =>
        new Conditional("be on " + island, islandConditionalsDiv, function(monster = Monster) { return monster.islands.has(island) }, true),
    )

    islandCheckAll.onclick = function ()
    {
        if (islandConditionals.every((conditional) => conditional.checkbox.indeterminate))
        {
            islandConditionals.forEach((conditional) =>
            {
                conditional.checkbox.preLabel.innerHTML = "MAY";
                conditional.checkbox.checked = true;
                conditional.checkbox.indeterminate = false;
                conditional.checkbox.onclick();
            });
        }
        else if (islandConditionals.every((conditional) => conditional.checkbox.checked))
        {
            islandConditionals.forEach((conditional) =>
                {
                    conditional.checkbox.preLabel.innerHTML = "MUST";
                    conditional.checkbox.checked = false;
                    conditional.checkbox.indeterminate = false;
                    conditional.checkbox.onclick();
                });
        }
        else
        {
            islandConditionals.forEach((conditional) =>
                {
                    conditional.checkbox.preLabel.innerHTML = "NOT";
                    conditional.checkbox.indeterminate = true;
                    conditional.checkbox.onclick();
            });
        }
    }
    // #endregion

    //#region elementCount
    const elementCountConditionalsDiv = document.getElementById("elementCountConditionalsCheckboxes");

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

    const flashingDuration = 1000;
    const flashingSingle = 100;
    const flashingSpacing = 400;

    generateButton.onclick = function()
    {
        if (generateButton.classList.contains("disabled")) return;
        generateButton.classList.add("disabled");
        const filteredMonsters = monsters.filter((monster) => {
            return rarityConditionals.some((conditional) => conditional.condition(monster) && conditional.checkbox.checked)
                && classConditionals.some((conditional) => conditional.condition(monster) && conditional.checkbox.checked)
                    && elementCountConditionals.some((conditional) => conditional.condition(monster) && conditional.checkbox.checked)
                        && 	(
                                elementConditionals.every((conditional) =>
                                    (conditional.condition(monster) && conditional.checkbox.checked && !conditional.checkbox.indeterminate)
                                    || (!conditional.condition(monster) && !conditional.checkbox.checked && !conditional.checkbox.indeterminate)
                                    || (conditional.checkbox.indeterminate))
                            )
                            && (
                                    islandConditionals.every((conditional) =>
                                        (conditional.condition(monster) && conditional.checkbox.checked && !conditional.checkbox.indeterminate)
                                        || (!conditional.condition(monster) && !conditional.checkbox.checked && !conditional.checkbox.indeterminate)
                                        || (conditional.checkbox.indeterminate))
                                );
            });
        
        const allFilteredMonsters = [...filteredMonsters];
        
        let filteredMonstersLength = filteredMonsters.length;

        let monsterCount = monsterCountInput.value;

        generatedDiv.innerHTML = "";

        let monstersToShow = [];
        let monsterIterator = monsterCount;

        while (filteredMonsters.length > 0 && monsterIterator > 0)
        {
            let index = Math.floor(Math.random() * filteredMonsters.length);
            monstersToShow.push(filteredMonsters[index]);
            filteredMonsters.splice(index, 1);
            monsterIterator--;
        }

        monstersGenerated.innerHTML = monstersToShow.length + "/" + filteredMonstersLength + " monsters generated";
        let i = 0;
        let maxI = 0;

        for (const monster of monstersToShow)
        {
            const monsterA = document.createElement("a");
            monsterA.href = monster.link;
            monsterA.target = "_blank";
            monsterA.className = "monsterA";
            generatedDiv.append(monsterA);

            const monsterDiv = document.createElement("div");
            monsterDiv.className = "monsterDiv";
            monsterDiv.shownMonster = allFilteredMonsters[Math.floor(Math.random() * allFilteredMonsters.length)]
            monsterDiv.finalMonster = monster;
            monsterDiv.timeoutRan = false;
            monsterDiv.i = i;
            i++;
            monsterA.append(monsterDiv);

            const monsterImg = document.createElement("img");
            monsterImg.src = monsterDiv.shownMonster.blackSource;
            monsterImg.classList.add("monsterImg");
            monsterImg.classList.add("flashing");
            monsterDiv.append(monsterImg);

            const monsterName = document.createElement("p");
            monsterName.innerHTML = monsterDiv.shownMonster.name;
            monsterName.className = "monsterName";
            monsterDiv.append(monsterName);

            // Function to cycle through images
            const intervalId = setInterval(() =>
            {
                monsterDiv.shownMonster = allFilteredMonsters[Math.floor(Math.random() * allFilteredMonsters.length)];
                monsterImg.src = monsterDiv.shownMonster.blackSource;
                monsterName.innerHTML = monsterDiv.shownMonster.name;

                // Show the final random image after flashing
                setTimeout(() =>
                {
                    if (monsterDiv.timeoutRan) return;

                    monsterDiv.timeoutRan = true;
                    clearInterval(intervalId);

                    monsterImg.src = monsterDiv.finalMonster.source;
                    monsterImg.classList.remove("flashing");
                    monsterName.innerHTML = monsterDiv.finalMonster.name;
                    monsterDiv.classList.add("monsterReveal");

                    allFilteredMonsters.splice(allFilteredMonsters.indexOf(monsterDiv.finalMonster), 1);

                    setTimeout(() =>
                    {
                        monsterDiv.classList.remove("monsterReveal");

                        if (monsterDiv.i == maxI)
                        {
                            generateButton.classList.remove("disabled");
                        }
                    }, flashingSingle);
                }, flashingDuration + (flashingSpacing * monsterDiv.i));
            }, flashingSingle);
        }

        maxI = i - 1;
    }
}

createFilters();