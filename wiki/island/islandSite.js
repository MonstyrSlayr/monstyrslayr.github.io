import { getIslandById, makeAmeliorateDiv } from "../data.js";

function getLastFolder(url, num)
{
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split('/').filter(part => part !== '').filter(part => part !== 'index.html'); // Split and remove empty elements and index.html
    return parts[parts.length - num]; // Return the last part
}

// every monster functionally has the same site
// so instead of putting all of the code in each html file
// we can put it in this general javascript file

const daId = getLastFolder(window.location.href, 1);
const daMonster = getIslandById(daId);

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
    monsterTitle.innerHTML = daMonster.name;
    header.appendChild(monsterTitle);
document.body.appendChild(header);

const soloMonster = document.createElement("div");
soloMonster.classList = ["soloMonster"];
    const soloGap = document.createElement("div");
    soloGap.classList = ["soloGap"];
    soloMonster.appendChild(soloGap);

    // const monsterImg = document.createElement("img");
    // monsterImg.id = "monsterImg";
    // monsterImg.src = daMonster.images.default;
    // soloMonster.appendChild(monsterImg);
document.body.appendChild(soloMonster);

const mainContainer = document.createElement("div");
mainContainer.classList = ["container soloContainer"];
    const monsterInfo = document.createElement("div");
    monsterInfo.id = "monsterInfo";
        const nameContainer = document.createElement("div");
        nameContainer.classList = ["infoSection infoInline"];
            const monsterNameHeader = document.createElement("h2");
            monsterNameHeader.innerHTML = "Name: ";
            nameContainer.appendChild(monsterNameHeader);

            const monsterName = document.createElement("p");
            monsterName.id = "monsterName";
            monsterName.innerHTML = daMonster.name;
            nameContainer.appendChild(monsterName);
        monsterInfo.appendChild(nameContainer);

        const elementContainer = document.createElement("div");
        elementContainer.classList = ["infoSection infoInline"];
            const elementHeader = document.createElement("h2");
            elementHeader.innerHTML = "Elements: ";
            elementContainer.appendChild(elementHeader);

            const elementImages = document.createElement("div");
            elementImages.id = "elementImages";
            elementImages.classList = ["miniElementList"];
            elementContainer.appendChild(elementImages);

            const elementNames = document.createElement("p");
            elementNames.id = "elementNamesList";
            elementContainer.appendChild(elementNames);

            for (const element of daMonster.elements)
            {
                const daSigil = document.createElement("img");
                daSigil.src = element.sigil;
                daSigil.classList = ["miniElement"];
                elementImages.append(daSigil);
            
                elementNames.innerHTML += element.name + ", ";
            }
            elementNames.innerHTML = " " + elementNames.innerHTML.substring(0, elementNames.innerHTML.length - 2);
        monsterInfo.appendChild(elementContainer);

        const infoSectionDesc = document.createElement("div");
        infoSectionDesc.classList = ["infoSection"];
            const monsterDescHeader = document.createElement("h2");
            monsterDescHeader.classList = ["underlined"];
            monsterDescHeader.innerHTML = "Description:";
            infoSectionDesc.appendChild(monsterDescHeader);

            const monsterDesc = document.createElement("p");
            monsterDesc.id = "monsterDesc";
            infoSectionDesc.appendChild(monsterDesc);
        monsterInfo.appendChild(infoSectionDesc);

        const infoSectionBio = document.createElement("div");
        infoSectionBio.classList = ["infoSection"];
            const monsterBioHeader = document.createElement("h2");
            monsterBioHeader.classList = ["underlined"];
            monsterBioHeader.innerHTML = "Biography:";
            infoSectionBio.appendChild(monsterBioHeader);

            const monsterBio = document.createElement("p");
            monsterBio.id = "monsterBio";
            infoSectionBio.appendChild(monsterBio);
        monsterInfo.appendChild(infoSectionBio);

        const infoSectionMon = document.createElement("div");
        infoSectionMon.classList = ["infoSection"];
            const islandMonHeader = document.createElement("h2");
            islandMonHeader.classList = ["underlined"];
            islandMonHeader.innerHTML = "Monsters:";
            infoSectionMon.appendChild(islandMonHeader);

            const islandMonDiv = document.createElement("div");
            islandMonDiv.classList = "contentContainer";
                const daMonsters = daMonster.monsters;

                for (const monster of daMonsters)
                {
                    const daMonsterDiv = makeAmeliorateDiv(monster, "long");
                    islandMonDiv.appendChild(daMonsterDiv);
                }
            infoSectionMon.appendChild(islandMonDiv);
        monsterInfo.appendChild(infoSectionMon);
    mainContainer.appendChild(monsterInfo);
document.body.appendChild(mainContainer);

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