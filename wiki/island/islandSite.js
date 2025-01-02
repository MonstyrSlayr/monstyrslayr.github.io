import { getIslandById, getSongById, getIslandData, makeAmeliorateDiv, makeMiniElement } from "../data.js";

function getLastFolder(url, num)
{
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split('/').filter(part => part !== '').filter(part => part !== 'index.html'); // Split and remove empty elements and index.html
    return parts[parts.length - num]; // Return the last part
}

// every island functionally has the same site
// so instead of putting all of the code in each html file
// we can put it in this general javascript file

const daId = getLastFolder(window.location.href, 1);
let daIsland;
if (getLastFolder(window.location.href, 2) !== "island") daIsland = getSongById(daId);
else daIsland = getIslandById(daId);

const header = document.createElement("header");
    const homeButtonLink = document.createElement("a");
    homeButtonLink.href = "https://monstyrslayr.github.io/wiki/ameliorates";
    homeButtonLink.id = "homeButton";
        const homeButton = document.createElement("button");
        homeButton.innerHTML = "< Home";
        homeButtonLink.appendChild(homeButton);
    header.appendChild(homeButtonLink);

    const islandTitle = document.createElement("h1");
    islandTitle.id = "monsterTitle";
    islandTitle.innerHTML = daIsland.name;
    header.appendChild(islandTitle);
document.body.appendChild(header);

const soloIsland = document.createElement("div");
soloIsland.classList = ["soloMonster"];
soloIsland.style.backgroundColor = daIsland.affiliation.outside;
    const soloGap = document.createElement("div");
    soloGap.classList = ["soloGap"];
    soloIsland.appendChild(soloGap);

    const youtubeVideo = document.createElement("iframe");
    youtubeVideo.src = "https://www.youtube.com/embed/" + daIsland.youtubeId;
    youtubeVideo.width = "640";
    youtubeVideo.height = "360";
    youtubeVideo.frameborder = "0";
    youtubeVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    youtubeVideo.allowfullscreen = true;
    youtubeVideo.classList = ["youtubeVideo"];
    soloIsland.appendChild(youtubeVideo);
document.body.appendChild(soloIsland);

const mainContainer = document.createElement("div");
mainContainer.classList = ["container soloContainer"];
    const islandInfo = document.createElement("div");
    islandInfo.id = "monsterInfo";
        const nameContainer = document.createElement("div");
        nameContainer.classList = ["infoSection infoInline"];
            const monsterNameHeader = document.createElement("h2");
            monsterNameHeader.innerHTML = "Name: ";
            nameContainer.appendChild(monsterNameHeader);

            const monsterName = document.createElement("p");
            monsterName.id = "monsterName";
            monsterName.innerHTML = daIsland.name;
            nameContainer.appendChild(monsterName);
        islandInfo.appendChild(nameContainer);

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

            for (const element of daIsland.elements)
            {
                const daSigil = makeMiniElement(element);
                elementImages.append(daSigil);
            
                elementNames.innerHTML += element.name + ", ";
            }
            elementNames.innerHTML = " " + elementNames.innerHTML.substring(0, elementNames.innerHTML.length - 2);
        islandInfo.appendChild(elementContainer);

        const infoSectionNotables = document.createElement("div");
        infoSectionNotables.classList = ["infoSection"];
            const notablesHeader = document.createElement("h2");
            notablesHeader.innerHTML = "Notable Monsters";
            notablesHeader.classList = ["underlined"];
            infoSectionNotables.appendChild(notablesHeader);

            if (daIsland.notables != null)
            {
                const notablesDiv = document.createElement("div");
                notablesDiv.classList = "contentContainer";
                for (const notable of daIsland.notables)
                {
                    const daNotable = makeAmeliorateDiv(notable, "box");
                    notablesDiv.appendChild(daNotable);
                }
                infoSectionNotables.appendChild(notablesDiv);
            }

            if (daIsland.quad !== null)
            {
                const infoSectionQuad = document.createElement("div");
                infoSectionQuad.classList = ["infoSection miniSection"];
                    const quadHeader = document.createElement("h3");
                    quadHeader.innerHTML = "Quad";
                    quadHeader.classList = ["underlined"];
                    infoSectionQuad.appendChild(quadHeader);
        
                    const quadMonster = makeAmeliorateDiv(daIsland.quad, "box");
                    quadMonster.id = "quadMonster";
                    infoSectionQuad.appendChild(quadMonster);
                infoSectionNotables.appendChild(infoSectionQuad);
            }
        islandInfo.appendChild(infoSectionNotables);

        // const infoSectionDesc = document.createElement("div");
        // infoSectionDesc.classList = ["infoSection"];
        //     const monsterDescHeader = document.createElement("h2");
        //     monsterDescHeader.classList = ["underlined"];
        //     monsterDescHeader.innerHTML = "Description";
        //     infoSectionDesc.appendChild(monsterDescHeader);

        //     const monsterDesc = document.createElement("p");
        //     monsterDesc.id = "monsterDesc";
        //     infoSectionDesc.appendChild(monsterDesc);
        // islandInfo.appendChild(infoSectionDesc);

        // const infoSectionBio = document.createElement("div");
        // infoSectionBio.classList = ["infoSection"];
        //     const monsterBioHeader = document.createElement("h2");
        //     monsterBioHeader.classList = ["underlined"];
        //     monsterBioHeader.innerHTML = "Biography";
        //     infoSectionBio.appendChild(monsterBioHeader);

        //     const monsterBio = document.createElement("p");
        //     monsterBio.id = "monsterBio";
        //     infoSectionBio.appendChild(monsterBio);
        // islandInfo.appendChild(infoSectionBio);

        const infoSectionMon = document.createElement("div");
        infoSectionMon.classList = ["infoSection"];
            const islandMonHeader = document.createElement("h2");
            islandMonHeader.classList = ["underlined"];
            islandMonHeader.innerHTML = "Monsters";
            infoSectionMon.appendChild(islandMonHeader);

            const islandMonDiv = document.createElement("div");
            islandMonDiv.classList = "contentContainer";
                const daMonsters = daIsland.monsters;

                for (const monster of daMonsters)
                {
                    const daMonsterDiv = makeAmeliorateDiv(monster, "long");
                    islandMonDiv.appendChild(daMonsterDiv);
                }
            infoSectionMon.appendChild(islandMonDiv);
        islandInfo.appendChild(infoSectionMon);
    mainContainer.appendChild(islandInfo);
document.body.appendChild(mainContainer);

// getIslandData(daId).then((islandData) =>
// {
//     // monsterDesc.innerHTML = islandData.desc;

//     // monsterBio.innerHTML = islandData.bio;
// })

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