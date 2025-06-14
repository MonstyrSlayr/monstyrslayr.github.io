import { Song, MonsterData } from "../script.js";
import { getMonsters } from "https://monstyrslayr.github.io/msmTools/monsters.js";

const monsters = await getMonsters();

function getMonsterSquareByName(name)
{
    return monsters.filter((monster) => monster.name.toLowerCase() == name.toLowerCase())[0].square; // never punished
}

function init()
{
    const daSong = new Song("Celestial Island", 120, 16, 4, "#64e1b7", "white", [
        new MonsterData("Scaratar", [
            ["12-T01_Monster_01.wav", "12-T01_Monster_02.wav", "12-T01_Monster_01.wav", "12-T01_Monster_02.wav"],
        ], getMonsterSquareByName("scaratar")),
        new MonsterData("Loodvigg", [
            ["12-T02_Monster_01.wav", "12-T02_Monster_01.wav", "12-T02_Monster_01.wav", "12-T02_Monster_01.wav"],
            ["12-T02_Monster_02.wav", "12-T02_Monster_03.wav", "12-T02_Monster_02.wav", "12-T02_Monster_03.wav"],
            ["12-T02_Monster_04.wav", "12-T02_Monster_04.wav", "12-T02_Monster_04.wav", "12-T02_Monster_04.wav"],
            ["12-T02_Monster_05.wav", "12-T02_Monster_06.wav", "12-T02_Monster_05.wav", "12-T02_Monster_06.wav"],
        ], getMonsterSquareByName("loodvigg")),
        new MonsterData("Torrt", [
            ["12-T03_Monster_01.wav", "12-T03_Monster_01.wav", "12-T03_Monster_01.wav", "12-T03_Monster_01.wav"],
            ["12-T03_Monster_02.wav", "12-T03_Monster_02.wav", "12-T03_Monster_02.wav", "12-T03_Monster_02.wav"],
            ["12-T03_Monster_03.wav", "12-T03_Monster_03.wav", "12-T03_Monster_03.wav", "12-T03_Monster_03.wav"],
        ], getMonsterSquareByName("torrt")),
        new MonsterData("Plixie", [
            ["12-T04_Monster_01.wav", "12-T04_Monster_01.wav", "12-T04_Monster_01.wav", "12-T04_Monster_01.wav"],
        ], getMonsterSquareByName("plixie")),
        new MonsterData("Attmoz", [
            ["12-T05_Monster_01.wav", "", "12-T05_Monster_01.wav", ""],
        ], getMonsterSquareByName("attmoz")),
        new MonsterData("Hornacle", [
            ["12-T06_Monster_01.wav", "12-T06_Monster_01.wav", "12-T06_Monster_01.wav", "12-T06_Monster_01.wav"],
            ["12-T06_Monster_02.wav", "12-T06_Monster_02.wav", "12-T06_Monster_02.wav", "12-T06_Monster_02.wav"],
            ["12-T06_Monster_03.wav", "", "", ""],
            ["12-T06_Monster_04.wav", "", "", ""],
        ], getMonsterSquareByName("hornacle")),
        new MonsterData("Furnoss", [
            ["", "12-T07_Monster_01.wav", "", "12-T07_Monster_01.wav"],
            ["12-T07_Monster_02.wav", "12-T07_Monster_02.wav", "12-T07_Monster_02.wav", "12-T07_Monster_02.wav"],
        ], getMonsterSquareByName("furnoss")),
        new MonsterData("Glaishur", [
            ["12-T08_Monster_01.wav", "12-T08_Monster_01.wav", "12-T08_Monster_01.wav", "12-T08_Monster_01.wav"],
            ["12-T08_Monster_02.wav", "12-T08_Monster_02.wav", "12-T08_Monster_02.wav", "12-T08_Monster_02.wav"],
            ["12-T08_Monster_03.wav", "12-T08_Monster_03.wav", "12-T08_Monster_03.wav", "12-T08_Monster_03.wav"],
            ["12-T08_Monster_04.wav", "12-T08_Monster_04.wav", "12-T08_Monster_04.wav", "12-T08_Monster_04.wav"],
            ["12-T08_Monster_05.wav", "12-T08_Monster_05.wav", "12-T08_Monster_05.wav", "12-T08_Monster_05.wav"],
            ["12-T08_Monster_06.wav", "12-T08_Monster_06.wav", "12-T08_Monster_06.wav", "12-T08_Monster_06.wav"],
        ], getMonsterSquareByName("glaishur")),
        new MonsterData("Blasoom", [
            ["12-T09_Monster_01.wav", "", "12-T09_Monster_01.wav", ""],
        ], getMonsterSquareByName("blasoom")),
        new MonsterData("Syncopite", [
            ["12-T10_Monster_01.wav", "12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_03.wav"],
            ["12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_02.wav"],
            ["12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_04.wav"],
        ], getMonsterSquareByName("syncopite")),
        new MonsterData("Vhamp", [
            ["12-T11_Monster_01.wav", "12-T11_Monster_02.wav", "12-T11_Monster_01.wav", "12-T11_Monster_02.wav"],
        ], getMonsterSquareByName("vhamp")),
        new MonsterData("Galvana", [
            ["12-T12_Monster_01.wav", "", "", ""],
        ], getMonsterSquareByName("galvana")),
    ]);
    document.body.appendChild(daSong.element);
}

init();
