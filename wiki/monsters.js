class MonsterClass
{
    constructor (name)
    {
        this.name = name;
    }
}

class MonsterElement
{
    constructor (name, images = [])
    {
        this.name = name;
        this.images = images;
    }
}

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
    constructor (id, hasBulb, hasHostess, hasClay, hasSignal, hasTrash, affiliation, attributes, realName)
    {
        super();

        this.id = id;
        this.B = hasBulb;
        this.H = hasHostess;
        this.C = hasClay;
        this.S = hasSignal;
        this.T = hasTrash;
        this.affiliation = affiliation;
        if (realName == null) this.realName = id;
        else this.realName = realName;
        this.attr = attributes;

        this.elementString =
            (this.B ? "B" : "")
            + (this.H ? "H" : "")
            + (this.C ? "C" : "")
            + (this.S ? "S" : "")
            + (this.T ? "T" : "");

        let basicImage = id + "-" + this.elementString;
        
        this.images.default = "../img/" + basicImage + ".png";
        this.images.lineless = "../img/" + basicImage + "-Lineless.png";
        this.images.shadowless = "../img/" + basicImage + "-Shadowless.png";
        this.images.linelessShadowless = "../img/" + basicImage + "-Lineless-Shadowless.png";
        this.images.emoji = "../img/emoji/" + basicImage + ".png";
    }
}

daMonsterClasses =
[
    new MonsterClass("Ameliorate")
];

daAmeliorateElements =
[
    new MonsterElement("Bulb"),
    new MonsterElement("Hostess"),
    new MonsterElement("Clay"),
    new MonsterElement("Signal"),
    new MonsterElement("Trash"),
];

daAmeliorates =
[
    new Ameliorate("Reese",         true,  false,  false,  false,  false,   "B",
                        {age: 8}),
    new Ameliorate("Guira",         false,  true,  false,  false,  false,   "H",
                        {age: 16}),
    new Ameliorate("Arpeggidough",  false,  false,  true,  false,  false,   "C",
                        {age: 14}),
    new Ameliorate("Meeka",         false,  false,  false,  true,  false,   "S",
                        {age: 15}),
    new Ameliorate("Etikan",        false,  false,  false,  false,  true,   "T",
                        {age: 12}),

    new Ameliorate("Tabi",          true,  true,  false,  false,  false,    "H",
                        {age: 34}),
    new Ameliorate("Yaun",          true,  false,  true,  false,  false,    "C",
                        {age: 6}),
    new Ameliorate("Esckickis",     true,  false,  false,  true,  false,    "B",
                        {age: 20}),
    new Ameliorate("nillaCorn",     true,  false,  false,  false,  true,    "B",
                        {age: 17}),
    new Ameliorate("Jugashley",     false,  true,  true,  false,  false,    "C",
                        {age: 25}),
    new Ameliorate("Orgako",        false,  true,  false,  true,  false,    "S",
                        {age: 19}),
    new Ameliorate("Alliumaid",     false,  true,  false,  false,  true,    "H",
                        {age: 21}),
    new Ameliorate("ExpiFour",      false,  false,  true,  true,  false,    "S",
                        {age: 0},    "Expi Four"),
    new Ameliorate("Octosquish",    false,  false,  true,  false,  true,    "T",
                        {age: 21}),
    new Ameliorate("TrashCymbal",   false,  false,  false,  true,  true,    "T",
                        {age: 27},    "Trash Cymbal"),

    new Ameliorate("Dormana",       true,  true,  true,  false,  false, "H",
                        {age: 32}),
    new Ameliorate("Nnoygon",       true,  true,  false,  true,  false, "B",
                        {age: 35}),
    //new Ameliorate("Organe",        true,  true,  false,  false,  true, "H",
    //                    {age: 39}),
    new Ameliorate("Robby",         true,  false,  true,  true,  false, "S",
                        {age: 29}),
    new Ameliorate("Vack",          true,  false,  true,  false,  true, "T",
                        {age: 46}),
    new Ameliorate("Rallentando",   true,  false,  false,  true,  true, "B",
                        {age: 50}),
    new Ameliorate("SemOhSeaga",    false,  true,  true,  true,  false, "S",
                        {age: 27},    "Sem oh Seaga"),
    new Ameliorate("Athenerd",      false,  true,  true,  false,  true, "C",
                        {age: 26}),
    new Ameliorate("KassBick",      false,  true,  false,  true,  true, "T",
                        {age: 46},    "Kass Bick"),
    new Ameliorate("Deltah",        false,  false,  true,  true,  true, "C",
                        {age: 25}),

    new Ameliorate("Spotscast",     true,  true,  true,  true,  false,   "S",
                        {age: 34}),
    //new Ameliorate("Hostess",       true,  true,  true,  false,  true,   "H",
    //                    {age: 49}),
    new Ameliorate("Monkdom",       true,  true,  false,  true,  true,   "B",
                        {age: 56}),
    new Ameliorate("ReFabric",      true,  false,  true,  true,  true,   "T",
                        {age: 37}, "Re-Fabrić"),
    new Ameliorate("Trumpoff",      false,  true,  true,  true,  true,   "C",
                        {age: 54}),
]

function getAmeliorateById(id)
{
    return daAmeliorates.find(monster => monster.id == id);
}