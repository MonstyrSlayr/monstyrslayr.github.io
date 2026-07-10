import { getClasses, getMonsters, getRarities, stringToIsland } from "../../monsters.js";

const monsters = await getMonsters();
const RARITY = getRarities();
const MCLASS = getClasses();

function sortDaMons(a, b)
{
    if (a.elements.size != b.elements.size)
    {
        return a.elements.size - b.elements.size;
    }
}

const plantIslandNaturals = monsters.filter((mon) => mon.class == MCLASS.NATURAL && mon.islands.has(stringToIsland("Plant"))).sort(sortDaMons);

const rowMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.RARE).reverse();
const colMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.COMMON);

const breedingTable = document.getElementById("breedingTable");

function areSetsEqual(setA, setB)
{
    return setA.size === setB.size && setA.isSubsetOf(setB);
}

function makeSquareImage(monster)
{
    const daImg = document.createElement("img");
    daImg.src = monster.square;
    daImg.alt = "...";
    return daImg;
}

function makeDoubleSquareImage(monster0, monster1)
{
    const daDiv = document.createElement("div");
    daDiv.classList.add("breedingDoubleSquare");

        const daImg = document.createElement("img");
        daImg.src = monster0.square;
        daImg.alt = "...";
        daDiv.appendChild(daImg);

        const daImg2 = document.createElement("img");
        daImg2.src = monster1.square;
        daImg2.alt = "...";
        daDiv.appendChild(daImg2);

    return daDiv;
}

for (let y = 0; y < rowMonsters.length; y++)
{
    const meyRow = document.createElement("div");
    meyRow.classList.add("breedingTableRow");
    meyRow.style.gridTemplateColumns = `repeat(${rowMonsters.length}, 1fr)`;
    breedingTable.appendChild(meyRow);

    for (let x = 0; x < colMonsters.length; x++)
    {
        const meySquare = document.createElement("div");
        meySquare.classList.add("breedingTableSquare");
        meyRow.appendChild(meySquare);
        
        if (x + y < colMonsters.length)
        {
            // fun breeding stuff
            const colMon = colMonsters[x];
            const rowMon = colMonsters.find((mon) => rowMonsters[y].elementString == mon.elementString);

            if (rowMon == colMon)
            {
                const rareRowMon = rowMonsters.find((mon) => areSetsEqual(rowMon.elements, mon.elements));
                const daSquare = makeDoubleSquareImage(rowMon, rareRowMon);
                meySquare.appendChild(daSquare);
            }
            else if (rowMon.elements.size != 1 || colMon.elements.size != 1)
            {
                const rareRowMon = rowMonsters.find((mon) => areSetsEqual(rowMon.elements, mon.elements));
                const daRowSquare = makeDoubleSquareImage(rowMon, rareRowMon);
                daRowSquare.classList.add("trivial");
                meySquare.appendChild(daRowSquare);

                const rareColMon = rowMonsters.find((mon) => areSetsEqual(colMon.elements, mon.elements));
                const daColSquare = makeDoubleSquareImage(colMon, rareColMon);
                daColSquare.classList.add("trivial");
                meySquare.appendChild(daColSquare);
            }

            const shareElements = !rowMon.elements.isDisjointFrom(colMon.elements);

            if (!shareElements)
            {
                meySquare.classList.add("uniqueElements");

                const mergedElements = new Set([...rowMon.elements, ...colMon.elements]);
                const bredMon0 = colMonsters.find((mon) => areSetsEqual(mon.elements, mergedElements));
                const bredMon1 = rowMonsters.find((mon) => areSetsEqual(mon.elements, mergedElements));
                const daSquare = makeDoubleSquareImage(bredMon0, bredMon1);
                meySquare.appendChild(daSquare);
            }
        }
    }
}

document.querySelectorAll(".breedingTableSquare").forEach(meySquare =>
{
    const images = meySquare.querySelectorAll(":scope > img, :scope > .breedingDoubleSquare");

    if (images.length === 0) return;

    const imageSize = 0.8;

    const step = images.length > 1
        ? (1 - imageSize) / (images.length - 1)
        : 0;

    const cascadeSize = imageSize + step * (images.length - 1);
    const start = (1 - cascadeSize) / 2;

    meySquare.style.setProperty("--image-size", `${imageSize * 100}%`);
    meySquare.style.setProperty("--offset", `${step * 100}%`);
    meySquare.style.setProperty("--start", `${start * 100}%`);

    images.forEach((img, i) =>
    {
        img.style.setProperty("--i", i);
        img.style.zIndex = i;
    });
});

document.querySelectorAll(".breedingDoubleSquare").forEach(meySquare =>
{
    const images = meySquare.querySelectorAll("img");

    if (images.length === 0) return;

    const imageSize = 0.8;

    const step = (1 - imageSize) / (images.length - 1);

    const cascadeSize = imageSize + step * (images.length - 1);
    const start = (1 - cascadeSize) / 2;

    meySquare.style.setProperty("--image-size-2", `${imageSize * 100}%`);
    meySquare.style.setProperty("--offset-2", `${step * 100}%`);
    meySquare.style.setProperty("--start-2", `${start * 100}%`);

    images.forEach((img, i) =>
    {
        img.style.setProperty("--i-2", i);
        img.style.setProperty("--j-2", images.length - i - 1);
        img.style.zIndex = images.length - i - 1;
    });
});
