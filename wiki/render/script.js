import { fileExists, getAmeliorateById, getAmeliorates, getElementById, getElements } from "../data.js";
import { createInfoSiteHeader } from "../wikiTools.js";

function allElementsEqual(arr)
{
    if (arr.length === 0)
    {
        return true;
    }
    const first = arr[0];
    return arr.every(element => element === first);
}

const ameliorateElements = getElements();

const limit = new Object();
limit.bulb = 1;
limit.hostess = 2;
limit.clay = 1;
limit.signal = 0;
limit.trash = 2;

// Populate monster dropdown
const monsterSelect = document.getElementById("monsterSelect");
const monsters = getAmeliorates();

monsters.forEach(monster =>
{
    const option = document.createElement("option");
    option.value = monster.id;
    option.textContent = monster.realName;
    monsterSelect.appendChild(option);
});

const renderedMonster = document.getElementById("renderedMonster");
const renderedMonsterError = document.getElementById("renderedMonsterError");

const scroll = new Object();
ameliorateElements.forEach(element =>
{
    scroll[element.name.toLowerCase()] = document.getElementById(element.name.toLowerCase()[0] + "Scroll");
});

for (const barContainer of document.getElementsByClassName("scrollBar"))
{
    const barLabel = barContainer.getElementsByTagName("label")[0];
    const bar = barContainer.getElementsByTagName("input")[0];

    const sigil = getElementById(barLabel.textContent);
    barLabel.style.color = sigil.highlight;
    bar.style.accentColor = sigil.main;
}

const linelessCheck = document.getElementById("lineless");
const shadowlessCheck = document.getElementById("shadowless");

function updateRenderedMonster(caller = null)
{
    const mon = getAmeliorateById(monsterSelect.value);

    // Get selected tags
    const level = new Object();
    const maxLevels = 2;
    ameliorateElements.forEach(element =>
    {
        level[element.name.toLowerCase()] = 
        [...Array.from({ length: maxLevels + 1 }, (_, i) => (element.name.toUpperCase()[0]).repeat(i))]
        [scroll[element.name.toLowerCase()].value];
    });

    const lineless = linelessCheck.checked ? "-Lineless" : "";
    const shadowless = shadowlessCheck.checked ? "-Shadowless" : "";

    if (caller === monsterSelect)
    {
        limit.bulb = 0;
        limit.hostess = 0;
        limit.clay = 0;
        limit.signal = 0;
        limit.trash = 0;

        mon.loadForms().then(() =>
        {
            for (const form of mon.forms)
            {
                if (allElementsEqual(form.elements) && form.elements.length > 0)
                {
                    limit[form.elements[0].name.toLowerCase()] = Math.max(limit[form.elements[0].name.toLowerCase()], form.elements.length);
                }
            }
        });
    }

    // Construct file name
    const eleTags = level.bulb + level.hostess + level.clay + level.signal + level.trash;
    const tags = (eleTags.length > 0 ? "-" : "") + eleTags + lineless + shadowless;
    const filename = "https://monstyrslayr.github.io/wiki/img/" + mon.id + "-" + mon.elementString + tags + ".png";

    fileExists(filename).then(exists =>
    {
        if (exists)
        {
            renderedMonster.style.display = "";
            renderedMonster.src = filename;

            renderedMonsterError.style.display = "none";
        }
        else
        {
            renderedMonster.style.display = "none";

            renderedMonsterError.style.display = "";
        }
    });
}

monsterSelect.addEventListener("input", function()
{
    ameliorateElements.forEach(element =>
    {
        scroll[element.name.toLowerCase()].value = 0;
    });
    updateRenderedMonster(monsterSelect);
});

ameliorateElements.forEach(element =>
{
    scroll[element.name.toLowerCase()].addEventListener("input", function ()
    {
        if (scroll[element.name.toLowerCase()].value > limit[element.name.toLowerCase()]) scroll[element.name.toLowerCase()].value = limit[element.name.toLowerCase()];
        updateRenderedMonster();
    });
});

linelessCheck.addEventListener("input", function()
{
    updateRenderedMonster();
});

shadowlessCheck.addEventListener("input", function()
{
    updateRenderedMonster();
});

const renderButton = document.getElementById("renderButton");

// Render button functionality
renderButton.addEventListener("click", () =>
{
    fileExists(renderedMonster.src)
    .then(exists =>
    {
        if (exists)
        {
            const link = document.createElement("a");
            link.href = renderedMonster.src;
            link.download = renderedMonster.src;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});

updateRenderedMonster(monsterSelect);

function resizeWindow()
{
	const width = window.innerWidth;
    
    // Select elements you want to update
    const elements = document.querySelectorAll("input[type='range']");

    elements.forEach(element =>
    {
        if (width < 750)
		{
            element.setAttribute("orient", "horizontal");
        }
		else
		{
            element.setAttribute("orient", "vertical");
        }
    });
}

window.addEventListener("resize", () =>
{
    resizeWindow();
});

resizeWindow();

const daEvent = new CustomEvent("pageScriptRun",
{
    detail: { message: "site built" },
    bubbles: true,
    cancelable: true
});
document.dispatchEvent(daEvent);

const header = document.querySelector("header");
header.replaceWith(createInfoSiteHeader("Monster Render Tool"));
