import { monsters, decryptFromURL, gaugeSudokuDifficulty, getConditionalById } from "../script.js";

function getLastFolder(url, num)
{
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split('/').filter(part => part !== '').filter(part => part !== 'index.html'); // Split and remove empty elements and index.html
    return parts[parts.length - num]; // Return the last part
}

const featuredSudoku = getLastFolder(window.location.href, 1);

const labelRows =
[
    document.getElementById("clr0"),
    document.getElementById("clr1"),
    document.getElementById("clr2")
];

const labelCols =
[
    document.getElementById("clc0"),
    document.getElementById("clc1"),
    document.getElementById("clc2")
];

const monsterInputs =
[
    document.getElementById("monster00"), document.getElementById("monster01"), document.getElementById("monster02"),
    document.getElementById("monster10"), document.getElementById("monster11"), document.getElementById("monster12"),
    document.getElementById("monster20"), document.getElementById("monster21"), document.getElementById("monster22"),
];

const monsterImages =
[
    document.getElementById("monsterImg00"), document.getElementById("monsterImg01"), document.getElementById("monsterImg02"),
    document.getElementById("monsterImg10"), document.getElementById("monsterImg11"), document.getElementById("monsterImg12"),
    document.getElementById("monsterImg20"), document.getElementById("monsterImg21"), document.getElementById("monsterImg22"),
];

const monsterAutocompletes =
[
    document.getElementById("autocomplete00"), document.getElementById("autocomplete01"), document.getElementById("autocomplete02"),
    document.getElementById("autocomplete10"), document.getElementById("autocomplete11"), document.getElementById("autocomplete12"),
    document.getElementById("autocomplete20"), document.getElementById("autocomplete21"), document.getElementById("autocomplete22"),
];

const sudokuGameSquares =
[
    document.getElementById("square00"), document.getElementById("square01"), document.getElementById("square02"),
    document.getElementById("square10"), document.getElementById("square11"), document.getElementById("square12"),
    document.getElementById("square20"), document.getElementById("square21"), document.getElementById("square22"),
];

// s = solution

const slabelRows =
[
    document.getElementById("sclr0"),
    document.getElementById("sclr1"),
    document.getElementById("sclr2")
];

const slabelCols =
[
    document.getElementById("sclc0"),
    document.getElementById("sclc1"),
    document.getElementById("sclc2")
];

const smonsterInputs =
[
    document.getElementById("smonster00"), document.getElementById("smonster01"), document.getElementById("smonster02"),
    document.getElementById("smonster10"), document.getElementById("smonster11"), document.getElementById("smonster12"),
    document.getElementById("smonster20"), document.getElementById("smonster21"), document.getElementById("smonster22"),
];

const smonsterImages =
[
    document.getElementById("smonsterImg00"), document.getElementById("smonsterImg01"), document.getElementById("smonsterImg02"),
    document.getElementById("smonsterImg10"), document.getElementById("smonsterImg11"), document.getElementById("smonsterImg12"),
    document.getElementById("smonsterImg20"), document.getElementById("smonsterImg21"), document.getElementById("smonsterImg22"),
];

const tooltip = document.getElementById("tooltip");
let tooltipTimeout;

function addTooltip(daElement, tipFunction)
{
    daElement.addEventListener("mouseover", () =>
    {
        tooltipTimeout = setTimeout(() =>
        {
            tooltip.style.display = "block";
            const rect = daElement.getBoundingClientRect();
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.top = `${rect.bottom + 5 + window.scrollY}px`;
            tooltip.textContent = tipFunction();
        }, 1000);
    });

    daElement.addEventListener("mouseout", () =>
    {
        clearTimeout(tooltipTimeout);
        tooltip.style.display = "none";
    });
}

const sudokuName = document.getElementById("sudokuName");
const sudokuAuthor = document.getElementById("sudokuAuthor");
const sudokuFriendCode = document.getElementById("sudokuFriendCode");
const sudokuImg = document.getElementById("sudokuImg");

const json = await decryptFromURL(`../../data/${featuredSudoku}.sud`);

sudokuName.textContent = json.metadata.name;
sudokuAuthor.textContent = "Author: " + json.metadata.author;
sudokuFriendCode.textContent = "Friend Code: " + (json.metadata.friendCode == "" ? "None provided" : json.metadata.friendCode);
sudokuImg.src = json.metadata.img;

for (let i = 0; i < json.conditionalRows.length; i++)
{
    const condit = json.conditionalRows[i];
    const daLabel = labelRows[i];
    let conditRef = getConditionalById(condit.id);

    daLabel.conditional = conditRef;
    daLabel.isInverse = condit.inverse;
    daLabel.innerHTML = daLabel.isInverse ? conditRef.inverseLabel : conditRef.label;
    addTooltip(daLabel, function() { return conditRef.description; });
}

for (let i = 0; i < json.conditionalCols.length; i++)
{
    const condit = json.conditionalCols[i];
    const daLabel = labelCols[i];
    let conditRef = getConditionalById(condit.id);

    daLabel.conditional = conditRef;
    daLabel.isInverse = condit.inverse;
    daLabel.innerHTML = daLabel.isInverse ? conditRef.inverseLabel : conditRef.label;
    addTooltip(daLabel, function() { return conditRef.description; });
}

const difficulty = gaugeSudokuDifficulty(monsters, labelRows.map((drop) => drop.conditional), labelRows.map((check) => check.isInverse),
                                                                    labelCols.map((drop) => drop.conditional), labelCols.map((check) => check.isInverse));
difficultyNumber.textContent = difficulty;

for (const sudokuDiv of document.getElementsByClassName("sudoku"))
{
    sudokuDiv.style.backgroundColor = json.metadata.color;
    sudokuDiv.style.borderColor = json.metadata.color;
}

for (let i = 0; i < sudokuGameSquares.length; i++)
{
    const daInput = monsterInputs[i];
    const daSquare = sudokuGameSquares[i];

    daSquare.addEventListener("click", function()
    {
        daInput.focus();
    });
}

function validateMonsters()
{
    let isValid = true;
    for (let i = 0; i < monsterInputs.length; i++)
    {
        const daInput = monsterInputs[i];
        const daSquare = sudokuGameSquares[i];
        const labelRow = labelRows[Math.floor(i/3)];
        const labelCol = labelCols[i % 3];

        const maybeMonsters = monsters.filter(m => normalizeAndTrim(m.name) == normalizeAndTrim(daInput.value));

        if (maybeMonsters.length > 0)
        {
            const daMonster = maybeMonsters[0];

            if (((!labelRow.isInverse && labelRow.conditional.condition(daMonster)) || (labelRow.isInverse && !labelRow.conditional.condition(daMonster)))
             && ((!labelCol.isInverse && labelCol.conditional.condition(daMonster)) || (labelCol.isInverse && !labelCol.conditional.condition(daMonster))))
            {
                daSquare.classList.remove("invalid");
                daSquare.classList.add("valid");
            }
            else
            {
                isValid = false;

                daSquare.classList.add("invalid");
                daSquare.classList.remove("valid");
            }
        }
        else
        {
            isValid = false;

            daSquare.classList.add("invalid");
            daSquare.classList.remove("valid");
        }
    }
    return isValid;
}

function normalizeAndTrim(str)
{
    return str
        .normalize("NFD")                  // decompose accented characters
        .replace(/[\u0300-\u036f]/g, "")   // remove diacritical marks
        .replace(/[^a-z0-9]/gi, "")        // remove non alphanumeric characters
        .toLowerCase();                    // take a wild guess
}

function setupAutocomplete(input, list, allMonsters, onSelect)
{
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
            e.preventDefault();

            // simulate click on first match
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

const validateFlavor = document.getElementById("validateFlavor");
const validateButton = document.getElementById("validateButton");
const solutionSudoku = document.getElementById("solutionSudoku");
const solutionFlavor = document.getElementById("solutionFlavor");

validateButton.addEventListener("click", function()
{
    if (validateMonsters())
    {
        validateButton.classList.add("gone");
        validateFlavor.classList.add("gone");

        for (let i = 0; i < labelRows.length; i++)
        {
            const daLabel = labelRows[i];
            const solLabel = slabelRows[i];

            solLabel.innerHTML = daLabel.isInverse ? daLabel.conditional.inverseLabel : daLabel.conditional.label;
        }

        for (let i = 0; i < labelCols.length; i++)
        {
            const daLabel = labelCols[i];
            const solLabel = slabelCols[i];

            solLabel.innerHTML = daLabel.isInverse ? daLabel.conditional.inverseLabel : daLabel.conditional.label;
        }

        for (let i = 0; i < json.solutionMonsters.length; i++)
        {
            const daMonsterData = json.solutionMonsters[i];
            const daLabel = smonsterInputs[i];
            const daImage = smonsterImages[i];

            const daMonster = monsters.find(monster => monster.rarity == daMonsterData.rarity && monster.elementString == daMonsterData.elementString);

            if (daMonster)
            {
                daLabel.textContent = daMonster.name;
                daImage.src = daMonster.square;
            }
        }

        solutionFlavor.classList.remove("gone");
        solutionSudoku.classList.remove("gone");
    }
    else
    {
        validateFlavor.classList.remove("gone");
    }
});

for (let i = 0; i < monsterInputs.length; i++)
{
    const daInput = monsterInputs[i];
    const daImage = monsterImages[i];
    const daAutocomplete = monsterAutocompletes[i];

    setupAutocomplete(daInput, daAutocomplete, monsters, m =>
    {
        if (m)
        {
            daImage.src = m.square;
        }
        else
        {
            daImage.src = "https://monstyrslayr.github.io/msmTools/webp/square/monster_portrait_prize.webp";
        }
        validateMonsters();
    });

    daInput.value = "";
    daImage.src = "https://monstyrslayr.github.io/msmTools/webp/square/monster_portrait_prize.webp";
}

validateMonsters();
