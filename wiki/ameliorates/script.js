import { getElements, getAmeliorates, getIslands, makeAmeliorateDiv, makeIslandDiv, makeElementDiv, getSongs } from "../data.js";

// Initial monsters
let monsters = getAmeliorates();
const monsterContainer = document.getElementById("monsterContainer");

const SORTING = ["Elemental", "Alphabetical", "Age"];

let sorting = 0;

function createAmelioratesDiv()
{
	for (const mon of monsters)
	{
		const ameDiv = makeAmeliorateDiv(mon);

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
		const islandDiv = makeIslandDiv(island);

		islandContainer.append(islandDiv);
	}
}
createIslandsDiv();

const songs = getSongs();
const songContainer = document.getElementById("songsContainer");
function createSongsDiv()
{
	for (const song of songs)
	{
		const songDiv = makeIslandDiv(song, true);

		songContainer.append(songDiv);
	}
}
createSongsDiv();

const elements = getElements();
const elementsContainer = document.getElementById("elementsContainer");
function createElementsDiv()
{
	for (const element of elements)
	{
		const elementDiv =  makeElementDiv(element);
		
		elementsContainer.append(elementDiv);
	}
}
createElementsDiv();

function resizeWindow()
{
	const width = window.innerWidth;
    
    // Select elements you want to update
    const elements = document.querySelectorAll('.ameliorateDiv');

    elements.forEach(element => {
        if (width < 600)
		{
            element.classList.add('layer');
            element.classList.remove('box');
            element.classList.remove('long');
        }
        else if (width < 1100)
		{
            element.classList.add('long');
            element.classList.remove('box');
            element.classList.remove('layer');
        }
		else
		{
            element.classList.add('box');
            element.classList.remove('layer');
            element.classList.remove('long');
        }
    });
}

window.addEventListener('resize', () =>
{
    resizeWindow();
});

resizeWindow();