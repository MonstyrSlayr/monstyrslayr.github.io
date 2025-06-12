import { Monster, getRarities, getClasses, getMonsters } from "https://monstyrslayr.github.io/msmTools/monsters.js";

async function main()
{
    const RARITY = getRarities();
    const allowedRarities = [RARITY.COMMON, RARITY.ADULT, RARITY.MAJOR];
    const monsters = await getMonsters();
    const commonMonsters = monsters.filter((monster = Monster) => allowedRarities.includes(monster.rarity));

    console.log(commonMonsters);
}

main();