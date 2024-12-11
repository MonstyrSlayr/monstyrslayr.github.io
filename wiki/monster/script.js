import { IMG, getAmeliorateById } from "../monsters.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const daMonster = getAmeliorateById(urlParams.get("id"));

const daAmeliorateImg = document.getElementById("monsterImg");
daAmeliorateImg.src = daMonster.images.default;

const daMonsterTitle = document.getElementById("monsterTitle");
daMonsterTitle.innerHTML = daMonster.realName;

const daMonsterName = document.getElementById("monsterName");
daMonsterName.innerHTML = daMonster.realName;

const elementImagesDiv = document.getElementById("elementImages");

const daElements = [daMonster.B, daMonster.H, daMonster.C, daMonster.S, daMonster.T];

for (let j = 0; j < daElements.length; j++)
{
    if (daElements[j])
    {
        const daSigil = document.createElement("img");
        switch (j)
        {
            case 0: default:
                daSigil.src = IMG + "ElementBulb.png";
                break;
            case 1:
                daSigil.src = IMG + "ElementHostess.png";
                break;
            case 2:
                daSigil.src = IMG + "ElementClay.png";
                break;
            case 3:
                daSigil.src = IMG + "ElementSignal.png";
                break;
            case 4:
                daSigil.src = IMG + "ElementTrash.png";
                break;
        }

        daSigil.classList = ["miniElement"];
        elementImagesDiv.append(daSigil);
    }
}