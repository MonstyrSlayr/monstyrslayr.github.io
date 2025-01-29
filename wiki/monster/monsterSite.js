import { getAmeliorateById, getMonsterData, getIslands, getSongs, makeIslandDiv, makeMiniElement, makeFormDiv, randomizeMonsterValues } from "../data.js";
import { createContainer, createContentContainer, createInfoSection, createInfoSiteHeader, createMiniSection } from "../wikiTools.js";

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

daMonster.loadForms().then(() =>
{

    const header = createInfoSiteHeader(daMonster.realName);
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

    const mainContainer = createContainer();
        const monsterInfo = document.createElement("div");
        monsterInfo.id = "monsterInfo";
            const nameContainer = createInfoSection("Name: ", true);
                const monsterName = document.createElement("p");
                monsterName.id = "monsterName";
                monsterName.innerHTML = daMonster.realName;
                nameContainer.appendChild(monsterName);
            monsterInfo.appendChild(nameContainer);

            const elementContainer = createInfoSection("Elements: ", true);
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
                const infoSectionHeight = createInfoSection("Height");
                    const monsterHeight = document.createElement("p");
                    monsterHeight.innerHTML = (daMonster.heightIsApprox ? "≈ " : "") + daMonster.height + " cm";
                    infoSectionHeight.appendChild(monsterHeight);
                miniInfoContainer.appendChild(infoSectionHeight);

                const infoSectionWeight = createInfoSection("Weight");
                    const monsterWeight = document.createElement("p");
                    monsterWeight.innerHTML = (daMonster.weightIsApprox ? "≈ " : "") + daMonster.weight + " kg";
                    infoSectionWeight.appendChild(monsterWeight);
                miniInfoContainer.appendChild(infoSectionWeight);
                
                const infoSectionGender = createInfoSection("Gender");
                    const monsterGender = document.createElement("p");
                    monsterGender.id = "monsterGender";
                    infoSectionGender.appendChild(monsterGender);
                miniInfoContainer.appendChild(infoSectionGender);

                const infoSectionInst = createInfoSection("Instruments");
                miniInfoContainer.appendChild(infoSectionInst);
            monsterInfo.appendChild(miniInfoContainer);

            const infoSectionAna = createInfoSection("Biology");
                const monsterAna = document.createElement("p");
                monsterAna.id = "monsterAna";
                infoSectionAna.appendChild(monsterAna);
            monsterInfo.appendChild(infoSectionAna);

            const infoSectionBio = createInfoSection("Biography");
                const monsterBio = document.createElement("p");
                monsterBio.id = "monsterBio";
                infoSectionBio.appendChild(monsterBio);
            monsterInfo.appendChild(infoSectionBio);

            const infoSectionSongs = createInfoSection("Songs");
                const daIslands = getIslands().filter(island => island.monsters.includes(daMonster));

                if (daIslands.length > 0)
                {
                    const infoSectionIslands = createMiniSection("Islands");
                        const monIslandDiv = createContentContainer();
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
                    const infoSectionOtherSongs = createMiniSection("Other Songs");
                        const monOtherDiv = createContentContainer();
                            for (const song of daSongs)
                            {
                                const daSongDiv = makeIslandDiv(song);
                                monOtherDiv.appendChild(daSongDiv);
                            }
                        infoSectionOtherSongs.appendChild(monOtherDiv);
                    infoSectionSongs.appendChild(infoSectionOtherSongs);
                }
            monsterInfo.appendChild(infoSectionSongs);

            const infoSectionForms = createInfoSection("Forms");
                const formsDiv = createContentContainer();
                infoSectionForms.appendChild(formsDiv);

                for (const form of daMonster.forms)
                {
                    formsDiv.appendChild(makeFormDiv(daMonster, form, "layer"))
                }
            monsterInfo.appendChild(infoSectionForms);
        mainContainer.appendChild(monsterInfo);
    document.body.appendChild(mainContainer);

    function expiFourShenanigans(hasPlayedTheseGamesBefore = false)
    {
        function getRandomHexColor()
        {
            let hex = "#";
            for (let i = 0; i < 6; i++)
            {
                hex += Math.floor(Math.random() * 16).toString(16);
            }
            return hex;
        }

        function rgbToHex(rgbString)
        {
            const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          
            if (match)
            {
                const r = parseInt(match[1]).toString(16).padStart(2, '0');
                const g = parseInt(match[2]).toString(16).padStart(2, '0');
                const b = parseInt(match[3]).toString(16).padStart(2, '0');
            
                return `#${r}${g}${b}`;
            }
            else
            {
                return rgbString;
            }
        }

        function padZero(str, len)
        {
            len = len || 2;
            var zeros = new Array(len).join("0");
            return (zeros + str).slice(-len);
        }

        function invertColor(hex, bw)
        {
            if (hex.indexOf("#") === 0)
            {
                hex = hex.slice(1);
            }

            if (hex.length === 3)
            {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }

            if (hex.length !== 6)
            {
                throw new Error("Invalid HEX color.");
            }

            var r = parseInt(hex.slice(0, 2), 16),
                g = parseInt(hex.slice(2, 4), 16),
                b = parseInt(hex.slice(4, 6), 16);
            
            if (bw)
            {
                return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                    ? "#000000"
                    : "#FFFFFF";
            }
            
            r = (255 - r).toString(16);
            g = (255 - g).toString(16);
            b = (255 - b).toString(16);
            
            return "#" + padZero(r) + padZero(g) + padZero(b);
        }

        function randomizeCapitalization(str, chance)
        {
            let result = "";
        
            for (let i = 0; i < str.length; i++)
            {
                const char = str[i];
                if (Math.random() < chance)
                {
                    result += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
                }
                else
                {
                    result += char;
                }
            }
        
            return result;
        }

        const changeBackgroundChance = 0.1;
        const textIsBWChance = 0.5;
        let contrastColor = "white";

        const idiotChance = 0.2;
        const idiotCapitalizeChance = 0.1;
        const showMessageChance = 0.1;

        let smileChance = 0.3;
        const smileChanceDecrease = 4;

        const transparentChance = 0.05;
        const transparency = 0.45;

        const rotateImageChance = 0.15;
        const invertImageChance = 0.05;
        const deleteImageChance = 0.03;

        if (Math.random() < changeBackgroundChance)
        {
            document.body.style.backgroundColor = getRandomHexColor();
            contrastColor = invertColor(rgbToHex(document.body.style.backgroundColor), Math.random() < textIsBWChance);
        }
        
        for (const paragraph of [...document.body.getElementsByTagName("p"), ...document.body.getElementsByTagName("label"),
                                ...document.body.getElementsByTagName("h2"), ...document.body.getElementsByTagName("h1")])
        {
            paragraph.style.color = contrastColor;

            if (Math.random() < idiotChance)
            {
                paragraph.textContent = randomizeCapitalization(paragraph.textContent, idiotCapitalizeChance);
            }

            if (Math.random() < smileChance && !paragraph.textContent.trim().endsWith(":") && !paragraph.textContent.trim().endsWith(":)"))
            {
                paragraph.textContent = paragraph.textContent + " :)";
                smileChance = smileChance/smileChanceDecrease;
            }

            if (Math.random() < transparentChance)
            {
                paragraph.style.opacity = transparency;
            }
            else
            {
                paragraph.style.opacity = 1;
            }
        }

        for (const image of document.body.getElementsByTagName("img"))
        {
            if (Math.random() < rotateImageChance)
            {
                let rotation = Math.random() * 360;
                image.style.transform = "rotate(" + rotation + "deg)";
            }

            if (Math.random() < invertImageChance)
            {
                image.style.filter = "invert(1)";
                image.style.webkitFilter = "invert(1)";
            }
            else
            {
                image.style.filter = "";
                image.style.webkitFilter = "";
            }

            if (Math.random() < transparentChance)
            {
                image.style.opacity = transparency;
            }
            else
            {
                image.style.opacity = "";
            }

            if (Math.random() < deleteImageChance)
            {
                image.style.display = "none";
            }
            else
            {
                image.style.display = "";
            }
        }

        if (Math.random() < showMessageChance && !hasPlayedTheseGamesBefore)
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

        if (!hasPlayedTheseGamesBefore)
        {
            const changeNumberInterval = 1000;
            const approxChance = 0.4;
            const changeWeightDelay = 500;
            const wackyNumbersChance = 0.5;

            if (Math.random() < wackyNumbersChance)
            {
                setInterval(function ()
                {
                    randomizeMonsterValues(daMonster)
                    daMonster.heightIsApprox = Math.random() < approxChance;
                    monsterHeight.innerHTML = (daMonster.heightIsApprox ? "≈ " : "") + daMonster.height + " cm";
                }, changeNumberInterval);
            }

            if (Math.random() < wackyNumbersChance)
            {
                setTimeout(function()
                {
                    setInterval(function ()
                    {
                        randomizeMonsterValues(daMonster)
                        daMonster.weightIsApprox = Math.random() < approxChance;
                        monsterWeight.innerHTML = (daMonster.weightIsApprox ? "≈ " : "") + daMonster.weight + " kg";
                    }, changeNumberInterval);
                }, changeWeightDelay);
            }
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
            let loopExpiFourShenanigans = Math.random() < 0.1;
            let loopTimer = 10000;

            expiFourShenanigans(false);

            if (loopExpiFourShenanigans)
            {
                setInterval(function()
                {
                    expiFourShenanigans(true);
                }, loopTimer)
            }
        }
    });
});