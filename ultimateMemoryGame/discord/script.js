import { getRarities, getClasses, getMonsters } from "https://monstyrslayr.github.io/msmTools/monsters.js";

function showToast(message, duration = 3000)
{
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;
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

function showToastDiv(daDiv, duration = 3000)
{
    daDiv.classList.add("toast");
    document.body.appendChild(daDiv);

    // Trigger fade-in
    requestAnimationFrame(() =>
    {
        daDiv.classList.add("show");
    });

    // Fade-out and remove
    setTimeout(() =>
    {
        daDiv.classList.remove("show");
        daDiv.addEventListener("transitionend", () => daDiv.remove());
    }, duration);
}

class MonsterData // wrapper class linking monster to their div without spoiling it in the dom
{
    constructor(monster, portraitDiv)
    {
        this.monster = monster;
        this.portraitDiv = portraitDiv;
        this.monsterImg = portraitDiv.querySelector("img");

        this.isRevealed = false;
        this.isOutline = false;
        this.revealedWithoutOutline = false;
        this.forefited = false;

        this.changePortraitImage = function(src) // always webp file
        {
            this.monsterImg.src = src;
        }

        this.resetPortrait = function()
        {
            if (this.isRevealed)
            {
                if (this.isOutline) this.changePortraitImage(this.monster.portrait);
                else this.changePortraitImage(this.monster.square);
            }
            else
            {
                if (this.isOutline) this.changePortraitImage(this.monster.portraitBlack);
                else this.changePortraitImage("https://monstyrslayr.github.io/msmTools/webp/square/monster_portrait_prize.webp");
            }
        }

        this.revealMonster = function()
        {
            this.isRevealed = true;

            if (this.isOutline) this.changePortraitImage(this.monster.portrait);
            else
            {
                this.changePortraitImage(this.monster.square);
                this.revealedWithoutOutline = true;
            }

            if (!this.forefited)
            {
                const sound = new Audio(this.monster.memory);
                sound.play();
            }

            this.portraitDiv.classList.add("revealed");
        }

        this.outlineMonster = function()
        {
            this.isOutline = true;

            if (this.isRevealed) this.changePortraitImage(this.monster.portrait);
            else this.changePortraitImage(this.monster.portraitBlack);
        }

        this.forefitMonster = function()
        {
            this.forefited = true;
            this.revealMonster();
        }

        const self = this;

        this.portraitDiv.addEventListener("click", function()
        {
            if (self.isRevealed)
            {
                const sound = new Audio(self.monster.memory);
                sound.play();

                showToast(self.monster.name);
                self.portraitDiv.classList.add("revealed");
            }
        })
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

        daDiv.innerHTML = `
            <img src="https://monstyrslayr.github.io/msmTools/webp/square/monster_portrait_prize.webp" alt="..."/>
        `

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

    let voidcorn = false;
    const monsterData = [];
    const RARITY = getRarities();
    const MCLASS = getClasses();
    const allowedRarities = [RARITY.COMMON, RARITY.ADULT, RARITY.MAJOR];
    const monsters = await getMonsters();

    const commonMonsters = monsters
                            .filter((monster) => allowedRarities.includes(monster.rarity))
                            .map(monster => ({ ...monster })); // make deep copy to prevent name shenanigans
    // const commonMonsters = monsters.filter((monster = Monster) => monster.class == MCLASS.DIPSTER);

    let startTime = null;
    let elapsedTime = 0;
    let endTime = null;

    // console.log(commonMonsters); // works

    const bigAssHeading = document.createElement("h1");
    bigAssHeading.textContent = "My Singing Monsters Ultimate Memory Game DISCORD EDITION";
    document.body.appendChild(bigAssHeading);

    const smallAssFlavorText = document.createElement("h3");
    smallAssFlavorText.textContent = "Join the Discord server in the description to participate!";
    document.body.appendChild(smallAssFlavorText);

    const topBarWrapper = document.createElement("div");
    topBarWrapper.classList.add("topBarWrapper");
    document.body.appendChild(topBarWrapper);

        const topBar = document.createElement("div");
        topBar.classList.add("topBar");
        topBarWrapper.appendChild(topBar);

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
        smallAssFlavorText.classList.add("hidden");
        leaderboardDiv.classList.remove("hidden");

        endTime = performance.now();

            const closeWarning = document.createElement("button");
            closeWarning.textContent = "Close";
            closeWarning.addEventListener("click", function()
            {
                closeFullScreenWarning();
            });

        const foundNoOutlineMonsters = monsterData.filter((dat) => !dat.forefited && dat.revealedWithoutOutline);
        const nonForefitMonsters = monsterData.filter((dat) => !dat.forefited);

        // leaderboard shtuff
        userdata.sort((a, b) => b.points - a.points);
        let place = 1;

        userdata.forEach((user) => {
            const leaderboardRow = document.createElement("div");
            leaderboardRow.classList.add("leaderboardRow");
            leaderboardDiv.appendChild(leaderboardRow);

                const rowPlace = document.createElement("div");
                rowPlace.innerHTML = place;
                leaderboardRow.appendChild(rowPlace);
                place++;

                const rowUser = document.createElement("div");
                rowUser.classList.add("leaderboardUser");
                leaderboardRow.appendChild(rowUser);

                    const daAvatar = document.createElement("img");
                    daAvatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`;
                    rowUser.appendChild(daAvatar);

                    const daDisplayName = document.createElement("p");
                    daDisplayName.textContent = user.name;
                    rowUser.appendChild(daDisplayName);

                const rowPoints = document.createElement("div");
                rowPoints.innerHTML = user.points;
                leaderboardRow.appendChild(rowPoints);
        })

        showFullScreenWarning("Well Done!", [closeWarning], [`You recalled ${nonForefitMonsters.length}/${monsterData.length} monsters in ${formatTime(elapsedTime)}`,
                        `You found ${foundNoOutlineMonsters.length}/${monsterData.length} without activating outlines`]);
    }

    const leaderboardDiv = document.createElement("div");
    leaderboardDiv.classList.add("leaderboard");
    document.body.appendChild(leaderboardDiv);
    
    let userdata = [];

    function resetLeaderboard()
    {
        userdata = [];

        leaderboardDiv.innerHTML = "";
        leaderboardDiv.classList.add("hidden");

        const leaderboardHeader = document.createElement("div");
        leaderboardHeader.classList.add("leaderboardHeader");
        leaderboardDiv.appendChild(leaderboardHeader);

            const leaderboardHashtag = document.createElement("div");
            leaderboardHashtag.textContent = "#";
            leaderboardHeader.appendChild(leaderboardHashtag);

            const leaderboardUser = document.createElement("div");
            leaderboardUser.textContent = "User";
            leaderboardHeader.appendChild(leaderboardUser);

            const leaderboardPoints = document.createElement("div");
            leaderboardPoints.textContent = "Monsters";
            leaderboardHeader.appendChild(leaderboardPoints);
    }
    resetLeaderboard();

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
                            daPortraitDiv.querySelector("img").src = monData.monsterImg.src;
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
                    smallAssFlavorText.classList.remove("hidden");
                    missedPortraitsDiv.innerHTML = "";

                    monsterNumerator.textContent = "0";

                    for (const monData of monsterData)
                    {
                        monData.isOutline = false;
                        monData.isRevealed = false;
                        monData.revealedWithoutOutline = false;
                        monData.forefited = false;

                        monData.resetPortrait();
                        monData.portraitDiv.classList.remove("revealed");
                    }

                    for (const daBox of monsterBoxes)
                    {
                        daBox.verifyComplete();
                    }

                    resetLeaderboard();

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

    function normalizeWord(str)
    {
        return str
            .normalize("NFD")                  // decompose accented characters
            .replace(/[\u0300-\u036f]/g, "")   // remove diacritical marks
            .replace(/[^a-z0-9\s]/gi, "")      // allow letters, numbers, and spaces
            .toLowerCase();
    }

    function containsMonster(input, monsterName)
    {
        const inputNorm = normalizeWord(input);
        const monsterNorm = normalizeWord(monsterName).replace(/\s+/g, ""); // strip spaces

        const inputWords = inputNorm.split(/\s+/).filter(Boolean);

        // Check all adjacent combinations of input words of correct length
        for (let i = 0; i < inputWords.length; i++) {
            let combined = "";
            for (let j = i; j < inputWords.length; j++) {
                combined += inputWords[j];
                if (combined === monsterNorm) return true;

                // Early exit if combined gets too long
                if (combined.length > monsterNorm.length) break;
            }
        }

        return false;
    }

    const source = new EventSource("http://10.201.233.134:5000/api/stream");
    source.onmessage = function(event)
    {
        const data = JSON.parse(event.data);
        console.log(data);
        const trimmedVal = normalizeAndTrim(data.content);

        for (const monData of monsterData)
        {
            if (containsMonster(data.content, monData.monster.name))
            {
                if (!monData.isRevealed)
                {
                    monData.revealMonster();
                    console.log(">>>>Monster gotten: " + monData.monster.name);

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

                    // add to leaderboard
                    if (!userdata.some((user) => user.id == data.id))
                    {
                        userdata.push({
                            id: data.id,
                            avatar: data.avatar,
                            name: data.author,
                            points: 0
                        });
                    }
                    userdata.filter((user) => user.id == data.id)[0].points++;

                    // toast discord message
                    const discordMessage = document.createElement("div");
                    discordMessage.classList.add("discordMessage");

                        const discordAvatar = document.createElement("img");
                        discordAvatar.classList.add("discordAvatar");
                        discordAvatar.src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.webp`;
                        discordMessage.appendChild(discordAvatar);

                        const discordTextPart = document.createElement("div");
                        discordTextPart.classList.add("discordTextPart");
                        discordMessage.appendChild(discordTextPart);

                            const discordName = document.createElement("h3");
                            discordName.textContent = data.author;
                            discordTextPart.appendChild(discordName);

                            const discordContent = document.createElement("p");
                            discordContent.textContent = data.content;
                            discordTextPart.appendChild(discordContent);

                    showToastDiv(discordMessage);

                    if (foundMonsters.length == monsterData.length && endTime == null)
                    {
                        endGame();
                    }
                    break;
                }
            }
        }

        // easter eggs
        let toggleString = null;
        switch (trimmedVal)
        {
            case "common":
                showToast("Toggled Common monster forms");
                toggleString = "";
            break;
            case "rare":
                showToast("Toggled Rare monster forms");
                toggleString = "Rare ";
            break;
            case "epic":
                showToast("Toggled Epic monster forms");
                toggleString = "Epic ";
            break;
            case "child":
                showToast("Toggled Child Celestial forms");
                toggleString = "";
            break;
            case "adult":
                showToast("Toggled Adult Celestial forms");
                toggleString = "Adult ";
            break;
            case "major":
                showToast("Toggled Major Paironormal forms");
                toggleString = "Major ";
            break;
            case "minor":
                showToast("Toggled Minor Paironormal forms");
                toggleString = "Minor ";
            break;

            case "voidcorn":
                if (!voidcorn)
                {
                    voidcorn = true;
                    event.target.value = "";

                    document.body.classList.add("voidcorn");

                    const r = document.querySelector(':root');
                    r.style.setProperty('--accent-color', '#222222');
                    r.style.setProperty('--accent-color2', '#373737');

                    let currentReplacedMonData = null;

                    setInterval(function()
                    {
                        if (currentReplacedMonData != null)
                        {
                            currentReplacedMonData.resetPortrait();
                        }

                        currentReplacedMonData = monsterData[Math.floor(Math.random() * monsterData.length)];
                        currentReplacedMonData.changePortraitImage("./img/voidcorn.webp");
                    }, 2000)
                }
            break;
        }

        if (toggleString != null)
        {
            event.target.value = "";

            for (const monData of monsterData)
            {
                // instead of setting the monster, just change the monster's square, portraits, and memory sound
                let targetMonsters;

                if (trimmedVal == "child") // fuck off
                {
                    targetMonsters = monsters.filter((monster) => 
                            monster.name == monData.monster.name
                                && monster.class == MCLASS.CELESTIAL);
                }
                else if (trimmedVal == "common")
                {
                    targetMonsters = monsters.filter((monster) => 
                            monster.name == monData.monster.name
                                && monster.class != MCLASS.CELESTIAL);
                }
                else
                {
                    targetMonsters = monsters.filter((monster) => 
                        monster.name == toggleString + monData.monster.name);
                }

                if (targetMonsters.length > 0)
                {
                    const targetMonster = targetMonsters[0];
                    monData.monster.square = targetMonster.square;
                    monData.monster.portrait = targetMonster.portrait;
                    monData.monster.portraitBlack = targetMonster.portraitBlack;
                    monData.monster.memory = targetMonster.memory;
                    monData.resetPortrait();
                }
            }
        }
    }

    window.addEventListener("beforeunload", function (e)
    {
        if (startTime != null && endTime == null) // if game is ongoing
        {
            e.preventDefault();
            e.returnValue = "";
        }
    });

    const footer = document.createElement("footer");
    document.body.appendChild(footer);

        const footerParagraph = document.createElement("p");
        footerParagraph.innerHTML = `
            Can you recall every MSM monster? Enter your first monster to begin.<br>
            If you find any bugs or have some feedback, dm <a href="https://discord.com/channels/@me/434840883637125121" target="_blank">@monstyrslayr on Discord.</a><br>
            This project is heavily inspired by <a href="https://pkmnquiz.com/" target="_blank">pkmnquiz.com</a>, go check it out!<br>
            <a href="https://monstyrslayr.github.io/msmProjects" target="_blank">Check out some of my other MSM related projects!</a><br>
            Portions of the materials used are trademarks and/or copyrighted works of Big Blue Bubble. All rights reserved
            by Big Blue Bubble. This material is not official and is not endorsed by Big Blue Bubble.
        `;
        footer.appendChild(footerParagraph);
}

main();
