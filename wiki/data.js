export const IMG = "https://monstyrslayr.github.io/wiki/img/";

function rgb(r, g, b)
{
    function componentToHex(c)
    {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
  
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex)
{
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
    {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }
  
function rgbToHex(r, g, b)
{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function mixHexColors(colors)
{
    // Convert hex colors to RGB
    const rgbColors = colors.map(hexToRgb);
  
    // Calculate average RGB values
    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;
  
    for (const rgb of rgbColors)
    {
        totalRed += rgb.r;
        totalGreen += rgb.g;
        totalBlue += rgb.b;
    }
  
    const avgRed = Math.round(totalRed / colors.length);
    const avgGreen = Math.round(totalGreen / colors.length);
    const avgBlue = Math.round(totalBlue / colors.length);
  
    // Convert back to hex
    return rgbToHex(avgRed, avgGreen, avgBlue);
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

function getFirstLetters(str)
{
    var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
    var acronym = matches.join(''); // JSON
    return acronym;
}

export async function fileExists(url)
{
    try
    {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok; 
    }
    catch (err)
    {
        // console.error('An error occurred:', err);
        return false;
    }
}

function getShadowless(image)
{
    return image.replace(".png", "-Shadowless.png");
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
        this.active = sigil.replace(".png", "Active.png");
        this.main = main;
        this.outside = outside;
        this.highlight = highlight;
        this.single = null;
        this.quad = null;
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
const rubyElement = new MonsterElement("Ruby", IMG + "ElementRuby.png",
    rgb(182, 47, 61), rgb(134, 44, 58), rgb(219, 42, 87)
);
const daAmeliorateElements =
[
    bulbElement,
    hostessElement,
    clayElement,
    signalElement,
    trashElement
];

export function getElements()
{
    return daAmeliorateElements;
}

export function getElementById(id)
{
    return [...daAmeliorateElements, rubyElement].find(element => element.id.toLowerCase() == id.toLowerCase());
}

export function makeMiniElement(element, isActive = false)
{
    const aTag = document.createElement("a");

    const daSigil = document.createElement("img");
    daSigil.src = element.sigil;
    if (isActive) daSigil.src = element.active;
    daSigil.id = element.name;
    daSigil.classList = ["miniElement"];
    aTag.append(daSigil);

    aTag.href = "https://monstyrslayr.github.io/wiki/element/" + daSigil.id.toLowerCase() + "/";
    // daSigil.addEventListener("click", function()
    // {
    //     window.location.href = "https://monstyrslayr.github.io/wiki/element/" + daSigil.id.toLowerCase() + "/";
    // });
    
    return aTag;
}

export function makeElementDiv(element)
{
    const elementDiv = document.createElement("a");
    elementDiv.classList = ["layer"];
    elementDiv.style.backgroundColor = element.outside;
    elementDiv.id = element.id;
    elementDiv.href = "https://monstyrslayr.github.io/wiki/element/" + elementDiv.id.toLowerCase() + "/";
    // elementDiv.addEventListener("click", function()
    // {
    //     window.location.href = "https://monstyrslayr.github.io/wiki/element/" + elementDiv.id.toLowerCase() + "/";
    // });

    const elementImage = makeMiniElement(element);
    elementDiv.append(elementImage);

    const elementName = document.createElement("label");
    elementName.innerHTML = element.name;
    elementDiv.append(elementName);

    return elementDiv;
}

function makeElementString(elements)
{
    let elementString = "";
    for (const element of elements)
    {
        elementString += element.name.substring(0, 1);
    }
    return elementString;
}

export async function getElementData(id)
{
    const csvResponse = await fetch("https://monstyrslayr.github.io/wiki/elementData.csv");
	if (!csvResponse.ok)
	{
		throw new Error('Network response was not ok');
	}
	let csvText = await csvResponse.text();
	let results = await Papa.parse(csvText, { header: true });

    let monsterLine = results.data.find((line) => line.element.toLowerCase() == id.toLowerCase());

    return monsterLine;
}
//#endregion

//#region forms
class Form
{
    constructor (name, monsterElements, formElements, image)
    {
        this.name = name;
        this.monsterElements = monsterElements;
        this.elements = formElements;
        this.image = image;
    }
}

function sortFormsByElements(forms)
{
    return forms.sort((a, b) =>
    {
        let elementStringA = makeElementString(a.monsterElements);
        let elementStringB = makeElementString(b.monsterElements);
        let formStringA = makeElementString(a.elements);
        let formStringB = makeElementString(b.elements);
        if (elementStringA.length < elementStringB.length) return 1;
        if (elementStringA.length > elementStringB.length) return -1;

        if (elementStringA.length == elementStringB.length)
        {
            if (elementStringA == elementStringB)
            {
                if (formStringA.length < formStringB.length) return -1;
                if (formStringA.length > formStringB.length) return 1;
                if (formStringA.length == formStringB.length)
                {
                    if (formStringA < formStringB) return -1;
                    if (formStringA > formStringB) return 1;
                    return 0;
                }
            }

            let daA = a.elementString.replace("B", "A").replace("H", "B").replace("S", "D").replace("T", "E");
            let daB = b.elementString.replace("B", "A").replace("H", "B").replace("S", "D").replace("T", "E");
            if (daA < daB) return -1;
            if (daA > daB) return 1;
            return 0;
        }
    });
}
//endregion

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

        if (attributes.hasOwnProperty("age")) this.age = attributes.age;
        else this.age = 0;

        if (attributes.hasOwnProperty("height")) this.height = attributes.height;
        else this.height = 0;

        if (attributes.hasOwnProperty("heightIsApprox")) this.heightIsApprox = attributes.heightIsApprox;
        else this.heightIsApprox = false;

        if (attributes.hasOwnProperty("weight")) this.weight = Math.round(attributes.weight * 0.453592 * 100) / 100;
        else this.weight = 0;

        if (attributes.hasOwnProperty("weightIsApprox")) this.weightIsApprox = attributes.weightIsApprox;
        else this.weightIsApprox = false;

        this.elementString = makeElementString(elements);

        const basicImage = id + "-" + this.elementString;
        
        this.images.default = IMG + basicImage + ".png";
        this.images.emoji = IMG + "emoji/" + basicImage + ".png";

        this.forms = [];

        this.forms.push(new Form("Base", this.elements, [], this.images.default));

        this.loadForms = async function()
        {
            if (this.id == "ExpiFour")
            {
                let formChance = 0.2;
                for (const element of daAmeliorateElements)
                {
                    if (Math.random() < formChance)
                    {
                        this.forms.push(new Form(element.name, this.elements, [element], this.images.default));
                    }
                }
            }
            else
            {
                await fileExists(IMG + basicImage + "-B.png").then(exists =>
                {
                    if (exists)
                    {
                        this.forms.push(new Form("Bulb", this.elements, [bulbElement], IMG + basicImage + "-B.png"));
                        sortFormsByElements(this.forms);
                    }
                });
                await fileExists(IMG + basicImage + "-H.png").then(exists =>
                {
                    if (exists)
                    {
                        this.forms.push(new Form("Hostess", this.elements, [hostessElement], IMG + basicImage + "-H.png"));
                        sortFormsByElements(this.forms);
                    }
                });
                await fileExists(IMG + basicImage + "-HH.png").then(exists =>
                {
                    if (exists)
                    {
                        this.forms.push(new Form("High Hostess", this.elements, [hostessElement, hostessElement], IMG + basicImage + "-HH.png"));
                        sortFormsByElements(this.forms);
                    }
                });
                await fileExists(IMG + basicImage + "-C.png").then(exists =>
                {
                    if (exists)
                    {
                        this.forms.push(new Form("Clay", this.elements, [clayElement], IMG + basicImage + "-C.png"));
                        sortFormsByElements(this.forms);
                    }
                });
                await fileExists(IMG + basicImage + "-S.png").then(exists =>
                {
                    if (exists)
                    {
                        this.forms.push(new Form("Signal", this.elements, [signalElement], IMG + basicImage + "-S.png"));
                        sortFormsByElements(this.forms);
                    }
                });
                await fileExists(IMG + basicImage + "-T.png").then(exists =>
                {
                    if (exists)
                    {
                        this.forms.push(new Form("Trash", this.elements, [trashElement], IMG + basicImage + "-T.png"));
                        sortFormsByElements(this.forms);
                    }
                });
                await fileExists(IMG + basicImage + "-TT.png").then(exists =>
                {
                    if (exists)
                    {
                        this.forms.push(new Form("True Trash", this.elements, [trashElement, trashElement], IMG + basicImage + "-TT.png"));
                        sortFormsByElements(this.forms);
                    }
                });
                await fileExists(IMG + basicImage + "-BH.png").then(exists =>
                {
                    if (exists)
                    {
                        this.forms.push(new Form("Bulb Hostess", this.elements, [bulbElement, hostessElement], IMG + basicImage + "-BH.png"));
                        sortFormsByElements(this.forms);
                    }
                });
            }
            return;
        }
    }
}

// ages are NOT CANON and are approximates used to compare ameliorates to each other
// you know who you are
const daAmeliorates =
[
    new Ameliorate("Reese",         [bulbElement],   bulbElement,
                        {age: 8, height: 130, weight: 116}),
    new Ameliorate("Guira",         [hostessElement],   hostessElement,
                        {age: 16, height: 128, weight: 47}),
    new Ameliorate("Arpeggidough",  [clayElement],   clayElement,
                        {age: 14, height: Math.round(115 * (6/7)), weight: 134}),
    new Ameliorate("Meeka",         [signalElement],   signalElement,
                        {age: 15, height: 143, weight: 153}),
    new Ameliorate("Etikan",        [trashElement],   trashElement,
                        {age: 12, height: 139, weight: 178}),

    new Ameliorate("Tabi",          [bulbElement, hostessElement],    hostessElement,
                        {age: 34, height: 81, weight: 85}),
    new Ameliorate("Yaun",          [bulbElement, clayElement],    clayElement,
                        {age: 6, height: 147, weight: 183}),
    new Ameliorate("Esckickis",     [bulbElement, signalElement],    bulbElement,
                        {age: 20, height: 123, weight: 161}),
    new Ameliorate("nillaCorn",     [bulbElement, trashElement],    bulbElement,
                        {age: 17, height: 132, weight: 200}),
    new Ameliorate("Jugashley",     [hostessElement, clayElement],    clayElement,
                        {age: 25, height: 170, weight: 189}),
    new Ameliorate("Orgako",        [hostessElement, signalElement],    signalElement,
                        {age: 19, height: 113, weight: 97}),
    new Ameliorate("Alliumaid",     [hostessElement, trashElement],    hostessElement,
                        {age: 21, height: 136, weight: 4}),
    new Ameliorate("ExpiFour",      [clayElement, signalElement],    signalElement,
                        {age: 0, height: 139},    "Expi Four"), // yeah namkwal go ahead and share this one
    new Ameliorate("Octosquish",    [clayElement, trashElement],    trashElement,
                        {age: 21, height: 135, weight: 167}),
    new Ameliorate("TrashCymbal",   [signalElement, trashElement],    trashElement,
                        {age: 27, height: 152, weight: 189},    "Trash Cymbal"),

    new Ameliorate("Dormana",       [bulbElement, hostessElement, clayElement], hostessElement,
                        {age: 32, height: 198, weight: 258}),
    new Ameliorate("Nnoygon",       [bulbElement, hostessElement, signalElement], bulbElement,
                        {age: 35, height: 137, weight: 217}),
    new Ameliorate("Organe",        [bulbElement, hostessElement, trashElement], hostessElement,
                       {age: 39, height: 178, heightIsApprox: true, weight: 192, weightIsApprox: true},       "Organe"),
    new Ameliorate("Robby",         [bulbElement, clayElement, signalElement], signalElement,
                        {age: 29, height: 129, weight: 157}),
    new Ameliorate("Vack",          [bulbElement, clayElement, trashElement], trashElement,
                        {age: 46, height: 168, weight: 130}),
    new Ameliorate("Rallentando",   [bulbElement, signalElement, trashElement], bulbElement,
                        {age: 50, height: 143, weight: 233}),
    new Ameliorate("SemOhSeaga",    [hostessElement, clayElement, signalElement], signalElement,
                        {age: 27, height: 149, weight: 207},    "Sem oh Seaga"),
    new Ameliorate("Athenerd",      [hostessElement, clayElement, trashElement], clayElement,
                        {age: 26, height: 184, weight: 185}),
    new Ameliorate("KassBick",      [hostessElement, signalElement, trashElement], trashElement,
                        {age: 46, height: 114, weight: 177},    "Kass Bick"),
    new Ameliorate("Deltah",        [clayElement, signalElement, trashElement], clayElement,
                        {age: 25, height: 191, heightIsApprox: true, weight: 108}),

    new Ameliorate("Spotscast",     [bulbElement, hostessElement, clayElement, signalElement],   signalElement,
                        {age: 34, height: 203, weight: 135}),
    //new Ameliorate("Bushka",       [bulbElement, hostessElement, clayElement, trashElement],   hostessElement,
    //                    {age: 49, weight: 6}),
    new Ameliorate("Monkdom",       [bulbElement, hostessElement, signalElement, trashElement],   bulbElement,
                        {age: 56, height: 173, weight: 212}),
    new Ameliorate("ReFabric",      [bulbElement, clayElement, signalElement, trashElement],   trashElement,
                        {age: 37, height: 217, weight: 294}, "Re-Fabrić"),
    new Ameliorate("Trumpoff",      [hostessElement, clayElement, signalElement, trashElement],   clayElement,
                        {age: 54, height: 117, weight: 114}),
];

export async function getMonsterData(id)
{
    const csvResponse = await fetch("https://monstyrslayr.github.io/wiki/monsterData.csv");
	if (!csvResponse.ok)
	{
		throw new Error('Network response was not ok');
	}
	let csvText = await csvResponse.text();
	let results = await Papa.parse(csvText, { header: true });

    let monsterLine = results.data.find((line) => line.monster.toLowerCase() == id.toLowerCase());

    return monsterLine;
}

export function getAmeliorates()
{
    return daAmeliorates;
}

export function getAmeliorateById(id)
{
    return daAmeliorates.find(monster => monster.id.toLowerCase() == id.toLowerCase());
}

export function randomizeMonsterValues(monster)
{
    let minAge = 4
    let maxAge = 54
    let expiAge = Math.round((maxAge - minAge) * Math.random() + minAge);
    let minHeight = 110
    let maxHeight = 220
    let expiHeight = Math.round((maxHeight - minHeight) * Math.random() + minHeight);
    let minWeight = 40 * 0.453592
    let maxWeight = 250 * 0.453592
    let expiWeight = Math.round(((maxWeight - minWeight) * Math.random() + minWeight) * 100) / 100;

    monster.age = expiAge;
    monster.height = expiHeight;
    monster.weight = expiWeight;
}

randomizeMonsterValues(getAmeliorateById("ExpiFour"));

bulbElement.single = getAmeliorateById("Reese");
hostessElement.single = getAmeliorateById("Guira");
clayElement.single = getAmeliorateById("Arpeggidough");
signalElement.single = getAmeliorateById("Meeka");
trashElement.single = getAmeliorateById("Etikan");

bulbElement.quad = getAmeliorateById("Monkdom");
clayElement.quad = getAmeliorateById("Trumpoff");
signalElement.quad = getAmeliorateById("Spotscast");
trashElement.quad = getAmeliorateById("ReFabric");

export function makeAmeliorateDiv(monster, className = "box")
{
    const ameDiv = document.createElement("a");
    ameDiv.classList = [className + " ameliorateDiv"];
    ameDiv.style.backgroundColor = monster.affiliation.outside;
    ameDiv.id = monster.id;
    ameDiv.href = "https://monstyrslayr.github.io/wiki/monster/" + ameDiv.id.toLowerCase() + "/";
    // ameDiv.addEventListener("click", function()
    // {
    //     window.location.href = "https://monstyrslayr.github.io/wiki/monster/" + ameDiv.id.toLowerCase() + "/";
    // });

    const ameImg = document.createElement("img");
    ameImg.src = monster.images.emoji;
    ameImg.classList = ["monsterEmoji"];
    ameDiv.append(ameImg);
    if (monster.id == "ExpiFour")
    {
        const rotation = Math.floor(Math.random() * 4) * 90;
        ameImg.style.transform = "rotate(" + rotation + "deg)"
    }

    const daLabel = document.createElement("div");
    daLabel.classList = ["monsterLabel"];
    ameDiv.append(daLabel);

    const daElementList = document.createElement("div");
    daElementList.classList = ["miniElementList"];
    daLabel.append(daElementList);

    for (const element of monster.elements)
    {
        const daSigil = makeMiniElement(element);
        daElementList.append(daSigil);
    }

    const ameName = document.createElement("label");
    ameName.innerHTML = monster.realName;
    daLabel.append(ameName);

    return ameDiv;
}

export function makeFormDiv(monster, form, className = "box")
{
    const ameDiv = document.createElement("div");

    getMonsterData(monster.id).then((monsterData) =>
    {
        ameDiv.classList = [className + " ameliorateDiv formDiv"];
        ameDiv.style.backgroundColor = mixHexColors([...form.monsterElements.map(element => element.outside), ...form.elements.map(element => element.main)]);
        if (form.monsterElements.length > 0) ameDiv.style.borderColor = mixHexColors([...form.elements.map(element => element.highlight)]);

        const topDiv = document.createElement("div");
        ameDiv.appendChild(topDiv);

        const ameImg = document.createElement("img");
        ameImg.src = getShadowless(form.image);
        ameImg.classList = ["monsterForm"];
        topDiv.append(ameImg);

        const daLabelWrapper = document.createElement("div");
        daLabelWrapper.classList = ["monsterLabelWrapper"];
        topDiv.append(daLabelWrapper);

        const daLabel = document.createElement("div");
        daLabel.classList = ["monsterLabel"];
        daLabelWrapper.append(daLabel);

        const daElementList = document.createElement("div");
        daElementList.classList = ["miniElementList"];
        daLabel.append(daElementList);

        for (const element of form.monsterElements)
        {
            const daSigil = makeMiniElement(element);
            daElementList.append(daSigil);
        }

        const daFormElementList = document.createElement("div");
        daFormElementList.classList = ["miniElementList"];
        daLabel.append(daFormElementList);

        for (const element of form.elements)
        {
            const daSigil = makeMiniElement(element, true);
            daFormElementList.append(daSigil);
        }

        const ameName = document.createElement("label");
        ameName.innerHTML = form.name + " " + monster.realName;
        daLabelWrapper.append(ameName);

        const formString = makeElementString(form.elements);
        const bioString = monsterData[formString.toLowerCase()];
        if (bioString != null)
        {
            const bottomDiv = document.createElement("div");
            ameDiv.appendChild(bottomDiv);

            const daBio = document.createElement("p");
            daBio.textContent = bioString;
            bottomDiv.append(daBio);
        }
    });

    return ameDiv;
}

//#endregion

//#region islands
class Island
{
    constructor (name, monsterClass, elements, affiliation, youtubeId, monsters)
    {
        this.name = name;
        this.monsterClass = monsterClass;
        this.elements = elements;
        this.affiliation = affiliation;
        this.id = getCapitalLetters(name);
        this.monsters = monsters;
        this.youtubeId = youtubeId;
        this.quad = null;

        this.isATN = name.endsWith("All Together Now!");
    }
}

let signalStadium, clayKiln, trashSkylands, bulbiGardens, signalStadiumATN, clayKilnATN;
const daAmeliorateIslands =
[
    signalStadium = new Island("Signal Stadium", "Ameliorate", getAmeliorateById("Spotscast").elements, signalElement, "x03o46Deeyo",
        getAmeliorates().filter(monster => !monster.elements.includes(trashElement))),
    clayKiln = new Island("Clay Kiln", "Ameliorate", getAmeliorateById("Trumpoff").elements, clayElement, "OjgUosMViA4",
    getAmeliorates().filter(monster => !monster.elements.includes(bulbElement))),
    trashSkylands = new Island("Trash Skylands", "Ameliorate", getAmeliorateById("ReFabric").elements, trashElement, "lgbHc2OERr8",
    getAmeliorates().filter(monster => !monster.elements.includes(hostessElement))),
    bulbiGardens = new Island("Bulbi Gardens", "Ameliorate", getAmeliorateById("Monkdom").elements, bulbElement, "f5rtJqeIuYs",
    getAmeliorates().filter(monster => !monster.elements.includes(clayElement))),
    
    signalStadiumATN = new Island("Signal Stadium: All Together Now!", "Ameliorate", daAmeliorateElements, signalElement, "Ab6PF_njR44",
        getAmeliorates().filter(monster => !monster.elements.includes(trashElement) || monster.elements.includes(signalElement))),
    clayKilnATN = new Island("Clay Kiln: All Together Now!", "Ameliorate", daAmeliorateElements, clayElement, "4RTheyxr2hk",
        getAmeliorates().filter(monster => !monster.elements.includes(bulbElement) || monster.elements.includes(clayElement))),
];

signalStadium.quad = getAmeliorateById("Spotscast");
clayKiln.quad = getAmeliorateById("Trumpoff");
trashSkylands.quad = getAmeliorateById("ReFabric");
bulbiGardens.quad = getAmeliorateById("Monkdom");
signalStadiumATN.single = getAmeliorateById("Meeka");
signalStadiumATN.quad = getAmeliorateById("Spotscast");
clayKilnATN.single = getAmeliorateById("Arpeggidough");
clayKilnATN.quad = getAmeliorateById("Trumpoff");

let trashReveal, trashInterlude;
const daAmeliorateSongs =
[
    trashReveal = new Island("Trash Reveal", "Ameliorate", daAmeliorateElements, rubyElement, "w4HiDmp00Ms",
        [
            getAmeliorateById("Reese"),
            getAmeliorateById("Guira"),
            getAmeliorateById("Arpeggidough"),
            getAmeliorateById("Meeka"),
            getAmeliorateById("Etikan"),
            getAmeliorateById("Esckickis"),
            getAmeliorateById("nillaCorn"),
            getAmeliorateById("TrashCymbal"),
            getAmeliorateById("Organe")
        ]),
    trashInterlude = new Island("Trash Interlude", "Ameliorate", daAmeliorateElements, trashElement, "hY7ooDf9HGY",
        [
            getAmeliorateById("Guira"),
            getAmeliorateById("nillaCorn"),
            getAmeliorateById("Octosquish"),
            getAmeliorateById("TrashCymbal"),
            getAmeliorateById("Rallentando"),
            getAmeliorateById("Deltah"),
            getAmeliorateById("ReFabric"),
        ]),
]

trashReveal.notables =
[
    getAmeliorateById("Etikan")
]

trashInterlude.notables =
[
    getAmeliorateById("Guira"),
    getAmeliorateById("Deltah"),
    getAmeliorateById("ReFabric")
]

export function getIslands()
{
    return daAmeliorateIslands;
}

export function getIslandById(id)
{
    return daAmeliorateIslands.find(island => island.id.toLowerCase() == id.toLowerCase());
}

export function getSongs()
{
    return daAmeliorateSongs;
}

export function getSongById(id)
{
    return daAmeliorateSongs.find(island => island.id.toLowerCase() == id.toLowerCase());
}

export function makeIslandDiv(island, isSong = false)
{
    const islandDiv = document.createElement("a");
    islandDiv.classList = ["layer"];
    islandDiv.style.backgroundColor = island.affiliation.outside;
    islandDiv.id = island.id;
    islandDiv.href = "https://monstyrslayr.github.io/wiki/island/" + (isSong ? "song/" : "") + islandDiv.id.toLowerCase() + "/";
    // islandDiv.addEventListener("click", function()
    // {
    //     window.location.href = "https://monstyrslayr.github.io/wiki/island/" + islandDiv.id.toLowerCase() + "/";
    // });

    const islandName = document.createElement("label");
    islandName.innerHTML = island.name;
    islandDiv.append(islandName);

    return islandDiv;
}

export async function getIslandData(id)
{
    const csvResponse = await fetch("https://monstyrslayr.github.io/wiki/islandData.csv");
	if (!csvResponse.ok)
	{
		throw new Error('Network response was not ok');
	}
	let csvText = await csvResponse.text();
	let results = await Papa.parse(csvText, { header: true });

    let monsterLine = getFirstLetters(results.data.find((line) => line.island.toLowerCase())).toLowerCase() == id.toLowerCase();

    return monsterLine;
}
//#endregion