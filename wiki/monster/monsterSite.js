import { getAmeliorateById, getMonsterData, getIslands, getSongs, makeIslandDiv, makeMiniElement, makeFormDiv, randomizeMonsterValues, getAmeliorates, getElements, blendHexColors, rgbFuncToHex, backgroundBlend, debug, home } from "../data.js";
import { createContainer, createContentContainer, createInfoSection, createInfoSiteHeader, createMiniSection } from "../wikiTools.js";

function getLastFolder(url, num)
{
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split('/').filter(part => part !== '').filter(part => part !== 'index.html'); // Split and remove empty elements and index.html
    return parts[parts.length - num]; // Return the last part
}

function getVisiblePercentage(el)
{
    if (!el) return 0;
    
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Determine how much of the element is visible
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);

    // If the element is completely out of view, return 0
    if (visibleHeight <= 0) return 0;

    // Calculate the percentage of the element that is visible
    return (visibleHeight / rect.height);
}

function setupOpaqueClickDetection(soloWrapper, videoElement, callback)
{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    soloWrapper.addEventListener("click", (event) =>
    {
        const rect = videoElement.getBoundingClientRect();
        const scaleX = videoElement.videoWidth / rect.width;
        const scaleY = videoElement.videoHeight / rect.height;

        // Get the clicked position relative to the video
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        if (x !== Infinity && x !== NaN)
        {
            // Draw the current video frame on the canvas
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            // Get the pixel data
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const alpha = pixel[3]; // Alpha channel (0 = transparent, 255 = fully opaque)

            if (alpha > 0)
            {
                callback(event); // Call the callback function if clicked on an opaque part
            }
        }
    });
}

// every monster functionally has the same site
// so instead of putting all of the code in each html file
// we can put it in this general javascript file

const daId = getLastFolder(window.location.href, 1);
const daMonster = getAmeliorateById(daId);
let daMonsterState = "none";

daMonster.loadForms().then(() =>
{
    const header = createInfoSiteHeader(daMonster.realName);
    document.body.appendChild(header);

    const soloMonster = document.createElement("div");
    soloMonster.classList = ["soloMonster"];
    soloMonster.style.backgroundColor = daMonster.affiliation.outside;

        const soloWrapper = document.createElement("div");
        soloWrapper.classList.add("soloWrapper");

        // safari doesn't support transparent webm files yet
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if ("idle" in daMonster.behavior == false || isSafari)
        {
            const soloGap = document.createElement("div");
            soloGap.classList = ["soloGap"];
            soloMonster.appendChild(soloGap);

            const monsterImg = document.createElement("img");
            monsterImg.id = "monsterImg";
            monsterImg.src = daMonster.images.default;
            soloMonster.appendChild(monsterImg);
        }
        else
        {
            document.body.style.backgroundColor = blendHexColors(rgbFuncToHex(window.getComputedStyle(document.body).getPropertyValue("background-color")), daMonster.dominantColor, backgroundBlend);
        
            // cool animated monster logic
            const scrollThreshold = 0.45;
            const idlingChance = 0.33;
            const sleepChance = 0.1;
            let monsterVidEnded = function() {}

            const monsterCanScroll = "scrolled" in daMonster.behavior;
            const monsterCanSleep = "sleep" in daMonster.behavior;

            const noClick = ["scrollDown", "scrolled", "intro", "sleepStart"];

            function waitForArray(array, targetLength, timeout, callback)
            {
                if (array.length >= targetLength)
                {
                    callback(array);
                    return;
                }

                let executed = false;

                const timeoutId = setTimeout(() =>
                {
                    if (!executed)
                    {
                        executed = true;
                        callback(array);
                    }
                }, timeout);

                // Array observer
                const intervalId = setInterval(() =>
                {
                    if (array.length >= targetLength && !executed)
                    {
                        executed = true;
                        clearTimeout(timeoutId);
                        clearInterval(intervalId);
                        callback(array);
                    }
                }, 50);
            }

            function changeMonsterState(state)
            {
                const idlings = Object.entries(daMonster.behavior).filter(daState => daState[0].startsWith("idling"));
                const hasIdlings = idlings.length > 0;
                const isIdling = state == "idling" && hasIdlings;

                if (state == "idling" && !isIdling) state = "idle";

                if (state == daMonsterState)
                {
                    const vid = [...document.getElementsByClassName("monsterVid")].filter(daVid => !daVid.classList.contains("monsterVidDisabled"))[0];
                    vid.currentTime = 0;
                    vid.play();
                    return vid;
                }

                if (state in daMonster.behavior || isIdling || state == daMonsterState)
                {
                    if (debug) console.log("animated monster state: " + state);
                    daMonsterState = state;

                    // my name is
                    const daVid = isIdling ? document.getElementById("vid" + idlings[Math.floor(Math.random() * idlings.length)][0]) : document.getElementById("vid" + state); // dad, i want some ice cream

                    if (daVid) // that is my name
                    {
                        function playDaVid() // i want another
                        {
                            daVid.classList.remove("monsterVidDisabled");

                            for (const vid of document.getElementsByClassName("monsterVid"))
                            {
                                if (vid !== daVid) // where is my ball ?
                                {
                                    vid.classList.add("monsterVidDisabled");
                                    vid.pause();
                                    vid.currentTime = 0;
                                }
                            }

                            // i'm running out on the road
                            // there is a car

                            daVid.play();
                            daVid.removeEventListener("canplaythrough", playDaVid);
                        }

                        // and it is going to hit, me

                        daVid.addEventListener("canplaythrough", playDaVid);
                        daVid.load();

                        // AAAAAAHH

                        return daVid;
                    }
                }

                const vid = [...document.getElementsByClassName("monsterVid")].filter(daVid => !daVid.classList.contains("monsterVidDisabled"))[0];
                vid.currentTime = 0;
                vid.play();
                return vid;
            }

            for (const state in daMonster.behavior)
            {
                const monsterVid = document.createElement("video");
                monsterVid.id = "vid" + state;
                monsterVid.classList.add("monsterVid");
                monsterVid.autoplay = false;
                monsterVid.muted = true;
                monsterVid.loop = true; // dependent for each behavior, define in switch
                monsterVid.playsInline = true;
                monsterVid.preload = "auto";
                soloMonster.appendChild(monsterVid);

                const monsterVidSource = document.createElement("source");
                monsterVidSource.type = "video/webm";
                monsterVidSource.src = home + "video/" + daMonster.behavior[state] + ".webm";
                monsterVid.appendChild(monsterVidSource);
                monsterVid.load();

                monsterVid.addEventListener("contextmenu", function(event)
                {
                    event.preventDefault();
                });

                monsterVid.addEventListener("ended", function () // only runs for non looping videos btw
                {
                    monsterVidEnded();
                });

                if (!noClick.includes(state))
                {
                    setupOpaqueClickDetection(soloWrapper, monsterVid, function ()
                    {
                        const curVid = changeMonsterState("click");
                        if (curVid) curVid.loop = false;
                    });
                }
            }

            waitForArray(document.getElementsByClassName("monsterVid"), Object.keys(daMonster.behavior).length, 50, function()
            {
                const curVid = changeMonsterState("intro");
                if (curVid) curVid.loop = false;
                else changeMonsterState("idle");

                // dynamic changing
                const monsterVidInterval = setInterval
                (
                    function ()
                    {
                        switch (daMonsterState)
                        {
                            case "idle":
                                if (getVisiblePercentage(soloMonster) < scrollThreshold && monsterCanScroll)
                                {
                                    const curVid = changeMonsterState("scrollDown");
                                    if (curVid) curVid.loop = false;
                                }
                            break;

                            case "scrolled":
                                if (getVisiblePercentage(soloMonster) > scrollThreshold)
                                {
                                    const curVid = changeMonsterState("scrollUp");
                                    if (curVid) curVid.loop = false;
                                }
                            break;
                        }
                    }, 1000/24 // frame rate
                );

                // changing on video end
                monsterVidEnded = function()
                {
                    switch (daMonsterState)
                    {
                        case "scrollDown":
                            {
                                const curVid = changeMonsterState("scrolled");
                                if (curVid) curVid.loop = true;
                            }
                        break;

                        case "sleep": case "sleepStart":
                            {
                                const curVid = changeMonsterState("sleep");
                                if (curVid) curVid.loop = false;
                            }
                        break;

                        case "idle":
                            {
                                let curVid;

                                if (Math.random() < sleepChance && monsterCanSleep)
                                {
                                    curVid = changeMonsterState("sleepStart");
                                }
                                else if (Math.random() < idlingChance)
                                {
                                    curVid = changeMonsterState("idling");
                                }
                                else
                                {
                                    curVid = changeMonsterState("idle");
                                }
                                if (curVid) curVid.loop = false;
                            }
                        break;

                        case "scrollUp": case "click": case "intro": case "idling":
                            {
                                const curVid = changeMonsterState("idle");
                                if (curVid) curVid.loop = false;
                            }
                        break;
                    }
                }
            })
        }

        soloMonster.appendChild(soloWrapper);

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
                                const daSongDiv = makeIslandDiv(song, true);
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

        function toLeetSpeak(text)
        {
            const leetChars =
            {
                'a': '4',
                'e': '3',
                'i': '1',
                'o': '0',
                's': '5',
                't': '7',
            };
          
            let leetText = '';
            for (let char of text.toLowerCase())
            {
                if (leetChars[char])
                {
                    leetText += leetChars[char];
                }
                else
                {
                    leetText += char;
                }
            }
            return leetText;
        }

        const changeBackgroundChance = 0.15;
        const textIsBWChance = 0.5;
        let contrastColor = "white";

        const idiotChance = 0.2;
        const idiotCapitalizeChance = 0.5;
        const textAlignChangeChance = 0.15;
        const textAligns = ["left", "center", "right"];
        const leetspeakChance = 0.07;

        let smileChance = 0.3;
        const smileChanceDecrease = 4;

        const transparentChance = 0.05;
        const transparency = 0.45;

        const rotateImageChance = 0.15;
        const invertImageChance = 0.05;
        const deleteImageChance = 0.03;
        const multiplyImageChance = 0.1;
        const flipHorizontalChance = 0.15;
        const flipVerticalChance = 0.15;

        const halfWidthDivChance = 0.01;
        const shrinkDivChance = 0.02;
        const shrink = 0.75;
        const flexDirectionChance = 0.12;
        const flexDirections = ["row", "row-reverse", "column", "column-reverse"];
        const flexJustificationChance = 0.15;
        const flexJusts = ["space-around", "space-evenly", "space-between", "flex-start", "flex-end", "center"];

        const alertUserChance = 0.1;
        const alertDelay = 3000;

        const changeSoloMonsterChance = 0.01;
        const changeSigilChance = 0.01;
        const showMessageChance = 0.1;

        const wackyNumbersChance = 0.8;

        if (Math.random() < changeSoloMonsterChance)
        {
            const ameliorates = getAmeliorates();
            const ameli = ameliorates[Math.floor(Math.random() * ameliorates.length)];
            monsterImg.src = ameli.images.default;
            soloMonster.style.backgroundColor = ameli.affiliation.outside;
        }

        if (Math.random() < changeBackgroundChance)
        {
            document.body.style.backgroundColor = getRandomHexColor();
            contrastColor = invertColor(rgbToHex(document.body.style.backgroundColor), Math.random() < textIsBWChance);
        }

        for (const div of document.body.getElementsByTagName("div"))
        {
            if (Math.random() < halfWidthDivChance)
            {
                div.style.width = "50%";
                div.style.marginLeft = "auto";
                div.style.marginRight = "auto";
            }
            else
            {
                div.style.width = "";
                div.style.marginLeft = "";
                div.style.marginRight = "";
            }

            if (Math.random() < shrinkDivChance)
            {
                div.style.scale = (shrink * 100) + "%";
            }
            else
            {
                div.style.scale = "";
            }

            if (Math.random() < flexDirectionChance)
            {
                div.style.flexDirection = flexDirections[Math.floor(Math.random() * flexDirections.length)];
            }

            if (Math.random() < flexJustificationChance)
            {
                div.style.justifyContent = flexJusts[Math.floor(Math.random() * flexJusts.length)];
            }
        }

        for (const anchor of document.body.getElementsByTagName("a"))
        {
            if (Math.random() < halfWidthDivChance)
            {
                anchor.style.width = "50%";
                anchor.style.marginLeft = "auto";
                anchor.style.marginRight = "auto";
            }
            else
            {
                anchor.style.width = "";
                anchor.style.marginLeft = "";
                anchor.style.marginRight = "";
            }

            if (Math.random() < shrinkDivChance)
            {
                anchor.style.scale = (shrink * 100) + "%";
            }
            else
            {
                anchor.style.scale = "";
            }

            if (Math.random() < flexDirectionChance)
            {
                anchor.style.flexDirection = flexDirections[Math.floor(Math.random() * flexDirections.length)];
            }

            if (Math.random() < flexJustificationChance)
            {
                anchor.style.justifyContent = flexJusts[Math.floor(Math.random() * flexJusts.length)];
            }
        }
        
        for (const paragraph of [...document.body.getElementsByTagName("p"), ...document.body.getElementsByTagName("label"),
                                ...document.body.getElementsByTagName("h2"), ...document.body.getElementsByTagName("h1")])
        {
            paragraph.style.color = contrastColor;

            if (Math.random() < idiotChance)
            {
                paragraph.textContent = randomizeCapitalization(paragraph.textContent, idiotCapitalizeChance);
            }

            if (Math.random() < leetspeakChance)
            {
                paragraph.textContent = toLeetSpeak(paragraph.textContent);
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

            if (Math.random() < textAlignChangeChance)
            {
                paragraph.style.textAlign = textAligns[Math.floor(Math.random() * textAligns.length)];
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

            if (Math.random() < multiplyImageChance)
            {
                image.style.mixBlendMode = "multiply";
            }
            else
            {
                image.style.mixBlendMode = "";
            }

            if (Math.random() < flipHorizontalChance)
            {
                image.classList.add("flipHorizontal");
            }
            else
            {
                image.classList.remove("flipHorizontal");
            }

            if (Math.random() < flipVerticalChance)
            {
                image.classList.add("flipVertical");
            }
            else
            {
                image.classList.remove("flipVertical");
            }

            if (image.classList.contains("miniElement"))
            {
                if (Math.random() < changeSigilChance)
                {
                    const elements = getElements();
                    const daElement = elements[Math.floor(Math.random() * elements.length)];
                    const isActive = image.src.endsWith("Active.png");
                    if (isActive) image.src = daElement.active;
                    else image.src = daElement.sigil;
                }
            }
        }

        if (Math.random() < showMessageChance && !hasPlayedTheseGamesBefore)
        {
            fetch(home + "monster/expifour/qna.json")
            .then(response => response.json())
            .then(data =>
            {
                const messages = data.messages;
                const blacklist = ["1262459391030853682", "434840883637125121", "688867253948776562"];
                const wordBlacklist = ["jesus"]; // fuck you in particular
                const whitelistedMessages = messages.filter(message => !blacklist.includes(message.author.id) && !wordBlacklist.some(string => message.content.includes(string)));
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

        if (Math.random() < alertUserChance)
        {
            setTimeout(function()
            {
                alert("expi four alert");
            }, alertDelay);
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
            const loopExpiFourShenanigans = Math.random() < 0.1;
            const loopTimer = 10000;

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
})
.then(() =>
{
    const daEvent = new CustomEvent("pageScriptRun",
    {
        detail: { message: "site built" },
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(daEvent);
});
