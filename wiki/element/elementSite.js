import { getAmeliorates, getElementById, getElementData, makeAmeliorateDiv } from "../data.js";

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

const header = document.createElement("header");
    const homeButtonLink = document.createElement("a");
    homeButtonLink.href = "https://monstyrslayr.github.io/wiki/ameliorates";
    homeButtonLink.id = "homeButton";
        const homeButton = document.createElement("button");
        homeButton.innerHTML = "< Home";
        homeButtonLink.appendChild(homeButton);
    header.appendChild(homeButtonLink);

    const monsterTitle = document.createElement("h1");
    monsterTitle.id = "monsterTitle";
    monsterTitle.innerHTML = daElement.name;
    header.appendChild(monsterTitle);
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

const mainContainer = document.createElement("div");
mainContainer.classList = ["container soloContainer"];
    const monsterInfo = document.createElement("div");
    monsterInfo.id = "monsterInfo";
        const infoSectionDesc = document.createElement("div");
        infoSectionDesc.classList = ["infoSection"];
            const monsterDescHeader = document.createElement("h2");
            monsterDescHeader.classList = ["underlined"];
            monsterDescHeader.innerHTML = "Description";
            infoSectionDesc.appendChild(monsterDescHeader);

            const monsterDesc = document.createElement("p");
            monsterDesc.id = "monsterDesc";
            infoSectionDesc.appendChild(monsterDesc);
        monsterInfo.appendChild(infoSectionDesc);

        const infoSectionNotables = document.createElement("div");
        infoSectionNotables.classList = ["infoSection"];
            const notablesHeader = document.createElement("h2");
            notablesHeader.classList = ["underlined"];
            notablesHeader.innerHTML = "Notable Monsters";
            infoSectionNotables.appendChild(notablesHeader);
        monsterInfo.appendChild(infoSectionNotables);

        if (daElement.single)
        {
            const infoSectionSingle = document.createElement("div");
            infoSectionSingle.classList = ["infoSection miniSection"];
                const singleHeader = document.createElement("h3");
                singleHeader.innerHTML = "Single";
                singleHeader.classList = ["underlined"];
                infoSectionSingle.appendChild(singleHeader);

                const singleMonster = makeAmeliorateDiv(daElement.single, "box");
                singleMonster.id = "singleMonster";
                infoSectionSingle.appendChild(singleMonster);
            monsterInfo.appendChild(infoSectionSingle);
        }
        
        if (daElement.quad)
        {
            const infoSectionQuad = document.createElement("div");
            infoSectionQuad.classList = ["infoSection miniSection"];
                const quadHeader = document.createElement("h3");
                quadHeader.innerHTML = "Quad";
                quadHeader.classList = ["underlined"];
                infoSectionQuad.appendChild(quadHeader);

                const quadMonster = makeAmeliorateDiv(daElement.quad, "box");
                quadMonster.id = "quadMonster";
                infoSectionQuad.appendChild(quadMonster);
            monsterInfo.appendChild(infoSectionQuad);
        }

        const infoSectionMon = document.createElement("div");
        infoSectionMon.classList = ["infoSection"];
            const islandMonHeader = document.createElement("h2");
            islandMonHeader.classList = ["underlined"];
            islandMonHeader.innerHTML = "Monsters";
            infoSectionMon.appendChild(islandMonHeader);

            const islandMonDiv = document.createElement("div");
            islandMonDiv.classList = "contentContainer";
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