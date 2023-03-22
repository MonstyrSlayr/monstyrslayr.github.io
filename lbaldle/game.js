emailToggle.onclick = function()
{
    showEmails = !showEmails;
    console.log(window.screen.width);

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
    if (symbolInput.value.toLowerCase().replace(/\s/g, '').replace("ñ", "n") == solution.name.toLowerCase().replace(/\s/g, '').replace("ñ", "n"))
    {
        //you correct
        symbolInput.value = solution.name;
        daGuessedSymbol = solution;
        winDiv.style.display = "block";
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

darkModeToggle.onclick = function()
{
    isDarkMode = !isDarkMode;

    changeDarkMode();
}

playAgainButton.onclick = function () {newGame();};

changeDarkMode();
newGame();