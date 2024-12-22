import { getAmeliorateById, getMonsterData, getIslands, makeIslandDiv } from "../data.js";

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
const daMonster = getAmeliorateById(daId);

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
    monsterTitle.innerHTML = daMonster.realName;
    header.appendChild(monsterTitle);
document.body.appendChild(header);

const soloMonster = document.createElement("div");
soloMonster.classList = ["soloMonster"];
    const soloGap = document.createElement("div");
    soloGap.classList = ["soloGap"];
    soloMonster.appendChild(soloGap);

    const monsterImg = document.createElement("img");
    monsterImg.id = "monsterImg";
    monsterImg.src = daMonster.images.default;
    soloMonster.appendChild(monsterImg);
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
            monsterName.innerHTML = daMonster.realName;
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

        const infoSectionAna = document.createElement("div");
        infoSectionAna.classList = ["infoSection"];
            const monsterAnaHeader = document.createElement("h2");
            monsterAnaHeader.classList = ["underlined"];
            monsterAnaHeader.innerHTML = "Biology:";
            infoSectionAna.appendChild(monsterAnaHeader);

            const monsterAna = document.createElement("p");
            monsterAna.id = "monsterAna";
            infoSectionAna.appendChild(monsterAna);
        monsterInfo.appendChild(infoSectionAna);

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

        const infoSectionIslands = document.createElement("div");
        infoSectionIslands.classList = ["infoSection"];
            const monsterIslandsHeader = document.createElement("h2");
            monsterIslandsHeader.classList = ["underlined"];
            monsterIslandsHeader.innerHTML = "Islands:";
            infoSectionIslands.appendChild(monsterIslandsHeader);

            const monIslandDiv = document.createElement("div");
            monIslandDiv.classList = "contentContainer";
                const daIslands = getIslands().filter(island => island.monsters.includes(daMonster));
                
                for (const island of daIslands)
                {
                    const daIslandDiv = makeIslandDiv(island);
                    monIslandDiv.appendChild(daIslandDiv);
                }
            infoSectionIslands.appendChild(monIslandDiv);
        monsterInfo.appendChild(infoSectionIslands);
    mainContainer.appendChild(monsterInfo);
document.body.appendChild(mainContainer);

getMonsterData(daId).then((monsterData) =>
{
    monsterAna.innerHTML = monsterData.ana;

    monsterDesc.innerHTML = monsterData.desc;

    monsterBio.innerHTML = monsterData.bio;
})