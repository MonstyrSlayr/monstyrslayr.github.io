import { getClasses, getElements, getMonsters, getRarities, Monster, stringToElementSigil, stringToIsland } from "../../monsters.js"

const daOptions = {
    scales: {
        x: {
            ticks: {
                callback: ((value, index, values) => {
                    return "";
                })
            }
        },
        y: {
            beginAtZero: true
        }
    }
}

const xScaleImage = {
    id: "xScaleImage",
    afterDatasetDraw(chart, args, plugins)
    {
        const { ctx, data, chartArea: {bottom}, scales: {x} } = chart;
        const width = 40;
        const padding = 4;

        const imgCanvas = data.datasets[0].imgCanvas;
        const imgCtx = imgCanvas.getContext("2d");
        imgCanvas.width = ctx.canvas.width;
        imgCanvas.height = width + padding * 2;

        data.datasets[0].images.forEach((image, index) =>
        {
            const label = new Image();
            label.src = image;
            imgCtx.drawImage(label, (x.getPixelForValue(index) * 0.926) - (width / 2), padding, width, width)
        });

        ctx.save();
        imgCtx.save();
    }
}

Chart.defaults.backgroundColor = '#ffffff';
Chart.defaults.borderColor = '#ffffff';
Chart.defaults.color = '#ffffff';

const RARITY = getRarities();
const MCLASS = getClasses();
const daMonsters = await getMonsters();
const elements = getElements();

class ElementCounter
{
    elementSigil;
    count = 0;

    constructor(elementSigil)
    {
        this.elementSigil = elementSigil;
        this.count = 0;
    }

    countElements(monsters)
    {
        this.count = 0;

        for (const monster of monsters)
        {
            if (monster.elements.has(this.elementSigil))
            {
                this.count++;
            }
        }

        return this.count;
    }
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

const uniqueMonsters = daMonsters.filter(monster => monster.rarity != RARITY.MINOR
                                                    && monster.rarity != RARITY.RARE
                                                    && monster.rarity != RARITY.EPIC
                                                    && monster.rarity != RARITY.CHILD)
                                    // only plant island epic wubbox
                                    .filter(monster => !(monster.elementString == "f" && monster.rarity == RARITY.EPIC) || (monster.elementString == "f" && monster.rarity == RARITY.EPIC && monster.islands.has(stringToIsland("Plant")) && monster.islands.size == 1));

const uniqueElementCounters = [];
for (const elementSigil of elements)
{
    const ec = new ElementCounter(elementSigil);
    ec.countElements(uniqueMonsters);
    uniqueElementCounters.push(ec);
}

new Chart(document.getElementById("uniqueChart"), {
    type: 'bar',
    data: {
        labels: uniqueElementCounters.map(el => el.elementSigil.name),
        datasets: [{
            label: "Number of Monsters",
            data: uniqueElementCounters.map(el => el.count),
            borderWidth: 1,
            imgCanvas: document.getElementById("uniqueChartImg"),
            images: uniqueElementCounters.map(el => el.elementSigil.sigil),
            backgroundColor: uniqueElementCounters.map(el => el.elementSigil.color),
        }]
    },
    options: daOptions,
    plugins: [xScaleImage]
});

const currentMonsters = daMonsters
                                    // only plant island epic wubbox
                                    .filter(monster => !(monster.elementString == "f" && monster.rarity == RARITY.EPIC) || (monster.elementString == "f" && monster.rarity == RARITY.EPIC && monster.islands.has(stringToIsland("Plant")) && monster.islands.size == 1));

const currentElementCounters = [];
for (const elementSigil of elements)
{
    const ec = new ElementCounter(elementSigil);
    ec.countElements(currentMonsters);
    currentElementCounters.push(ec);
}

new Chart(document.getElementById("currentChart"), {
    type: 'bar',
    data: {
        labels: currentElementCounters.map(el => el.elementSigil.name),
        datasets: [{
            label: "Number of Monsters",
            data: currentElementCounters.map(el => el.count),
            borderWidth: 1,
            imgCanvas: document.getElementById("currentChartImg"),
            images: currentElementCounters.map(el => el.elementSigil.sigil),
            backgroundColor: currentElementCounters.map(el => el.elementSigil.color),
        }]
    },
    options: daOptions,
    plugins: [xScaleImage]
});

const areSetsEqual = (setA, setB) =>
{
    if (setA.size !== setB.size)
    {
        return false;
    }

    // Check if every value in setA is present in setB
    for (const value of setA)
    {
        if (!setB.has(value))
        {
            return false;
        }
    }

    return true;
};

let projectedMonsters = daMonsters
                                    // only plant island epic wubbox
                                    .filter(monster => !(monster.elementString == "f" && monster.rarity == RARITY.EPIC) || (monster.elementString == "f" && monster.rarity == RARITY.EPIC && monster.islands.has(stringToIsland("Plant")) && monster.islands.size == 1));

// elder celestials
for (const daMon of projectedMonsters.filter(mon => mon.rarity == RARITY.CHILD))
{
    const elder = new Monster();
    elder.class == MCLASS.CELESTIAL;
    elder.rarity = "Elder";
    elder.elements = daMon.elements;
    projectedMonsters.push(elder);
}

// primordials
const waterPri = new Monster();
waterPri.class = MCLASS.PRIMORDIAL;
waterPri.rarity = RARITY.COMMON;
waterPri.elements = new Set();
waterPri.elements.add(stringToElementSigil("Primordial Water"));
waterPri.elementString = "04";
projectedMonsters.push(waterPri);

const earthPri = new Monster();
earthPri.class = MCLASS.PRIMORDIAL;
earthPri.rarity = RARITY.COMMON;
earthPri.elements = new Set();
earthPri.elements.add(stringToElementSigil("Primordial Earth"));
earthPri.elementString = "05";
projectedMonsters.push(earthPri);

// titansouls
const faerieTit = new Monster();
faerieTit.class = MCLASS.TITANSOUL;
faerieTit.rarity = RARITY.COMMON;
faerieTit.elements = new Set();
faerieTit.elements.add(stringToElementSigil("Titansoul"));
faerieTit.elementString = "03";
projectedMonsters.push(faerieTit);

const boneTit = new Monster();
boneTit.class = MCLASS.TITANSOUL;
boneTit.rarity = RARITY.COMMON;
boneTit.elements = new Set();
boneTit.elements.add(stringToElementSigil("Titansoul"));
boneTit.elementString = "04";
projectedMonsters.push(boneTit);

// paironormals
for (let i = 1; i < 17; i++)
{
    const isControl = (i & 1) !== 0;
    const isHoax = (i & 2) !== 0;
    const isRuin = (i & 4) !== 0;
    const isDepths = (i & 8) !== 0;

    const newMon = new Monster();
    newMon.elements = new Set();
    if (isControl) newMon.elements.add(stringToElementSigil("Control"));
    if (isHoax) newMon.elements.add(stringToElementSigil("Hoax"));
    if (isRuin) newMon.elements.add(stringToElementSigil("Ruin"));
    if (isDepths) newMon.elements.add(stringToElementSigil("Depths"));

    if (projectedMonsters.some((mon) => areSetsEqual(newMon.elements, mon.elements))) continue;

    newMon.rarity = RARITY.MAJOR;
    projectedMonsters.push(newMon);

    const newMon2 = new Monster();
    newMon2.elements = newMon.elements;
    newMon.rarity = RARITY.MINOR;
    projectedMonsters.push(newMon2);
}

// remaining rares
for (const daMon of projectedMonsters.filter(mon => mon.rarity == RARITY.COMMON && (mon.class == MCLASS.ETHEREAL || mon.class == MCLASS.PRIMORDIAL)))
{
    if (projectedMonsters.some((mon) => mon.rarity == RARITY.RARE && mon.elementString == daMon.elementString)) continue;

    const newMon = new Monster();
    newMon.class == daMon.class;
    newMon.rarity = RARITY.RARE;
    newMon.elements = daMon.elements;
    newMon.elementString = daMon.elementString;
    projectedMonsters.push(newMon);
}

// remaining epics
for (const daMon of projectedMonsters.filter(mon => mon.rarity == RARITY.COMMON && (mon.class == MCLASS.ETHEREAL || mon.class == MCLASS.PRIMORDIAL|| mon.class == MCLASS.NATURAL || mon.class == MCLASS.FIRE || mon.class == MCLASS.MAGICAL || mon.class == MCLASS.SUPERNATURAL || mon.class == MCLASS.MYTHICAL || mon.class == MCLASS.DREAMYTHICAL)))
{
    if (projectedMonsters.some((mon) => mon.rarity == RARITY.EPIC && mon.elementString == daMon.elementString)) continue;

    const newMon = new Monster();
    newMon.class == daMon.class;
    newMon.rarity = RARITY.EPIC;
    newMon.elements = daMon.elements;
    newMon.elementString = daMon.elementString;
    projectedMonsters.push(newMon);
}

const projectedElementCounters = [];
for (const elementSigil of elements)
{
    const ec = new ElementCounter(elementSigil);
    ec.countElements(projectedMonsters);
    projectedElementCounters.push(ec);
}

new Chart(document.getElementById("projectedChart"), {
    type: 'bar',
    data: {
        labels: projectedElementCounters.map(el => el.elementSigil.name),
        datasets: [{
            label: "Number of Monsters",
            data: projectedElementCounters.map(el => el.count),
            borderWidth: 1,
            imgCanvas: document.getElementById("projectedChartImg"),
            images: projectedElementCounters.map(el => el.elementSigil.sigil),
            backgroundColor: projectedElementCounters.map(el => el.elementSigil.color),
        }]
    },
    options: daOptions,
    plugins: [xScaleImage]
});
