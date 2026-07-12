import { getClasses, getMonsters, getRarities, getElements, stringToElementSigil, stringToIsland } from "../monsters.js";

function sortDaMons(a, b)
{
    if (a.elements.size != b.elements.size)
    {
        return a.elements.size - b.elements.size;
    }
}

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

function makeHeaderBasedOnIsland(daIsland)
{
    const daHeader = document.createElement("div");
    daHeader.classList.add("tableHeader");

        const daHeading = document.createElement("h1");
        daHeading.textContent = daIsland.name + " Breeding Table";
        daHeader.appendChild(daHeading);

        const daIcon = document.createElement("img");
        daIcon.src = daIsland.symbol;
        daIcon.alt = "...";
        daHeader.appendChild(daIcon);

        const daCredit = document.createElement("h3");
        daCredit.textContent = "made by MonstyrSlayr";
        daHeader.appendChild(daCredit);
    
    return daHeader;
}

export async function makeNaturalTable(daIsland, daElements = new Set())
{
    const monsters = await getMonsters();
    const RARITY = getRarities();
    const MCLASS = getClasses();

    const invIntersec = new Set(getElements()).symmetricDifference(daElements);

    const plantIslandNaturals = monsters.filter((mon) => ![...mon.elements].some(ele => invIntersec.has(ele)) && mon.class != MCLASS.SEASONAL && mon.islands.has(daIsland)).sort(sortDaMons);

    const rowMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.RARE).reverse();
    const colMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.COMMON);

    const coolMonsters = monsters.filter((mon) => ((mon.rarity == RARITY.EPIC && mon.class == MCLASS.NATURAL)
                                                || !(mon.class == MCLASS.NATURAL))
                                                && mon.rarity != RARITY.RARE)
                                .filter((mon) => !(mon.rarity == RARITY.COMMON && (mon.class == MCLASS.NATURAL || mon.class == MCLASS.FIRE || mon.class == MCLASS.MAGICAL)))
                                .filter((mon) => mon.rarity != RARITY.MINOR)
                                .reverse();

    const breedingTable = document.getElementById("breedingTable");

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
            
            if (x + y > colMonsters.length - 2)
            {
                // fun breeding stuff
                const colMon = colMonsters[x];
                const rowMon = colMonsters.find((mon) => rowMonsters[y].elementString == mon.elementString);

                if (rowMon == colMon)
                {
                    const rareRowMon = rowMonsters.find((mon) => areSetsEqual(rowMon.elements, mon.elements));
                    const daSquare = makeDoubleSquareImage(rowMon, rareRowMon);
                    meySquare.appendChild(daSquare);

                    continue;
                }
                else if (
                        (rowMon.elements.size != 1 || colMon.elements.size != 1)
                        || (
                                (rowMon.class == MCLASS.FIRE || colMon.class == MCLASS.FIRE)
                                || (rowMon.class == MCLASS.MAGICAL || colMon.class == MCLASS.MAGICAL)
                            )
                    )
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

                if (rowMon.elements.size == 3 && colMon.elements.size == 3)
                {
                    // rare singles
                    const intersec = rowMon.elements.intersection(colMon.elements);
                    
                    for (const elem of [...intersec])
                    {
                        const rareMon = rowMonsters.find((mon) => mon.elements.size == 1 && mon.elements.has(elem));
                        const daSquare = makeSquareImage(rareMon);
                        meySquare.classList.add("rare");
                        meySquare.appendChild(daSquare);
                    }
                }

                const breedMonsters = coolMonsters.filter((mon) => [...mon.breedingCombos].some((combo) => combo.island == daIsland && combo.monsters.has(rowMon) && combo.monsters.has(colMon)));
                
                for (const mon of breedMonsters)
                {
                    if (mon.class == MCLASS.SEASONAL)
                    {
                        meySquare.classList.add("seasonal");
                    }
                    else if (mon.class == MCLASS.SHUGAFAM || mon.class == MCLASS.LEGENDARY)
                    {
                        meySquare.classList.add("legendary");
                    }
                    else if (mon.class == MCLASS.ETHEREAL || mon.class == MCLASS.PAIRONORMAL)
                    {
                        meySquare.classList.add("ethereal");
                    }
                    else if (mon.class == MCLASS.MYTHICAL)
                    {
                        meySquare.classList.add("mythical");
                    }
                    else if (mon.rarity == RARITY.EPIC)
                    {
                        meySquare.classList.add("epic");
                    }

                    const rareMon = monsters.find((m) => m.elementString == mon.elementString && (m.rarity == RARITY.RARE || m.rarity == RARITY.MINOR));
                    if ((mon.rarity == RARITY.COMMON || mon.rarity == RARITY.MAJOR) && rareMon != null)
                    {
                        const daSquare = makeDoubleSquareImage(mon, rareMon);
                        meySquare.appendChild(daSquare);
                    }
                    else
                    {
                        const daSquare = makeSquareImage(mon);
                        meySquare.appendChild(daSquare);
                    }
                }
            }
        }
    }

    standardizeTable();

    const daHeader = makeHeaderBasedOnIsland(daIsland);
    breedingTable.appendChild(daHeader);
}

export async function makePaironormalTable()
{
    const monsters = await getMonsters();
    const RARITY = getRarities();
    const MCLASS = getClasses();

    const daIsland = stringToIsland("Paironormal");
    const daElements = new Set([stringToElementSigil("Control"),
                                    stringToElementSigil("Hoax"),
                                    stringToElementSigil("Ruin"),
                                    stringToElementSigil("Depths")]);

    const invIntersec = new Set(getElements()).symmetricDifference(daElements);

    const plantIslandNaturals = monsters.filter((mon) => ![...mon.elements].some(ele => invIntersec.has(ele)) && mon.class != MCLASS.SEASONAL && mon.islands.has(daIsland)).sort(sortDaMons);

    const rowMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.MINOR).reverse();
    const colMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.MAJOR);

    const coolMonsters = monsters.filter((mon) => mon.class == MCLASS.PAIRONORMAL)
                                .reverse();

    const breedingTable = document.getElementById("breedingTable");

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
            
            if (x + y > colMonsters.length - 2)
            {
                // fun breeding stuff
                const colMon = colMonsters[x];
                const rowMon = colMonsters.find((mon) => rowMonsters[y].elementString == mon.elementString);

                if (rowMon == colMon)
                {
                    const rareRowMon = rowMonsters.find((mon) => areSetsEqual(rowMon.elements, mon.elements));
                    const daSquare = makeDoubleSquareImage(rowMon, rareRowMon);
                    meySquare.appendChild(daSquare);

                    continue;
                }
                else
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
                    const mergedElements = new Set([...rowMon.elements, ...colMon.elements]);
                    const bredMon0 = colMonsters.find((mon) => areSetsEqual(mon.elements, mergedElements));
                    if (bredMon0)
                    {
                        meySquare.classList.add("uniqueElements");

                        const bredMon1 = rowMonsters.find((mon) => areSetsEqual(mon.elements, mergedElements));
                        const daSquare = makeDoubleSquareImage(bredMon0, bredMon1);
                        meySquare.appendChild(daSquare);
                    }
                }
            }
        }
    }

    standardizeTable();

    const daHeader = makeHeaderBasedOnIsland(daIsland);
    breedingTable.appendChild(daHeader);
}

export async function makeEtherealIslandTable()
{
    const monsters = await getMonsters();
    const RARITY = getRarities();
    const MCLASS = getClasses();

    const daIsland = stringToIsland("Ethereal");

    const plantIslandNaturals = monsters.filter((mon) => mon.elements.size <= 2 && mon.class == MCLASS.ETHEREAL).sort(sortDaMons);

    const rowMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.RARE).reverse();
    const colMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.COMMON);

    const coolMonsters = monsters.filter((mon) => ((mon.rarity == RARITY.EPIC && mon.class == MCLASS.ETHEREAL)
                                                || !(mon.class == MCLASS.ETHEREAL))
                                                && mon.rarity != RARITY.RARE)
                                .filter((mon) => !(mon.rarity == RARITY.COMMON && (mon.class == MCLASS.ETHEREAL)))
                                .reverse();

    const breedingTable = document.getElementById("breedingTable");

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
            
            if (x + y > colMonsters.length - 2)
            {
                const colMon = colMonsters[x];
                const rowMon = colMonsters.find((mon) => rowMonsters[y].elementString == mon.elementString);

                if (rowMon == colMon)
                {
                    const rareRowMon = rowMonsters.find((mon) => areSetsEqual(rowMon.elements, mon.elements));
                    const daSquare = makeDoubleSquareImage(rowMon, rareRowMon);
                    meySquare.appendChild(daSquare);

                    continue;
                }
                else
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

                if (!shareElements && rowMon.elements.size == 1 && colMon.elements.size == 1)
                {
                    meySquare.classList.add("uniqueElements");

                    const mergedElements = new Set([...rowMon.elements, ...colMon.elements]);
                    const bredMon0 = colMonsters.find((mon) => areSetsEqual(mon.elements, mergedElements));
                    const bredMon1 = rowMonsters.find((mon) => areSetsEqual(mon.elements, mergedElements));
                    const daSquare = makeDoubleSquareImage(bredMon0, bredMon1);
                    meySquare.appendChild(daSquare);
                }

                const breedMonsters = coolMonsters.filter((mon) => [...mon.breedingCombos].some((combo) => combo.island == daIsland && combo.monsters.has(rowMon) && combo.monsters.has(colMon)));
                
                for (const mon of breedMonsters)
                {
                    if (mon.class == MCLASS.SEASONAL)
                    {
                        meySquare.classList.add("seasonal");
                    }
                    else if (mon.rarity == RARITY.EPIC)
                    {
                        meySquare.classList.add("epic");
                    }

                    const rareMon = monsters.find((m) => m.elementString == mon.elementString && (m.rarity == RARITY.RARE || m.rarity == RARITY.MINOR));
                    if ((mon.rarity == RARITY.COMMON || mon.rarity == RARITY.MAJOR) && rareMon != null)
                    {
                        const daSquare = makeDoubleSquareImage(mon, rareMon);
                        meySquare.appendChild(daSquare);
                    }
                    else
                    {
                        const daSquare = makeSquareImage(mon);
                        meySquare.appendChild(daSquare);
                    }
                }
            }
        }
    }

    standardizeTable();

    const daHeader = makeHeaderBasedOnIsland(daIsland);
    breedingTable.appendChild(daHeader);
}

export async function makeSeasonalShantyTable()
{
    const monsters = await getMonsters();
    const RARITY = getRarities();
    const MCLASS = getClasses();

    const daIsland = stringToIsland("Seasonal");

    const plantIslandNaturals = monsters.filter((mon) => mon.islands.has(daIsland)).sort(sortDaMons);

    const rowMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.RARE).reverse();
    const colMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.COMMON);

    const coolMonsters = monsters.filter((mon) => mon.class == MCLASS.SEASONAL && mon.rarity != RARITY.RARE)
                                .reverse();

    const breedingTable = document.getElementById("breedingTable");

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
            
            if (x + y > colMonsters.length - 2)
            {
                const colMon = colMonsters[x];
                const rowMon = colMonsters.find((mon) => rowMonsters[y].elementString == mon.elementString);

                if (rowMon == colMon)
                {
                    const rareRowMon = rowMonsters.find((mon) => areSetsEqual(rowMon.elements, mon.elements));
                    const daSquare = makeDoubleSquareImage(rowMon, rareRowMon);
                    meySquare.appendChild(daSquare);

                    continue;
                }
                else
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

                const breedMonsters = coolMonsters.filter((mon) => [...mon.breedingCombos].some((combo) => combo.island == daIsland && combo.monsters.has(rowMon) && combo.monsters.has(colMon)));
                
                for (const mon of breedMonsters)
                {
                    if (mon.rarity == RARITY.EPIC)
                    {
                        meySquare.classList.add("epic");
                    }
                    else
                    {
                        meySquare.classList.add("uniqueElements");
                    }

                    const rareMon = monsters.find((m) => m.elementString == mon.elementString && (m.rarity == RARITY.RARE || m.rarity == RARITY.MINOR));
                    if ((mon.rarity == RARITY.COMMON || mon.rarity == RARITY.MAJOR) && rareMon != null)
                    {
                        const daSquare = makeDoubleSquareImage(mon, rareMon);
                        meySquare.appendChild(daSquare);
                    }
                    else
                    {
                        const daSquare = makeSquareImage(mon);
                        meySquare.appendChild(daSquare);
                    }
                }
            }
        }
    }

    standardizeTable();

    const daHeader = makeHeaderBasedOnIsland(daIsland);
    breedingTable.appendChild(daHeader);
}

export async function makeShugabushIslandTable()
{
    const monsters = await getMonsters();
    const RARITY = getRarities();
    const MCLASS = getClasses();

    const daIsland = stringToIsland("Shugabush");

    const plantIslandNaturals = monsters.filter((mon) => mon.islands.has(daIsland) && mon.class == MCLASS.NATURAL).sort(sortDaMons);

    const rowMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.COMMON);
    const colMonster = monsters.find((mon) => mon.class == MCLASS.SHUGAFAM && mon.islands.has(stringToIsland("Plant")));

    const coolMonsters = monsters.filter((mon) => mon.islands.has(daIsland) && mon.rarity != RARITY.RARE)
                                .reverse();

    const breedingTable = document.getElementById("breedingTable");

    const meyRow = document.createElement("div");
    meyRow.classList.add("breedingTableRow");
    meyRow.style.gridTemplateColumns = `repeat(${rowMonsters.length + 1}, 1fr)`;
    breedingTable.appendChild(meyRow);

    const nullSquare = document.createElement("div");
    nullSquare.classList.add("breedingTableSquare");
    meyRow.appendChild(nullSquare);

    for (let y = 0; y < rowMonsters.length; y++)
    {
        const meySquare = document.createElement("div");
        meySquare.classList.add("breedingTableSquare");
        meyRow.appendChild(meySquare);

        const rowMon = rowMonsters[y];
        const rareRowMon = plantIslandNaturals.find((mon) => areSetsEqual(rowMon.elements, mon.elements) && mon.rarity == RARITY.RARE);
        const daRowSquare = makeDoubleSquareImage(rowMon, rareRowMon);
        meySquare.appendChild(daRowSquare);
    }

    const meyRowReal = document.createElement("div");
    meyRowReal.classList.add("breedingTableRow");
    meyRowReal.style.gridTemplateColumns = `repeat(${rowMonsters.length + 1}, 1fr)`;
    breedingTable.appendChild(meyRowReal);

    const shugaSquare = document.createElement("div");
    shugaSquare.classList.add("breedingTableSquare");
    meyRowReal.appendChild(shugaSquare);

        const shugaSquarma = makeSquareImage(colMonster);
        shugaSquare.appendChild(shugaSquarma);

    for (let y = 0; y < rowMonsters.length; y++)
    {
        const meySquare = document.createElement("div");
        meySquare.classList.add("breedingTableSquare");
        meyRowReal.appendChild(meySquare);

        const rowMon = rowMonsters[y];

        const rareRowMon = plantIslandNaturals.find((mon) => areSetsEqual(rowMon.elements, mon.elements));
        const daRowSquare = makeDoubleSquareImage(rowMon, rareRowMon);
        daRowSquare.classList.add("trivial");
        meySquare.appendChild(daRowSquare);

        const daColSquare = makeSquareImage(colMonster);
        daColSquare.classList.add("trivial");
        meySquare.appendChild(daColSquare);

        const breedMonsters = coolMonsters.filter((mon) => [...mon.breedingCombos].some((combo) => combo.island == daIsland && combo.monsters.has(rowMon) && combo.monsters.has(colMonster)));
        
        for (const mon of breedMonsters)
        {
            if (mon.class == MCLASS.SEASONAL)
            {
                meySquare.classList.add("seasonal");
            }
            else if (mon.rarity == RARITY.EPIC)
            {
                meySquare.classList.add("epic");
            }

            const rareMon = monsters.find((m) => m.elementString == mon.elementString && (m.rarity == RARITY.RARE || m.rarity == RARITY.MINOR));
            if ((mon.rarity == RARITY.COMMON || mon.rarity == RARITY.MAJOR) && rareMon != null)
            {
                const daSquare = makeDoubleSquareImage(mon, rareMon);
                meySquare.appendChild(daSquare);
            }
            else
            {
                const daSquare = makeSquareImage(mon);
                meySquare.appendChild(daSquare);
            }
        }
    }

    standardizeTable();

    const daHeader = makeHeaderBasedOnIsland(daIsland);
    breedingTable.appendChild(daHeader);
}

export async function makeMythicalIslandTable()
{
    const monsters = await getMonsters();
    const RARITY = getRarities();
    const MCLASS = getClasses();

    const daIsland = stringToIsland("Mythical");

    const plantIslandNaturals = monsters.filter((mon) => mon.islands.has(daIsland) && mon.class == MCLASS.MYTHICAL).sort(sortDaMons);

    const rowMonsters = plantIslandNaturals.filter((mon) => mon.rarity == RARITY.COMMON);
    const colMonster = monsters.find((mon) => mon.class == MCLASS.DREAMYTHICAL && mon.elements.size == 1);

    const coolMonsters = monsters.filter((mon) => mon.islands.has(daIsland) && mon.rarity != RARITY.RARE)
                                .reverse();

    const breedingTable = document.getElementById("breedingTable");

    const meyRow = document.createElement("div");
    meyRow.classList.add("breedingTableRow");
    meyRow.style.gridTemplateColumns = `repeat(${rowMonsters.length + 1}, 1fr)`;
    breedingTable.appendChild(meyRow);

    const nullSquare = document.createElement("div");
    nullSquare.classList.add("breedingTableSquare");
    meyRow.appendChild(nullSquare);

    for (let y = 0; y < rowMonsters.length; y++)
    {
        const meySquare = document.createElement("div");
        meySquare.classList.add("breedingTableSquare");
        meyRow.appendChild(meySquare);

        const rowMon = rowMonsters[y];
        const rareRowMon = plantIslandNaturals.find((mon) => mon.elementString == rowMon.elementString && mon.rarity == RARITY.RARE);
        const daRowSquare = makeDoubleSquareImage(rowMon, rareRowMon);
        meySquare.appendChild(daRowSquare);
    }

    const meyRowReal = document.createElement("div");
    meyRowReal.classList.add("breedingTableRow");
    meyRowReal.style.gridTemplateColumns = `repeat(${rowMonsters.length + 1}, 1fr)`;
    breedingTable.appendChild(meyRowReal);

    const shugaSquare = document.createElement("div");
    shugaSquare.classList.add("breedingTableSquare");
    meyRowReal.appendChild(shugaSquare);

        const rareShuga = monsters.find((mon) => mon.elementString == colMonster.elementString && mon.rarity == RARITY.RARE);
        const shugaSquarma = makeDoubleSquareImage(colMonster, rareShuga);
        shugaSquare.appendChild(shugaSquarma);

    for (let y = 0; y < rowMonsters.length; y++)
    {
        const meySquare = document.createElement("div");
        meySquare.classList.add("breedingTableSquare");
        meyRowReal.appendChild(meySquare);

        const rowMon = rowMonsters[y];

        const rareRowMon = plantIslandNaturals.find((mon) => areSetsEqual(rowMon.elements, mon.elements));
        const daRowSquare = makeDoubleSquareImage(rowMon, rareRowMon);
        daRowSquare.classList.add("trivial");
        meySquare.appendChild(daRowSquare);

        const daColSquare = makeDoubleSquareImage(colMonster, rareShuga);
        daColSquare.classList.add("trivial");
        meySquare.appendChild(daColSquare);

        const breedMonsters = coolMonsters.filter((mon) => [...mon.breedingCombos].some((combo) => combo.island == daIsland && combo.monsters.has(rowMon) && combo.monsters.has(colMonster)));
        
        for (const mon of breedMonsters)
        {
            if (mon.class == MCLASS.SEASONAL)
            {
                meySquare.classList.add("seasonal");
            }
            else if (mon.rarity == RARITY.EPIC)
            {
                meySquare.classList.add("epic");
            }

            const rareMon = monsters.find((m) => m.elementString == mon.elementString && (m.rarity == RARITY.RARE || m.rarity == RARITY.MINOR));
            if ((mon.rarity == RARITY.COMMON || mon.rarity == RARITY.MAJOR) && rareMon != null)
            {
                const daSquare = makeDoubleSquareImage(mon, rareMon);
                meySquare.appendChild(daSquare);
            }
            else
            {
                const daSquare = makeSquareImage(mon);
                meySquare.appendChild(daSquare);
            }
        }
    }

    standardizeTable();

    const daHeader = makeHeaderBasedOnIsland(daIsland);
    breedingTable.appendChild(daHeader);
}

function standardizeTable()
{
    document.querySelectorAll(".breedingTableSquare").forEach(meySquare =>
    {
        const images = meySquare.querySelectorAll(":scope > img, :scope > .breedingDoubleSquare");

        if (images.length === 0) return;

        let i = 0;
        let nonTrivialImages = 0;
        let nonTrivialGap = 5;

        images.forEach((img, j) =>
        {
            img.style.setProperty("--i", i);
            img.style.zIndex = j;
            
            if (img.classList.contains("trivial"))
            {
                i += 1;
            }
            else
            {
                i += nonTrivialGap;
                nonTrivialImages++;
            }
        });
        
        if (!images[images.length - 1].classList.contains("trivial"))
        {
            i -= nonTrivialGap - 1;
        }

        let imageSize = 0.8;
        if (nonTrivialImages > 1)
        {
            imageSize = 0.6;
        }
        if (nonTrivialImages > 2)
        {
            imageSize = 0.5;
        }
        if (nonTrivialImages > 3)
        {
            imageSize = 0.4;
        }

        const step = i > 1
            ? (1 - imageSize) / (i - 1)
            : 0;
        const cascadeSize = imageSize + step * (i - 1);
        const start = (1 - cascadeSize) / 2;

        meySquare.style.setProperty("--image-size", `${imageSize * 100}%`);
        meySquare.style.setProperty("--offset", `${step * 100}%`);
        meySquare.style.setProperty("--start", `${start * 100}%`);
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
}