import { Song, MonsterData } from "../script.js";
import { getMonsters } from "https://monstyrslayr.github.io/msmTools/monsters.js";

const monsters = await getMonsters();

function getMonsterSquareByName(name)
{
    return monsters.filter((monster) => monster.name.toLowerCase() == name.toLowerCase())[0].square; // never punished
}

function init()
{
    const daSong = new Song("Plasma Islet", 96, 16, 2, "#b08cf8", "white", [
        new MonsterData("Bass", [
            ["26-Bass_Monster_01.wav", ""],
            ["26-Bass_Monster_02.wav", ""],
            ["26-Bass_Monster_03.wav", ""],
        ], "https://monstyrslayr.github.io/msmTools/webp/square/monster_portrait_plasma.webp"),
        new MonsterData("Ghazt", [
            ["26-G_Monster_01.wav", ""],
            ["26-G_Monster_02.wav", ""],
        ], getMonsterSquareByName("ghazt")),
        new MonsterData("Whisp", [
            ["26-GJ_Monster_01.wav", ""],
        ], getMonsterSquareByName("whisp")),
        new MonsterData("Nebulob", [
            ["26-GK_Monster_01.wav", ""],
            ["26-GK_Monster_02.wav", ""],
        ], getMonsterSquareByName("nebulob")),
        new MonsterData("Sox", [
            ["26-GL_Monster_01.wav", ""],
            ["26-GL_Monster_02.wav", ""],
            ["26-GL_Monster_03.wav", ""],
        ], getMonsterSquareByName("sox")),
        new MonsterData("Jellbilly", [
            ["26-GM_Monster_01.wav", ""],
        ], getMonsterSquareByName("jellbilly")),
        new MonsterData("Yooreek", [
            ["26-GJK_Monster_01.wav", ""],
            ["26-GJK_Monster_02.wav", ""],
        ], getMonsterSquareByName("yooreek")),
        new MonsterData("Meebkin", [
            ["26-GJL_Monster_01.wav", "26-GJL_Monster_01.wav"],
            ["26-GJL_Monster_02.wav", "26-GJL_Monster_02.wav"],
            ["26-GJL_Monster_03.wav", "26-GJL_Monster_03.wav"],
        ], getMonsterSquareByName("meebkin")),
        new MonsterData("Blarret", [
            ["26-GJM_Monster_01.wav", ""],
            ["26-GJM_Monster_02.wav", ""],
        ], getMonsterSquareByName("blarret")),
        new MonsterData("Gaddzooks", [
            ["26-GKL_Monster_01.wav", "26-GKL_Monster_01.wav"],
            ["26-GKL_Monster_02.wav", "26-GKL_Monster_02.wav"],
            ["26-GKL_Monster_03.wav", "26-GKL_Monster_03.wav"],
            ["26-GKL_Monster_04.wav", "26-GKL_Monster_04.wav"],
            ["26-GKL_Monster_05.wav", "26-GKL_Monster_05.wav"],
            ["26-GKL_Monster_05.wav", "26-GKL_Monster_06.wav"],
        ], getMonsterSquareByName("gaddzooks")),
        new MonsterData("Auglur", [
            ["26-GKM_Monster_01.wav", ""],
            ["26-GKM_Monster_02.wav", ""],
            ["26-GKM_Monster_03.wav", ""],
        ], getMonsterSquareByName("auglur")),
        new MonsterData("Flasque", [
            ["26-GLM_Monster_01.wav", ""],
            ["26-GLM_Monster_02.wav", ""],
        ], getMonsterSquareByName("flasque")),
        new MonsterData("Whaill", [
            ["26-GJKL_Monster_01.wav", ""],
            ["26-GJKL_Monster_02.wav", ""],
        ], getMonsterSquareByName("whaill")),
        new MonsterData("Lowb", [
            ["26-PRM_01_Monster_01.wav", "26-PRM_01_Monster_01.wav"],
            ["26-PRM_01_Monster_02.wav", "26-PRM_01_Monster_02.wav"],
            ["26-PRM_01_Monster_03.wav", "26-PRM_01_Monster_03.wav"],
        ], getMonsterSquareByName("lowb")),
    ]);
    document.body.appendChild(daSong.element);
}

init();
