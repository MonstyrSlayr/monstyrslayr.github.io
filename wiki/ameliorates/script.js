import { IMG, getElements, getAmeliorates, getIslands } from "../data.js";

// Initial monsters
let monsters = getAmeliorates();
const monsterContainer = document.getElementById("monsterContainer");
const root = document.documentElement;
const daCSS = getComputedStyle(root);

const SORTING = ["Elemental", "Alphabetical", "Age"];

let sorting = 0;

function createAmelioratesDiv()
{
	for (const mon of monsters)
	{
		const ameDiv = document.createElement("div");
		ameDiv.classList = ["box"];
		ameDiv.style.backgroundColor = mon.affiliation.outside;
		ameDiv.id = mon.id;
		ameDiv.addEventListener("click", function()
		{
			window.location.href = "../monster/index.html?id=" + encodeURIComponent(ameDiv.id);
		});

		const ameImg = document.createElement("img");
		ameImg.src = mon.images.emoji;
		ameImg.classList = ["monsterEmoji"];
		ameDiv.append(ameImg);

		const daLabel = document.createElement("div");
		daLabel.classList = ["monsterLabel"];
		ameDiv.append(daLabel);

		const daElementList = document.createElement("div");
		daElementList.classList = ["miniElementList"];
		daLabel.append(daElementList);

		for (const element of mon.elements)
		{
			const daSigil = document.createElement("img");
			daSigil.src = element.sigil;
			daSigil.classList = ["miniElement"];
			daElementList.append(daSigil);
		}

		const ameName = document.createElement("label");
		ameName.innerHTML = mon.realName;
		daLabel.append(ameName);

		monsterContainer.append(ameDiv);
	}
}
createAmelioratesDiv();

const sortButton = document.getElementById("sortButton");
const sortType = document.getElementById("daSort");

// Function to sort and animate images based on ranking
function updatePositions()
{
	sortType.innerHTML = SORTING[sorting];
    switch (SORTING[sorting])
	{
		case "Alphabetical": default:
			monsters.sort((a, b) =>
			{
				if (a.id.toLowerCase() < b.id.toLowerCase()) return -1;
				if (a.id.toLowerCase() > b.id.toLowerCase()) return 1;
				return 0;
			});
		break;
		
		case "Elemental":
			monsters.sort((a, b) =>
			{
				if (a.elementString.length < b.elementString.length) return -1;
				if (a.elementString.length > b.elementString.length) return 1;
				if (a.elementString.length == b.elementString.length)
				{
					let daA = a.elementString.replace("B", "A").replace("H", "B").replace("S", "D").replace("T", "E");
					let daB = b.elementString.replace("B", "A").replace("H", "B").replace("S", "D").replace("T", "E");
					if (daA < daB) return -1;
					if (daA > daB) return 1;
					return 0;
				}
			});
		break;

		case "Age":
			let expiAge = 55 * Math.random();
			monsters.sort((a, b) =>
			{
				let aage = (a.id == "ExpiFour") ? expiAge : a.attr.age;
				let bage = (b.id == "ExpiFour") ? expiAge :  b.attr.age;
				if (aage == 0 || bage == 0) return 0;
				return aage - bage;
			});
		break;
	}

    // Get container and its children
    const images = Array.from(monsterContainer.children);

    // Reorder the images in the DOM based on sorted monsters
    monsters.forEach((item, index) => {
      const image = document.getElementById(item.id);
      monsterContainer.appendChild(image);
    });

    // Animate images to their new positions using GSAP
    gsap.fromTo(images, { opacity: 0 }, { duration: 0.5, opacity: 1, stagger: 0.03 });
}

// Initial position update
updatePositions();

sortButton.addEventListener("click", function ()
{
	sorting++;
	if (sorting >= SORTING.length) sorting = 0;
	updatePositions();
});

const islands = getIslands();
const islandContainer = document.getElementById("islandContainer");
function createIslandsDiv()
{
	for (const island of islands)
	{
		const islandDiv = document.createElement("div");
		islandDiv.classList = ["layer"];
		islandDiv.style.backgroundColor = island.affiliation.outside;
		islandDiv.id = island.id;
		islandDiv.addEventListener("click", function()
		{
			window.location.href = "../island/index.html?id=" + encodeURIComponent(islandDiv.id);
		});

		const islandName = document.createElement("label");
		islandName.innerHTML = island.name;
		islandDiv.append(islandName);

		islandContainer.append(islandDiv);
	}
}
createIslandsDiv();

const elements = getElements();
const elementsContainer = document.getElementById("elementsContainer");
function createElementsDiv()
{
	for (const element of elements)
	{
		const elementDiv = document.createElement("div");
		elementDiv.classList = ["layer"];
		elementDiv.style.backgroundColor = element.outside;
		elementDiv.id = element.id;
		elementDiv.addEventListener("click", function()
		{
			window.location.href = "../element/index.html?id=" + encodeURIComponent(elementDiv.id);
		});

		const elementName = document.createElement("label");
		elementName.innerHTML = element.name;
		elementDiv.append(elementName);

		elementsContainer.append(elementDiv);
	}
}
createElementsDiv();