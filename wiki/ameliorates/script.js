import { getElements, getAmeliorates, getIslands, makeAmeliorateDiv, makeIslandDiv, makeElementDiv, getSongs, transitionToSite } from "../data.js";

// Initial monsters
let monsters = getAmeliorates();
const monsterContainer = document.getElementById("monsterContainer");

function createAmelioratesDiv()
{
	for (const mon of monsters)
	{
		const ameDiv = makeAmeliorateDiv(mon);

		monsterContainer.append(ameDiv);
	}
}
createAmelioratesDiv();

const sortSelect = document.getElementById("sortSelect");

// Function to sort and animate images based on ranking
function updatePositions()
{
    switch (sortSelect.value)
	{
		case "alphabetical": default:
			monsters.sort((a, b) =>
			{
				if (a.id.toLowerCase() < b.id.toLowerCase()) return -1;
				if (a.id.toLowerCase() > b.id.toLowerCase()) return 1;
				return 0;
			});
		break;
		
		case "elemental":
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

		case "age":
			monsters.sort((a, b) =>
			{
				return a.age - b.age;
			});
		break;

		case "height":
			monsters.sort((a, b) =>
			{
				return a.height - b.height;
			});
		break;

		case "weight":
			monsters.sort((a, b) =>
			{
				return a.weight - b.weight;
			});
		break;
	}

    // Get container and its children
    const images = Array.from(monsterContainer.children);

    // Reorder the images in the DOM based on sorted monsters
    monsters.forEach((item, index) =>
	{
		const image = document.getElementById(item.id);
		monsterContainer.appendChild(image);
    });

    // Animate images to their new positions using GSAP
    gsap.fromTo(images, { opacity: 0 }, { duration: 0.5, opacity: 1, stagger: 0.03 });
}

// Initial position update
updatePositions();

sortSelect.addEventListener("change", function ()
{
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
		const elementDiv = makeElementDiv(element);
		const daSigil = elementDiv.querySelector("img");
		daSigil.style.marginLeft = "0";
		
		elementsContainer.append(elementDiv);
	}
}
createElementsDiv();

const monsterRenderToolLink = document.getElementById("monsterRenderToolLink");
monsterRenderToolLink.addEventListener("click", function (e)
{
	e.preventDefault();

	const curAmeliorates = getAmeliorates();
	const dominantMonster = curAmeliorates[Math.floor(Math.random() * curAmeliorates.length)];

	const curElements = getElements();
	const dominantElement = curElements[Math.floor(Math.random() * curElements.length)];

	transitionToSite(this.href, dominantMonster.images.shadowless, dominantMonster.dominantColor, dominantElement.sigil, dominantElement.highlight);
});

function resizeWindow()
{
	const width = window.innerWidth;
    
    // Select elements you want to update
    const elements = document.querySelectorAll('.ameliorateDiv');

    elements.forEach(element => {
        if (width < 740)
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

const daEvent = new CustomEvent("pageScriptRun",
{
	detail: { message: "site built" },
	bubbles: true,
	cancelable: true
});
document.dispatchEvent(daEvent);
