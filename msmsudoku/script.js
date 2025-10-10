import { Monster, getClasses, getRarities, getMonsters, getElements, getIslands } from "https://monstyrslayr.github.io/msmTools/monsters.js";

const RARITY = getRarities();
const CLASS = getClasses();
const islands = getIslands();
const elementSigils = getElements();

class Conditional // different from the random monster generator one :)
{
    condition = function() { return false };
    description = "Includes no monsters.";
    id = "";
    label = "";
    inverseLabel = "";

    constructor (condition = Function, description = String, id = String, label = String, inverseLabel = String)
    {
        this.condition = condition;
        this.description = description;
        this.id = id;
        this.label = label;
        this.inverseLabel = inverseLabel;
    }

    getMonsterCountMatchingCondition(monsterSet = Array)
    {
        return [...monsterSet].filter((monster) => this.condition(monster)).length;
    }
}

class RarityConditional extends Conditional // r
{
    rarity;

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

    constructor (island)
    {
        super(function (monster = Monster) { return monster.islands.has(island) }, "This monster is on " + island.name.toUpperCase() + ".", "i" + island.codename, "Is on " + island.name.toUpperCase(), "Is not on " + island.name.toUpperCase());
        this.island = island;
    }
}

class ElementConditional extends Conditional // e
{
    elementSigil;

    constructor (elementSigil)
    {
        super(function (monster = Monster) { return monster.elements.has(elementSigil) }, "This monster has the " + elementSigil.name.toUpperCase() + " element.", "e" + elementSigil.name, "Has the " + elementSigil.name.toUpperCase() + " element", "Does not have the " + elementSigil.name.toUpperCase() + " element");
        this.elementSigil = elementSigil;
    }
}

class ElementCountConditional extends Conditional // #
{
    count;

    constructor(count)
    {
        super(function (monster = Monster) { return monster.elements.size == count; }, "This monster has " + count + " elements.", "#" + count, "Has " + count + " elements", "Does not have " + count + " elements")
        this.count = count;
    }
}

class LikeConditional extends Conditional // l
{
    like;

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

class EggConditional extends Conditional // v for inVentory
{
    egg;

    constructor (egg)
    {
        super(function (monster = Monster)
        {
            for (const daInv of monster.inventory.values())
            {
                if (daInv.monster == egg)
                {
                    return true;
                }
            }
            return false; 
        }, "This monster's inventory requires a " + egg.toUpperCase() + " egg.", "v" + elementSigil.name, "Has the " + elementSigil.name.toUpperCase() + " element", "Does not have the " + elementSigil.name.toUpperCase() + " element");
        this.elementSigil = elementSigil;
    }
}

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

export const monsters = await getMonsters();

function getMonsterByName(name)
{
    return monsters.find((monster) => name == monster.name);
}

export const defaultConditional = new Conditional(function (monster = Monster) {return true;}, "This monster is a MONSTER. This monster is a singing monster in My Singing Monsters.", "d", "Is a MONSTER", "Is not a MONSTER")

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
for (let i = 1; i <= 5; i++)
{
    countConditionals.push(new ElementCountConditional(i));
}

export const likeConditionals = [];
export const likedByConditionals = [];
export const eggConditionals = [];

const uniqueLikes = new Set();
const uniqueMonsterLikes = new Set();
const uniqueEggs = new Set();

monsters.forEach(monster =>
{
    monster.likes.values().forEach(likeObj =>
    {
        uniqueLikes.add(likeObj.name);

        const maybeMonster = getMonsterByName(likeObj.name);

        if (maybeMonster) uniqueMonsterLikes.add(maybeMonster);
    });

    monster.inventory.values.forEach(eggObj =>
    {
        uniqueEggs.add(eggObj.monster);
    });
});

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
