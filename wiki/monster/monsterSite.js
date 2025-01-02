import { getAmeliorateById, getMonsterData, getIslands, getSongs, makeIslandDiv, makeMiniElement, makeFormDiv } from "../data.js";

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
soloMonster.style.backgroundColor = daMonster.affiliation.outside;
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
                const daSigil = makeMiniElement(element);
                elementImages.append(daSigil);
            
                elementNames.innerHTML += element.name + ", ";
            }
            elementNames.innerHTML = " " + elementNames.innerHTML.substring(0, elementNames.innerHTML.length - 2);
        monsterInfo.appendChild(elementContainer);

        const miniInfoContainer = document.createElement("div");
        miniInfoContainer.classList = ["infoSection miniInfoContainer"];
            const infoSectionGender = document.createElement("div");
            infoSectionGender.classList = ["infoSection"];
                const monsterGenderHeader = document.createElement("h3");
                monsterGenderHeader.classList = ["underlined"];
                monsterGenderHeader.innerHTML = "Gender";
                infoSectionGender.appendChild(monsterGenderHeader);

                const monsterGender = document.createElement("p");
                monsterGender.id = "monsterGender";
                infoSectionGender.appendChild(monsterGender);
            miniInfoContainer.appendChild(infoSectionGender);

            const infoSectionInst = document.createElement("div");
            infoSectionInst.classList = ["infoSection"];
                const monsterInstHeader = document.createElement("h3");
                monsterInstHeader.classList = ["underlined"];
                monsterInstHeader.innerHTML = "Instruments";
                infoSectionInst.appendChild(monsterInstHeader);
            miniInfoContainer.appendChild(infoSectionInst);
        monsterInfo.appendChild(miniInfoContainer);

        const infoSectionAna = document.createElement("div");
        infoSectionAna.classList = ["infoSection"];
            const monsterAnaHeader = document.createElement("h2");
            monsterAnaHeader.classList = ["underlined"];
            monsterAnaHeader.innerHTML = "Biology";
            infoSectionAna.appendChild(monsterAnaHeader);

            const monsterAna = document.createElement("p");
            monsterAna.id = "monsterAna";
            infoSectionAna.appendChild(monsterAna);
        monsterInfo.appendChild(infoSectionAna);

        const infoSectionBio = document.createElement("div");
        infoSectionBio.classList = ["infoSection"];
            const monsterBioHeader = document.createElement("h2");
            monsterBioHeader.classList = ["underlined"];
            monsterBioHeader.innerHTML = "Biography";
            infoSectionBio.appendChild(monsterBioHeader);

            const monsterBio = document.createElement("p");
            monsterBio.id = "monsterBio";
            infoSectionBio.appendChild(monsterBio);
        monsterInfo.appendChild(infoSectionBio);

        const infoSectionSongs = document.createElement("div");
        infoSectionSongs.classList = ["infoSection"];
            const monsterSongsHeader = document.createElement("h2");
            monsterSongsHeader.classList = ["underlined"];
            monsterSongsHeader.innerHTML = "Songs";
            infoSectionSongs.appendChild(monsterSongsHeader);

            const daIslands = getIslands().filter(island => island.monsters.includes(daMonster));

            if (daIslands.length > 0)
            {
                const infoSectionIslands = document.createElement("div");
                infoSectionIslands.classList = ["infoSection miniSection"];
                    const monsterIslandsHeader = document.createElement("h3");
                    monsterIslandsHeader.classList = ["underlined"];
                    monsterIslandsHeader.innerHTML = "Islands";
                    infoSectionIslands.appendChild(monsterIslandsHeader);

                    const monIslandDiv = document.createElement("div");
                    monIslandDiv.classList = "contentContainer";
                        for (const island of daIslands)
                        {
                            const daIslandDiv = makeIslandDiv(island);
                            monIslandDiv.appendChild(daIslandDiv);
                        }
                    infoSectionIslands.appendChild(monIslandDiv);
                infoSectionSongs.appendChild(infoSectionIslands);
            }

            const daSongs = getSongs().filter(song => song.monsters.includes(daMonster));

            if (daSongs.length > 0)
            {
                const infoSectionOtherSongs = document.createElement("div");
                infoSectionOtherSongs.classList = ["infoSection miniSection"];
                    const monsterOtherSongsHeader = document.createElement("h3");
                    monsterOtherSongsHeader.classList = ["underlined"];
                    monsterOtherSongsHeader.innerHTML = "Other Songs";
                    infoSectionOtherSongs.appendChild(monsterOtherSongsHeader);

                    const monOtherDiv = document.createElement("div");
                    monOtherDiv.classList = "contentContainer";
                        for (const song of daSongs)
                        {
                            const daSongDiv = makeIslandDiv(song);
                            monOtherDiv.appendChild(daSongDiv);
                        }
                    infoSectionOtherSongs.appendChild(monOtherDiv);
                infoSectionSongs.appendChild(infoSectionOtherSongs);
            }
        monsterInfo.appendChild(infoSectionSongs);

        const infoSectionForms = document.createElement("div");
        infoSectionForms.classList = ["infoSection"];
            const monsterFormsHeader = document.createElement("h2");
            monsterFormsHeader.classList = ["underlined"];
            monsterFormsHeader.innerHTML = "Forms";
            infoSectionForms.appendChild(monsterFormsHeader);

            const formsDiv = document.createElement("div");
            formsDiv.classList = ["contentContainer"];
            infoSectionForms.appendChild(formsDiv);

            const formsWait = document.createElement("p");
            formsWait.innerHTML = "Loading forms...";
            formsDiv.appendChild(formsWait);

            setTimeout(() =>
            {
                formsWait.remove();
                for (const form of daMonster.forms)
                {
                    const formDiv = makeFormDiv(daMonster, form, "layer");
                    formsDiv.appendChild(formDiv);
                }
            }, 1000);
        monsterInfo.appendChild(infoSectionForms);
    mainContainer.appendChild(monsterInfo);
document.body.appendChild(mainContainer);

function expiFourShenanigans()
{
    function randomizeCapitalization(str, chance)
    {
        let result = "";
    
        for (let i = 0; i < str.length; i++)
        {
            const char = str[i];
            if (Math.random() < chance)
            {
                // 10% chance to change capitalization
                result += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
            }
            else
            {
                result += char;
            }
        }
    
        return result;
    }

    const idiotAnaChance = Math.random() < 0.2;
    const idiotBioChance = Math.random() < 0.2;
    const showMessageChance = Math.random() < 0.1;
    
    if (idiotAnaChance)
    {
        monsterAna.textContent = randomizeCapitalization(monsterAna.textContent, 0.1);
    }
    if (idiotBioChance)
    {
        monsterBio.textContent = randomizeCapitalization(monsterBio.textContent, 0.1);
    }

    if (showMessageChance)
    {
        fetch("https://monstyrslayr.github.io/wiki/monster/expifour/qna.json")
        .then(response => response.json())
        .then(data =>
        {
            const messages = data.messages;
            const blacklist = ["1262459391030853682", "434840883637125121", "688867253948776562"]
            const whitelistedMessages = messages.filter(message => !blacklist.includes(message.author.id));
            const expiMessages = whitelistedMessages.filter(message => message.content.toLowerCase().includes("expi"));

            const showThisMessage = expiMessages[Math.floor(Math.random() * expiMessages.length)];

            monsterBio.innerHTML = "";

            const daMessage = document.createElement("div");
            daMessage.classList.add("daMessage");
            infoSectionBio.append(daMessage);

            const profilePic = document.createElement("img");
            profilePic.src = showThisMessage.author.avatarUrl;
            profilePic.classList.add("profilePic");
            daMessage.append(profilePic);

            const messageThings = document.createElement("div");
            messageThings.classList.add("messageThings");
            daMessage.append(messageThings);

            const messageHeader = document.createElement("div");
            messageHeader.classList.add("messageHeader");
            messageThings.append(messageHeader);

            const authorName = document.createElement("p");
            authorName.textContent = showThisMessage.author.nickname;
            authorName.style.color = showThisMessage.author.color;
            authorName.classList.add("authorName");
            messageHeader.append(authorName);

            const messageDate = document.createElement("time");
            messageDate.dateTime = showThisMessage.timestamp;
            messageDate.textContent = new Date(showThisMessage.timestamp).toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
            }).replace(",", "");
            messageDate.classList.add("messageDate");
            messageHeader.append(messageDate);

            const messageContent = document.createElement("p");
            messageContent.textContent = showThisMessage.content;
            messageContent.classList.add("messageContent");
            messageThings.append(messageContent);
        });
    }
}

getMonsterData(daId).then((monsterData) =>
{
    monsterGender.innerHTML = monsterData.gender;

    const monsterInstArray = monsterData.sound.split("|");
    for (const inst of monsterInstArray)
    {
        const instItem = document.createElement("p");
        instItem.innerHTML = inst;
        infoSectionInst.appendChild(instItem);
    }

    monsterAna.innerHTML = monsterData.ana;

    monsterBio.innerHTML = monsterData.bio;
    
    if (daId === "expifour")
    {
        expiFourShenanigans();
    }
});