import { getMonsters } from "../monsters.js"

const monsters = await getMonsters();

const monstersDiv = document.getElementById("monstersDiv");

for (const monster of monsters)
{
    console.log(monster.name);

    const daMonsterDiv = document.createElement("a");
    daMonsterDiv.href = `./${monster.id}`;
    daMonsterDiv.classList.add("monsterDiv");
    monstersDiv.appendChild(daMonsterDiv);

        const daMonsterLeft = document.createElement("div");
        daMonsterLeft.classList.add("monsterDivLeft");
        daMonsterDiv.appendChild(daMonsterLeft);

            const daMonsterSquare = document.createElement("img");
            daMonsterSquare.classList.add("monsterDivSquare");
            daMonsterSquare.src = monster.square;
            daMonsterLeft.appendChild(daMonsterSquare);

        const daMonsterRight = document.createElement("div");
        daMonsterRight.classList.add("monsterDivRight");
        daMonsterDiv.appendChild(daMonsterRight);

            const daMonsterName = document.createElement("h3");
            daMonsterName.classList.add("monsterDivName");
            daMonsterName.textContent = monster.name;
            daMonsterRight.appendChild(daMonsterName);
}
