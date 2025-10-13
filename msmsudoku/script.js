import { Monster, getClasses, getRarities, getMonsters, getElements, getIslands } from "https://monstyrslayr.github.io/msmTools/monsters.js";

const RARITY = getRarities();
const CLASS = getClasses();
const islands = getIslands();
const elementSigils = getElements();

const allConditionals = [];

class Conditional // different from the random monster generator one :)
{
    condition = function() { return false };
    description = "Includes no monsters.";
    id = "";
    label = "";
    inverseLabel = "";
    weight = 0;

    constructor (condition = Function, description = String, id = String, label = String, inverseLabel = String)
    {
        this.condition = condition;
        this.description = description;
        this.id = id;
        this.label = label;
        this.inverseLabel = inverseLabel;
        allConditionals.push(this);
    }

    getMonsterCountMatchingCondition(monsterSet = Array)
    {
        return [...monsterSet].filter((monster) => this.condition(monster)).length;
    }
}

class RarityConditional extends Conditional // r
{
    rarity;
    weight = 0.05;

    constructor (rarity, description)
    {
        super(function (monster = Monster) { return monster.rarity == rarity }, description, "r" + rarity, "Is " + rarity.toUpperCase(), "Is not " + rarity.toUpperCase());
        this.rarity = rarity;
    }
}

class ClassConditional extends Conditional // c
{
    mclasses = []; // can have multiple
    name = ""
    weight = 0.075;

    constructor (mclasses = Array, name, description)
    {
        let allString = "";
        mclasses.forEach(mclass =>
        {
            allString += mclass;
        });
        super(function (monster = Monster) { return mclasses.includes(monster.class) }, description, "c" + allString, name + " class", "Not " + name + " class");
        this.name = name;
        this.mclasses = mclasses;
    }
}

class IslandConditional extends Conditional // i
{
    island;
    weight = 0.09;

    constructor (island)
    {
        super(function (monster = Monster) { return monster.islands.has(island) }, "This monster is on " + island.name.toUpperCase() + ".", "i" + island.codename, "Is on " + island.name.toUpperCase(), "Is not on " + island.name.toUpperCase());
        this.island = island;
    }
}

class ElementConditional extends Conditional // e
{
    elementSigil;
    weight = 0.1;

    constructor (elementSigil)
    {
        super(function (monster = Monster) { return monster.elements.has(elementSigil) }, "This monster has the " + elementSigil.name.toUpperCase() + " element.", "e" + elementSigil.name, "Has the " + elementSigil.name.toUpperCase() + " element", "Does not have the " + elementSigil.name.toUpperCase() + " element");
        this.elementSigil = elementSigil;
    }
}

class ElementCountConditional extends Conditional // #
{
    count;
    weight = 0.05;

    constructor(count)
    {
        super(function (monster = Monster) { return monster.elements.size == count; }, "This monster has " + count + " elements.", "#" + count, "Has " + count + " elements", "Does not have " + count + " elements")
        this.count = count;
    }
}

class LikeConditional extends Conditional // l
{
    like;
    weight = 0.6;

    constructor (like)
    {
        super(function (monster = Monster)
        {
            for (const daLike of monster.likes.values())
            {
                if (daLike.name == like)
                {
                    return true;
                }
            }
            return false; 
        }, "This monster likes " + like.toUpperCase() + ".", "l" + like.replace(" ", ""), "Likes " + like.toUpperCase(), "Does not like " + like.toUpperCase());
        this.like = like;
    }
}

class LikedByConditional extends Conditional // b
{
    daMonster;
    weight = 0.6;

    constructor (daMonster)
    {
        super(function (monster = Monster)
        {
            for (const daLike of daMonster.likes.values())
            {
                if (daLike.name == monster.name)
                {
                    return true;
                }
            }
            return false; 
        }, "This monster is liked by " + daMonster.name.toUpperCase() + ".", "b" + daMonster.name.replace(" ", ""), "Liked by " + daMonster.name.toUpperCase(), "Not liked by " + daMonster.name.toUpperCase());
        this.daMonster = daMonster;
    }
}

class EggConditional extends Conditional // g for eGg
{
    egg;
    weight = 0.75;

    constructor (egg)
    {
        super(function (monster = Monster)
        {
            for (const daInv of monster.inventory.values())
            {
                if (daInv.name == egg)
                {
                    return true;
                }
            }
            return false; 
        }, "This monster's inventory requires a " + egg.toUpperCase() + " EGG.", "g" + egg, "Inventory requires " + egg.toUpperCase() + " EGG", "Inventory does not require " + egg.toUpperCase() + " EGG, or does not have egg inventory");
        this.egg = egg;
    }
}

class RequiredByConditional extends Conditional // q for reQuired
{
    daMonster;
    weight = 0.75;

    constructor (daMonster)
    {
        super(function (monster = Monster)
        {
            for (const daEgg of daMonster.inventory.values())
            {
                if (daEgg.name == monster.name)
                {
                    return true;
                }
            }
            return false; 
        }, "This monster's egg is required by " + daMonster.name.toUpperCase() + ".", "q" + daMonster.name.replace(" ", ""), "Egg required by " + daMonster.name.toUpperCase() + "'S INVENTORY", "Egg not required by " + daMonster.name.toUpperCase() + "'S INVENTORY");
        this.daMonster = daMonster;
    }
}

class SizeConditional extends Conditional // z
{
    size;
    weight = 0.06;

    constructor(size)
    {
        super(function (monster = Monster) { return monster.size == size; }, "This monster takes up a " + size + " BY " + size + " AREA.", "z" + size, "Takes up " + size + " BY " + size, "Does not take up " + size + " BY " + size)
        this.size = size;
    }
}

class BedsConditional extends Conditional // 🛏️ (sue me)
{
    beds;
    weight = 0.06;

    constructor(beds)
    {
        super(function (monster = Monster) { return monster.beds == beds; }, "This monster takes up " + beds + " beds in a standard castle.", "🛏️" + beds, "Uses " + beds + " BEDS", "Does not use " + beds + " BEDS")
        this.beds = beds;
    }
}

class LevelConditional extends Conditional // v for leVel
{
    level;
    weight = 0.08;

    constructor(level)
    {
        super(function (monster = Monster) { return monster.levelAvailable == level; }, "This monster becomes available to buy or breed by LEVEL " + level + ".", "v" + level, "Available at LEVEL " + level, "Availability starts at a level other than LEVEL " + level)
        this.level = level;
    }
}

class TimeLimitConditional extends Conditional // t
{
    timeLimit;
    weight = 0.1;

    constructor(timeLimit)
    {
        super(function (monster = Monster) { return monster.timeLimit == timeLimit; }, "This monster's inventory has a time limit of " + timeLimit + " DAYS.", "t" + timeLimit, "Time limit of " + timeLimit + " DAYS", "Time limit other than " + timeLimit + " DAYS, or no time limit")
        this.timeLimit = timeLimit;
    }
}

class FirstDiscoveredConditional extends Conditional // f
{
    firstDiscovered;
    weight = 1;

    constructor(firstDiscovered)
    {
        super(function (monster = Monster) { return monster.firstDiscovered == firstDiscovered; }, "This monster was first discovered by " + firstDiscovered.toUpperCase() + ".", "f" + firstDiscovered, "First discovered by " + firstDiscovered.toUpperCase(), "Not first discovered by " + firstDiscovered)
        this.firstDiscovered = firstDiscovered;
    }
}

class ReleaseYearConditional extends Conditional // y
{
    year;
    weight = 0.4;

    constructor(year)
    {
        super(function (monster = Monster) { return monster.releaseYear == year; }, "This monster was released in " + year + ".", "y" + year, "Released in " + year, "Not released in " + year)
        this.year = year;
    }
}

export const monsters = await getMonsters();
export const defaultConditional = new Conditional(function (monster = Monster) {return true;}, "This monster is a MONSTER. This monster is a singing monster in My Singing Monsters.", "d", "Is a MONSTER", "Is not a MONSTER");

export function countMonstersInConditionals(monsterGroup, conditionals, inverses)
{
    let num = 0;
    for (const monster of monsterGroup)
    {
        let countMonster = true;
        for (let i = 0; i < conditionals.length; i++)
        {
            const condit = conditionals[i];
            const inverse = inverses[i];
            if ((!inverse && !condit.condition(monster)) || (inverse && condit.condition(monster)))
            {
                countMonster = false;
                break;
            }
        }
        if (countMonster) num++;
    }
    return num;
}

export function gaugeSudokuDifficulty(allMonsters, rowConds, rowInverses, colConds, colInverses)
{
    const baseDifficulty = 1;
    const maxDifficulty = 10;
    const curve = (x) => 1 - Math.pow(1 - x, 2.5);
    let totalHardness = 0;

    let totalPairs = countMonstersInConditionals(allMonsters, [defaultConditional], [false]) * rowConds.length * colConds.length;
    let validPairs = 0;

    for (let r = 0; r < rowConds.length; r++)
    {
        for (let c = 0; c < colConds.length; c++)
        {
            const count = countMonstersInConditionals(
                allMonsters,
                [rowConds[r], colConds[c]],
                [rowInverses[r], colInverses[c]]
            );

            // If ANY row–col pair is impossible → sudoku impossible
            if (count === 0) return 0;

            const hardness = (1 - rowConds[r].weight) * (1 - colConds[c].weight);
            totalHardness += 1 - hardness;
            validPairs += count;
        }
    }

    const avgHardness = totalHardness / (rowConds.length * colConds.length);
    const ratio = validPairs / totalPairs;

    // Compute difficulty directly without double normalization
    let difficulty = baseDifficulty + (maxDifficulty - baseDifficulty) * curve(avgHardness * (1 - ratio));

    return parseFloat(difficulty.toFixed(2));
}

function getMonsterByName(name)
{
    return monsters.find((monster) => name == monster.name);
}

export const rarityConditionals = [];
rarityConditionals.push(new RarityConditional(RARITY.COMMON, "This monster is COMMON. Does not include Celestials or Paironormals. All Titansouls are COMMON."));
rarityConditionals.push(new RarityConditional(RARITY.RARE, "This monster is RARE. Does not include Celestials or Paironormals."));
rarityConditionals.push(new RarityConditional(RARITY.EPIC, "This monster is EPIC. Does not include Celestials or Paironormals."));
rarityConditionals.push(new RarityConditional(RARITY.CHILD, "This monster is a CHILD. Only includes Celestials."));
rarityConditionals.push(new RarityConditional(RARITY.ADULT, "This monster is an ADULT. Only includes Celestials."));
rarityConditionals.push(new RarityConditional(RARITY.MAJOR, "This monster is MAJOR. Only includes Paironormals."));
rarityConditionals.push(new RarityConditional(RARITY.MINOR, "This monster is MINOR. Only includes Paironormals."));

export const classConditionals = [];
classConditionals.push(new ClassConditional([CLASS.NATURAL], "NATURAL", "This monster is NATURAL. This monster only has Natural elements, excluding Fire."));
classConditionals.push(new ClassConditional([CLASS.FIRE], "FIRE", "This monster is a FIRE NATURAL. This monster only has Natural elements, as well as Fire."));
classConditionals.push(new ClassConditional([CLASS.MAGICAL], "MAGICAL", "This monster is MAGICAL. This monster has at least one Magical element."));
classConditionals.push(new ClassConditional([CLASS.MYTHICAL], "MYTHICAL", "This monster is MYTHICAL. This monster has the Mythical element, and does not have the Dream element."));
classConditionals.push(new ClassConditional([CLASS.DREAMYTHICAL], "DREAMYTHICAL", "This monster is DREAMYTHICAL. This monster has the Dream element."));
classConditionals.push(new ClassConditional([CLASS.SEASONAL], "SEASONAL", "This monster is SEASONAL. This monster has a Seasonal element."));
classConditionals.push(new ClassConditional([CLASS.ETHEREAL], "ETHEREAL", "This monster is ETHEREAL. This monster has at leasT one Ethereal element."));
classConditionals.push(new ClassConditional([CLASS.SUPERNATURAL], "SUPERNATURAL", "This monster is SUPERNATURAL. This monster has the Electricity element."));
classConditionals.push(new ClassConditional([CLASS.SHUGAFAM, CLASS.WERDO], "LEGENDARY", "This monster is LEGENDARY. This monster has the Legendary element."));
classConditionals.push(new ClassConditional([CLASS.SHUGAFAM], "SHUGAFAM", "This monster is a SHUGAFAM member. This monster is part of the legendary SHUGAFAM."));
classConditionals.push(new ClassConditional([CLASS.WERDO], "WERDO", "This monster is a WERDO. This monster is a loquacious and legendary WERDO."));
classConditionals.push(new ClassConditional([CLASS.CELESTIAL], "CELESTIAL", "This monster is a CELESTIAL. This monster has the Celestial element."));
classConditionals.push(new ClassConditional([CLASS.DIPSTER], "DIPSTER", "This monster is a DIPSTER. This monster has the Dipster element."));
classConditionals.push(new ClassConditional([CLASS.TITANSOUL], "TITANSOUL", "This monster is a TITANSOUL. This monster has the Titansoul element."));
classConditionals.push(new ClassConditional([CLASS.PAIRONORMAL], "PAIRONORMAL", "This monster is PAIRONORMAL. This monster has at least one Paironormal element."));
classConditionals.push(new ClassConditional([CLASS.PRIMORDIAL], "PRIMORDIAL", "This monster is PRIMORDIAL. This monster has at least one Primordial element."));

export const islandConditionals = [];
islands.forEach(island =>
{
    islandConditionals.push(new IslandConditional(island));
});

export const elementConditionals = [];
elementSigils.forEach(elementSigil =>
{
    elementConditionals.push(new ElementConditional(elementSigil));
});

export const countConditionals = [];
export const likeConditionals = [];
export const likedByConditionals = [];
export const eggConditionals = [];
export const reqConditionals = [];
export const sizeConditionals = [];
export const bedsConditionals = [];
export const levelConditionals = [];
export const timeConditionals = [];
export const firstConditionals = [];
export const yearConditionals = [];

const uniqueCounts = new Set();
const uniqueLikes = new Set();
const uniqueMonsterLikes = new Set();
const uniqueEggs = new Set();
const uniqueReqs = new Set();
const uniqueSizes = new Set();
const uniqueBeds = new Set();
const uniqueLevels = new Set();
const uniqueTimes = new Set();
const uniqueFirsts = new Set();
const uniqueYears = new Set();

monsters.forEach(monster =>
{
    monster.likes.values().forEach(likeObj =>
    {
        uniqueLikes.add(likeObj.name);

        const maybeMonster = getMonsterByName(likeObj.name);

        if (maybeMonster) uniqueMonsterLikes.add(maybeMonster);
    });

    monster.inventory.values().forEach(eggObj =>
    {
        uniqueEggs.add(eggObj.name);
    });

    if (monster.inventory.size > 0)
    {
        uniqueReqs.add(monster);
    }

    uniqueCounts.add(monster.elements.size);
    uniqueSizes.add(monster.size);
    uniqueBeds.add(monster.beds);
    if (monster.releaseYear != 0) uniqueYears.add(monster.releaseYear);
    if (!isNaN(monster.levelAvailable)) uniqueLevels.add(monster.levelAvailable);
    if (monster.timeLimit != 0) uniqueTimes.add(monster.timeLimit);
    if (monster.firstDiscovered != "") uniqueFirsts.add(monster.firstDiscovered);
});

uniqueCounts.values().forEach(count =>
{
    countConditionals.push(new ElementCountConditional(count));
});
countConditionals.sort((a, b) => a - b);

uniqueLikes.values().forEach(like =>
{
    likeConditionals.push(new LikeConditional(like));
});
likeConditionals.sort((a, b) => a.like.toLowerCase().localeCompare(b.like.toLowerCase()));

uniqueMonsterLikes.values().forEach(monster =>
{
    likedByConditionals.push(new LikedByConditional(monster));
});
likedByConditionals.sort((a, b) => a.daMonster.name.toLowerCase().localeCompare(b.daMonster.name.toLowerCase()));

uniqueEggs.values().forEach(egg =>
{
    eggConditionals.push(new EggConditional(egg));
});
eggConditionals.sort((a, b) => a.egg.toLowerCase().localeCompare(b.egg.toLowerCase()));

uniqueReqs.values().forEach(req =>
{
    reqConditionals.push(new RequiredByConditional(req));
});
reqConditionals.sort((a, b) => a.daMonster.name.toLowerCase().localeCompare(b.daMonster.name.toLowerCase()));

uniqueSizes.values().forEach(size =>
{
    sizeConditionals.push(new SizeConditional(size));
});
sizeConditionals.sort((a, b) => a.size - b.size);

uniqueBeds.values().forEach(beds =>
{
    bedsConditionals.push(new BedsConditional(beds));
});
bedsConditionals.sort((a, b) => a.beds - b.beds);

uniqueLevels.values().forEach(level =>
{
    levelConditionals.push(new LevelConditional(level));
});
levelConditionals.sort((a, b) => a.level - b.level);

uniqueTimes.values().forEach(time =>
{
    timeConditionals.push(new TimeLimitConditional(time));
});
timeConditionals.sort((a, b) => a.timeLimit - b.timeLimit);

uniqueFirsts.values().forEach(first =>
{
    firstConditionals.push(new FirstDiscoveredConditional(first));
});
firstConditionals.sort((a, b) => a.firstDiscovered.toLowerCase().localeCompare(b.firstDiscovered.toLowerCase()));

uniqueYears.values().forEach(year =>
{
    yearConditionals.push(new ReleaseYearConditional(year));
});
yearConditionals.sort((a, b) => a.year - b.year);

export function getConditionalById(id)
{
    for (const conditional of allConditionals)
    {
        if (conditional.id == id) // YESSSSS!!!!!
        {
            return conditional;
        }
    }
    return defaultConditional;
}

const secretKey = "amongUsInRealLifeSusSus";

// Utility: convert string <-> ArrayBuffer
function strToBuf(str)
{
    return new TextEncoder().encode(str);
}

function bufToStr(buf)
{
    return new TextDecoder().decode(buf);
}

// Utility: derive a crypto key from a password
async function deriveKey(password)
{
    const enc = strToBuf(password);
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey
    (
        {
            name: "PBKDF2",
            salt: strToBuf("sudoku-salt"), // change salt if you want
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

export async function encryptAndDownload(jsonObj, filename = "my_msm_sudoku.sud")
{
    const key = await deriveKey(secretKey);
    const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM needs 12-byte IV
    const data = strToBuf(JSON.stringify(jsonObj));

    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        data
    );

    // Combine IV + encrypted data into one file
    const combined = new Uint8Array(iv.byteLength + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.byteLength);

    const blob = new Blob([combined], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

export async function decryptFile(file)
{
    const key = await deriveKey(secretKey);
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // Extract IV (first 12 bytes)
    const iv = bytes.slice(0, 12);
    const encryptedData = bytes.slice(12);

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
    );

    const jsonStr = bufToStr(decrypted);
    return JSON.parse(jsonStr);
}

export async function decryptFromURL(url)
{
    const response = await fetch(url);
    const blob = await response.blob();
    return decryptFile(blob);
}
