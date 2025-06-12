const RARITY = Object.freeze
({
    COMMON: 0,
    RARE: 1,
    EPIC: 2,
    CHILD: 3, //celestials only
    ADULT: 4, //celestials only
	MAJOR: 5, //paironormal only
	MINOR: 6 //paironormal only
});

const MCLASS = Object.freeze
({
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
	PAIRONORMAL: 13,
	PRIMORDIAL: 14
});

export class Monster
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

	hasControl = false;
	hasHoax = false;

	hasElectricity = false;
	hasLegendary = false;
	hasDipster = false;

	hasMythical = false;
	hasDream = false;

	hasCelestial = false;
	hasTitansoul = false;

	hasPrimordialPlant = false;
}

export async function getMonsters()
{
	let monsters = [];

	const csvResponse = await fetch("https://monstyrslayr.github.io/msmTools/monsterData.csv");
	if (!csvResponse.ok)
	{
		throw new Error('Network response was not ok');
	}
	let csvText = await csvResponse.text();
	let results = await Papa.parse(csvText, { header: true });

	const response = await fetch('https://monstyrslayr.github.io/msmTools/monsterImgs.txt');
	if (!response.ok)
	{
		throw new Error('Network response was not ok');
	}
	const text = await response.text();

	const lines = text.split('\n');

	for (const line of lines)
	{
		if (line == "") continue;
		let monster = new Monster;

		monster.file = line.trim();
		monster.square = ("https://monstyrslayr.github.io/msmTools/img/square/" + line).trim();
		monster.portrait = ("https://monstyrslayr.github.io/msmTools/img/portrait/" + line).trim();
		monster.portraitBlack = monster.portrait.replace(".avif", "_black.avif");
		monster.id = line.replace("monster_portrait_square_", "").replace(".avif", "").trim();
		if (monster.id == "ad") // special quibble case
		{
			monster.square = "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_square_ad_copy.avif";
			monster.portrait = "https://monstyrslayr.github.io/msmTools/img/portrait/monster_portrait_square_ad_copy.avif";
		}
		monster.elementString = monster.id.replace("_rare", "").replace("_epic", "").replace("_adult", "");
		monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/" + (monster.elementString.toUpperCase() + "-Memory.wav").trim();

		// rarities
		if (monster.id.endsWith("_rare")) monster.rarity = RARITY.RARE;
		else if (monster.id.includes("_epic")) monster.rarity = RARITY.EPIC; //includes for epic wubboxes
		else if (monster.id.endsWith("_adult")) monster.rarity = RARITY.ADULT;
		else if (monster.id.endsWith("_maj")) monster.rarity = RARITY.MAJOR;
		else if (monster.id.endsWith("_min")) monster.rarity = RARITY.MINOR;
		else monster.rarity = RARITY.COMMON;

		// classes & element count
		if (monster.elementString.startsWith("z"))
		{
			monster.class = MCLASS.SHUGAFAM;
			monster.identifier = parseInt(monster.elementString.replace("z", ""));
			monster.elements = 1;
			monster.hasLegendary = true;
		}
		else if (monster.elementString.startsWith("x"))
		{
			monster.class = MCLASS.TITANSOUL;
			monster.identifier = parseInt(monster.elementString.replace("x", ""));
			monster.elements = 1;
			monster.hasTitansoul = true;
		}
		else if (monster.elementString.startsWith("i"))
		{
			monster.class = MCLASS.PAIRONORMAL;
			monster.identifier = monster.elementString.replace("i", "");
			monster.elements = 1;

			switch (monster.identifier)
			{
				case "01":
					monster.hasControl = true;
					break;
				case "02":
					monster.hasHoax = true;
					break;
			}
		}
		else if (monster.elementString.startsWith("VOC"))
		{
			monster.class = MCLASS.WERDO;
			monster.identifier = parseInt(monster.id.replace("VOC_", ""));
			monster.elements = 1;
			monster.hasLegendary = true;
		}
		else if (monster.elementString.startsWith("prm"))
		{
			monster.class = MCLASS.PRIMORDIAL;
			monster.identifier = parseInt(monster.id.replace("prm_", ""));
			monster.elements = 1;
			monster.hasPrimordialPlant = true; // change when new primordials come out
		}
		else if (monster.elementString.startsWith("u")
					|| monster.elementString.startsWith("f"))
		{
			monster.class = MCLASS.SUPERNATURAL;
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
			monster.class = MCLASS.CELESTIAL;
			if (monster.rarity == RARITY.COMMON) monster.rarity = RARITY.CHILD;
			monster.identifier = parseInt(monster.elementString.replace("t", ""));
			monster.elements = 1;
			monster.hasCelestial = true;
		}
		else if (monster.elementString.startsWith("s"))
		{
			monster.class = MCLASS.SEASONAL;
			monster.identifier = parseInt(monster.elementString.replace("s", ""));
			monster.elements = 1;
		}
		else if (monster.elementString.startsWith("q"))
		{
			monster.class = MCLASS.DIPSTER;
			monster.identifier = parseInt(monster.elementString.replace("q", ""));
			monster.elements = 1;
			monster.hasDipster = true;
		}
		else if (monster.elementString.startsWith("p"))
		{
			monster.class = MCLASS.MYTHICAL;
			monster.identifier = parseInt(monster.elementString.replace("p", ""));
			monster.elements = 1;
			monster.hasMythical = true;
			if (monster.identifier >= 8)
			{
				monster.class = MCLASS.DREAMYTHICAL;
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
			monster.class = MCLASS.ETHEREAL;
			monster.elements = monster.elementString.length;
		}
		else if (monster.elementString.includes("r")
					|| monster.elementString.includes("v")
						|| monster.elementString.includes("w")
							|| monster.elementString.includes("y"))
		{
			monster.class = MCLASS.MAGICAL;
			monster.elements = monster.elementString.length;
		}
		else if (monster.elementString.includes("n"))
		{
			monster.class = MCLASS.FIRE;
			monster.elements = monster.elementString.length;
		}
		else
		{
			monster.class = MCLASS.NATURAL;
			monster.elements = monster.elementString.length;
		}

		monsters.push(monster);
	}

	monsters.forEach((monster) =>
	{
		if (monster.class == MCLASS.ETHEREAL
			|| monster.class == MCLASS.MAGICAL
				|| monster.class == MCLASS.FIRE
					|| monster.class == MCLASS.NATURAL)
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

			// epic wubbox clause
			if (monster.elementString.startsWith("f"))
			{
				for (let island of monster.islands)
				{
					if (island.toLowerCase() == monster.identifier.replace("epic_", "").replace("fire", "").toLowerCase())
					{
						monster.islands = new Set();
						monster.islands.add(island);

						if (island == "Haven" || island == "Oasis")
						{
							monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/F_EPIC-Memory_Fire" + island + ".wav";
						}
						else if (island == "Plant" || island == "Gold")
						{
							monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/F_EPIC-Memory.wav";
						}
						else if (island == "cold")
						{
							monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/F-Memory_EPIC_Cold.wav"; // why bbb why
						}
						else
						{
							monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/F_EPIC-Memory_" + island + ".wav";
						}
						break;
					}
				}
			}
			
			// paironormal clause
			if (monster.elementString.startsWith("i"))
			{
				monster.rarity = monster.elementString.endsWith("min") ? RARITY.MINOR : RARITY.MAJOR;
				monster.name = (monster.rarity == RARITY.MINOR ? "Minor" : "Major") + " " + monsterLine.name;

				if (monster.identifier == 1)
				{
					monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/I01-Memory.wav";
				}
			}
			
			monster.likes = monsterLine["likes/polarity"].split("&").slice(0, -1); // TODO: there is still stuff to do here, seperating it by island
			monster.bio = monsterLine.bio;
			monster.link = monsterLine.link.replace("mysingingmonsters.fandom.com/", "breezewiki.com/mysingingmonsters/");
		}

		// preloading
		new Image().src = monster.square;
		new Image().src = monster.portrait;
		new Image().src = monster.portraitBlack;

		// not audio, not enough resources
		// new Audio(monster.memory);
	});

	return monsters;
}

export function getRarities()
{
	return RARITY;
}

export function getClasses()
{
	return MCLASS;
}