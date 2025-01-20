import { fileExists, getAmeliorateById, getAmeliorates, getElementById } from "../data.js"

// Mock function to fetch monsters from the server
function fetchMonsters() {
    return [
        { id: 1, name: "Dragon", baseImage: "dragon.png" },
        { id: 2, name: "Goblin", baseImage: "goblin.png" },
        { id: 3, name: "Troll", baseImage: "troll.png" }
    ];
}

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

function updateRenderedMonster()
{
    const mon = getAmeliorateById(monsterSelect.value);

    // Get selected tags
    const bLevel = ["", "-B"][bScroll.value];
    const hLevel = ["", "-H", "-HH"][hScroll.value];
    const cLevel = ["", "-C"][cScroll.value];
    const sLevel = [""][sScroll.value];
    const tLevel = ["", "-T"][tScroll.value];

    const lineless = linelessCheck.checked ? "-Lineless" : "";
    const shadowless = shadowlessCheck.checked ? "-Shadowless" : "";

    // Construct file name
    const tags = bLevel + hLevel + cLevel + sLevel + tLevel + lineless + shadowless;
    const filename = "https://monstyrslayr.github.io/wiki/img/" + mon.id + "-" + mon.elementString + tags + ".png";

    renderedMonster.src = filename;
}

monsterSelect.addEventListener("input", function()
{
    bScroll.value = 0;
    hScroll.value = 0;
    cScroll.value = 0;
    sScroll.value = 0;
    tScroll.value = 0;
    updateRenderedMonster();
});

bScroll.addEventListener("input", function ()
{
    if (bScroll.value > 1) bScroll.value = 1;
    updateRenderedMonster();
});

hScroll.addEventListener("input", function ()
{
    if (hScroll.value > 2) hScroll.value = 2;
    updateRenderedMonster();
});

cScroll.addEventListener("input", function ()
{
    if (cScroll.value > 1) cScroll.value = 1;
    updateRenderedMonster();
});

sScroll.addEventListener("input", function ()
{
    if (sScroll.value > 0) sScroll.value = 0;
    updateRenderedMonster();
});

tScroll.addEventListener("input", function ()
{
    if (tScroll.value > 1) tScroll.value = 1;
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

const renderButton = document.getElementById('renderButton');

// Render button functionality
renderButton.addEventListener('click', () =>
{
    fileExists(renderedMonster.src)
    .then(exists =>
    {
        if (exists)
        {
            // Simulate download (replace with server logic as needed)
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

updateRenderedMonster();