import { IMG, getIslandById } from "../data.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const daMonster = getIslandById(urlParams.get("id"));

const daAmeliorateImg = document.getElementById("monsterImg");
//daAmeliorateImg.src = daMonster.images.default;

const daMonsterTitle = document.getElementById("monsterTitle");
daMonsterTitle.innerHTML = daMonster.name;

const daMonsterName = document.getElementById("monsterName");
daMonsterName.innerHTML = daMonster.name;

const elementImagesDiv = document.getElementById("elementImages");
const elementNamesList = document.getElementById("elementNamesList");

for (const element of daMonster.elements)
{
    const daSigil = document.createElement("img");
    daSigil.src = element.sigil;
    daSigil.classList = ["miniElement"];
    elementImagesDiv.append(daSigil);

    elementNamesList.innerHTML += element.name + ", ";
}

elementNamesList.innerHTML = elementNamesList.innerHTML.substring(0, elementNamesList.innerHTML.length - 2);