import { getElements, getMonsters, getRarities, stringToIsland } from "../../monsters.js"

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
            backgroundColor: uniqueElementCounters.map(el => el.color),
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
