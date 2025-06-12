import { Monster, getRarities, getClasses, getMonsters } from "https://monstyrslayr.github.io/msmTools/monsters.js";

class MonsterData // wrapper class linking monster to their div without spoiling it in the dom
{
    constructor(monster, portraitDiv)
    {
        this.monster = monster;
        this.portraitDiv = portraitDiv;
        this.monsterImg = portraitDiv.firstChild;

        this.isRevealed = false;
        this.isOutline = false;
        this.revealedWithoutOutline = false;
        this.forefited = false;

        this.revealMonster = function()
        {
            this.isRevealed = true;

            if (this.isOutline) this.monsterImg.src = this.monster.portrait;
            else
            {
                this.monsterImg.src = this.monster.square;
                this.revealedWithoutOutline = true;
            }

            if (!this.forefited)
            {
                const sound = new Audio(this.monster.memory);
                console.log(this.monster);
                console.log(this.monster.memory);
                sound.play();
            }

            this.portraitDiv.classList.add("revealed");
        }

        this.outlineMonster = function()
        {
            this.isOutline = true;

            if (this.isRevealed) this.monsterImg.src = this.monster.portrait;
            else this.monsterImg.src = this.monster.portraitBlack;
        }

        this.forefitMonster = function()
        {
            this.forefited = true;
            this.revealMonster();
        }
    }
}

class MonsterBox // holds monster portraits etc
{
    constructor(title = "")
    {
        this.title = title;
        this.monDatas = []; // stupid

        this.div = document.createElement("div");
        this.div.classList.add("monsterBox");

        this.h2 = document.createElement("h2");
        this.h2.textContent = title;
        this.div.appendChild(this.h2);

        this.portraitsDiv = document.createElement("div");
        this.portraitsDiv.classList.add("monsterBoxPortraits");
        this.div.appendChild(this.portraitsDiv);

        this.addMonster = function(monData)
        {
            this.monDatas.push(monData);
            this.portraitsDiv.appendChild(monData.portraitDiv);
        }

        this.verifyComplete = function()
        {
            let isComplete = true;
            for (const monData of this.monDatas)
            {
                if (!monData.isRevealed)
                {
                    isComplete = false;
                    break;
                }
            }

            if (isComplete)
            {
                this.div.classList.add("completed");
            }
            else
            {
                this.div.classList.remove("completed");
            }
        }
    }
}

function createMonsterBoxCol()
{
    const daDiv = document.createElement("div");
    daDiv.classList.add("monsterBoxCol");

    return daDiv;
}

function createMonsterPortrait()
{
    const daDiv = document.createElement("div");
    daDiv.classList.add("monsterPortraitDiv");

    const daImg = document.createElement("img");
    daImg.src = "https://monstyrslayr.github.io/msmTools/img/square/monster_portrait_prize.avif";
    daDiv.appendChild(daImg);

    return daDiv;
}

async function main()
{
    const fullScreenWarningDiv = document.createElement("div");
    fullScreenWarningDiv.classList.add("fullScreenWarning");
    document.body.appendChild(fullScreenWarningDiv);

    function showFullScreenWarning(warning, buttons = [], contents = [])
    {
        fullScreenWarningDiv.innerHTML = "";
        fullScreenWarningDiv.classList.remove("hidden");

        const daHeading = document.createElement("h1");
        daHeading.textContent = warning;
        fullScreenWarningDiv.appendChild(daHeading);

        if (contents.length > 0)
        {
            const contentsDiv = document.createElement("div");
            contentsDiv.classList.add("contentsDiv");
            fullScreenWarningDiv.appendChild(contentsDiv);

            for (const content of contents)
            {
                const schtuff = document.createElement("h2");
                schtuff.textContent = content;
                contentsDiv.appendChild(schtuff);
            }
        }

        if (buttons.length > 0)
        {
            const buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("buttonsDiv");
            fullScreenWarningDiv.appendChild(buttonsDiv);

            for (const button of buttons)
            {
                buttonsDiv.appendChild(button);
            }
        }
    }

    function closeFullScreenWarning()
    {
        fullScreenWarningDiv.innerHTML = "";
        fullScreenWarningDiv.classList.add("hidden");
    }
    closeFullScreenWarning();

    function showToast(message, duration = 3000)
    {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger fade-in
        requestAnimationFrame(() =>
        {
            toast.classList.add("show");
        });

        // Fade-out and remove
        setTimeout(() =>
        {
            toast.classList.remove("show");
            toast.addEventListener("transitionend", () => toast.remove());
        }, duration);
    }

    const monsterData = [];
    const RARITY = getRarities();
    const MCLASS = getClasses();
    const allowedRarities = [RARITY.COMMON, RARITY.ADULT, RARITY.MAJOR];
    const monsters = await getMonsters();

    const commonMonsters = monsters.filter((monster = Monster) => allowedRarities.includes(monster.rarity));
    // const commonMonsters = monsters.filter((monster = Monster) => monster.class == MCLASS.DIPSTER);

    let startTime = null;
    let elapsedTime = 0;
    let endTime = null;

    // console.log(commonMonsters); // works

    const bigAssHeading = document.createElement("h1");
    bigAssHeading.textContent = "My Singing Monsters Ultimate Memory Game";
    document.body.appendChild(bigAssHeading);

    const topBarWrapper = document.createElement("div");
    topBarWrapper.classList.add("topBarWrapper");
    document.body.appendChild(topBarWrapper);

        const topBar = document.createElement("div");
        topBar.classList.add("topBar");
        topBarWrapper.appendChild(topBar);

            const playerInputBox = document.createElement("input");
            playerInputBox.type = "text";
            playerInputBox.placeholder = "Type a monster...";
            playerInputBox.classList.add("playerInputBox");
            topBar.appendChild(playerInputBox);

            const monsterCount = document.createElement("div");
            monsterCount.classList.add("monsterCount");
            topBar.appendChild(monsterCount);

                const monsterNumerator = document.createElement("p");
                monsterNumerator.textContent = "0";
                monsterCount.appendChild(monsterNumerator);

                const monsterSlashinator = document.createElement("p");
                monsterSlashinator.textContent = "/";
                monsterCount.appendChild(monsterSlashinator);

                const monsterDenominator = document.createElement("p");
                monsterDenominator.textContent = commonMonsters.length;
                monsterCount.appendChild(monsterDenominator);

            const timerWrapper = document.createElement("div");
            timerWrapper.classList.add("timerWrapper");
            topBar.appendChild(timerWrapper);

                const timerLabel = document.createElement("p");
                timerLabel.textContent = "Timer:";
                timerWrapper.appendChild(timerLabel);

                const timerTime = document.createElement("p");
                timerTime.textContent = "00:00:00:000";
                timerTime.classList.add("timerTime");
                timerWrapper.appendChild(timerTime);

    const missedMonstersDiv = document.createElement("div");
    missedMonstersDiv.classList.add("monsterBox");
    missedMonstersDiv.classList.add("hidden");
    document.body.appendChild(missedMonstersDiv);

        const missedHeader = document.createElement("h2");
        missedHeader.textContent = "Missed";
        missedMonstersDiv.appendChild(missedHeader);
        
        const missedPortraitsDiv = document.createElement("div");
        missedPortraitsDiv.classList.add("monsterBoxPortraitsWithNames");
        missedMonstersDiv.appendChild(missedPortraitsDiv);

    const monsterBoxesWrapper = document.createElement("div");
    monsterBoxesWrapper.classList.add("monsterBoxesWrapper");
    document.body.appendChild(monsterBoxesWrapper);

        const monsterBoxesDiv = document.createElement("div");
        monsterBoxesDiv.classList.add("monsterBoxes");
        monsterBoxesWrapper.appendChild(monsterBoxesDiv);

    const naturalBox = new MonsterBox("Naturals");
    const fireBox = new MonsterBox("Fire Naturals");
    const magicalBox = new MonsterBox("Magicals");
    const mythicalBox = new MonsterBox("Mythicals");
    const seasonalBox = new MonsterBox("Seasonals");
    const etherealBox = new MonsterBox("Ethereals");
    const supernaturalBox = new MonsterBox("Supernaturals");
    const legendaryBox = new MonsterBox("Legendaries");
    const celestialBox = new MonsterBox("Celestials");
    const dipsterBox = new MonsterBox("Dipsters");
    const titanBox = new MonsterBox("Titansouls");
    const paironormalBox = new MonsterBox("Paironormals");
    const primordialBox = new MonsterBox("Primordials");

    const monsterBoxes = [naturalBox, fireBox, magicalBox, mythicalBox, seasonalBox, etherealBox, supernaturalBox, legendaryBox, celestialBox, dipsterBox, titanBox, paironormalBox, primordialBox];

    const monsterBoxCols = [createMonsterBoxCol(), createMonsterBoxCol(), createMonsterBoxCol(), createMonsterBoxCol()];

    monsterBoxCols[0].appendChild(naturalBox.div);
    monsterBoxCols[0].appendChild(fireBox.div);
    monsterBoxCols[0].appendChild(celestialBox.div);

    monsterBoxCols[1].appendChild(magicalBox.div);
    monsterBoxCols[1].appendChild(mythicalBox.div);
    monsterBoxCols[1].appendChild(dipsterBox.div);

    monsterBoxCols[2].appendChild(etherealBox.div);
    monsterBoxCols[2].appendChild(seasonalBox.div);
    monsterBoxCols[2].appendChild(paironormalBox.div);

    monsterBoxCols[3].appendChild(supernaturalBox.div);
    monsterBoxCols[3].appendChild(legendaryBox.div);
    monsterBoxCols[3].appendChild(titanBox.div);
    monsterBoxCols[3].appendChild(primordialBox.div);

    for (const col of monsterBoxCols)
    {
        monsterBoxesDiv.appendChild(col);
    }

    for (const mon of commonMonsters)
    {
        const monData = new MonsterData(mon, createMonsterPortrait());
        monsterData.push(monData);
        let daBox = null;

        monData.monster.name = monData.monster.name.replace(/\b(Adult|Major)\b/gi, "").trim().replace(/\s+/g, " ");

        switch (mon.class)
        {
            case MCLASS.NATURAL: default: // stupid dumb default just in case i mess up in the future when more classes are added
                daBox = naturalBox;
                break;
            
            case MCLASS.FIRE:
                daBox = fireBox;
                break;

            case MCLASS.MAGICAL:
                daBox = magicalBox;
                break;

            case MCLASS.MYTHICAL: case MCLASS.DREAMYTHICAL:
                daBox = mythicalBox;
                break;
            
            case MCLASS.SEASONAL:
                daBox = seasonalBox;
                break;
            
            case MCLASS.ETHEREAL:
                daBox = etherealBox;
                break;

            case MCLASS.SUPERNATURAL:
                daBox = supernaturalBox;
                break;

            case MCLASS.WERDO: case MCLASS.SHUGAFAM:
                daBox = legendaryBox;
                break;

            case MCLASS.CELESTIAL:
                daBox = celestialBox;
                break;
            
            case MCLASS.DIPSTER:
                daBox = dipsterBox;
                break;
            
            case MCLASS.TITANSOUL:
                daBox = titanBox;
                break;
            
            case MCLASS.PAIRONORMAL:
                daBox = paironormalBox;
                break;

            case MCLASS.PRIMORDIAL:
                daBox = primordialBox;
                break;
        }

        daBox.addMonster(monData);
    }

    function endGame()
    {
        showOutlinesButton.classList.add("disabled");
        forefitButton.classList.add("disabled");

        endTime = performance.now();

            const closeWarning = document.createElement("button");
            closeWarning.textContent = "Close";
            closeWarning.addEventListener("click", function()
            {
                closeFullScreenWarning();
            });

        const foundNoOutlineMonsters = monsterData.filter((dat) => !dat.forefited && dat.revealedWithoutOutline);
        const nonForefitMonsters = monsterData.filter((dat) => !dat.forefited);

        showFullScreenWarning("Well Done!", [closeWarning], [`You recalled ${nonForefitMonsters.length}/${monsterData.length} monsters in ${formatTime(elapsedTime)}`,
                        `You found ${foundNoOutlineMonsters.length}/${monsterData.length} without activating outlines`]);
    }

    const bottomBarWrapper = document.createElement("div");
    bottomBarWrapper.classList.add("bottomBarWrapper");
    document.body.appendChild(bottomBarWrapper);

        const bottomBar = document.createElement("div");
        bottomBar.classList.add("bottomBar");
        bottomBarWrapper.appendChild(bottomBar);

            const showOutlinesButton = document.createElement("button");
            showOutlinesButton.textContent = "Reveal Outlines";
            showOutlinesButton.classList.add("showOutlinesButton");
            bottomBar.appendChild(showOutlinesButton);

                const showDaOutlines = document.createElement("button");
                showDaOutlines.textContent = "Reveal Outlines";
                showDaOutlines.addEventListener("click", function()
                {
                    for (const monData of monsterData)
                    {
                        monData.outlineMonster();
                    }
                    showOutlinesButton.classList.add("disabled");
                    closeFullScreenWarning();
                });

                const dontShowDaOutlines = document.createElement("button");
                dontShowDaOutlines.textContent = "Cancel";
                dontShowDaOutlines.addEventListener("click", function()
                {
                    closeFullScreenWarning();
                });

                showOutlinesButton.addEventListener("click", function()
                {
                    if (!showOutlinesButton.classList.contains("disabled"))
                    {
                        showFullScreenWarning("Are you sure you want to show outlines? You won't be able to turn the option off.", [showDaOutlines, dontShowDaOutlines]);
                    }
                });
            
            const forefitButton = document.createElement("button");
            forefitButton.textContent = "Give Up";
            forefitButton.classList.add("forefitButton");
            bottomBar.appendChild(forefitButton);

                const giveIn = document.createElement("button");
                giveIn.textContent = "Give Up";
                giveIn.addEventListener("click", function()
                {
                    for (const monData of monsterData.filter((dat) => !dat.isRevealed))
                    {
                        monData.forefitMonster();

                        const missedMeDiv = document.createElement("div");
                        missedMeDiv.classList.add("missedMonster");
                        missedPortraitsDiv.appendChild(missedMeDiv);

                            const daPortraitDiv = createMonsterPortrait();
                            daPortraitDiv.firstChild.src = monData.monsterImg.src;
                            missedMeDiv.appendChild(daPortraitDiv);

                            const daName = document.createElement("p");
                            daName.textContent = monData.monster.name;
                            missedMeDiv.appendChild(daName);
                    }
                    closeFullScreenWarning();

                    missedMonstersDiv.classList.remove("hidden");
                    endGame();
                });

                const neverDie = document.createElement("button");
                neverDie.textContent = "Cancel";
                neverDie.addEventListener("click", function()
                {
                    closeFullScreenWarning();
                });

                forefitButton.addEventListener("click", function()
                {
                    if (!forefitButton.classList.contains("disabled"))
                    {
                        showFullScreenWarning("Are you sure you want to give up?", [giveIn, neverDie]);
                    }
                });
            
            // crude but works
            const restartButton = document.createElement("button");
            restartButton.textContent = "Restart";
            restartButton.classList.add("restartButton");
            bottomBar.appendChild(restartButton);

                const hellYes = document.createElement("button");
                hellYes.textContent = "Restart";
                hellYes.addEventListener("click", function()
                {
                    startTime = null;
                    elapsedTime = null;
                    endTime = null;
                    
                    showOutlinesButton.classList.remove("disabled");
                    forefitButton.classList.remove("disabled");
                    missedMonstersDiv.classList.add("hidden");
                    missedPortraitsDiv.innerHTML = "";
                    playerInputBox.value = "";

                    monsterNumerator.textContent = "0";

                    for (const monData of monsterData)
                    {
                        monData.isOutline = false;
                        monData.isRevealed = false;
                        monData.revealedWithoutOutline = false;
                        monData.forefited = false;

                        const newPortraitDiv = createMonsterPortrait();
                        monData.portraitDiv.replaceWith(newPortraitDiv);
                        monData.portraitDiv = newPortraitDiv;
                        monData.monsterImg = monData.portraitDiv.firstChild;
                    }

                    for (const daBox of monsterBoxes)
                    {
                        daBox.verifyComplete();
                    }

                    closeFullScreenWarning();
                    showToast("Game restarted!");
                });

                const heavensNo = document.createElement("button");
                heavensNo.textContent = "Cancel";
                heavensNo.addEventListener("click", function()
                {
                    closeFullScreenWarning();
                });

                restartButton.addEventListener("click", function()
                {
                    if (!restartButton.classList.contains("disabled"))
                    {
                        showFullScreenWarning("Are you sure you want to restart the game?", [hellYes, heavensNo]);
                    }
                });

    function formatTime(ms)
    {
        const totalMilliseconds = Math.floor(ms);
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = totalMilliseconds % 1000;

        // Pad with leading zeros
        const pad = (n, len = 2) => String(n).padStart(len, '0');
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
    }

    function updateTimer()
    {
        const now = performance.now();
        
        if (startTime == null) elapsedTime = 0;
        else if (endTime == null) elapsedTime = now - startTime;
        else elapsedTime = endTime - startTime;

        timerTime.textContent = formatTime(elapsedTime);
        requestAnimationFrame(updateTimer);
    }
    updateTimer();

    function normalizeAndTrim(str)
    {
        return str
            .normalize("NFD")                  // decompose accented characters
            .replace(/[\u0300-\u036f]/g, "")   // remove diacritical marks
            .replace(/[^a-z0-9]/gi, "")        // remove non alphanumeric characters
            .toLowerCase();                    // take a wild guess
    }

    playerInputBox.focus();

    document.addEventListener("keydown", (e) =>
    {
        const isTypingInTextbox = document.activeElement === playerInputBox;

        // Ignore keys like Shift, Control, etc.
        if (e.key.length === 1 && !isTypingInTextbox && fullScreenWarningDiv.classList.contains("hidden"))
        {
            e.preventDefault(); // prevent accidental scrolling or default behavior
            playerInputBox.focus();

            // Append the typed character
            const val = playerInputBox.value;
            const start = playerInputBox.selectionStart;
            const end = playerInputBox.selectionEnd;

            playerInputBox.value = val.slice(0, start) + e.key + val.slice(end);
            
            // Move the cursor after the inserted character
            playerInputBox.setSelectionRange(start + 1, start + 1);
        }
    });

    playerInputBox.addEventListener("input", (event) =>
    {
        const trimmedVal = normalizeAndTrim(event.target.value);

        for (const monData of monsterData)
        {
            if (trimmedVal == normalizeAndTrim(monData.monster.name))
            {
                if (!monData.isRevealed)
                {
                    monData.revealMonster();
                    event.target.value = "";

                    const foundMonsters = monsterData.filter((dat) => dat.isRevealed);
                    monsterNumerator.textContent = foundMonsters.length;

                    for (const daBox of monsterBoxes)
                    {
                        daBox.verifyComplete();
                    }

                    if (startTime == null)
                    {
                        startTime = performance.now();
                    }

                    if (foundMonsters.length == monsterData.length && endTime == null)
                    {
                        endGame();
                    }
                    break;
                }
            }
        }
    });

    playerInputBox.addEventListener("keydown", function(event)
    {
        if (event.key === "Enter")
        {
            event.preventDefault();

            const trimmedVal = normalizeAndTrim(event.target.value);

            for (const monData of monsterData)
            {
                if (trimmedVal == normalizeAndTrim(monData.monster.name))
                {
                    if (monData.isRevealed)
                    {
                        showToast(`${monData.monster.name} has already been found!`);
                    }
                }
            }
        }
    });

    const footer = document.createElement("footer");
    document.body.appendChild(footer);

        const footerParagraph = document.createElement("p");
        footerParagraph.innerHTML = `
            Can you recall every MSM monster? Enter your first monster to begin.<br>
            If you find any bugs or have some feedback, dm <a href="https://discord.com/channels/@me/434840883637125121" target="_blank">@monstyrSlayr on Discord.</a><br>
            This project is heavily inspired by <a href="https://pkmnquiz.com/" target="_blank">pkmnquiz.com</a>, go check it out!<br>
            <a href="https://monstyrslayr.github.io/msmProjects" target="_blank">Check out some of my other MSM related projects!</a><br>
            Portions of the materials used are trademarks and/or copyrighted works of Big Blue Bubble. All rights reserved
            by Big Blue Bubble. This material is not official and is not endorsed by Big Blue Bubble.
        `;
        footer.appendChild(footerParagraph);
}

main();
