import { getCookie, setCookie, deleteCookie } from "https://monstyrslayr.github.io/wiki/cookies.js";

function isLiveServer()
{
    return location.hostname === "127.0.0.1" || location.hostname === "localhost";
}

export const debug = isLiveServer();

if (debug) console.log("debug mode");

export const home = debug ? "http://127.0.0.1:5500/wiki/" : "https://monstyrslayr.github.io/wiki/";
export const IMG = home + "img/";

export const daCharTDiv = document.createElement("div");
daCharTDiv.classList.add("characterT");
document.body.appendChild(daCharTDiv);

export const daCharT = document.createElement("img");
daCharT.classList.add("centeredT");
daCharTDiv.appendChild(daCharT);

export const daSigilTDiv = document.createElement("div");
daSigilTDiv.classList.add("sigilT");
document.body.appendChild(daSigilTDiv);

export const daSigilT = document.createElement("img");
daSigilT.classList.add("centeredT");
daSigilTDiv.appendChild(daSigilT);

const transitionTime = 400;

export function transitionToSite(href, charT, charTColor, sigilT, sigilTColor)
{
    daCharT.src = charT;
    daCharTDiv.style.backgroundColor = charTColor;
    daSigilT.src = sigilT;
    daSigilTDiv.style.backgroundColor = sigilTColor;
    setCookie("transitionCharacter", charT, 1);
    setCookie("transitionCharacterBackground", charTColor, 1);
    setCookie("transitionSigil", sigilT, 1);
    setCookie("transitionSigilBackground", sigilTColor, 1);

    document.body.classList.add("transitionActive");

    setTimeout(() =>
    {
        window.location.href = href;

        // prevent blocking out the user if they press the back button
        setTimeout(() =>
        {
            document.body.classList.remove("transitionActive");
        }, 2000);
    }, transitionTime);
}

export function transitionToSiteRandom(href)
{
    const curAmeliorates = getAmeliorates();
	const dominantMonster = curAmeliorates[Math.floor(Math.random() * curAmeliorates.length)];

	const curElements = getElements();
	const dominantElement = curElements[Math.floor(Math.random() * curElements.length)];

    daCharT.src = dominantMonster.images.shadowless;
    daCharTDiv.style.backgroundColor = dominantMonster.dominantColor;
    daSigilT.src = dominantElement.sigil;
    daSigilTDiv.style.backgroundColor = dominantElement.highlight;
    setCookie("transitionCharacter", dominantMonster.images.shadowless, 1);
    setCookie("transitionCharacterBackground", dominantMonster.dominantColor, 1);
    setCookie("transitionSigil", dominantElement.sigil, 1);
    setCookie("transitionSigilBackground", dominantElement.highlight, 1);

    document.body.classList.add("transitionActive");

    setTimeout(() =>
    {
        window.location.href = href;

        // prevent blocking out the user if they press the back button
        setTimeout(() =>
        {
            document.body.classList.remove("transitionActive");
        }, 2000);
    }, transitionTime);
}

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

export function rgbFuncToHex(rgb)
{
    const values = rgb.substring(4, rgb.length - 1).split(',').map(Number);
    const r = values[0];
    const g = values[1];
    const b = values[2];
  
    const componentToHex = (c) =>
    {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
  
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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

export function blendHexColors(hexA, hexB, percentage)
{
    const toRgb = hex => (
    {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    });
  
    const toHex = rgb => '#' + [rgb.r, rgb.g, rgb.b]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
  
    const rgbA = toRgb(hexA);
    const rgbB = toRgb(hexB);
  
    const blendedRgb =
    {
        r: Math.round(rgbA.r * (1 - percentage) + rgbB.r * percentage),
        g: Math.round(rgbA.g * (1 - percentage) + rgbB.g * percentage),
        b: Math.round(rgbA.b * (1 - percentage) + rgbB.b * percentage)
    };
  
    return toHex(blendedRgb);
}

export const backgroundBlend = 0.05;

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

export function makeMiniElement(element, isActive = false, isClickable = true)
{
    const daSigil = document.createElement("img");
    daSigil.src = element.sigil;
    if (isActive) daSigil.src = element.active;
    daSigil.id = element.name;
    daSigil.classList = ["miniElement"];

    if (isClickable)
    {
        const aTag = document.createElement("a");
        aTag.appendChild(daSigil);
        aTag.href = home + "element/" + daSigil.id.toLowerCase() + "/";

        aTag.addEventListener("click", function (e)
        {
            e.preventDefault();

            const curAmeliorates = getAmeliorates().filter(monster => monster.elements.includes(element));
            const dominantMonster = curAmeliorates[Math.floor(Math.random() * curAmeliorates.length)];

            transitionToSite(this.href, dominantMonster.images.shadowless, dominantMonster.dominantColor, element.sigil, element.highlight);
        });

        return aTag;
    }
    return daSigil;
}

export function makeElementDiv(element)
{
    const elementDiv = document.createElement("a");
    elementDiv.classList = ["layer"];
    elementDiv.style.backgroundColor = element.outside;
    elementDiv.id = element.id;
    elementDiv.href = home + "element/" + elementDiv.id.toLowerCase() + "/";

    const elementImage = makeMiniElement(element, false, false);
    elementDiv.appendChild(elementImage);

    const elementName = document.createElement("label");
    elementName.innerHTML = element.name;
    elementDiv.appendChild(elementName);

    elementDiv.addEventListener("click", function (e)
    {
        e.preventDefault();

        const curAmeliorates = getAmeliorates().filter(monster => monster.elements.includes(element));
        const dominantMonster = curAmeliorates[Math.floor(Math.random() * curAmeliorates.length)];

        transitionToSite(this.href, dominantMonster.images.shadowless, dominantMonster.dominantColor, element.sigil, element.highlight);
    });

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
    const csvResponse = await fetch(home + "elementData.csv");
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
    constructor (id, elements, affiliation, dominantColor, attributes, realName, behavior = {})
    {
        super();

        this.id = id;
        this.elements = elements;
        this.affiliation = affiliation;
        this.dominantColor = dominantColor;

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
        this.images.shadowless = IMG + basicImage + "-Shadowless.png";
        this.images.emoji = IMG + "emoji/" + basicImage + ".png";

        // preload images for page transitions
        new Image().src = this.images.default; //TODO: delete this when every monster is animated
        new Image().src = this.images.shadowless;

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
                return;
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

        this.behavior = behavior;
    }
}

// ages are NOT CANON and are approximates used to compare ameliorates to each other
// you know who you are
const daAmeliorates =
[
    new Ameliorate("Reese",         [bulbElement],   bulbElement, "#ffbb32",
                        {age: 8, height: 130, weight: 116}, "Reese",
                            {
                                intro: "ReeseIntro",
                                idle: "ReeseIdle",
                                idling0: "ReeseIdling0",
                                scrollDown: "ReeseScrollDown",
                                scrolled: "ReeseScrolled",
                                scrollUp: "ReeseScrollUp",
                                click: "ReeseClick",
                            }),
    new Ameliorate("Guira",         [hostessElement],   hostessElement, "#ff75ba",
                        {age: 16, height: 128, weight: 47}),
    new Ameliorate("Arpeggidough",  [clayElement],   clayElement, "#de1c1c",
                        {age: 14, height: Math.round(115 * (6/7)), weight: 134}),
    new Ameliorate("Meeka",         [signalElement],   signalElement, "#34a14c",
                        {age: 15, height: 143, weight: 153}),
    new Ameliorate("Etikan",        [trashElement],   trashElement, "#4b4b42",
                        {age: 12, height: 139, weight: 178}),

    new Ameliorate("Tabi",          [bulbElement, hostessElement],    hostessElement, "#a65457",
                        {age: 34, height: 81, weight: 85}),
    new Ameliorate("Yaun",          [bulbElement, clayElement],    clayElement, "#495ed5",
                        {age: 6, height: 147, weight: 183}),
    new Ameliorate("Esckickis",     [bulbElement, signalElement],    bulbElement, "#addb2c",
                        {age: 20, height: 123, weight: 161}),
    new Ameliorate("nillaCorn",     [bulbElement, trashElement],    bulbElement, "#903eb4",
                        {age: 17, height: 132, weight: 200}),
    new Ameliorate("Jugashley",     [hostessElement, clayElement],    clayElement, "#e69184",
                        {age: 25, height: 170, weight: 189}),
    new Ameliorate("Orgako",        [hostessElement, signalElement],    signalElement, "#2a2660",
                        {age: 19, height: 113, weight: 97}),
    new Ameliorate("Alliumaid",     [hostessElement, trashElement],    hostessElement, "#b5f8eb",
                        {age: 21, height: 136, weight: 4}),
    new Ameliorate("ExpiFour",      [clayElement, signalElement],    signalElement, "#84f1a1",
                        {age: 0, height: 139},    "Expi Four"),
    new Ameliorate("Octosquish",    [clayElement, trashElement],    trashElement, "#51cac1",
                        {age: 21, height: 135, weight: 167}),
    new Ameliorate("TrashCymbal",   [signalElement, trashElement],    trashElement, "#624c9a",
                        {age: 27, height: 152, weight: 189},    "Trash Cymbal"),

    new Ameliorate("Dormana",       [bulbElement, hostessElement, clayElement], hostessElement, "#102c34",
                        {age: 32, height: 198, weight: 258}),
    new Ameliorate("Nnoygon",       [bulbElement, hostessElement, signalElement], bulbElement, "#7094e8",
                        {age: 35, height: 137, weight: 217}),
    new Ameliorate("Organe",        [bulbElement, hostessElement, trashElement], hostessElement, "#6bf198",
                       {age: 39, height: 178, heightIsApprox: true, weight: 192, weightIsApprox: true},       "Organe"),
    new Ameliorate("Robby",         [bulbElement, clayElement, signalElement], signalElement, "#766a65",
                        {age: 29, height: 129, weight: 157}),
    new Ameliorate("Vack",          [bulbElement, clayElement, trashElement], trashElement, "#ee324f",
                        {age: 46, height: 168, weight: 130}),
    new Ameliorate("Rallentando",   [bulbElement, signalElement, trashElement], bulbElement, "#3ce54a",
                        {age: 50, height: 143, weight: 233}),
    new Ameliorate("SemOhSeaga",    [hostessElement, clayElement, signalElement], signalElement, "#eeee3a",
                        {age: 27, height: 149, weight: 207},    "Sem oh Seaga"),
    new Ameliorate("Athenerd",      [hostessElement, clayElement, trashElement], clayElement, "#f2e877",
                        {age: 26, height: 184, weight: 185}),
    new Ameliorate("KassBick",      [hostessElement, signalElement, trashElement], trashElement, "#006a36",
                        {age: 46, height: 114, weight: 177},    "Kass Bick"),
    new Ameliorate("Deltah",        [clayElement, signalElement, trashElement], clayElement, "#3ca33c",
                        {age: 25, height: 191, heightIsApprox: true, weight: 108}, "Deltah",
                            {
                                intro: "DeltahIntro",
                                idle: "DeltahIdle",
                                sleepStart: "DeltahSleepStart",
                                sleep: "DeltahSleep",
                                click: "DeltahClick",
                                idling0: "DeltahIdling0"
                            }),

    new Ameliorate("Spotscast",     [bulbElement, hostessElement, clayElement, signalElement],   signalElement, "#ea62ea",
                        {age: 34, height: 203, weight: 135}),
    // new Ameliorate("Bushka",       [bulbElement, hostessElement, clayElement, trashElement],   hostessElement, "#dee",
    //                    {age: 49, weight: 6}),
    new Ameliorate("Monkdom",       [bulbElement, hostessElement, signalElement, trashElement],   bulbElement, "#ea9436",
                        {age: 56, height: 173, weight: 212}),
    new Ameliorate("ReFabric",      [bulbElement, clayElement, signalElement, trashElement],   trashElement, "#8f8e80",
                        {age: 37, height: 217, weight: 294}, "Re-Fabrić"),
    new Ameliorate("Trumpoff",      [hostessElement, clayElement, signalElement, trashElement],   clayElement, "#8d5935",
                        {age: 54, height: 117, weight: 114}),
];

export async function getMonsterData(id)
{
    const csvResponse = await fetch(home + "monsterData.csv");
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
// terrible !!!!!!!!!!
clayElement.quad = getAmeliorateById("Trumpoff");
signalElement.quad = getAmeliorateById("Spotscast");
trashElement.quad = getAmeliorateById("ReFabric");

export function makeAmeliorateDiv(monster, className = "box")
{
    const ameDiv = document.createElement("a");
    ameDiv.classList = [className + " ameliorateDiv"];
    ameDiv.style.backgroundColor = monster.affiliation.outside;
    ameDiv.id = monster.id;
    ameDiv.href = home + "monster/" + ameDiv.id.toLowerCase() + "/";

    const ameImg = document.createElement("img");
    ameImg.src = monster.images.emoji;
    ameImg.classList = ["monsterEmoji"];
    ameDiv.appendChild(ameImg);
    if (monster.id == "ExpiFour")
    {
        const rotation = Math.floor(Math.random() * 4) * 90;
        ameImg.style.transform = "rotate(" + rotation + "deg)"
    }

    const daLabel = document.createElement("div");
    daLabel.classList = ["monsterLabel"];
    ameDiv.appendChild(daLabel);

    const daElementList = document.createElement("div");
    daElementList.classList = ["miniElementList"];
    daLabel.appendChild(daElementList);

    for (const element of monster.elements)
    {
        const daSigil = makeMiniElement(element, false, false);
        daElementList.appendChild(daSigil);
    }

    const ameName = document.createElement("label");
    ameName.innerHTML = monster.realName;
    daLabel.appendChild(ameName);

    ameDiv.addEventListener("click", function (e)
    {
        e.preventDefault();

        const dominantElement = monster.elements[Math.floor(Math.random() * monster.elements.length)];

        transitionToSite(this.href, monster.images.shadowless, monster.dominantColor, dominantElement.sigil, dominantElement.highlight);
    });

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
        topDiv.appendChild(ameImg);

        const daLabelWrapper = document.createElement("div");
        daLabelWrapper.classList = ["monsterLabelWrapper"];
        topDiv.appendChild(daLabelWrapper);

        const daLabel = document.createElement("div");
        daLabel.classList = ["miniElementListList"];
        daLabelWrapper.appendChild(daLabel);

        const daElementList = document.createElement("div");
        daElementList.classList = ["miniElementList"];
        daLabel.appendChild(daElementList);

        for (const element of form.monsterElements)
        {
            const daSigil = makeMiniElement(element, false, false);
            daElementList.appendChild(daSigil);
        }

        if (form.elements.length > 0)
        {
            const daFormElementList = document.createElement("div");
            daFormElementList.classList = ["miniElementList"];
            daLabel.appendChild(daFormElementList);

            for (const element of form.elements)
            {
                const daSigil = makeMiniElement(element, true, false);
                daFormElementList.appendChild(daSigil);
            }
        }

        const ameName = document.createElement("label");
        ameName.innerHTML = form.name + " " + monster.realName;
        daLabelWrapper.appendChild(ameName);

        const formString = makeElementString(form.elements);
        const bioString = monsterData[formString.toLowerCase()];
        if (bioString != null)
        {
            const bottomDiv = document.createElement("div");
            ameDiv.appendChild(bottomDiv);

            const daBio = document.createElement("p");
            daBio.textContent = bioString;
            bottomDiv.appendChild(daBio);
        }
    });

    return ameDiv;
}

//#endregion

//#region islands
class Island
{
    constructor (name, monsterClass, elements, affiliation, youtubeId, monsters, transitionElement, realId = "")
    {
        this.name = name;
        this.monsterClass = monsterClass;
        this.elements = elements;
        this.affiliation = affiliation;
        if (realId == "") this.id = getCapitalLetters(name);
        else this.id = realId;
        this.monsters = monsters;
        this.youtubeId = youtubeId;
        this.quad = null;

        if (transitionElement == undefined) transitionElement = affiliation;
        this.transitionElement = transitionElement;

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
    bulbiGardens = new Island("Bulbi Gardens", "Ameliorate", getAmeliorateById("Monkdom").elements, bulbElement, "-YCwm-fdJ9s",
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

let trashReveal, trashInterlude, dotBushka;
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
        ], trashElement),
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
    dotBushka = new Island(".bushka", "Ameliorate", daAmeliorateElements, hostessElement, "Ubw1X95sXVc",
        [
            getAmeliorateById("Guira"),
            getAmeliorateById("Arpeggidough"),
            getAmeliorateById("Jugashley"),
            getAmeliorateById("Esckickis"),
            getAmeliorateById("Orgako"),
            getAmeliorateById("Octosquish"),
            getAmeliorateById("Dormana"),
            getAmeliorateById("Organe"),
            getAmeliorateById("Robby"),
            getAmeliorateById("Rallentando"),
            getAmeliorateById("SemOhSeaga"),
            getAmeliorateById("KassBick"),
            getAmeliorateById("Deltah")
        ], hostessElement, "dotb")
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

dotBushka.notables =
[
    getAmeliorateById("Dormana")
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
    islandDiv.href = home + "island/" + (isSong ? "song/" : "") + islandDiv.id.toLowerCase() + "/";

    const islandName = document.createElement("label");
    islandName.innerHTML = island.name;
    islandDiv.appendChild(islandName);

    islandDiv.addEventListener("click", function (e)
    {
        e.preventDefault();

        const dominantMonster = island.monsters[Math.floor(Math.random() * island.monsters.length)];

        transitionToSite(this.href, dominantMonster.images.shadowless, dominantMonster.dominantColor, island.transitionElement.sigil, island.transitionElement.highlight);
    });

    return islandDiv;
}

export async function getIslandData(id)
{
    const csvResponse = await fetch(home + "islandData.csv");
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

if (getCookie("transitionCharacter") && getCookie("transitionSigil"))
{
    document.body.classList.add("transitionActive");

    daCharT.src = getCookie("transitionCharacter");
    daCharTDiv.style.backgroundColor = getCookie("transitionCharacterBackground");
    daSigilT.src = getCookie("transitionSigil");
    daSigilTDiv.style.backgroundColor = getCookie("transitionSigilBackground");

    deleteCookie("transitionCharacter");
    deleteCookie("transitionSigil");
    deleteCookie("transitionCharacterBackground");
    deleteCookie("transitionSigilBackground");

    window.addEventListener("pageScriptRun", () =>
    {
        setTimeout(() =>
        {
            document.body.classList.add("transitionFinal");

            setTimeout(() =>
            {
                document.body.classList.remove("transitionActive");
                document.body.classList.remove("transitionFinal");
            }, transitionTime);
        }, transitionTime);
    });
}
else
{
    const curAmeliorates = getAmeliorates();
    const dominantMonster = curAmeliorates[Math.floor(Math.random() * curAmeliorates.length)];

    const curElements = getElements();
    const dominantElement = curElements[Math.floor(Math.random() * curElements.length)];

    daCharT.src = dominantMonster.images.shadowless;
    daCharTDiv.style.backgroundColor = dominantMonster.dominantColor;
    daSigilT.src = dominantElement.sigil;
    daSigilTDiv.style.backgroundColor = dominantElement.highlight;

    document.body.classList.add("transitionActive");
    
    window.addEventListener("pageScriptRun", () =>
    {
        setTimeout(() =>
        {
            document.body.classList.add("transitionFinal");

            setTimeout(() =>
            {
                document.body.classList.remove("transitionActive");
                document.body.classList.remove("transitionFinal");
            }, transitionTime);
        }, transitionTime);
    });
}
