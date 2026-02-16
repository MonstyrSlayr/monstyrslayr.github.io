import { getElements, getMonsters, getRarities, stringToIsland } from "../../monsters.js"

const daOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
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
        count = 0;
    }

    countElements(monsters)
    {
        count = 0;

        for (const monster of monsters)
        {
            if (monster.elements.has(elementSigil))
            {
                count++;
            }
        }

        return count;
    }
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
            label: "Unique",
            data: uniqueElementCounters.map(el => el.count),
            borderWidth: 1
        }]
    },
    options: daOptions,
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
