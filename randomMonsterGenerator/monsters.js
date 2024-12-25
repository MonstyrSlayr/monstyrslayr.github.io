const Rarity = Object.freeze({
    COMMON: 0,
    RARE: 1,
    EPIC: 2,
    CHILD: 3, //celestials only
    ADULT: 4, //celestials only
	MAJOR: 5, //paironormal only
	MINOR: 6 //paironormal only
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
	DREAMYTHICAL: 12,
	PAIRONORMAL: 13
});

class Monster
{
	rarity;
	class;
	identifier;
	elements;
	islands;
	likes;
	bio;

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

	hasControl = false;
}

async function getMonsters()
{
	let monsters = [];

	const csvResponse = await fetch("monsterData.csv");
	if (!csvResponse.ok)
	{
		throw new Error('Network response was not ok');
	}
	let csvText = await csvResponse.text();
	let results = await Papa.parse(csvText, { header: true });

	const response = await fetch('monsterImgs.txt');
	if (!response.ok)
	{
		throw new Error('Network response was not ok');
	}
	const text = await response.text();

	const lines = text.split('\n');

	for (const line of lines)
	{
		let monster = new Monster;

		monster.file = line.trim();
		monster.source = ("./img/" + line).trim();
		monster.blackSource = monster.source.replace(".avif", "_black.avif");
		monster.id = line.replace("monster_portrait_square_", "").replace(".avif", "").trim();
		if (monster.id == "ad") //special quibble case
		{
			monster.source = "./img/monster_portrait_square_ad_copy.avif";
		}
		monster.elementString = monster.id.replace("_rare", "").replace("_epic", "").replace("_adult", "");

		//rarities
		if (monster.id.endsWith("_rare")) monster.rarity = Rarity.RARE;
		else if (monster.id.includes("_epic")) monster.rarity = Rarity.EPIC; //includes for epic wubboxes
		else if (monster.id.endsWith("_adult")) monster.rarity = Rarity.ADULT;
		else if (monster.id.endsWith("_maj")) monster.rarity = Rarity.MAJOR;
		else if (monster.id.endsWith("_min")) monster.rarity = Rarity.MINOR;
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
		else if (monster.elementString.startsWith("i"))
		{
			monster.class = Class.PAIRONORMAL;
			monster.identifier = monster.elementString.replace("i", "");
			monster.elements = 1;
			monster.hasControl = true;
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

		let monsterLine = results.data.find((line) => 
			(monster.id.startsWith("f_epic") && line.codename == "f_epic")
			|| (line.codename.startsWith("i") && line.codename == monster.id.substring(0, 3))
			|| line.codename == monster.id)

		if (monsterLine)
		{
			monster.name = monsterLine.name;
			monster.islands = new Set(monsterLine.islands.split("&").slice(0, -1));

			//epic wubbox clause
			if (monster.elementString.startsWith("f"))
			{
				for (let island of monster.islands)
				{
					if (island.toLowerCase() == monster.identifier.replace("epic_", "").toLowerCase())
					{
						monster.islands = new Set();
						monster.islands.add(island);
						break;
					}
				}
			}
			//paironormal clause
			if (monster.elementString.startsWith("i"))
			{
				monster.rarity = monster.elementString.endsWith("min") ? Rarity.MINOR : Rarity.MAJOR;
				monster.name = (monster.rarity == Rarity.MINOR ? "Minor" : "Major") + " " + monsterLine.name;
			}

			monster.likes = monsterLine["likes/polarity"].split("&").slice(0, -1); // there is still stuff to do here, seperating it by island
			monster.bio = monsterLine.bio;
			monster.link = monsterLine.link;
		}

		new Image().src = monster.source;
		new Image().src = monster.blackSource;
	});

	return monsters;
}