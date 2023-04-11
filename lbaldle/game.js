import {emailUpdates} from "./updates.js";
import {getCookie, setCookie, getLocalDateDay} from "./utils.js";

let r = document.querySelector(':root');

let solution = null;
let solutionNum = null;

let symbolInput = document.getElementById("guess");
let symbolSubmit = document.getElementById("guess_submit");

let totalGuesses = 10;
let guesses = 0;
let guessNumArr = [];

let daGuessedSymbol = null;
let daGuessedSymbolNum = null;
let guessesDiv = document.getElementById("guesses");
let hintsDiv = document.getElementById("hinttitles")

let winDiv = document.getElementById("won");
let lostDiv = document.getElementById("lost");
let daSymbolDiv = document.getElementById("secretSymbol");
let resultsDiv = document.getElementById("results");

let gameOver = false;
let finishEmojis = "";
let finishEmojisDiv = document.getElementById("finishEmojisDiv");
let playAgainButton = document.getElementById("playAgainButton");

let emailToggle = document.getElementById("emailToggle");
let emailToggleLabel = document.getElementById("emailToggleLabel");
let emailToggleDiv = document.getElementById("emailToggleDiv");
let emailsDiv = document.getElementById("emails");
let mainGame = document.getElementById("mainGame");
let emailCheck = document.getElementById("emailCheck");
let showEmails = false;
let emailToDelete = null;
let emailsRevealed = false;
let noEmailsDiv = document.getElementById("noEmails");

let daily = window.location.pathname.split("/").pop() == "daily.html";
let dailyDone = false;
let dailyStreak = 0;
let streakNum = document.getElementById("streakNum");

let isStoryMode = false;
let isDarkMode = false;
let darkModeToggle = document.getElementById("darkModeToggle");

let dupDetected = document.getElementById("dupDetected");

let possibleEmails =
{
    firstGuess:
    [
        ["Oof, looks like that was the wrong symbol. That's okay, it was only your first guess. I beleive in you!",
            "Here's to hoping,",
                "-The Gamemaster"],
    ],

    firstGuessWin:
    [
        ["Wow! Holy Highlander! You got the symbol correct on your first try! Your luck is insanely good.",
            "Feel free to play another game sometime. Let's test that luck some more!",
                "With smiles,",
                    "-The Gamemaster"],
    ],

    otherGuess:
    [
        ["Oof, looks like that was the wrong symbol. I do have faith in you though!",
            "Best wishes,",
                "-The Gamemaster"],
    ],

    otherGuessWin:
    [
        ["Nice job! You got the symbol correct. I'm proud of you.",
            "Feel free to play another game sometime!",
                "Best wishes,",
                    "-The Gamemaster"],
    ],

    lastGuess:
    [
        ["Hey player,",
            "It appears that you're down to your final guess.",
                "It's been fun sending you emails, but... this might be my last one. I salute you and wish you well on your journey.",
                    "With tears,",
                        "-The Gamemaster"],
    ],

    lastGuessWin:
    [
        ["Oh my hooligans... I thought I would never be able to talk to you again.",
            "I can't expain right now, but you just saved my life. Thank you so much.",
                "Eternally grateful,",
                    "-The Gamemaster"],
    ],

    symbolNotFound:
    [
        ["Hey there! I looked through the catalog, and it looks like this symbol doesn't exist. Perhaps you spelled it wrong? Don't worry, this doesn't eat up one of your precious <span class='guessCount'>guesses</span>.",
            "Sincerely,",
                "-The Gamemaster"],
    ],

    gameOver:
    [
        ["You couldn't guess the symbol in time. GAME OVER!",
            "-Your Landlord"],
    ],

    gameInit:
    [
        ["Welcome to LBaLdle! I hope you enjoy the game. Guess the correct symbol based on the hints! Your solution is due in <span class='guessCount'>10 guesses</span>.",
            "Sincerely,",
                "-The Gamemaster"],
    ],
}

//ENUMS-------------------------------------------------------------------------------

const EMOJ =
{
    CHECK: "./img/confirm.png",
    DUD: "./img/dud.png",
    UP: "./img/golden_arrow2.png",
    DOWN: "./img/bronze_arrow7.png"
}

//CLASSES-------------------------------------------------------------------------

class Email
{
    constructor (body = ["What's up?", "This is a test email.", "Sincerely,", "-The Gamemaster"], emailAddress = "Gamey_McGamer@bouncy.mail", title = "New Email")
    {
        this.div = document.createElement("div");
        this.div.classList = ["email"];

        this.body = body;
        this.emailAddress = emailAddress;

        var headerDiv = document.createElement("div");
        headerDiv.classList = ["emailHeader"];
        this.div.append(headerDiv);

        var headerText = document.createElement("h3");
        headerText.innerHTML = "Solution due in <span class='guessCount'>" + (totalGuesses - guesses) + "</span> guess" + (totalGuesses - guesses == 1 ? "" : "es");
        headerDiv.append(headerText);

        var notifDiv = document.createElement("div");
        notifDiv.classList = ["emailNotif"];
        this.div.append(notifDiv);

        var daNotif = document.createElement("h3");
        daNotif.innerHTML = title;
        notifDiv.append(daNotif);

        var bodyDiv = document.createElement("div");
        bodyDiv.classList = ["emailBody"];
        this.div.append(bodyDiv);

        for (var i = 0; i < this.body.length; i++)
        {
            var daPar = document.createElement("p");
            daPar.innerHTML = this.body[i];
            bodyDiv.append(daPar);
        }

        var daAddress = document.createElement("p");
        daAddress.innerHTML = this.emailAddress;
        daAddress.classList = ["emailAddress"];
        bodyDiv.append(daAddress);

        this.myCheckbox = document.createElement("button");
        this.myCheckbox.innerHTML = "<img class='emailCheck' src='./img/confirm.png'>";
        this.myCheckbox.classList = ["emailToggle"];
        this.myCheckbox.closeDiv = this.div;
        bodyDiv.append(this.myCheckbox);

        noEmailsDiv.style.display = "none"; //assume you append the email immediately
        if (!showEmails)
        {
            emailToggleLabel.style.display = "block";
        }

        this.myCheckbox.onclick = function()
        {
            if (emailToDelete == null)
            {
            this.closeDiv.style.marginLeft = "-100%";
            this.closeDiv.style.marginRight = "100%";
            emailToDelete = this.closeDiv;
            setTimeout(function()
                        {
                            emailToDelete.remove();
                            emailToDelete = null;

                            if (emailsDiv.childNodes.length <= 3)
                            {
                                noEmailsDiv.style.display = "block";
                            }
                        }, 500);
            }
        }
    }
}

class SymbolElement extends Image
{
    constructor (image)
    {
        super();

        this.src = image;
        this.classList = ["symbol"];
    }
}

class LbaldleRow
{
    constructor (symbol, rarity, coin, symbolCount, symbolApp, itemApp)
    {
        this.symbol = symbol;
        this.rarity = rarity;
        this.coin = coin;
        this.symbolCount = symbolCount;
        this.symbolApp = symbolApp;
        this.itemApp = itemApp;
    }
}

//FUNCTIONS----------------------------------------------------------

function newGame()
{
    solutionNum = Math.floor(symbols.length * Math.random());
    solution = symbols[solutionNum];
    gameOver = false;
    guessesDiv.innerHTML = "";
    symbolInput.disabled = false;
    guesses = 0;
    winDiv.style.display = "none";
    lostDiv.style.display = "none";
    resultsDiv.style.display = "none";
    finishEmojis = "";
    dupDetected.style.display = "none";
    symbolInput.value = "";
    guessNumArr = [];

    setCookie("solutionNum", solutionNum.toString(), 365, daily);
    setCookie("guessNumArr", "", 365, daily)

    if (daily)
    {
        setCookie("date", getLocalDateDay(), 365, true);
        setCookie("complete", "false", 365, true);
    }

    var daEmail;

    if (isStoryMode)
    {
        daEmail = new Email(possibleEmails.gameInit[Math.floor(Math.random() * possibleEmails.gameInit.length)], "Gamey_McGamer@bouncy.mail");
    }
    else
    {
        daEmail = new Email(["Welcome to LBaLdle! Guess the correct symbol based on the clues. You have <span class='guessCount'>10 guesses</span> to get the correct symbol."] , "");
    }

    emailsDiv.prepend(daEmail.div);
}

//reveal the emails
showEmails = false;
emailToggle.onclick();
emailsRevealed = true;

function makeRowDiv(row)
{
    var daDiv = document.createElement("div");

    var daSymbol = new SymbolElement(row.symbol.image);
    daSymbol.daImg = row.symbol.image;
    daDiv.append(daSymbol);

    var daRarity = new SymbolElement(row.rarity);
    daRarity.daImg = row.rarity;
    daDiv.append(daRarity);

    var daCount = new SymbolElement(row.coin);
    daCount.daImg = row.coin;
    daDiv.append(daCount);

    var daSymbols = new SymbolElement(row.symbolCount);
    daSymbols.daImg = row.symbolCount;
    daDiv.append(daSymbols);

    var daApps = new SymbolElement(row.symbolApp);
    daApps.daImg = row.symbolApp;
    daDiv.append(daApps);

    var daItemApps = new SymbolElement(row.itemApp);
    daItemApps.daImg = row.itemApp;
    daDiv.append(daItemApps);

    return daDiv;
}

function addGuess()
{
    guesses++;

    //check rarity
    var elRarity = EMOJ.CHECK;
    if (daGuessedSymbol.rarity != solution.rarity)
    {
        elRarity = EMOJ.DUD;
    }

    //check coin count
    var elCount = EMOJ.CHECK;
    if (daGuessedSymbol.coin > solution.coin)
    {
        elCount = EMOJ.DOWN;
    }
    else if (daGuessedSymbol.coin < solution.coin)
    {
        elCount = EMOJ.UP;
    }

    //check symbol count
    var elSymbol = EMOJ.CHECK;
    if (daGuessedSymbol.symbolCount > solution.symbolCount)
    {
        elSymbol = EMOJ.DOWN;
    }
    else if (daGuessedSymbol.symbolCount < solution.symbolCount)
    {
        elSymbol = EMOJ.UP;
    }

    //check symbapp count
    var elApp = EMOJ.CHECK;
    if (daGuessedSymbol.symbolApp > solution.symbolApp)
    {
        elApp = EMOJ.DOWN;
    }
    else if (daGuessedSymbol.symbolApp < solution.symbolApp)
    {
        elApp = EMOJ.UP;
    }

    //check itemapp count
    var elItemApp = EMOJ.CHECK;
    if (daGuessedSymbol.itemApp > solution.itemApp)
    {
        elItemApp = EMOJ.DOWN;
    }
    else if (daGuessedSymbol.itemApp < solution.itemApp)
    {
        elItemApp = EMOJ.UP;
    }

    var daNewRow = makeRowDiv(new LbaldleRow(daGuessedSymbol, elRarity, elCount, elSymbol, elApp, elItemApp));
    daNewRow.classList = ["row"];
    guessesDiv.append(daNewRow);

    if (elRarity == EMOJ.CHECK && elCount == EMOJ.CHECK && elSymbol == EMOJ.CHECK && elApp == EMOJ.CHECK && elItemApp == EMOJ.CHECK && daGuessedSymbol != solution)
    {
        dupDetected.style.display = "block";
    }

    daGuessedSymbol = null;

    if (guesses >= totalGuesses && !gameOver)
    {
        gameOverFunc();
        lostDiv.style.display = "block";
        resultsDiv.style.display = "block";
    }
}

function saveGuess(guessNumber)
{
    guessNumArr.push(guessNumber);
    var daCookieString = "";
    for (var i = 0; i < guessNumArr.length; i++)
    {
        daCookieString += guessNumArr[i] + ",";
    }
    //console.log(daCookieString);
    setCookie("guessNumArr", daCookieString, 365, daily);
}

function gameOverFunc()
{
    if (daily)
    {
        if (!dailyDone)
        {
            if (winDiv.style.display != "block") //then you lost
            {
                dailyStreak = 0;
                setCookie("streak", "0", 365, true);
            }
            else //you won
            {
                dailyStreak += 1;
                setCookie("streak", dailyStreak.toString(), 365, true);
            }
        }

        dailyDone = true;
        setCookie("complete", "true", 365, true);

        streakNum.innerHTML = dailyStreak.toString();
    }

    gameOver = true;
    symbolInput.disabled = true;
    daSymbolDiv.innerHTML = solution.name;
    resultsDiv.style.display = "block";

    //generate a wordle finishing thing whatever it's called ugggg
    //🟩🟨🔽🔼⬛🟥

    for (var i = 0; i < guessesDiv.childNodes.length; i++)
    {
        var daRow = guessesDiv.childNodes[i];
        //console.log(daRow);

        for (var j = 1; j < daRow.childNodes.length; j++)
        {
            var daEmoj = daRow.childNodes[j];
            //console.log (daEmoj.src);

            switch (daEmoj.daImg)
            {
                case EMOJ.DUD:
                    finishEmojis += "🟥";
                    break;
                case EMOJ.CHECK:
                    finishEmojis += "🟩";
                    break;
                case EMOJ.UP:
                    finishEmojis += "🔼";
                    break;
                case EMOJ.DOWN:
                    finishEmojis += "🔽";
                    break;
                default:
                    finishEmojis += "⬛";
                    break;
            }
        }

        finishEmojis += "<br>";
    }

    //console.log(finishEmojis);
    finishEmojisDiv.innerHTML = finishEmojis;
}

function changeDarkMode()
{
    if (isDarkMode)
    {
        r.style.setProperty('--light-bg-color', '#122950');
        r.style.setProperty('--light-bg-select', '#36376a');

        darkModeToggle.src = "./img/moon.png";
    }
    else
    {
        r.style.setProperty('--light-bg-color', '#ff8300');
        r.style.setProperty('--light-bg-select', '#ffa320');

        darkModeToggle.src = "./img/sun.png";
    }

    if (daily)
    {
        r.style.setProperty('--light-bg-color', '#333333');
        r.style.setProperty('--light-bg-select', '#666666');
    }
}

emailToggle.onclick = function()
{
    showEmails = !showEmails;

    if (showEmails)
    {
        if (window.screen.width > 900)
        {
            emailToggleDiv.style.marginLeft = "33%";
            mainGame.style.width = "66%";
        }
        else
        {
            emailsDiv.style.marginLeft = "";
            emailToggleDiv.style.marginLeft = "88%";
        }
        emailsDiv.style.opacity = "1";
        emailCheck.src = EMOJ.CHECK;

        emailToggleLabel.style.display = "none";
    }
    else
    {
        emailToggleDiv.style.marginLeft = "";
        if (window.screen.width > 900)
        {
            mainGame.style.width = "100%";
        }
        else
        {
            emailsDiv.style.marginLeft = "-90%";
        }
        emailsDiv.style.opacity = "0";
        emailCheck.src = EMOJ.DUD;
    }
}

symbolSubmit.onclick = function()
{
    if (!gameOver)
    {
        if (symbolInput.value.toLowerCase().replace(/\s/g, '').replace("ñ", "n") == solution.name.toLowerCase().replace(/\s/g, '').replace("ñ", "n"))
        {
            //you correct
            symbolInput.value = solution.name;
            daGuessedSymbol = solution;
            winDiv.style.display = "block";
            dupDetected.style.display = "none";
            saveGuess(solutionNum);
            addGuess();
            gameOverFunc();

            var daEmail;

            if (isStoryMode)
            {
                switch (guesses)
                {
                    case 1:
                        daEmail = new Email(possibleEmails.firstGuessWin[Math.floor(Math.random() * possibleEmails.firstGuessWin.length)], "Gamey_McGamer@bouncy.mail");
                        break;
                    
                    default:
                        daEmail = new Email(possibleEmails.otherGuessWin[Math.floor(Math.random() * possibleEmails.otherGuessWin.length)], "Gamey_McGamer@bouncy.mail");
                        break;
                    
                    case totalGuesses - 1:
                        daEmail = new Email(possibleEmails.lastGuessWin[Math.floor(Math.random() * possibleEmails.lastGuessWin.length)], "Gamey_McGamer@bouncy.mail");
                        break;

                }
            }
            else
            {
                daEmail = new Email(["You win! You got the symbol in <span class='guessCount'>" + guesses + " guesses</span>."], "");
            }

            emailsDiv.prepend(daEmail.div);
        }
        else
        {
            //you wrong
            //is it a symbol though
            for (var i = 0; i < symbols.length; i++)
            {
                if (symbolInput.value.toLowerCase().replace(/\s/g, '').replace("ñ", "n") == symbols[i].name.toLowerCase().replace(/\s/g, '').replace("ñ", "n"))
                {
                    daGuessedSymbol = symbols[i];
                    daGuessedSymbolNum = i;
                    break;
                }
            }

            if (daGuessedSymbol == null)
            {
                //it not a symbol
                var daEmail;

                if (isStoryMode)
                {
                    daEmail = new Email(possibleEmails.symbolNotFound[Math.floor(Math.random() * possibleEmails.symbolNotFound.length)], "Gamey_McGamer@bouncy.mail");
                }
                else
                {
                    daEmail = new Email(["This symbol was not found. Try checking your spelling."], "");
                }

                emailsDiv.prepend(daEmail.div);
            }
            else
            {
                //it is a symbol, but it's the wrong one
                symbolInput.value = "";
                saveGuess(daGuessedSymbolNum);
                addGuess();

                var daEmail;

                if (isStoryMode)
                {
                    switch (guesses)
                    {
                        case totalGuesses:
                            daEmail = new Email(possibleEmails.gameOver[Math.floor(Math.random() * possibleEmails.gameOver.length)], "Landy_McLandlord@bouncy.mail");
                            break;

                        case 1:
                            daEmail = new Email(possibleEmails.firstGuess[Math.floor(Math.random() * possibleEmails.firstGuess.length)], "Gamey_McGamer@bouncy.mail");
                            break;
                        
                        case totalGuesses - 1:
                            daEmail = new Email(possibleEmails.lastGuess[Math.floor(Math.random() * possibleEmails.lastGuess.length)], "Gamey_McGamer@bouncy.mail");
                            break;
                        
                        default:
                            daEmail = new Email(possibleEmails.otherGuess[Math.floor(Math.random() * possibleEmails.otherGuess.length)], "Gamey_McGamer@bouncy.mail");
                            break;
                    }
                }
                else
                {
                    if (totalGuesses - guesses != 1) daEmail = new Email([(totalGuesses - guesses) + " guesses remaining."], "");
                    else daEmail = new Email(["1 guess remaining."], "");
                }

                emailsDiv.prepend(daEmail.div);
            }
        }
    }
}

darkModeToggle.onclick = function()
{
    isDarkMode = !isDarkMode;

    setCookie("darkMode", (isDarkMode ? "dark" : "light"), 365, false);

    changeDarkMode();
}

playAgainButton.onclick = function () {newGame();};

isDarkMode = (getCookie("darkMode", false) == "dark" ? true : false);
changeDarkMode();

if (daily)
{
    if (getCookie("streak", true) == "")
    {
        setCookie("streak", "0", 365, true);
        dailyStreak = 0;
    }
    else
    {
        dailyStreak = parseInt(getCookie("streak", true));
    }

    streakNum.innerHTML = dailyStreak.toString();
}

if (getCookie("solutionNum", daily) == "")
{
    newGame();
}
else
{
    var loadGame = !daily;

    if (daily)
    {
        if (getLocalDateDay() == getCookie("date", true))
        {
            loadGame = true;
        }
        else
        {
            newGame();
        }
    }

    if (loadGame)
    {
        if (daily)
        {
            dailyDone = getCookie("complete", true) == "true";
        }

        //yo we loading the save!!!
        solutionNum = parseInt(getCookie("solutionNum", daily))
        solution = symbols[solutionNum];

        var daGuessNumArr = getCookie("guessNumArr", daily).split(",");

        for (var i = 0; i < daGuessNumArr.length - 1; i++)
        {
            var daNum = parseInt(daGuessNumArr[i]);

            symbolInput.value = symbols[daNum].name;
            symbolSubmit.onclick();
        }
    }
}

for (var i = 0; i < emailUpdates.length; i++)
{
    var daEmail = new Email(emailUpdates[i].desc, "Monstyr_McMonstyrSlayr@bouncy.mail", emailUpdates[i].updateName);
    emailsDiv.prepend(daEmail.div);
}