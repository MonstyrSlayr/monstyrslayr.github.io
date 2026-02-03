import { getMonsters, getRarities, stringToIsland } from "../../monsters.js"

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
const yearSet = new Set();

// filter out minor paironormals and non-plant epic wubboxes
const allMonsters = daMonsters.filter(monster => monster.rarity != RARITY.MINOR).filter(monster => !(monster.elementString == "f" && monster.rarity == RARITY.EPIC) || (monster.elementString == "f" && monster.rarity == RARITY.EPIC && monster.islands.has(stringToIsland("Plant")) && monster.islands.size == 1));

for (const monster of allMonsters)
{
    yearSet.add(monster.releaseYear);
}
const years = [...yearSet].sort((a, b) => a - b);

function countWords(str)
{
    const matches = str.match(/\b\w+\b/g);
    return matches ? matches.length : 0;
}

const wordCount = [...allMonsters].sort((a, b) =>
{
    return countWords(b.bio) - countWords(a.bio);
});

const wordCountDiv = document.getElementById("wordCount");

const totalWordCounts = [...years];
for (let i = 0; i < totalWordCounts.length; i++)
{
    totalWordCounts[i] = [];
}

for (const monster of wordCount)
{
    const monsterDiv = document.createElement("div");
    wordCountDiv.appendChild(monsterDiv);
        
        const monsterName = document.createElement("h3");
        monsterName.textContent = monster.name.replace("Major ", "").replace(" (Plant)", "");
        monsterDiv.appendChild(monsterName);

        const monsterPortrait = document.createElement("img");
        monsterPortrait.src = monster.square;
        monsterDiv.appendChild(monsterPortrait);

        const monsterSaturation = document.createElement("p");
        monsterSaturation.textContent = countWords(monster.bio);
        monsterDiv.appendChild(monsterSaturation);

        totalWordCounts[years.findIndex(val => val == monster.releaseYear)].push(countWords(monster.bio));
}

const avgWordCounts = [...totalWordCounts];
for (let i = 0; i < avgWordCounts.length; i++)
{
    let total = 0;
    for (const val of totalWordCounts[i])
    {
        total += parseInt(val);
    }
    avgWordCounts[i] = total/totalWordCounts[i].length;
}

new Chart(document.getElementById("wordCountChart"), {
    type: 'bar',
    data: {
        labels: years,
        datasets: [{
            label: "Average Word Count",
            data: avgWordCounts,
            borderWidth: 1
        }]
    },
    options: daOptions,
});

const chrCount = [...allMonsters].sort((a, b) =>
{
    return b.bio.length - a.bio.length;
});

const chrCountDiv = document.getElementById("chrCount");

const totalChrCounts = [...years];
for (let i = 0; i < totalChrCounts.length; i++)
{
    totalChrCounts[i] = [];
}

for (const monster of chrCount)
{
    const monsterDiv = document.createElement("div");
    chrCountDiv.appendChild(monsterDiv);
        
        const monsterName = document.createElement("h3");
        monsterName.textContent = monster.name.replace("Major ", "").replace(" (Plant)", "");;
        monsterDiv.appendChild(monsterName);

        const monsterPortrait = document.createElement("img");
        monsterPortrait.src = monster.square;
        monsterDiv.appendChild(monsterPortrait);

        const monsterSaturation = document.createElement("p");
        monsterSaturation.textContent = monster.bio.length;
        monsterDiv.appendChild(monsterSaturation);

        totalChrCounts[years.findIndex(val => val == monster.releaseYear)].push(monster.bio.length);
}

const avgChrCounts = [...totalChrCounts];
for (let i = 0; i < avgChrCounts.length; i++)
{
    let total = 0;
    for (const val of totalChrCounts[i])
    {
        total += parseInt(val);
    }
    avgChrCounts[i] = total/totalChrCounts[i].length;
}

new Chart(document.getElementById("chrCountChart"), {
    type: 'bar',
    data: {
        labels: years,
        datasets: [{
            label: "Average Character Count",
            data: avgChrCounts,
            borderWidth: 1
        }]
    },
    options: daOptions,
});
