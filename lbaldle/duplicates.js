import {emailUpdates} from "./updates.js";
import {getCookie, setCookie} from "./utils.js";

let r = document.querySelector(':root');
let isDarkMode = false;
let darkModeToggle = document.getElementById("darkModeToggle");
let dupSymbols = document.getElementById("dupSymbols");
let dupSymbArr = [];
let cols = document.getElementsByClassName("column");

if (getCookie("darkMode", false) == "")
{
    setCookie("darkMode", "light", 365, false);
}

function regenDivs()
{
    dupSymbols.innerHTML = "";
    dupSymbArr = [];

    for (var i = 0; i < symbols.length; i++)
    {
        var daSymbol = symbols[i];
        daSymbol.lbalNum = 0;

        daSymbol.lbalNum += (daSymbol.rarity * 100000000) * (cols[0].included ? 1 : 0);
        daSymbol.lbalNum += (daSymbol.coin * 1000000) * (cols[1].included ? 1 : 0);
        daSymbol.lbalNum += (daSymbol.symbolCount * 10000) * (cols[2].included ? 1 : 0);
        daSymbol.lbalNum += (daSymbol.symbolApp * 100) * (cols[3].included ? 1 : 0);
        daSymbol.lbalNum += (daSymbol.itemApp * 1) * (cols[4].included ? 1 : 0);

        var makeNewEntry = true;

        for (var j = 0; j < dupSymbArr.length; j++)
        {
            var daOtherSymbol = dupSymbArr[j][0];

            if (daOtherSymbol.lbalNum == daSymbol.lbalNum)
            {
                dupSymbArr[j].push(daSymbol);
                makeNewEntry = false;
                break;
            }
        }

        if (makeNewEntry)
        {
            dupSymbArr.push([daSymbol]);
        }
    }

    dupSymbArr.sort((a, b) => {
        return a[0].lbalNum - b[0].lbalNum;
    });

    for (var i = 0; i < dupSymbArr.length; i++)
    {
        var daArr = dupSymbArr[i];

        if (daArr.length > 1)
        {
            var myDiv = document.createElement("div");
            myDiv.classList = ["dupSymbIndiv"];
            dupSymbols.append(myDiv);

            var lbalCode = document.createElement("p");
            lbalCode.innerHTML += (cols[0].included ? rarityName(daArr[0].rarity) : "X") + "|";
            lbalCode.innerHTML += (cols[1].included ? daArr[0].coin : "X") + "|";
            lbalCode.innerHTML += (cols[2].included ? daArr[0].symbolCount : "X") + "|";
            lbalCode.innerHTML += (cols[3].included ? daArr[0].symbolApp : "X") + "|";
            lbalCode.innerHTML += (cols[4].included ? daArr[0].itemApp : "X");
            myDiv.append(lbalCode);

            for (var j = 0; j < daArr.length; j++)
            {
                daSymbol = daArr[j];

                var daSymbImg = document.createElement("img");
                daSymbImg.src = daSymbol.image;
                daSymbImg.classList = ["symbol"];
                myDiv.append(daSymbImg);
            }
        }
    }
}

for (var i = 0; i < cols.length; i++)
{
    var daCol = cols[i];
    daCol.id = i;
    daCol.included = true;

    daCol.onclick = function ()
    {
        this.included = !this.included;

        if (!this.included)
        {
            this.childNodes[1].classList = ["hint", " notIncluded"];
        }
        else
        {
            this.childNodes[1].classList = ["hint"];
        }

        regenDivs();
    }
}

regenDivs();

darkModeToggle.onclick = function()
{
    isDarkMode = !isDarkMode;

    setCookie("darkMode", (isDarkMode ? "dark" : "light"), 365, false);

    changeDarkMode();
}

isDarkMode = (getCookie("darkMode", false) == "dark" ? true : false);
changeDarkMode();

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
}

function rarityName(rarity)
{
    switch (rarity)
    {
        case RARITY.COMMON: default:
            return "COMMON";
        case RARITY.UNCOMMON:
            return "UNCOMMON";
        case RARITY.RARE:
            return "RARE";
        case RARITY.VERYRARE:
            return "VERYRARE";
        case RARITY.SPECIAL:
            return "SPECIAL";
    }
}