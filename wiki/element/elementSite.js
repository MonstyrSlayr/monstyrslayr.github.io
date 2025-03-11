import { getAmeliorates, getElementById, getElementData, makeAmeliorateDiv } from "../data.js";
import { createContainer, createContentContainer, createInfoSection, createInfoSiteHeader, createMiniSection } from "../wikiTools.js";

function getLastFolder(url, num)
{
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split('/').filter(part => part !== '').filter(part => part !== 'index.html'); // Split and remove empty elements and index.html
    return parts[parts.length - num]; // Return the last part
}

// every element functionally has the same site
// so instead of putting all of the code in each html file
// we can put it in this general javascript file

const daId = getLastFolder(window.location.href, 1);
const daElement = getElementById(daId);

const header = createInfoSiteHeader(daElement.name);
document.body.appendChild(header);

const soloMonster = document.createElement("div");
soloMonster.classList = ["soloMonster"];
soloMonster.style.backgroundColor = daElement.outside;
    const soloGap = document.createElement("div");
    soloGap.classList = ["soloGap"];
    soloMonster.appendChild(soloGap);

    // const monsterImg = document.createElement("img");
    // monsterImg.id = "monsterImg";
    // monsterImg.src = daElement.images.default;
    // soloMonster.appendChild(monsterImg);
document.body.appendChild(soloMonster);

const mainContainer = createContainer();
    const monsterInfo = document.createElement("div");
    monsterInfo.id = "monsterInfo";
        const infoSectionDesc = createInfoSection("Description");
            const monsterDesc = document.createElement("p");
            monsterDesc.id = "monsterDesc";
            infoSectionDesc.appendChild(monsterDesc);
        monsterInfo.appendChild(infoSectionDesc);

        const infoSectionNotables = createInfoSection("Notable Monsters");
        monsterInfo.appendChild(infoSectionNotables);

        if (daElement.single)
        {
            const infoSectionSingle = createMiniSection("Single");
                const singleMonster = makeAmeliorateDiv(daElement.single, "box");
                singleMonster.id = "singleMonster";
                infoSectionSingle.appendChild(singleMonster);
            monsterInfo.appendChild(infoSectionSingle);
        }
        
        if (daElement.quad)
        {
            const infoSectionQuad = createMiniSection("Quad");
                const quadMonster = makeAmeliorateDiv(daElement.quad, "box");
                quadMonster.id = "quadMonster";
                infoSectionQuad.appendChild(quadMonster);
            monsterInfo.appendChild(infoSectionQuad);
        }

        const infoSectionMon = createInfoSection("Monsters");
            const islandMonDiv = createContentContainer();
                const daMonsters = getAmeliorates().filter(monster => monster.elements.includes(daElement));

                for (const monster of daMonsters)
                {
                    const daMonsterDiv = makeAmeliorateDiv(monster, "long");
                    islandMonDiv.appendChild(daMonsterDiv);
                }
            infoSectionMon.appendChild(islandMonDiv);
        monsterInfo.appendChild(infoSectionMon);
    mainContainer.appendChild(monsterInfo);
document.body.appendChild(mainContainer);

getElementData(daId).then((elementData) =>
{
    monsterDesc.innerHTML = elementData.desc;
})

function resizeWindow()
{
    const width = window.innerWidth;
    
    const elements = document.querySelectorAll('.ameliorateDiv');

    elements.forEach(element => {
        if (width < 950)
        {
            element.classList.add('layer');
            element.classList.remove('box');
            element.classList.remove('long');
        }
        else
        {
            element.classList.add('long');
            element.classList.remove('box');
            element.classList.remove('layer');
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
