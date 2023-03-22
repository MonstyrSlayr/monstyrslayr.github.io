let symbolsDiv = document.getElementById("allSymbols");

let demSymbols = symbols.slice(0);

let cols = document.getElementsByClassName("column");

function createDivs()
{
    for (var i = 0; i < demSymbols.length; i++) {
        var daSymbol = demSymbols[i];

        var daRow = document.createElement("div");
        daRow.classList = ["row"];
        symbolsDiv.append(daRow);

        var daFirst = document.createElement("div");
        daFirst.classList = ["column"];
        var symbolImage = document.createElement("img");
        symbolImage.src = daSymbol.image;
        symbolImage.style.imageRendering = "pixelated";
        daFirst.append(symbolImage);
        var symbolText = document.createElement("p");
        symbolText.innerHTML = daSymbol.name;
        symbolText.classList = ["symbolText"];
        daFirst.append(symbolText);
        daRow.append(daFirst);

        var daRarity = document.createElement("p");
        daRarity.classList = ["column"];
        switch (daSymbol.rarity) {
            case RARITY.COMMON:
                daRarity.innerHTML = "COMMON";
                daRarity.style.color = "#ffffff"
                break;
            case RARITY.UNCOMMON:
                daRarity.innerHTML = "UNCOMMON";
                daRarity.style.color = "#61d3e3"
                break;
            case RARITY.RARE:
                daRarity.innerHTML = "RARE";
                daRarity.style.color = "#fbf236"
                break;
            case RARITY.VERYRARE:
                daRarity.innerHTML = "VERY RARE";
                daRarity.style.color = "#7234bf"
                break;
            case RARITY.SPECIAL:
                daRarity.innerHTML = "SPECIAL";
                daRarity.style.color = "#e14a68"
                break;
        }
        daRow.append(daRarity);

        var daCoins = document.createElement("p");
        daCoins.classList = ["column"];
        daCoins.innerHTML = daSymbol.coin;
        daRow.append(daCoins);

        var daCount = document.createElement("p");
        daCount.classList = ["column"];
        daCount.innerHTML = daSymbol.symbolCount;
        daRow.append(daCount);

        var daApp = document.createElement("p");
        daApp.classList = ["column"];
        daApp.innerHTML = daSymbol.symbolApp;
        daRow.append(daApp);

        var daItemApp = document.createElement("p");
        daItemApp.classList = ["column"];
        daItemApp.innerHTML = daSymbol.itemApp;
        daRow.append(daItemApp);
    }
}

createDivs();

let repeatCase = 0;

for (var i = 0; i < cols.length; i++)
{
    var daCol = cols[i];
    daCol.id = i;

    switch (i)
    {
        case 0:
            daCol.onclick = function ()
            {
                demSymbols = symbols.slice(0);
                if (repeatCase == this.id)
                {
                    demSymbols.sort((b, a) => {
                        var textA = a.name.toUpperCase();
                        var textB = b.name.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    });
                }
                symbolsDiv.innerHTML = "";
                repeatCase = (repeatCase == this.id) ? -1 : this.id;
                createDivs();
            }
        break;

        case 1:
            daCol.onclick = function ()
            {
                demSymbols = symbols.slice(0);
                demSymbols.sort((a, b) =>   {
                                                if (repeatCase == this.id)
                                                {
                                                    return b.rarity - a.rarity;
                                                }
                                                else return a.rarity - b.rarity;
                                            }
                                        );
                symbolsDiv.innerHTML = "";
                repeatCase = (repeatCase == this.id) ? -1 : this.id;
                createDivs();
            }
        break;

        case 2: default:
            daCol.onclick = function ()
            {
                demSymbols = symbols.slice(0);
                demSymbols.sort((a, b) =>   {
                                                if (repeatCase == this.id)
                                                {
                                                    return b.coin - a.coin;
                                                }
                                                else return a.coin - b.coin;
                                            }
                                        );
                symbolsDiv.innerHTML = "";
                repeatCase = (repeatCase == this.id) ? -1 : this.id;
                createDivs();
            }
        break;

        case 3:
            daCol.onclick = function ()
            {
                demSymbols = symbols.slice(0);
                demSymbols.sort((a, b) =>   {
                                                if (repeatCase == this.id)
                                                {
                                                    return b.symbolCount - a.symbolCount;
                                                }
                                                else return a.symbolCount - b.symbolCount;
                                            }
                                        );
                symbolsDiv.innerHTML = "";
                repeatCase = (repeatCase == this.id) ? -1 : this.id;
                createDivs();
            }
        break;

        case 4:
            daCol.onclick = function ()
            {
                demSymbols = symbols.slice(0);
                demSymbols.sort((a, b) =>   {
                                                if (repeatCase == this.id)
                                                {
                                                    return b.symbolApp - a.symbolApp;
                                                }
                                                else return a.symbolApp - b.symbolApp;
                                            }
                                        );
                symbolsDiv.innerHTML = "";
                repeatCase = (repeatCase == this.id) ? -1 : this.id;
                createDivs();
            }
        break;

        case 5:
            daCol.onclick = function ()
            {
                demSymbols = symbols.slice(0);
                demSymbols.sort((a, b) =>   {
                                                if (repeatCase == this.id)
                                                {
                                                    return b.itemApp - a.itemApp;
                                                }
                                                else
                                                {
                                                    return a.itemApp - b.itemApp;
                                                }
                                            }
                                        );
                symbolsDiv.innerHTML = "";
                repeatCase = (repeatCase == this.id) ? -1 : this.id;
                createDivs();
            }
        break;
    }
}