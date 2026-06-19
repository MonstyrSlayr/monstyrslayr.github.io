import { getMonsters } from "../monsters.js"

function getLastFolder(url, num)
{
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split('/').filter(part => part !== '').filter(part => part !== 'index.html'); // Split and remove empty elements and index.html
    return parts[parts.length - num];
}

const monsters = await getMonsters();
const daMonster = monsters.find(monster => monster.id == getLastFolder(window.location.href, 1));

const monsterName = document.getElementById("monsterName");
monsterName.textContent = daMonster.name;

const monsterId = document.getElementById("monsterId");
monsterId.textContent = daMonster.id;

const monsterElementString = document.getElementById("monsterElementString");
monsterElementString.textContent = daMonster.elementString;

const monsterIdentifier = document.getElementById("monsterIdentifier");
monsterIdentifier.textContent = daMonster.identifier;

const monsterClass = document.getElementById("monsterClass");
monsterClass.textContent = daMonster.class;

const monsterRarity = document.getElementById("monsterRarity");
monsterRarity.textContent = daMonster.rarity;

const monsterElements = document.getElementById("monsterElements");
monsterElements.innerHTML = "";
for (const daElement of daMonster.elements)
{
    const sigilImg = document.createElement("img");
    sigilImg.src = daElement.sigil;
    monsterElements.appendChild(sigilImg);
}

const monsterIslands = document.getElementById("monsterIslands");
monsterIslands.innerHTML = "";

const monsterLikes = document.getElementById("monsterLikes");
monsterLikes.innerHTML = "";

for (const daIsland of daMonster.islands)
{
    const islandShowitDiv = document.createElement("div");
    islandShowitDiv.classList.add("monsterShowitDiv");
    monsterIslands.appendChild(islandShowitDiv);

        const islandImg = document.createElement("img");
        islandImg.src = daIsland.symbol;
        islandShowitDiv.appendChild(islandImg);

        const islandName = document.createElement("p");
        islandName.textContent = daIsland.name;
        islandShowitDiv.appendChild(islandName);

    const daLikes = [...daMonster.likes].filter(like => like.island == daIsland);

    if (daLikes.length > 0)
    {
        const islandLikesWrapper = document.createElement("div");
        islandLikesWrapper.classList.add("islandLikesWrapper");
        monsterLikes.appendChild(islandLikesWrapper);

            const islandShowitDiv = document.createElement("div");
            islandShowitDiv.classList.add("monsterShowitDiv");
            islandLikesWrapper.appendChild(islandShowitDiv);

                const islandImg = document.createElement("img");
                islandImg.src = daIsland.symbol;
                islandShowitDiv.appendChild(islandImg);

                const islandName = document.createElement("p");
                islandName.textContent = daIsland.name;
                islandShowitDiv.appendChild(islandName);
            
            for (const daLike of daLikes)
            {
                const showitDiv = document.createElement("div");
                showitDiv.classList.add("monsterShowitDiv");
                islandLikesWrapper.appendChild(showitDiv);
                
                    const decoImg = document.createElement("img");
                    if (daLike.isDecoration)
                    {
                        decoImg.src = daLike.obj.image;
                    }
                    else
                    {
                        decoImg.src = daLike.obj.portrait;
                    }
                    showitDiv.appendChild(decoImg);

                    const likeName = document.createElement("p");
                    likeName.textContent = daLike.name;
                    showitDiv.appendChild(likeName);
            }
    }
}

const monsterBio = document.getElementById("monsterBio");
monsterBio.innerHTML = daMonster.bio.replaceAll("\n", "<br/>");

const monsterPortrait = document.getElementById("monsterPortrait");
monsterPortrait.src = daMonster.portrait;

const monsterPortraitBlack = document.getElementById("monsterPortraitBlack");
monsterPortraitBlack.src = daMonster.portraitBlack;

const monsterSquare = document.getElementById("monsterSquare");
monsterSquare.src = daMonster.square;

const monsterEgg = document.getElementById("monsterEgg");
monsterEgg.src = daMonster.egg;

const monsterInventory = document.getElementById("monsterInventory");
monsterInventory.innerHTML = "";
for (const daEgg of daMonster.inventory)
{
    const showitDiv = document.createElement("div");
    showitDiv.classList.add("monsterShowitDiv");
        const carnalEgg = document.createElement("img");
        carnalEgg.src = monsters.find(monster => monster.name == daEgg.name).egg;
        showitDiv.appendChild(carnalEgg);

        const egg = document.createElement("p");
        egg.textContent = daEgg.name + " x" + daEgg.count;
        showitDiv.appendChild(egg);
    monsterInventory.appendChild(showitDiv);
}

const monsterMemory = document.getElementById("monsterMemory");
monsterMemory.innerHTML = "";
    const memorySrc = document.createElement("source");
    memorySrc.src = daMonster.memory;
    monsterMemory.appendChild(memorySrc);
