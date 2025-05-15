import { getIslandById, getSongById, getIslandData, makeAmeliorateDiv, makeMiniElement, blendHexColors, rgbFuncToHex, backgroundBlend, getLocationById } from "../data.js";
import { createInfoSiteHeader, createContainer, createContentContainer, createInfoSection, createMiniSection } from "../wikiTools.js";

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
if (daIsland == null) daIsland = getLocationById(daId);
if (daIsland == null) console.error("could not find island with id " + daId);

document.body.style.backgroundColor = blendHexColors(rgbFuncToHex(window.getComputedStyle(document.body).getPropertyValue("background-color")), daIsland.affiliation.main, backgroundBlend);

const header = createInfoSiteHeader(daIsland.name);
document.body.appendChild(header);

const soloIsland = document.createElement("div");
soloIsland.classList = ["soloMonster"];
soloIsland.style.backgroundColor = daIsland.affiliation.outside;
    const soloGap = document.createElement("div");
    soloGap.classList = ["soloGap"];
    soloIsland.appendChild(soloGap);

    if (daIsland.youtubeId != "")
    {
        const youtubeVideo = document.createElement("iframe");
        youtubeVideo.src = "https://www.youtube.com/embed/" + daIsland.youtubeId;
        youtubeVideo.width = "640";
        youtubeVideo.height = "360";
        youtubeVideo.frameborder = "0";
        youtubeVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        youtubeVideo.allowfullscreen = true;
        youtubeVideo.classList = ["youtubeVideo"];
        soloIsland.appendChild(youtubeVideo);
    }
document.body.appendChild(soloIsland);

const mainContainer = createContainer();
    const islandInfo = document.createElement("div");
    islandInfo.id = "monsterInfo";
        const nameContainer = createInfoSection("Name: ", true);
            const monsterName = document.createElement("p");
            monsterName.id = "monsterName";
            monsterName.innerHTML = daIsland.name;
            nameContainer.appendChild(monsterName);
        islandInfo.appendChild(nameContainer);

        const elementContainer = createInfoSection("Elements: ", true);
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

        const infoSectionNotables = createInfoSection("Notable Monsters");
            if (daIsland.notables != null)
            {
                const notablesDiv = createContentContainer();
                for (const notable of daIsland.notables)
                {
                    const daNotable = makeAmeliorateDiv(notable, "box");
                    notablesDiv.appendChild(daNotable);
                }
                infoSectionNotables.appendChild(notablesDiv);
            }

            if (daIsland.single !== null) // lazy ass
            {
                const infoSectionQuad = createMiniSection("Single");
                    const quadMonster = makeAmeliorateDiv(daIsland.single, "box");
                    quadMonster.id = "singleMonster";
                    infoSectionQuad.appendChild(quadMonster);
                infoSectionNotables.appendChild(infoSectionQuad);
            }

            if (daIsland.quad !== null)
            {
                const infoSectionQuad = createMiniSection("Quad");
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

        const infoSectionMon = createInfoSection("Monsters")
            const islandMonDiv = createContentContainer();
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

const daEvent = new CustomEvent("pageScriptRun",
{
    detail: { message: "site built" },
    bubbles: true,
    cancelable: true
});
document.dispatchEvent(daEvent);
    