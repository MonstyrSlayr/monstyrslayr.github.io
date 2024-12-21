export const IMG = "../img/"

function rgb(r, g, b)
{
    function componentToHex(c)
    {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
  
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getCapitalLetters(str)
{
    let capitals = "";
    for (let i = 0; i < str.length; i++)
    {
        if (str[i] >= "A" && str[i] <= "Z")
        {
            capitals += str[i];
        }
    }
    return capitals;
}

//#region classes
class MonsterClass
{
    constructor (name)
    {
        this.name = name;
    }
}
let daMonsterClasses =
[
    new MonsterClass("None"),
    new MonsterClass("Ameliorate"),
];
//#endregion

//#region elements
class MonsterElement
{
    constructor (name, sigil, main, outside, highlight)
    {
        this.name = name;
        this.id = name;
        this.sigil = sigil;
        this.main = main;
        this.outside = outside;
        this.highlight = highlight;
    }
}
const bulbElement = new MonsterElement("Bulb", IMG + "ElementBulb.png",
    rgb(255, 170, 0), rgb(88, 55, 0), rgb(255, 201, 91)
);
const hostessElement = new MonsterElement("Hostess", IMG + "ElementHostess.png",
    rgb(39, 255, 209), rgb(28, 137, 129), rgb(129, 227, 231)
);
const clayElement = new MonsterElement("Clay", IMG + "ElementClay.png",
    rgb(227, 64, 64), rgb(107, 30, 30), rgb(230, 82, 104)
);
const signalElement = new MonsterElement("Signal", IMG + "ElementSignal.png",
    rgb(0, 255, 56), rgb(11, 129, 33), rgb(122, 213, 139)
);
const trashElement = new MonsterElement("Trash", IMG + "ElementTrash.png",
    rgb(137, 137, 130), rgb(39, 39, 0), rgb(229, 222, 19)
);
const daAmeliorateElements =
[
    bulbElement,
    hostessElement,
    clayElement,
    signalElement,
    trashElement,
];

export function getElements()
{
    return daAmeliorateElements;
}

export function getElementById(id)
{
    return daAmeliorateElements.find(element => element.id == id);
}
//#endregion

//#region monsters
class Monster
{
    constructor (id, monsterClass, images = {})
    {
        this.id = id;
        this.monsterClass = monsterClass;
        this.images = images;
    }
}

class Ameliorate extends Monster
{
    constructor (id, elements, affiliation, attributes, realName)
    {
        super();

        this.id = id;
        this.elements = elements;
        this.affiliation = affiliation;
        if (realName == undefined) realName = id;
        this.realName = realName;
        this.attr = attributes;

        this.elementString = "";
        for (const element of this.elements)
        {
            this.elementString += element.name.substring(0, 1);
        }

        let basicImage = id + "-" + this.elementString;
        
        this.images.default = IMG + basicImage + ".png";
        this.images.lineless = IMG + basicImage + "-Lineless.png";
        this.images.shadowless = IMG + basicImage + "-Shadowless.png";
        this.images.linelessShadowless = IMG + basicImage + "-Lineless-Shadowless.png";
        this.images.emoji = IMG + "emoji/" + basicImage + ".png";
    }
}
const daAmeliorates =
[
    new Ameliorate("Reese",         [bulbElement],   bulbElement,
                        {age: 8}),
    new Ameliorate("Guira",         [hostessElement],   hostessElement,
                        {age: 16}),
    new Ameliorate("Arpeggidough",  [clayElement],   clayElement,
                        {age: 14}),
    new Ameliorate("Meeka",         [signalElement],   signalElement,
                        {age: 15}),
    new Ameliorate("Etikan",        [trashElement],   trashElement,
                        {age: 12}),

    new Ameliorate("Tabi",          [bulbElement, hostessElement],    hostessElement,
                        {age: 34}),
    new Ameliorate("Yaun",          [bulbElement, clayElement],    clayElement,
                        {age: 6}),
    new Ameliorate("Esckickis",     [bulbElement, signalElement],    bulbElement,
                        {age: 20}),
    new Ameliorate("nillaCorn",     [bulbElement, trashElement],    bulbElement,
                        {age: 17}),
    new Ameliorate("Jugashley",     [hostessElement, clayElement],    clayElement,
                        {age: 25}),
    new Ameliorate("Orgako",        [hostessElement, signalElement],    signalElement,
                        {age: 19}),
    new Ameliorate("Alliumaid",     [hostessElement, trashElement],    hostessElement,
                        {age: 21}),
    new Ameliorate("ExpiFour",      [clayElement, signalElement],    signalElement,
                        {age: 0},    "Expi Four"),
    new Ameliorate("Octosquish",    [clayElement, trashElement],    trashElement,
                        {age: 21}),
    new Ameliorate("TrashCymbal",   [signalElement, trashElement],    trashElement,
                        {age: 27},    "Trash Cymbal"),

    new Ameliorate("Dormana",       [bulbElement, hostessElement, clayElement], hostessElement,
                        {age: 32}),
    new Ameliorate("Nnoygon",       [bulbElement, hostessElement, signalElement], bulbElement,
                        {age: 35}),
    new Ameliorate("Organe",        [bulbElement, hostessElement, trashElement], hostessElement,
                       {age: 39},       "Organe"),
    new Ameliorate("Robby",         [bulbElement, clayElement, signalElement], signalElement,
                        {age: 29}),
    new Ameliorate("Vack",          [bulbElement, clayElement, trashElement], trashElement,
                        {age: 46}),
    new Ameliorate("Rallentando",   [bulbElement, signalElement, trashElement], bulbElement,
                        {age: 50}),
    new Ameliorate("SemOhSeaga",    [hostessElement, clayElement, signalElement], signalElement,
                        {age: 27},    "Sem oh Seaga"),
    new Ameliorate("Athenerd",      [hostessElement, clayElement, trashElement], clayElement,
                        {age: 26}),
    new Ameliorate("KassBick",      [hostessElement, signalElement, trashElement], trashElement,
                        {age: 46},    "Kass Bick"),
    new Ameliorate("Deltah",        [clayElement, signalElement, trashElement], clayElement,
                        {age: 25}),

    new Ameliorate("Spotscast",     [bulbElement, hostessElement, clayElement, signalElement],   signalElement,
                        {age: 34}),
    //new Ameliorate("Bushka",       [bulbElement, hostessElement, clayElement, trashElement],   hostessElement,
    //                    {age: 49}),
    new Ameliorate("Monkdom",       [bulbElement, hostessElement, signalElement, trashElement],   bulbElement,
                        {age: 56}),
    new Ameliorate("ReFabric",      [bulbElement, clayElement, signalElement, trashElement],   trashElement,
                        {age: 37}, "Re-Fabrić"),
    new Ameliorate("Trumpoff",      [hostessElement, clayElement, signalElement, trashElement],   clayElement,
                        {age: 54}),
];

export function getAmeliorates()
{
    return daAmeliorates;
}

export function getAmeliorateById(id)
{
    return daAmeliorates.find(monster => monster.id == id);
}
//#endregion

//#region islands
class Island
{
    constructor (name, monsterClass, elements, affiliation)
    {
        this.name = name;
        this.monsterClass = monsterClass;
        this.elements = elements;
        this.affiliation = affiliation;
        this.id = getCapitalLetters(name);

        this.isATN = name.endsWith("All Together Now!");
    }
}
const daAmeliorateIslands =
[
    new Island("Signal Stadium", "Ameliorate", getAmeliorateById("Spotscast").elements, signalElement),
    new Island("Clay Kiln", "Ameliorate", getAmeliorateById("Trumpoff").elements, clayElement),
    new Island("Trash Skylands", "Ameliorate", getAmeliorateById("ReFabric").elements, trashElement),
    new Island("Bulbi Gardens", "Ameliorate", getAmeliorateById("Monkdom").elements, bulbElement),
    
    new Island("Signal Stadium: All Together Now!", "Ameliorate", daAmeliorateElements, signalElement),
    new Island("Clay Kiln: All Together Now!", "Ameliorate", daAmeliorateElements, clayElement),
]

export function getIslands()
{
    return daAmeliorateIslands;
}

export function getIslandById(id)
{
    return daAmeliorateIslands.find(island => island.id == id);;
}
//#endregion