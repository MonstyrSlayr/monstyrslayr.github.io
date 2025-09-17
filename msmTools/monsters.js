const RARITY = Object.freeze
({
    COMMON: "Common",
    RARE: "Rare",
    EPIC: "Epic",
    CHILD: "Child", // celestials only
    ADULT: "Adult", // celestials only
	MAJOR: "Major", // paironormal only
	MINOR: "Minor" // paironormal only
});

const MCLASS = Object.freeze
({
    NATURAL: "Natural",
    FIRE: "Fire",
    MAGICAL: "Magical",
    MYTHICAL: "Mythical",
	SEASONAL: "Seasonal",
	ETHEREAL: "Ethereal",
	SUPERNATURAL: "Supernatural",
	SHUGAFAM: "Shugafam",
	WERDO: "Werdo",
	CELESTIAL: "Celestial",
	DIPSTER: "Dipster",
	TITANSOUL: "Titansoul",
	DREAMYTHICAL: "Dreamythical",
	PAIRONORMAL: "Paironormal",
	PRIMORDIAL: "Primordial"
});

export class ElementSigil // dumb name bc "element" will get confusing with HTML stuff
{
	name;
	sigil;

	constructor(name, sigil)
	{
		this.name = name;
		this.sigil = sigil;
	}
}

const elementSigils =
[
	new ElementSigil("Air", "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Air.png"),
	new ElementSigil("Plant", "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Plant.png"),
	new ElementSigil("Earth", "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Earth.png"),
	new ElementSigil("Water", "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Water.png"),
	new ElementSigil("Cold", "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Cold.png"),
	new ElementSigil("Fire", "https://monstyrslayr.github.io/msmTools/img/sigil/Natural - Fire.png"),

	new ElementSigil("Light", "https://monstyrslayr.github.io/msmTools/img/sigil/Magical - Light.png"),
	new ElementSigil("Psychic", "https://monstyrslayr.github.io/msmTools/img/sigil/Magical - Psychic.png"),
	new ElementSigil("Faerie", "https://monstyrslayr.github.io/msmTools/img/sigil/Magical - Faerie.png"),
	new ElementSigil("Bone", "https://monstyrslayr.github.io/msmTools/img/sigil/Magical - Bone.png"),

	new ElementSigil("Plasma", "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Plasma.png"),
	new ElementSigil("Shadow", "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Shadow.png"),
	new ElementSigil("Mech", "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Mech.png"),
	new ElementSigil("Crystal", "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Crystal.png"),
	new ElementSigil("Poison", "https://monstyrslayr.github.io/msmTools/img/sigil/Ethereal - Poison.png"),

	new ElementSigil("Electricity", "https://monstyrslayr.github.io/msmTools/img/sigil/Supernatural - Electricity.png"),

	new ElementSigil("Legendary", "https://monstyrslayr.github.io/msmTools/img/sigil/Legendary.png"),

	new ElementSigil("Mythical", "https://monstyrslayr.github.io/msmTools/img/sigil/Mythical - Mythical.png"),
	new ElementSigil("Dream", "https://monstyrslayr.github.io/msmTools/img/sigil/Mythical - Dream.png"),

	new ElementSigil("Dipster", "https://monstyrslayr.github.io/msmTools/img/sigil/Dipster.png"),
	new ElementSigil("Celestial", "https://monstyrslayr.github.io/msmTools/img/sigil/Celestial.png"),
	new ElementSigil("Titansoul", "https://monstyrslayr.github.io/msmTools/img/sigil/Titansoul.png"),

	new ElementSigil("Primordial Plant", "https://monstyrslayr.github.io/msmTools/img/sigil/Primordial - Plant.png"),
	new ElementSigil("Primordial Cold", "https://monstyrslayr.github.io/msmTools/img/sigil/Primordial - Cold.png"),
	new ElementSigil("Primordial Air", "https://monstyrslayr.github.io/msmTools/img/sigil/Primordial - Air.png"),
	new ElementSigil("Primordial Water", "https://monstyrslayr.github.io/msmTools/img/sigil/Primordial - Water.png"),
	new ElementSigil("Primordial Earth", "https://monstyrslayr.github.io/msmTools/img/sigil/Primordial - Earth.png"),

	new ElementSigil("Control", "https://monstyrslayr.github.io/msmTools/img/sigil/Paironormal - Control.png"),
	new ElementSigil("Hoax", "https://monstyrslayr.github.io/msmTools/img/sigil/Paironormal - Hoax.png"),
	new ElementSigil("Ruin", "https://monstyrslayr.github.io/msmTools/img/sigil/Paironormal - Ruin.png"),
];

const seasonalElementSigils =
[
	new ElementSigil("Spooktacle", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Core) - Spooktacle.png"),
	new ElementSigil("Festival of Yay", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Core) - Festival of Yay.png"),
	new ElementSigil("Season of Love", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Core) - Season of Love.png"),
	new ElementSigil("Eggs-Travaganza", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Core) - Eggs-Travaganza.png"),
	new ElementSigil("SummerSong", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Core) - SummerSong.png"),
	new ElementSigil("Feast-Ember", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Aux.) - Feast-Ember.png"),
	new ElementSigil("Beat Hereafter", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Aux.) - Beat Hereafter.png"),
	new ElementSigil("Echoes of Eco", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Aux.) - Echoes of Eco.png"),
	new ElementSigil("Anniversary Month", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal - Anniversary Month.png"),
	new ElementSigil("Crescendo Moon", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Aux.) - Crescendo Moon.png"),
	new ElementSigil("SkyPainting", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Aux.) - SkyPainting.png"),
	new ElementSigil("Life-Formula", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Aux.) - Life-Formula.png"),
	new ElementSigil("Cloverspell", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Aux.) - Cloverspell.png"),
	new ElementSigil("MindBoggle", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Aux.) - MindBoggle.png"),
	new ElementSigil("Perplexplore", "https://monstyrslayr.github.io/msmTools/img/sigil/Seasonal (Aux.) - Perplexplore.png"),
];

function stringToElementSigil(daStr)
{
	return elementSigils.find((sigil) => sigil.name == daStr);
}

export class Island
{
	name;
	codename;
	symbol;
	hasLikes;

	constructor(name, codename, symbol, hasLikes = true)
	{
		this.name = name;
		this.codename = codename;
		this.symbol = symbol;
		this.hasLikes = hasLikes;
	}
}

const islands =
[
	new Island("Plant Island", "Plant", "https://monstyrslayr.github.io/msmTools/img/island/Plant.png"),
	new Island("Cold Island", "Cold", "https://monstyrslayr.github.io/msmTools/img/island/Cold.png"),
	new Island("Air Island", "Air", "https://monstyrslayr.github.io/msmTools/img/island/Air.png"),
	new Island("Water Island", "Water", "https://monstyrslayr.github.io/msmTools/img/island/Water.png"),
	new Island("Earth Island", "Earth", "https://monstyrslayr.github.io/msmTools/img/island/Earth.png"),

	new Island("Shugabush Island", "Shugabush", "https://monstyrslayr.github.io/msmTools/img/island/Shugabush.png"),
	new Island("The Colossingum", "Colossingum", "https://monstyrslayr.github.io/msmTools/img/island/Colossingum.png", false),
	new Island("Gold Island", "Gold", "https://monstyrslayr.github.io/msmTools/img/island/Gold.png", false),

	new Island("Ethereal Island", "Ethereal", "https://monstyrslayr.github.io/msmTools/img/island/Ethereal.png"),
	new Island("Ethereal Workshop", "Workshop", "https://monstyrslayr.github.io/msmTools/img/island/Workshop.png"),

	new Island("Fire Haven", "Haven", "https://monstyrslayr.github.io/msmTools/img/island/Haven.png"),
	new Island("Fire Oasis", "Oasis", "https://monstyrslayr.github.io/msmTools/img/island/Oasis.png"),

	new Island("Plasma Islet", "Plasma", "https://monstyrslayr.github.io/msmTools/img/island/Plasma.png"),
	new Island("Shadow Islet", "Shadow Islet", "https://monstyrslayr.github.io/msmTools/img/island/Shadow.png"),
	new Island("Mech Islet", "Mech", "https://monstyrslayr.github.io/msmTools/img/island/Mech.png"),
	new Island("Crystal Islet", "Crystal Islet", "https://monstyrslayr.github.io/msmTools/img/island/Crystal.png"),
	new Island("Poison Islet", "Poison Islet", "https://monstyrslayr.github.io/msmTools/img/island/Poison.png"),

	new Island("Mythical Island", "Mythical", "https://monstyrslayr.github.io/msmTools/img/island/Mythical.png"),

	new Island("Light Island", "Light", "https://monstyrslayr.github.io/msmTools/img/island/Light.png"),
	new Island("Psychic Island", "Psychic", "https://monstyrslayr.github.io/msmTools/img/island/Psychic.png"),
	new Island("Faerie Island", "Faerie", "https://monstyrslayr.github.io/msmTools/img/island/Faerie.png"),
	new Island("Bone Island", "Bone", "https://monstyrslayr.github.io/msmTools/img/island/Bone.png"),

	new Island("Magical Sanctum", "Sanctum", "https://monstyrslayr.github.io/msmTools/img/island/Sanctum.png"),
	new Island("Magical Nexus", "Nexus", "https://monstyrslayr.github.io/msmTools/img/island/Nexus.png", false),

	new Island("Seasonal Shanty", "Seasonal", "https://monstyrslayr.github.io/msmTools/img/island/Seasonal.png"),
	new Island("Amber Island", "Amber", "https://monstyrslayr.github.io/msmTools/img/island/Amber.png"),

	new Island("Wublin Island", "Wublin", "https://monstyrslayr.github.io/msmTools/img/island/Wublin.png", false),
	new Island("Celestial Island", "Celestial", "https://monstyrslayr.github.io/msmTools/img/island/Celestial.png", false),

	new Island("Tribal Island", "Tribal", "https://monstyrslayr.github.io/msmTools/img/island/Tribal.png", false),
	new Island("Composer Island", "Composer", "https://monstyrslayr.github.io/msmTools/img/island/Composer.png", false),
];

function islandNameToIsland(daStr)
{
	return islands.find((island) => island.name == daStr);
}

function stringToIsland(daStr)
{
	return islands.find((island) => island.codename == daStr);
}

function islandStringsToSet(daArr)
{
	let daSet = new Set();
	for (const daStr of daArr)
	{
		daStr.replace(" Islet", "")
		daSet.add(stringToIsland(daStr));
	}
	return daSet;
}

export class Monster
{
	name;
	rarity;
	class;
	identifier;
	elements;
	islands;
	likes;
	bio;
}

class Like
{
	name;
	island;

	constructor(name, island)
	{
		this.name = name;
		this.island = island;
	}
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

	const response = await fetch("https://monstyrslayr.github.io/msmTools/monsterImgs.txt");
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
		monster.square = ("https://monstyrslayr.github.io/msmTools/webp/square/" + line).trim();
		monster.portrait = ("https://monstyrslayr.github.io/msmTools/webp/portrait/" + line).trim();
		monster.portraitBlack = monster.portrait.replace(".webp", "_black.webp");
		monster.id = line.replace("monster_portrait_square_", "").replace(".webp", "").trim();
		if (monster.id == "ad") // special quibble case (because of ad blockers lol)
		{
			monster.square = "https://monstyrslayr.github.io/msmTools/webp/square/monster_portrait_square_ad_copy.webp";
			monster.portrait = "https://monstyrslayr.github.io/msmTools/webp/portrait/monster_portrait_square_ad_copy.webp";
		}
		monster.elementString = monster.id.replace("_rare", "").replace("_epic", "").replace("_adult", "");
		monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/" + (monster.elementString.toUpperCase() + "-Memory.wav").trim();

		// rarities
		if (monster.id.endsWith("_rare")) monster.rarity = RARITY.RARE;
		else if (monster.id.includes("_epic")) monster.rarity = RARITY.EPIC; // includes for epic wubboxes
		else if (monster.id.endsWith("_adult")) monster.rarity = RARITY.ADULT;
		else if (monster.id.endsWith("_maj")) monster.rarity = RARITY.MAJOR;
		else if (monster.id.endsWith("_min")) monster.rarity = RARITY.MINOR;
		else monster.rarity = RARITY.COMMON;

		// classes & elements
		monster.elements = new Set();
		if (monster.elementString.startsWith("z"))
		{
			monster.class = MCLASS.SHUGAFAM;
			monster.identifier = parseInt(monster.elementString.replace("z", ""));
			monster.elements.add(stringToElementSigil("Legendary"));
		}
		else if (monster.elementString.startsWith("x"))
		{
			monster.class = MCLASS.TITANSOUL;
			monster.identifier = parseInt(monster.elementString.replace("x", ""));
			monster.elements.add(stringToElementSigil("Titansoul"));
		}
		else if (monster.elementString.startsWith("i"))
		{
			monster.class = MCLASS.PAIRONORMAL;
			monster.identifier = parseInt(monster.elementString.replace("i", "").replace("_maj", "").replace("_min", ""));

			switch (monster.identifier)
			{
				case 1:
					monster.elements.add(stringToElementSigil("Control"));
					break;
				case 2:
					monster.elements.add(stringToElementSigil("Hoax"));
					break;
				case 3:
					monster.elements.add(stringToElementSigil("Ruin"));
					break;
			}
		}
		else if (monster.elementString.startsWith("VOC"))
		{
			monster.class = MCLASS.WERDO;
			monster.identifier = parseInt(monster.id.replace("VOC_", ""));
			monster.elements.add(stringToElementSigil("Legendary"));
		}
		else if (monster.elementString.startsWith("prm"))
		{
			monster.class = MCLASS.PRIMORDIAL;
			monster.identifier = parseInt(monster.id.replace("prm_", ""));

			switch (monster.identifier)
			{
				case 1:
					monster.elements.add(stringToElementSigil("Primordial Plant"));
					break;
				case 3:
					monster.elements.add(stringToElementSigil("Primordial Air"));
					break;
			}
		}
		else if (monster.elementString.startsWith("u")
					|| monster.elementString.startsWith("f"))
		{
			monster.class = MCLASS.SUPERNATURAL;
			monster.elements.add(stringToElementSigil("Electricity"));

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
			monster.elements.add(stringToElementSigil("Celestial"));
		}
		else if (monster.elementString.startsWith("s"))
		{
			monster.class = MCLASS.SEASONAL;
			monster.identifier = parseInt(monster.elementString.replace("s", ""));
			monster.elements.add(seasonalElementSigils[monster.identifier]);
		}
		else if (monster.elementString.startsWith("q"))
		{
			monster.class = MCLASS.DIPSTER;
			monster.identifier = parseInt(monster.elementString.replace("q", ""));
			monster.elements.add(stringToElementSigil("Dipster"));
		}
		else if (monster.elementString.startsWith("p"))
		{
			monster.class = MCLASS.MYTHICAL;
			monster.identifier = parseInt(monster.elementString.replace("p", ""));
			if (monster.identifier != 8) monster.elements.add(stringToElementSigil("Mythical"));

			if (monster.identifier >= 8)
			{
				monster.class = MCLASS.DREAMYTHICAL;
				monster.elements.add(stringToElementSigil("Dream"));
			}
		}
		else if (monster.elementString.includes("g")
					|| monster.elementString.includes("j")
						|| monster.elementString.includes("k")
							|| monster.elementString.includes("l")
								|| monster.elementString.includes("m"))
		{
			monster.class = MCLASS.ETHEREAL;
		}
		else if (monster.elementString.includes("r")
					|| monster.elementString.includes("v")
						|| monster.elementString.includes("w")
							|| monster.elementString.includes("y"))
		{
			monster.class = MCLASS.MAGICAL;
		}
		else if (monster.elementString.includes("n"))
		{
			monster.class = MCLASS.FIRE;
		}
		else
		{
			monster.class = MCLASS.NATURAL;
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
			if (monster.elementString.includes("r")) monster.elements.add(stringToElementSigil("Psychic"));
			if (monster.elementString.includes("v")) monster.elements.add(stringToElementSigil("Bone"));
			if (monster.elementString.includes("w")) monster.elements.add(stringToElementSigil("Light"));
			if (monster.elementString.includes("y")) monster.elements.add(stringToElementSigil("Faerie"));

			if (monster.elementString.includes("g")) monster.elements.add(stringToElementSigil("Plasma"));
			if (monster.elementString.includes("j")) monster.elements.add(stringToElementSigil("Shadow"));
			if (monster.elementString.includes("k")) monster.elements.add(stringToElementSigil("Mech"));
			if (monster.elementString.includes("l")) monster.elements.add(stringToElementSigil("Crystal"));
			if (monster.elementString.includes("m")) monster.elements.add(stringToElementSigil("Poison"));

			if (monster.elementString.includes("a")) monster.elements.add(stringToElementSigil("Air"));
			if (monster.elementString.includes("b")) monster.elements.add(stringToElementSigil("Plant"));
			if (monster.elementString.includes("c")) monster.elements.add(stringToElementSigil("Earth"));
			if (monster.elementString.includes("d")) monster.elements.add(stringToElementSigil("Water"));
			if (monster.elementString.includes("e")) monster.elements.add(stringToElementSigil("Cold"));
			if (monster.elementString.includes("n")) monster.elements.add(stringToElementSigil("Fire"));
		}

		let monsterLine = results.data.find((line) => 
			(monster.id.startsWith("f_epic") && line.codename == "f_epic")
			|| (line.codename.startsWith("i") && line.codename == monster.id.substring(0, 3))
			|| line.codename == monster.id)

		if (monsterLine)
		{
			monster.name = monsterLine.name;
			monster.islands = islandStringsToSet(monsterLine.islands.split("&").slice(0, -1));

			// epic wubbox clause
			if (monster.elementString.startsWith("f"))
			{
				for (let island of monster.islands)
				{
					if (island != undefined)
					{
						if (island.codename.toLowerCase() == monster.identifier.replace("epic_", "").replace("fire", "").toLowerCase())
						{
							monster.islands = new Set();
							monster.islands.add(stringToIsland(island.codename));

							if (island.codename == "Haven" || island.codename == "Oasis")
							{
								monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/F_EPIC-Memory_Fire" + island.codename + ".wav";
							}
							else if (island.codename == "Plant" || island.codename == "Gold")
							{
								monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/F_EPIC-Memory.wav";
							}
							else if (island.codename == "Cold")
							{
								monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/F-Memory_EPIC_Cold.wav"; // why bbb why
							}
							else
							{
								monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/F_EPIC-Memory_" + island.codename + ".wav";
							}
							break;
						}
					}
				}
			}

			// rare wubbox clause (thanks event)
			if (monster.id.startsWith("f_rare"))
			{
				monster.memory = "https://monstyrslayr.github.io/msmTools/audio/memory/O-Memory.wav"; // WHY BBB WHY
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
			
			const likesStringArr = monsterLine["likes/polarity"].split("&").slice(0, -1);
			monster.likes = new Set();
			monster.positive = null;
			monster.negative = null;

			const wublinIsland = stringToIsland("Wublin");

			if (monster.islands.size == 1 && monster.islands.has(wublinIsland))
			{
				if (likesStringArr[1] != "Unreleased") monster.positive = new Like(likesStringArr[1], wublinIsland);
				if (likesStringArr[0] != "Unreleased") monster.negative = new Like(likesStringArr[0], wublinIsland);
			}
			else
			{
				for (const likeString of likesStringArr)
				{
					const daSplit = likeString.split(":");

					if (daSplit)
					{
						const daLike = daSplit[1];

						if (daLike != "Unreleased")
						{
							const islandName = daSplit[0];

							if (islandName == "All")
							{
								for (const island of monster.islands)
								{
									if (island.hasLikes)
									{
										monster.likes.add(new Like(daLike, island));
									}
								}
							}
							else
							{
								monster.likes.add(new Like(daLike, islandNameToIsland(islandName)));
							}
						}
					}
				}
			}
		
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

export function getElements() // DOES NOT get seasonal elements
{
	return elementSigils;
}

export function getIslands()
{
	return islands;
}

console.log(await getMonsters());
