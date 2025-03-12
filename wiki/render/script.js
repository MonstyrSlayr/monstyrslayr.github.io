import { fileExists, getAmeliorateById, getAmeliorates, getElementById } from "../data.js"

// Mock function to fetch monsters from the server
function fetchMonsters() {
    return [
        { id: 1, name: "Dragon", baseImage: "dragon.png" },
        { id: 2, name: "Goblin", baseImage: "goblin.png" },
        { id: 3, name: "Troll", baseImage: "troll.png" }
    ];
}

function allElementsEqual(arr)
{
    if (arr.length === 0)
    {
        return true;
    }
    const first = arr[0];
    return arr.every(element => element === first);
}

let bulbLimit = 1;
let hostessLimit = 2;
let clayLimit = 1;
let signalLimit = 0;
let trashLimit = 2;

// Populate monster dropdown
const monsterSelect = document.getElementById('monsterSelect');
const monsters = getAmeliorates();

monsters.forEach(monster =>
{
    const option = document.createElement('option');
    option.value = monster.id;
    option.textContent = monster.realName;
    monsterSelect.appendChild(option);
});

const renderedMonster = document.getElementById("renderedMonster");
const renderedMonsterError = document.getElementById("renderedMonsterError");

const bScroll = document.getElementById('bScroll');
const hScroll = document.getElementById('hScroll');
const cScroll = document.getElementById('cScroll');
const sScroll = document.getElementById('sScroll');
const tScroll = document.getElementById('tScroll');

for (const barContainer of document.getElementsByClassName("scrollBar"))
{
    const barLabel = barContainer.getElementsByTagName("label")[0];
    const bar = barContainer.getElementsByTagName("input")[0];

    const sigil = getElementById(barLabel.textContent);
    barLabel.style.color = sigil.highlight;
    bar.style.accentColor = sigil.main;
}

const linelessCheck = document.getElementById('lineless');
const shadowlessCheck = document.getElementById('shadowless');

function updateRenderedMonster(caller = null)
{
    const mon = getAmeliorateById(monsterSelect.value);

    // Get selected tags
    const bLevel = ["", "B"][bScroll.value];
    const hLevel = ["", "H", "HH"][hScroll.value];
    const cLevel = ["", "C"][cScroll.value];
    const sLevel = [""][sScroll.value];
    const tLevel = ["", "T", "TT"][tScroll.value];

    const lineless = linelessCheck.checked ? "-Lineless" : "";
    const shadowless = shadowlessCheck.checked ? "-Shadowless" : "";

    if (caller === monsterSelect)
    {
        bulbLimit = 0;
        hostessLimit = 0;
        clayLimit = 0;
        signalLimit = 0;
        trashLimit = 0;

        mon.loadForms().then(() =>
        {
            for (const form of mon.forms)
            {
                if (allElementsEqual(form.elements) && form.elements.length > 0)
                {
                    switch (form.elements[0].name.toLowerCase())
                    {
                        case "bulb":
                            bulbLimit = Math.max(bulbLimit, form.elements.length);
                        break;
                        
                        case "hostess":
                            hostessLimit = Math.max(hostessLimit, form.elements.length);
                        break;
                        
                        case "clay":
                            clayLimit = Math.max(clayLimit, form.elements.length);
                        break;
                        
                        case "signal":
                            signalLimit = Math.max(signalLimit, form.elements.length);
                        break;
                        
                        case "trash":
                            trashLimit = Math.max(trashLimit, form.elements.length);
                        break;
                    }
                }
            }
        });
    }

    // Construct file name
    const eleTags = bLevel + hLevel + cLevel + sLevel + tLevel;
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
    bScroll.value = 0;
    hScroll.value = 0;
    cScroll.value = 0;
    sScroll.value = 0;
    tScroll.value = 0;
    updateRenderedMonster(monsterSelect);
});

bScroll.addEventListener("input", function ()
{
    if (bScroll.value > bulbLimit) bScroll.value = bulbLimit;
    updateRenderedMonster();
});

hScroll.addEventListener("input", function ()
{
    if (hScroll.value > hostessLimit) hScroll.value = hostessLimit;
    updateRenderedMonster();
});

cScroll.addEventListener("input", function ()
{
    if (cScroll.value > clayLimit) cScroll.value = clayLimit;
    updateRenderedMonster();
});

sScroll.addEventListener("input", function ()
{
    if (sScroll.value > signalLimit) sScroll.value = signalLimit;
    updateRenderedMonster();
});

tScroll.addEventListener("input", function ()
{
    if (tScroll.value > trashLimit) tScroll.value = trashLimit;
    updateRenderedMonster();
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
            const link = document.createElement('a');
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
            element.setAttribute('orient', 'horizontal');
        }
		else
		{
            element.setAttribute('orient', 'vertical');
        }
    });
}

window.addEventListener('resize', () =>
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
