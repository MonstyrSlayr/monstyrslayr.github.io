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

	constructor (label = String, divToAppend = HTMLDivElement, condition = Function, imageSrc = "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_random.avif", mixed = false)
	{
		this.labelText = label;
		this.condition = condition;

		this.lilDiv = document.createElement("div");
		this.lilDiv.className = "checkboxDiv";
        // this.lilDiv.htmlFor = label;
        this.lilDiv.id = label + "div";
		divToAppend.append(this.lilDiv);

        this.imageLabel = document.createElement("label");
        // this.imageLabel.htmlFor = label;
        this.lilDiv.append(this.imageLabel);

        this.image = document.createElement("img");
        this.image.src = imageSrc;
        // this.image.htmlFor = label;
        this.image.classList.add("checkboxImage");
        this.imageLabel.append(this.image);

		this.checkbox = document.createElement("input");
		this.checkbox.id = label;
		this.checkbox.name = label;
		this.checkbox.type = "checkbox";
		this.checkbox.checked = true;
		this.lilDiv.append(this.checkbox);

        const id = this.checkbox.id;

        const updateImage = function()
        {
            const daDiv = document.getElementById(id + "div");
            const daBox = document.getElementById(id);

            daDiv.classList.remove("divMust");
            daDiv.classList.remove("divMay");
            daDiv.classList.remove("divNot");

            if (!daBox.indeterminate)
            {
                if (daBox.checked)
                {
                    daDiv.classList.add("divMust");
                }
                else
                {
                    daDiv.classList.add("divNot");
                }
            }
            else
            {
                daDiv.classList.add("divMay");
            }
        }

		this.label = document.createElement("label");
		// this.label.htmlFor = label;
		this.label.textContent = label;

		if (mixed)
		{
            this.lilDiv.classList.add("canIndeterminate");

			this.checkbox.indeterminate = true;
			this.checkbox.checked = false;

			this.preLabel = document.createElement("span");
            this.preLabel.htmlFor = label;
			this.preLabel.innerHTML = "MAY&nbsp";
			this.label.prepend(this.preLabel);

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

                updateImage();
			}
		}

        this.checkbox.onchange = function()
        {
            updateImage();
        }

        updateImage();

        this.lilDiv.onclick = function() { document.getElementById(id).click(); };
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

    const rarityCheckboxDiv = document.createElement("div");
    rarityCheckboxDiv.classList.add("conditionalsCheckboxDiv");
    rarityConditionalsDiv.append(rarityCheckboxDiv);

    const rarityConditionals =
    [
        new Conditional("Commons", rarityCheckboxDiv, function(monster = Monster) { return monster.rarity == RARITY.COMMON}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_monsters.avif" ),
        new Conditional("Rares", rarityCheckboxDiv, function(monster = Monster) { return monster.rarity == RARITY.RARE}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_rares.avif" ),
        new Conditional("Epics", rarityCheckboxDiv, function(monster = Monster) { return monster.rarity == RARITY.EPIC}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_epics.avif" ),
        new Conditional("Young (Celestials Only)", rarityCheckboxDiv, function(monster = Monster) { return monster.rarity == RARITY.CHILD}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_celestial.avif" ),
        new Conditional("Adult (Celestials Only)", rarityCheckboxDiv, function(monster = Monster) { return monster.rarity == RARITY.ADULT}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_celestial.avif" ),
        new Conditional("Major (Paironormal Only)", rarityCheckboxDiv, function(monster = Monster) { return monster.rarity == RARITY.MAJOR} ),
        new Conditional("Minor (Paironormal Only)", rarityCheckboxDiv, function(monster = Monster) { return monster.rarity == RARITY.MINOR} ),
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
        rarityConditionals.forEach((conditional) => conditional.checkbox.onchange());
    }
    // #endregion

    //#region class
    const classConditionalsDiv = document.getElementById("classConditionalsCheckboxes");

    const classCheckAll = document.createElement("button");
    classConditionalsDiv.append(classCheckAll);
    classCheckAll.className = "toggleButton";
    classCheckAll.innerHTML = "Toggle All";

    const classCheckboxDiv = document.createElement("div");
    classCheckboxDiv.classList.add("conditionalsCheckboxDiv");
    classConditionalsDiv.append(classCheckboxDiv);

    const classConditionals =
    [
        new Conditional("Naturals", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.NATURAL}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_plant.avif" ),
        new Conditional("Fire Monsters", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.FIRE}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_fire.avif" ),
        new Conditional("Magicals", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.MAGICAL}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_psychic.avif" ),
        new Conditional("Mythicals", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.MYTHICAL}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_mythical.avif" ),
        new Conditional("Dreamythicals", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.DREAMYTHICAL}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_mythical.avif" ),
        new Conditional("Ethereal", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.ETHEREAL}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_plasma.avif" ),
        new Conditional("Supernaturals", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.SUPERNATURAL}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_electricity.avif" ),
        new Conditional("Seasonals", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.SEASONAL}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_anniversary.avif" ),
        new Conditional("Shugafam", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.SHUGAFAM}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_legendary.avif" ),
        new Conditional("Werdos", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.WERDO}, "https://monstyrslayr.github.io/msmTools/img/square/relic.avif" ),
        new Conditional("Dipsters", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.DIPSTER}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_dipster.avif" ),
        new Conditional("Celestials", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.CELESTIAL}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_celestial.avif" ),
        new Conditional("Titansouls", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.TITANSOUL}, "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_light.avif" ),
        new Conditional("Paironormal", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.PAIRONORMAL} ),
        new Conditional("Primordial", classCheckboxDiv, function(monster = Monster) { return monster.class == CLASS.PRIMORDIAL} ),
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
        classConditionals.forEach((conditional) => conditional.checkbox.onchange());
    }
    // #endregion

    //#region element
    const elementConditionalsDiv = document.getElementById("elementConditionalsCheckboxes");

    const elementCheckAll = document.createElement("button");
    elementConditionalsDiv.append(elementCheckAll);
    elementCheckAll.className = "toggleButton";
    elementCheckAll.innerHTML = "Toggle All";

    const elementCheckboxDiv = document.createElement("div");
    elementCheckboxDiv.classList.add("conditionalsCheckboxDiv");
    elementConditionalsDiv.append(elementCheckboxDiv);

    const elementConditionals =
    [
        new Conditional("have Air", elementCheckboxDiv, function(monster = Monster) { return monster.hasAir}, "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Air.png", true),
        new Conditional("have Plant", elementCheckboxDiv, function(monster = Monster) { return monster.hasPlant}, "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Plant.png", true),
        new Conditional("have Earth", elementCheckboxDiv, function(monster = Monster) { return monster.hasEarth}, "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Earth.png", true),
        new Conditional("have Water", elementCheckboxDiv, function(monster = Monster) { return monster.hasWater}, "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Water.png", true),
        new Conditional("have Cold", elementCheckboxDiv, function(monster = Monster) { return monster.hasCold}, "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Cold.png", true),
        new Conditional("have Fire", elementCheckboxDiv, function(monster = Monster) { return monster.hasFire}, "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Fire.png", true),

        new Conditional("have Light", elementCheckboxDiv, function(monster = Monster) { return monster.hasLight}, "https://monstyrslayr.github.io/msmTools/img/sigil/Magical - Light.png", true),
        new Conditional("have Psychic", elementCheckboxDiv, function(monster = Monster) { return monster.hasPsychic}, "https://monstyrslayr.github.io/msmTools/img/sigil/Magical - Psychic.png", true),
        new Conditional("have Faerie", elementCheckboxDiv, function(monster = Monster) { return monster.hasFaerie}, "https://monstyrslayr.github.io/msmTools/img/sigil/Magical - Faerie.png", true),
        new Conditional("have Bone", elementCheckboxDiv, function(monster = Monster) { return monster.hasBone}, "https://monstyrslayr.github.io/msmTools/img/sigil/Magical - Bone.png", true),

        new Conditional("have Plasma", elementCheckboxDiv, function(monster = Monster) { return monster.hasPlasma}, "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Plasma.png", true),
        new Conditional("have Shadow", elementCheckboxDiv, function(monster = Monster) { return monster.hasShadow}, "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Shadow.png", true),
        new Conditional("have Mech", elementCheckboxDiv, function(monster = Monster) { return monster.hasMech}, "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Mech.png", true),
        new Conditional("have Crystal", elementCheckboxDiv, function(monster = Monster) { return monster.hasCrystal}, "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Crystal.png", true),
        new Conditional("have Poison", elementCheckboxDiv, function(monster = Monster) { return monster.hasPoison}, "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Poison.png", true),

        new Conditional("have Electricity", elementCheckboxDiv, function(monster = Monster) { return monster.hasElectricity}, "https://monstyrslayr.github.io/msmTools/img/sigil/Supernatural - Electricity.png", true),

        new Conditional("have Legendary", elementCheckboxDiv, function(monster = Monster) { return monster.hasLegendary}, "https://monstyrslayr.github.io/msmTools/img/sigil/Legendary.png", true),

        new Conditional("have Mythical", elementCheckboxDiv, function(monster = Monster) { return monster.hasMythical}, "https://monstyrslayr.github.io/msmTools/img/sigil/Mythical - Mythical.png", true),
        new Conditional("have Dream", elementCheckboxDiv, function(monster = Monster) { return monster.hasDream}, "https://monstyrslayr.github.io/msmTools/img/sigil/Mythical - Dream.png", true),
        
        new Conditional("have Dipster", elementCheckboxDiv, function(monster = Monster) { return monster.hasDipster}, "https://monstyrslayr.github.io/msmTools/img/sigil/Dipster.png", true),
        new Conditional("have Celestial", elementCheckboxDiv, function(monster = Monster) { return monster.hasCelestial}, "https://monstyrslayr.github.io/msmTools/img/sigil/Celestial.png", true),
        new Conditional("have Titansoul", elementCheckboxDiv, function(monster = Monster) { return monster.hasTitansoul}, "https://monstyrslayr.github.io/msmTools/img/sigil/Titansoul.png", true),

        new Conditional("have Primordial Plant", elementCheckboxDiv, function(monster = Monster) { return monster.hasPrimordialPlant}, "https://monstyrslayr.github.io/msmTools/img/sigil/Primordial - Plant.png", true),

        new Conditional("have Control", elementCheckboxDiv, function(monster = Monster) { return monster.hasControl}, "https://monstyrslayr.github.io/msmTools/img/sigil/Paironormal - Control.png", true),
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

    const islandCheckboxDiv = document.createElement("div");
    islandCheckboxDiv.classList.add("conditionalsCheckboxDiv");
    islandConditionalsDiv.append(islandCheckboxDiv);

    const islandConditionals = [...islands].map(island =>
        new Conditional("be on " + island, islandCheckboxDiv, function(monster = Monster) { return monster.islands.has(island) }, "https://monstyrslayr.github.io/msmTools/img/island/" + island + ".png", true),
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

    const elementCountCheckboxDiv = document.createElement("div");
    elementCountCheckboxDiv.classList.add("conditionalsCheckboxDiv");
    elementCountConditionalsDiv.append(elementCountCheckboxDiv);

    let elementCountConditionals = [];
    for (let i = 1; i < 6; i++)
    {
        elementCountConditionals.push(new Conditional((i == 1) ? "1 Element" : i + " Elements", elementCountCheckboxDiv, function(monster = Monster) { return monster.elements == i} ));
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
        elementCountConditionals.forEach((conditional) => conditional.checkbox.onchange());
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
        if (filteredMonstersLength == 0) return;
        generateButton.classList.add("disabled");
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
            monsterImg.src = monsterDiv.shownMonster.portraitBlack;
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
                monsterImg.src = monsterDiv.shownMonster.portraitBlack;
                monsterName.innerHTML = monsterDiv.shownMonster.name;

                // Show the final random image after flashing
                setTimeout(() =>
                {
                    if (monsterDiv.timeoutRan) return;

                    monsterDiv.timeoutRan = true;
                    clearInterval(intervalId);

                    monsterImg.src = monsterDiv.finalMonster.portrait;
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