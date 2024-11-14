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
    const classConditionalsDiv = document.getElementById("classConditionalsCheckboxes");

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
                            )
                            && (
                                    islandConditionals.every((conditional) =>
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
            const monsterA = document.createElement("a");
            monsterA.href = monster.link;
            monsterA.target = "_blank";
            generatedDiv.append(monsterA);

            const monsterDiv = document.createElement("div");
            monsterDiv.className = "monsterDiv";
            monsterA.append(monsterDiv);

            const monsterImg = document.createElement("img");
            monsterImg.src = monster.source;
            monsterImg.className = "monsterImg";
            monsterDiv.append(monsterImg);

            const monsterName = document.createElement("p");
            monsterName.innerHTML = monster.name;
            monsterName.className = "monsterName";
            monsterDiv.append(monsterName);
        }
    }
}

createFilters();