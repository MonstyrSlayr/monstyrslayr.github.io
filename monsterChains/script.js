import { getRarities, getClasses, getMonsters } from "https://monstyrslayr.github.io/msmTools/monsters.js";

const RARITY = getRarities();
const MCLASS = getClasses();
const allowedRarities = [RARITY.COMMON, RARITY.ADULT, RARITY.MAJOR];
const monsters = await getMonsters();

const commonMonsters = monsters
                        .filter((monster) => allowedRarities.includes(monster.rarity))
                        .map(monster => ({ ...monster })); // make deep copy to prevent name shenanigans

for (const monster of commonMonsters)
{
    monster.name = monster.name.replace(/\b(Adult|Major)\b/gi, "").trim().replace(/\s+/g, " ");
}

let islands = new Set();
for (const monster of monsters)
{
    if (monster.islands)
    {
        islands = islands.union(monster.islands);
    }
}

let includeDipsters = true;
document.getElementById("dipsterCheck").checked = true;
document.getElementById("dipsterDiv").classList.add("checked");

document.getElementById("dipsterDiv").addEventListener("click", function()
{
    const checkbox = document.getElementById("dipsterCheck");
    
    checkbox.click();
    includeDipsters = checkbox.checked;

    if (checkbox.checked)
    {
        this.classList.add("checked");
    }
    else
    {
        this.classList.remove("checked");
    }

    monsterGraph = makeGraph(commonMonsters, excludedIslands);
    renderPathChain(findShortestPath(selectedA, selectedB, monsterGraph));
});

function makeGraph(allMonsters, disabledIslands = new Set())
{
    const graph = new Map(); // map<object|string, set<object|string>>

    for (const monster of allMonsters)
    {
        if (!includeDipsters && monster.class == MCLASS.DIPSTER) continue;

        if (!graph.has(monster)) graph.set(monster, new Set());

        for (const island of monster.islands)
        {
            if (disabledIslands.has(island)) continue;

            if (!graph.has(island)) graph.set(island, new Set());

            graph.get(monster).add(island);
            graph.get(island).add(monster);
        }
    }

    return graph;
}

let monsterGraph = makeGraph(commonMonsters);

function findShortestPath(monsterA, monsterB, graph)
{
    if (monsterA == null) return null;
    if (monsterB == null) return null;

    const queue = [[monsterA]];
    const visited = new Set([monsterA]);

    while (queue.length > 0)
    {
        const path = queue.shift();
        const current = path[path.length - 1];

        if (current === monsterB)
        {
            return path;
        }

        for (const neighbor of graph.get(current) || [])
        {
            if (!visited.has(neighbor))
            {
                visited.add(neighbor);
                queue.push([...path, neighbor]);
            }
        }
    }

    return null;
}

function renderPathChain(path)
{
    const container = document.getElementById("pathChain");
    container.innerHTML = ""; // Clear previous contents

    if (path == null)
    {
        container.innerHTML = "No chain found.";
        return;
    }

    for (let i = 0; i < path.length; i++)
    {
        const node = path[i];
        const step = document.createElement("div");
        step.className = "chainStep";

        const img = document.createElement("img");
        const label = document.createElement("div");

        if (typeof node === "string")
        {
            // It's an island
            img.src = `https://monstyrslayr.github.io/msmTools/img/island/${node}.png`;
            label.textContent = node;
        }
        else if (typeof node === "object" && node.portrait)
        {
            // It's a monster
            img.src = node.portrait;
            label.textContent = node.name;
        }

        step.appendChild(img);
        step.appendChild(label);
        container.appendChild(step);

        // Add arrow after every step except the last
        if (i < path.length - 1)
        {
            const arrow = document.createElement("div");
            arrow.className = "arrow";
            arrow.textContent = "→";
            container.appendChild(arrow);
        }
    }
}

let selectedA = null;
let selectedB = null;

let excludedIslands = new Set();
const fuckYou = ["Shadow Islet", "Crystal Islet", "Poison Islet"]
const islandConditionalDiv = document.getElementById("islandConditionalDiv")

for (const island of islands)
{
    const lilDiv = document.createElement("div");
    lilDiv.className = "checkboxDiv";
    lilDiv.id = island + "Div";
    islandConditionalDiv.append(lilDiv);

    const imageLabel = document.createElement("label");
    lilDiv.append(imageLabel);

    const daImg = document.createElement("img");
    daImg.src = "https://monstyrslayr.github.io/msmTools/img/island/" + island + ".png";
    daImg.classList.add("checkboxImage");
    imageLabel.append(daImg);

    const checkbox = document.createElement("input");
    checkbox.id = island + "Checkbox";
    checkbox.classList.add("checkbox");
    checkbox.name = island;
    checkbox.type = "checkbox";
    if (!fuckYou.includes(island))
    {
        checkbox.checked = true;
    }
    lilDiv.append(checkbox);

    lilDiv.addEventListener("click", function()
    {
        checkbox.click();

        if (checkbox.checked)
        {
            lilDiv.classList.add("checked");
            excludedIslands.delete(island);
        }
        else
        {
            lilDiv.classList.remove("checked");
            excludedIslands.add(island);
        }

        monsterGraph = makeGraph(commonMonsters, excludedIslands);
        renderPathChain(findShortestPath(selectedA, selectedB, monsterGraph));
    })

    if (checkbox.checked)
    {
        lilDiv.classList.add("checked");
        excludedIslands.delete(island);
    }
    else
    {
        lilDiv.classList.remove("checked");
        excludedIslands.add(island);
    }

    const label = document.createElement("label");
    label.textContent = "Include " + island;
    lilDiv.append(label);
}

monsterGraph = makeGraph(commonMonsters, excludedIslands);

function pathToString(path)
{
    return path
        .map(node =>
        {
            if (typeof node === "string") return `(${node})`; // Island
            if (typeof node === "object" && node.name) return node.name; // Monster
            return String(node); // Fallback
        })
        .join(" -> ");
}

function normalizeAndTrim(str)
{
    return str
        .normalize("NFD")                  // decompose accented characters
        .replace(/[\u0300-\u036f]/g, "")   // remove diacritical marks
        .replace(/[^a-z0-9]/gi, "")        // remove non alphanumeric characters
        .toLowerCase();                    // take a wild guess
}

function setupAutocomplete(inputId, listId, allMonsters, onSelect)
{
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);

    let currentMatches = [];

    input.addEventListener("input", () =>
    {
        const query = normalizeAndTrim(input.value);
        list.innerHTML = "";

        if (!query) return;

        let foundMonster = false;

        currentMatches = allMonsters.filter(m => normalizeAndTrim(m.name).includes(query));

        for (const monster of currentMatches)
        {
            const item = document.createElement("div");
            item.className = "autocompleteItem";

            const img = document.createElement("img");
            img.src = monster.square;
            img.alt = monster.name;

            const text = document.createElement("span");
            text.textContent = monster.name;

            item.appendChild(img);
            item.appendChild(text);

            item.addEventListener("click", () =>
            {
                input.value = monster.name;
                list.innerHTML = "";
                onSelect(monster);
            });

            list.appendChild(item);

            if (query == normalizeAndTrim(monster.name))
            {
                onSelect(monster);
                foundMonster = true;
            }
        }

        if (!foundMonster)
        {
            onSelect(null);
        }
    });

    input.addEventListener("keydown", (e) =>
    {
        if (e.key === "Enter" && currentMatches.length > 0)
        {
            e.preventDefault(); // Prevent form submission if inside a form
            // Simulate click on first match
            const firstItem = list.querySelector(".autocompleteItem");
            if (firstItem) firstItem.click();
        }
    });

    document.addEventListener("click", (e) =>
    {
        if (!list.contains(e.target) && e.target !== input)
        {
            list.innerHTML = "";
        }
    });
}

function setSelectedA(monster)
{
    selectedA = monster;
    if (monster) document.querySelector("#monsterPortraitA").src = monster.portrait;
    else document.querySelector("#monsterPortraitA").src = "";
    renderPathChain(findShortestPath(selectedA, selectedB, monsterGraph));
}

function setSelectedB(monster)
{
    selectedB = monster;
    if (monster) document.querySelector("#monsterPortraitB").src = monster.portrait;
    else document.querySelector("#monsterPortraitB").src = "";
    renderPathChain(findShortestPath(selectedA, selectedB, monsterGraph));
}

const noCelestials = commonMonsters.filter(monster => monster.class != MCLASS.CELESTIAL);
const noCeDipsters = noCelestials.filter(monster => monster.class != MCLASS.DIPSTER);

setupAutocomplete("monsterA", "autocompleteA", commonMonsters, m => setSelectedA(m));
setupAutocomplete("monsterB", "autocompleteB", commonMonsters, m => setSelectedB(m));

setSelectedA(noCelestials[Math.floor(Math.random() * noCelestials.length)]);
setSelectedB(noCelestials[Math.floor(Math.random() * noCelestials.length)]);

document.getElementById("randomizeButton").addEventListener("click", function()
{
    document.getElementById("autocompleteA").value = "";
    document.getElementById("autocompleteB").value = "";
    if (includeDipsters)
    {
        setSelectedA(noCelestials[Math.floor(Math.random() * noCelestials.length)]);
        setSelectedB(noCelestials[Math.floor(Math.random() * noCelestials.length)]);
    }
    else
    {
        setSelectedA(noCeDipsters[Math.floor(Math.random() * noCeDipsters.length)]);
        setSelectedB(noCeDipsters[Math.floor(Math.random() * noCeDipsters.length)]);
    }
})

// longest chain is 5 btw
