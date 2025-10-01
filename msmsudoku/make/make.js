import { classConditionals, countMonstersInConditionals, defaultConditional, rarityConditionals, monsters, islandConditionals, elementConditionals, likeConditionals, countConditionals, likedByConditionals } from "../script.js";

const dropdownRows =
[
    document.getElementById("cdr0"),
    document.getElementById("cdr1"),
    document.getElementById("cdr2")
];
const checkboxRows =
[
    document.getElementById("checkboxr0"),
    document.getElementById("checkboxr1"),
    document.getElementById("checkboxr2")
];
const labelRows =
[
    document.getElementById("clr0"),
    document.getElementById("clr1"),
    document.getElementById("clr2")
];

const dropdownCols =
[
    document.getElementById("cdc0"),
    document.getElementById("cdc1"),
    document.getElementById("cdc2")
];
const checkboxCols =
[
    document.getElementById("checkboxc0"),
    document.getElementById("checkboxc1"),
    document.getElementById("checkboxc2")
];
const labelCols =
[
    document.getElementById("clc0"),
    document.getElementById("clc1"),
    document.getElementById("clc2")
];

const monsterCounters =
[
    document.getElementById("mc00"), document.getElementById("mc01"), document.getElementById("mc02"),
    document.getElementById("mc10"), document.getElementById("mc11"), document.getElementById("mc12"),
    document.getElementById("mc20"), document.getElementById("mc21"), document.getElementById("mc22"),
];

const monsterInputs =
[
    document.getElementById("monster00"), document.getElementById("monster01"), document.getElementById("monster02"),
    document.getElementById("monster10"), document.getElementById("monster11"), document.getElementById("monster12"),
    document.getElementById("monster20"), document.getElementById("monster21"), document.getElementById("monster22"),
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

function countMonstersAndValidate()
{
    let isValid = true;
    for (let i = 0; i < monsterCounters.length; i++)
    {
        const monCounter = monsterCounters[i];
        const daSquare = sudokuGameSquares[i];
        const dropRow = dropdownRows[Math.floor(i/3)];
        const dropCol = dropdownCols[i % 3];
        const checkRow = checkboxRows[Math.floor(i/3)];
        const checkCol = checkboxCols[i % 3];

        const daCount = countMonstersInConditionals(monsters, [dropRow.conditional, dropCol.conditional], [checkRow.checked, checkCol.checked]);
        monCounter.textContent = daCount + " monsters";
        if (daCount <= 0)
        {
            isValid = false;

            daSquare.classList.add("invalid");
            daSquare.classList.remove("valid");
        }
        else
        {
            daSquare.classList.remove("invalid");
            daSquare.classList.add("valid");
        }
    }
    return isValid;
}

function validateMonstersForDownload()
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

function makeSelectableConditional(conditional, textContent)
{
    const daListItem = document.createElement("li");

        const daButton = document.createElement("button");
        daButton.classList.add("option");
        daButton.textContent = textContent;
        daButton.conditional = conditional;
        daListItem.appendChild(daButton);

    addTooltip(daListItem, function() { return daButton.conditional.description; });
    
    return daListItem;
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

for (const daDiv of document.getElementsByClassName("conditionalDropdown"))
{
    daDiv.conditional = defaultConditional;

    const selectedButton = document.createElement("button");
    daDiv.appendChild(selectedButton);
    addTooltip(selectedButton, function() { return daDiv.conditional.description; });

        const daSelected = document.createElement("span");
        daSelected.classList.add("selected");
        daSelected.textContent = "MONSTER";
        selectedButton.appendChild(daSelected);

    const daDropdown = document.createElement("nav");
    daDropdown.classList.add("dropdown");
    daDiv.appendChild(daDropdown);
    selectedButton.addEventListener("click", function()
    {
        if (daDropdown.classList.contains("open")) daDropdown.classList.remove("open")
        else daDropdown.classList.add("open");
    });

        const daDropdownList = document.createElement("ul");
        daDropdown.appendChild(daDropdownList);

            daDropdownList.appendChild(makeSelectableConditional(defaultConditional, "MONSTER"));
            
            const rarityDropdown = document.createElement("li");
            daDropdownList.appendChild(rarityDropdown);

                const rarityButton = document.createElement("button");
                rarityButton.textContent = "RARITY ᐳ";
                rarityButton.classList.add("dropdownButton");
                rarityDropdown.appendChild(rarityButton);

                const rarityContent = document.createElement("ul");
                rarityContent.classList.add("dropdownContent");
                rarityDropdown.appendChild(rarityContent);

                    for (const rarityConditional of rarityConditionals)
                    {
                        rarityContent.appendChild(makeSelectableConditional(rarityConditional, rarityConditional.rarity.toUpperCase()));
                    }
            
            const classDropdown = document.createElement("li");
            daDropdownList.appendChild(classDropdown);

                const classButton = document.createElement("button");
                classButton.textContent = "CLASS ᐳ";
                classButton.classList.add("dropdownButton");
                classDropdown.appendChild(classButton);

                const classContent = document.createElement("ul");
                classContent.classList.add("dropdownContent");
                classDropdown.appendChild(classContent);

                    for (const classConditional of classConditionals)
                    {
                        classContent.appendChild(makeSelectableConditional(classConditional, classConditional.name));
                    }
            
            const islandDropdown = document.createElement("li");
            daDropdownList.appendChild(islandDropdown);

                const islandButton = document.createElement("button");
                islandButton.textContent = "ISLAND ᐳ";
                islandButton.classList.add("dropdownButton");
                islandDropdown.appendChild(islandButton);

                const islandContent = document.createElement("ul");
                islandContent.classList.add("dropdownContent");
                islandDropdown.appendChild(islandContent);

                    for (const islandConditional of islandConditionals)
                    {
                        islandContent.appendChild(makeSelectableConditional(islandConditional, islandConditional.island.name.toUpperCase()));
                    }
            
            const elementDropdown = document.createElement("li");
            daDropdownList.appendChild(elementDropdown);

                const elementButton = document.createElement("button");
                elementButton.textContent = "ELEMENT ᐳ";
                elementButton.classList.add("dropdownButton");
                elementDropdown.appendChild(elementButton);

                const elementContent = document.createElement("ul");
                elementContent.classList.add("dropdownContent");
                elementDropdown.appendChild(elementContent);

                    for (const elementConditional of elementConditionals)
                    {
                        elementContent.appendChild(makeSelectableConditional(elementConditional, elementConditional.elementSigil.name.toUpperCase()));
                    }
            
            const countDropdown = document.createElement("li");
            daDropdownList.appendChild(countDropdown);

                const countButton = document.createElement("button");
                countButton.textContent = "ELEMENT COUNT ᐳ";
                countButton.classList.add("dropdownButton");
                countDropdown.appendChild(countButton);

                const countContent = document.createElement("ul");
                countContent.classList.add("dropdownContent");
                countDropdown.appendChild(countContent);

                    for (const countConditional of countConditionals)
                    {
                        countContent.appendChild(makeSelectableConditional(countConditional, countConditional.count + " ELEMENTS"));
                    }

            // no i will not be adding a search bar for likes
            
            const likeDropdown = document.createElement("li");
            daDropdownList.appendChild(likeDropdown);

                const likeButton = document.createElement("button");
                likeButton.textContent = "LIKE ᐳ";
                likeButton.classList.add("dropdownButton");
                likeDropdown.appendChild(likeButton);

                const likeContent = document.createElement("ul");
                likeContent.classList.add("dropdownContent");
                likeDropdown.appendChild(likeContent);

                    for (const likeConditional of likeConditionals)
                    {
                        likeContent.appendChild(makeSelectableConditional(likeConditional, "LIKES " + likeConditional.like.toUpperCase()));
                    }
            
            const likedByDropdown = document.createElement("li");
            daDropdownList.appendChild(likedByDropdown);

                const likedByButton = document.createElement("button");
                likedByButton.textContent = "LIKED BY ᐳ";
                likedByButton.classList.add("dropdownButton");
                likedByDropdown.appendChild(likedByButton);

                const likedByContent = document.createElement("ul");
                likedByContent.classList.add("dropdownContent");
                likedByDropdown.appendChild(likedByContent);

                    for (const likedByConditional of likedByConditionals)
                    {
                        likedByContent.appendChild(makeSelectableConditional(likedByConditional, "LIKED BY " + likedByConditional.daMonster.name.toUpperCase()));
                    }
}

countMonstersAndValidate();

document.querySelectorAll(".dropdownButton").forEach(btn =>
{
    btn.addEventListener("click", e =>
    {
        e.stopPropagation();

        const parentLi = btn.parentElement;

        // Close other open menus at the same level
        parentLi.parentElement.querySelectorAll("li.open").forEach(li =>
        {
            if (li !== parentLi) li.classList.remove("open");
        });

        parentLi.classList.toggle("open");
    });
});

document.querySelectorAll(".option").forEach(btn =>
{
    btn.addEventListener("click", e =>
    {
        e.stopPropagation();
        document.querySelectorAll(".dropdown.open").forEach(dropdown => dropdown.classList.remove("open"));
        const selectedText = btn.innerText;

        const wrapper = btn.closest(".conditionalDropdown");
        wrapper.conditional = btn.conditional;
        wrapper.querySelector(".selected").innerText = selectedText;
        countMonstersAndValidate();

        wrapper.querySelectorAll("li.open").forEach(li => li.classList.remove("open"));
    });
});

for (const checkbox of [...checkboxRows, ...checkboxCols])
{
    checkbox.addEventListener("click", function()
    {
        countMonstersAndValidate();
    });
}

document.body.addEventListener("click", () =>
{
    document.querySelectorAll("li.open").forEach(li => li.classList.remove("open"));
});

const validateFlavor = document.getElementById("validateFlavor");
const validateButton = document.getElementById("validateButton");
const downloadDiv = document.getElementsByClassName("downloadDiv")[0]; // css reason
const downloadButton = document.getElementById("downloadButton");

validateButton.addEventListener("click", function()
{
    if (countMonstersAndValidate())
    {
        validateFlavor.classList.add("gone");
        validateButton.classList.add("gone");

        downloadDiv.classList.remove("gone");

        for (const monCounter of monsterCounters)
        {
            monCounter.classList.add("gone");
        }

        for (const checkDiv of document.getElementsByClassName("inverseCheckboxDiv"))
        {
            checkDiv.classList.add("gone");
        }

        for (let i = 0; i < dropdownRows.length; i++)
        {
            const dropdown = dropdownRows[i];
            dropdown.classList.add("gone");

            const checkbox = checkboxRows[i];

            const daLabel = labelRows[i];
            daLabel.classList.remove("gone");
            daLabel.conditional = dropdown.conditional;
            daLabel.isInverse = checkbox.checked;
            daLabel.innerHTML = daLabel.isInverse ? dropdown.conditional.inverseLabel : dropdown.conditional.label;
            addTooltip(daLabel, function() { return dropdown.conditional.description; });
        }

        for (let i = 0; i < dropdownCols.length; i++)
        {
            const dropdown = dropdownCols[i];
            dropdown.classList.add("gone");

            const checkbox = checkboxCols[i];

            const daLabel = labelCols[i];
            daLabel.classList.remove("gone");
            daLabel.conditional = dropdown.conditional;
            daLabel.isInverse = checkbox.checked;
            daLabel.innerHTML = daLabel.isInverse ? dropdown.conditional.inverseLabel : dropdown.conditional.label;
            addTooltip(daLabel, function() { return dropdown.conditional.description; });
        }

        for (const postValidator of document.getElementsByClassName("postValidator"))
        {
            postValidator.classList.remove("gone");
        }

        for (let i = 0; i < monsterInputs.length; i++)
        {
            const daInput = monsterInputs[i];
            const daAutocomplete = monsterAutocompletes[i];

            setupAutocomplete(daInput, daAutocomplete, monsters, m =>
            {
                validateMonstersForDownload();
            });

            daInput.value = monsters[0].name;
        }

        validateMonstersForDownload();
    }
    else
    {
        validateFlavor.classList.remove("gone");
    }
});

const nameField = document.getElementById("nameField");
const nameLimit = 60;
const authorField = document.getElementById("authorField");
const authorLimit = 20;
const friendField = document.getElementById("friendField");
const friendLimit = 19;

downloadButton.addEventListener("click", function()
{
    if (validateMonstersForDownload())
    {
        const daObject = new Object();

        daObject.metadata = {};
        daObject.conditionalRows = [];
        daObject.conditionalCols = [];
        daObject.solutionMonsters = [];

        daObject.metadata.name = nameField.value;
        daObject.metadata.author = authorField.value;
        daObject.metadata.friendCode = friendField.value;

        for (const row of labelRows)
        {
            daObject.conditionalRows.push(
            {
                id: row.conditional.id,
                inverse: row.isInverse
            });
        }

        for (const col of labelCols)
        {
            daObject.conditionalCols.push(
            {
                id: col.conditional.id,
                inverse: col.isInverse
            });
        }

        for (const input of monsterInputs)
        {
            const daMonster = monsters.filter(m => normalizeAndTrim(m.name) == normalizeAndTrim(input.value))[0];
            daObject.solutionMonsters.push(
            {
                rarity: daMonster.rarity,
                elementString: daMonster.elementString
            });
        }

        const jsonString = JSON.stringify(daObject, null, 4);
        const filename = "my_msm_sudoku.json";

        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a); // Append to body to make it clickable
        a.click();
        document.body.removeChild(a); // Clean up
        URL.revokeObjectURL(url); // Release the object URL
    }
});
