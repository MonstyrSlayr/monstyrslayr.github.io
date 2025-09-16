import { Monster, getClasses, getRarities, getMonsters, getElements, getIslands } from "https://monstyrslayr.github.io/msmTools/monsters.js";

const RARITY = getRarities();
const CLASS = getClasses();
const islands = getIslands();
const elementSigils = getElements();

class Conditional // different from the random monster generator one :)
{
    condition = function() { return false };
    description = "Includes no monsters.";

    constructor (condition = Function, description = String)
    {
        this.condition = condition;
        this.description = description;
    }

    getMonsterCountMatchingCondition(monsterSet = Array)
    {
        return [...monsterSet].filter((monster) => this.condition(monster)).length;
    }
}

class RarityConditional extends Conditional
{
    rarity;

    constructor (rarity, description)
    {
        super(function (monster = Monster) { return monster.rarity == rarity }, description);
        this.rarity = rarity;
    }
}

class ClassConditional extends Conditional
{
    mclasses = []; // can have multiple
    name = ""

    constructor (mclasses = Array, description)
    {
        super(function (monster = Monster) { return mclasses.includes(monster.class) }, description);
        this.mclasses = mclasses;
    }
}

class IslandConditional extends Conditional
{
    island;

    constructor (island)
    {
        super(function (monster = Monster) { return monster.islands.has(island) }, "This monster is on " + island.name.toUpperCase() + ".");
        this.island = island;
    }
}

class ElementConditional extends Conditional
{
    elementSigil;

    constructor (elementSigil)
    {
        super(function (monster = Monster) { return monster.elements.has(elementSigil) }, "This monster has the " + elementSigil.name.toUpperCase() + " element.");
        this.elementSigil = elementSigil;
    }
}

export const monsters = await getMonsters();

export const defaultConditional = new Conditional(function (monster = Monster) {return true;}, "This monster is a MONSTER. This monster is a singing monster in My Singing Monsters.")

export const rarityConditionals = [];
rarityConditionals.push(new RarityConditional(RARITY.COMMON, "This monster is COMMON. Does not include Celestials or Paironormals. All Titansouls are COMMON."));
rarityConditionals.push(new RarityConditional(RARITY.RARE, "This monster is RARE. Does not include Celestials or Paironormals."));
rarityConditionals.push(new RarityConditional(RARITY.EPIC, "This monster is RARE. Does not include Celestials or Paironormals."));
rarityConditionals.push(new RarityConditional(RARITY.CHILD, "This monster is a CHILD. Only includes Celestials."));
rarityConditionals.push(new RarityConditional(RARITY.ADULT, "This monster is an ADULT. Only includes Celestials."));
rarityConditionals.push(new RarityConditional(RARITY.MAJOR, "This monster is MAJOR. Only includes Paironormals."));
rarityConditionals.push(new RarityConditional(RARITY.MINOR, "This monster is MINOR. Only includes Paironormals."));

export const classConditionals = [];
classConditionals.push(new ClassConditional([CLASS.NATURAL], "This monster is NATURAL. This monster only has Natural elements, excluding Fire."));
classConditionals.push(new ClassConditional([CLASS.FIRE], "This monster is a FIRE NATURAL. This monster only has Natural elements, as well as Fire."));
classConditionals.push(new ClassConditional([CLASS.MAGICAL], "This monster is MAGICAL. This monster has at least one Magical element."));
classConditionals.push(new ClassConditional([CLASS.MYTHICAL], "This monster is MYTHICAL. This monster has the Mythical element, and does not have the Dream element."));
classConditionals.push(new ClassConditional([CLASS.DREAMYTHICAL], "This monster is DREAMYTHICAL. This monster has the Dream element."));
classConditionals.push(new ClassConditional([CLASS.SEASONAL], "This monster is SEASONAL. This monster has a Seasonal element."));
classConditionals.push(new ClassConditional([CLASS.ETHEREAL], "This monster is ETHEREAL. This monster has at leasT one Ethereal element."));
classConditionals.push(new ClassConditional([CLASS.SUPERNATURAL], "This monster is SUPERNATURAL. This monster has the Electricity element."));
classConditionals.push(new ClassConditional([CLASS.SHUGAFAM, CLASS.WERDO], "This monster is LEGENDARY. This monster has the Legendary element."));
classConditionals.push(new ClassConditional([CLASS.SHUGAFAM], "This monster is a SHUGAFAM member. This monster is part of the legendary SHUGAFAM."));
classConditionals.push(new ClassConditional([CLASS.WERDO], "This monster is a WERDO. This monster is a loquacious and legendary WERDO."));
classConditionals.push(new ClassConditional([CLASS.CELESTIAL], "This monster is a CELESTIAL. This monster has the Celestial element."));
classConditionals.push(new ClassConditional([CLASS.DIPSTER], "This monster is a DIPSTER. This monster has the Dipster element."));
classConditionals.push(new ClassConditional([CLASS.TITANSOUL], "This monster is a TITANSOUL. This monster has the Titansoul element."));
classConditionals.push(new ClassConditional([CLASS.PAIRONORMAL], "This monster is PAIRONORMAL. This monster has at least one Paironormal element."));
classConditionals.push(new ClassConditional([CLASS.PRIMORDIAL], "This monster is PRIMORDIAL. This monster has at least one Primordial element."));

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
