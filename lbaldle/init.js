//initializing all the variables and functions here because thicc file
//VARIABLES----------------------------------------------------------------------------
let solution = null;
let solutionNum = null;

let symbolInput = document.getElementById("guess");
let symbolSubmit = document.getElementById("guess_submit");

let totalGuesses = 10;
let guesses = 0;

let daGuessedSymbol = null;
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

let isStoryMode = false;

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
    constructor (body = ["What's up?", "This is a test email.", "Sincerely,", "-The Gamemaster"], emailAddress = "Gamey_McGamer@bouncy.mail")
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
        daNotif.innerHTML = "New Email";
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

    if (!emailsRevealed)
    {
        //reveal the emails
        showEmails = false;
        emailToggle.onclick();
        emailsRevealed = true;
    }
}

function makeRowDiv(row)
{
    daDiv = document.createElement("div");

    daSymbol = new SymbolElement(row.symbol.image);
    daSymbol.daImg = row.symbol.image;
    daDiv.append(daSymbol);

    daRarity = new SymbolElement(row.rarity);
    daRarity.daImg = row.rarity;
    daDiv.append(daRarity);

    daCount = new SymbolElement(row.coin);
    daCount.daImg = row.coin;
    daDiv.append(daCount);

    daSymbols = new SymbolElement(row.symbolCount);
    daSymbols.daImg = row.symbolCount;
    daDiv.append(daSymbols);

    daApps = new SymbolElement(row.symbolApp);
    daApps.daImg = row.symbolApp;
    daDiv.append(daApps);

    daItemApps = new SymbolElement(row.itemApp);
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

    daNewRow = makeRowDiv(new LbaldleRow(daGuessedSymbol, elRarity, elCount, elSymbol, elApp, elItemApp));
    daNewRow.classList = ["row"];
    guessesDiv.append(daNewRow);
    daGuessedSymbol = null;

    if (guesses >= totalGuesses && !gameOver)
    {
        gameOverFunc();
        lostDiv.style.display = "block";
        resultsDiv.style.display = "block";
    }
}

function gameOverFunc()
{
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