import { IMG, getAmeliorates } from "../monsters.js";

// Initial rankings
let rankings = getAmeliorates();
const monsterContainer = document.getElementById("monsterContainer");
const root = document.documentElement;

const SORTING = ["Elemental", "Alphabetical", "Age"];

let sorting = 0;

function createAmeliorates()
{
	let daStuff = getComputedStyle(root);
	for (let i = 0; i < rankings.length; i++)
	{
		const mon = rankings[i];

		const ameDiv = document.createElement("div");
		ameDiv.classList = ["box"];
		switch (mon.affiliation)
		{
			case "B": default:
				ameDiv.style.backgroundColor = daStuff.getPropertyValue('--bulb-outside');
				break;
			case "H":
				ameDiv.style.backgroundColor = daStuff.getPropertyValue('--hostess-outside');
				break;
			case "C":
				ameDiv.style.backgroundColor = daStuff.getPropertyValue('--clay-outside');
				break;
			case "S":
				ameDiv.style.backgroundColor = daStuff.getPropertyValue('--signal-outside');
				break;
			case "T":
				ameDiv.style.backgroundColor = daStuff.getPropertyValue('--trash-outside');
				break;
		}
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

		const daElements = [mon.B, mon.H, mon.C, mon.S, mon.T];

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
				daElementList.append(daSigil);
			}
		}

		const ameName = document.createElement("label");
		ameName.innerHTML = mon.realName;
		daLabel.append(ameName);

		monsterContainer.append(ameDiv);
	}
}

createAmeliorates();

const sortButton = document.getElementById("sortButton");
const sortType = document.getElementById("daSort");

// Function to sort and animate images based on ranking
function updatePositions()
{
	sortType.innerHTML = SORTING[sorting];
    switch (SORTING[sorting])
	{
		case "Alphabetical": default:
			rankings.sort((a, b) =>
			{
				if (a.id.toLowerCase() < b.id.toLowerCase()) return -1;
				if (a.id.toLowerCase() > b.id.toLowerCase()) return 1;
				return 0;
			});
		break;
		
		case "Elemental":
			rankings.sort((a, b) =>
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
			expiAge = 55 * Math.random();
			rankings.sort((a, b) =>
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

    // Reorder the images in the DOM based on sorted rankings
    rankings.forEach((item, index) => {
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