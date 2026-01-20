import { getMonsters, stringToIsland } from "../../monsters.js"

async function loadImage(url)
{
    return new Promise((resolve, reject) =>
    {
        const img = new Image();
        img.crossOrigin = "anonymous"; // allow external images
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

function getSaturationFromPixel(r, g, b)
{
    r /= 255; g /= 255; b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const l = (max + min) / 2;
    const d = max - min;

    if (d === 0) return 0;

    return d / (1 - Math.abs(2 * l - 1)); // returns S in range [0,1]
}

async function getAverageSaturation(imageUrl)
{
    const img = await loadImage(imageUrl);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let total = 0;
    let count = 0;

    for (let i = 0; i < data.length; i += 4)
    {
        const s = getSaturationFromPixel(data[i], data[i+1], data[i+2]);
        total += s;
        count++;
    }

    return total / count;  // 0–1
}

async function getMaxSaturation(imageUrl)
{
    const img = await loadImage(imageUrl);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let maxSat = 0;

    for (let i = 0; i < data.length; i += 4)
    {
        const s = getSaturationFromPixel(data[i], data[i+1], data[i+2]);
        if (s > maxSat) maxSat = s;
    }

    return maxSat; // 0–1
}

const allMonsters = await getMonsters();

const monsters = allMonsters.filter(monster => monster.islands.has(stringToIsland("Cold")));
for (const monster of monsters)
{
    monster.avgSat = null;
    monster.maxSat = null;

    getAverageSaturation(monster.portrait)
    .then(avg =>
    {
        monster.avgSat = avg;
        console.log("got average saturation for " + monster.name);
    });

    getMaxSaturation(monster.portrait)
    .then(max =>
    {
        monster.maxSat = max;
        console.log("got max saturation for " + monster.name);
    });
}

const waitForIt = setInterval(() =>
{
    let allIsFine = true;
    for (const monster of monsters)
    {
        if (monster.avgSat == null || monster.maxSat == null)
        {
            console.error("saturations for " + monster.name + " not ready yet");
            allIsFine = false;
            break;
        }
    }

    if (allIsFine)
    {
        clearInterval(waitForIt);
        console.log("all is fine :)");

        const avgSatDiv = document.getElementById("avgSat");
        const maxSatDiv = document.getElementById("maxSat");

        const avgMons = [...monsters].sort((a, b) => b.avgSat - a.avgSat);
        const maxMons = [...monsters].sort((a, b) => b.maxSat - a.maxSat);

        for (const monster of avgMons)
        {
            const monsterDiv = document.createElement("div");
            avgSatDiv.appendChild(monsterDiv);
                
                const monsterName = document.createElement("h3");
                monsterName.textContent = monster.name;
                monsterDiv.appendChild(monsterName);

                const monsterPortrait = document.createElement("img");
                monsterPortrait.src = monster.portrait;
                monsterDiv.appendChild(monsterPortrait);

                const monsterSaturation = document.createElement("p");
                monsterSaturation.textContent = (monster.avgSat * 100) + "%";
                monsterDiv.appendChild(monsterSaturation);
        }

        for (const monster of maxMons)
        {
            const monsterDiv = document.createElement("div");
            maxSatDiv.appendChild(monsterDiv);
                
                const monsterName = document.createElement("h3");
                monsterName.textContent = monster.name;
                monsterDiv.appendChild(monsterName);

                const monsterPortrait = document.createElement("img");
                monsterPortrait.src = monster.portrait;
                monsterDiv.appendChild(monsterPortrait);

                const monsterSaturation = document.createElement("p");
                monsterSaturation.textContent = (monster.maxSat * 100) + "%";
                monsterDiv.appendChild(monsterSaturation);
        }
    }
}, 5000);
