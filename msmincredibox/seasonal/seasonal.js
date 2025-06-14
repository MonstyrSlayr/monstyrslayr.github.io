import { Song, MonsterData } from "../script.js";
import { getMonsters } from "https://monstyrslayr.github.io/msmTools/monsters.js";

const monsters = await getMonsters();

function getMonsterSquareByName(name)
{
    return monsters.filter((monster) => monster.name.toLowerCase() == name.toLowerCase())[0].square; // never punished
}

function init()
{
    const daSong = new Song("Seasonal Shanty", 140, 16, 2, "#ffb3d5", "black", [
        new MonsterData("Bass", [
            ["21-Bass_Monster_01.wav", ""],
            ["21-Bass_Monster_02.wav", ""],
            ["21-Bass_Monster_03.wav", ""],
            ["21-Bass_Monster_04.wav", ""],
        ], "https://monstyrslayr.github.io/msmTools/webp/square/monster_portrait_anniversary.webp"),
        new MonsterData("Punkleton", [
            ["21-S01_Monster_01.wav", "21-S01_Monster_01.wav"],
        ], getMonsterSquareByName("punkleton")),
        new MonsterData("Yool", [
            ["21-S02_Monster_01.wav", ""],
            ["21-S02_Monster_02.wav", ""],
        ], getMonsterSquareByName("yool")),
        new MonsterData("Schmoochle", [
            ["21-S03_Monster_01.wav", ""],
            ["21-S03_Monster_02.wav", ""],
        ], getMonsterSquareByName("schmoochle")),
        new MonsterData("Blabbit", [
            ["21-S04_Monster_01.wav", ""],
            ["21-S04_Monster_02.wav", ""],
        ], getMonsterSquareByName("blabbit")),
        new MonsterData("Hoola", [
            ["21-S05_Monster_01.wav", ""],
            ["21-S05_Monster_02.wav", ""],
        ], getMonsterSquareByName("hoola")),
        new MonsterData("Gobbleygourd", [
            ["21-S06_Monster_01.wav", ""],
            ["21-S06_Monster_02.wav", ""],
        ], getMonsterSquareByName("gobbleygourd")),
        new MonsterData("Clavavera", [
            ["21-S07_Monster_01.wav", ""],
        ], getMonsterSquareByName("clavavera")),
        new MonsterData("Viveine", [
            ["21-S08_Monster_01.wav", "21-S08_Monster_01.wav"],
        ], getMonsterSquareByName("viveine")),
        new MonsterData("Jam Boree", [
            ["21-S09_Monster_01.wav", ""],
            ["21-S09_Monster_02.wav", ""],
        ], getMonsterSquareByName("jam boree")),
        new MonsterData("Carillong", [
            ["21-S10_Monster_01.wav", ""],
        ], getMonsterSquareByName("carillong")),
        new MonsterData("Whiz-bang", [
            ["21-S11_Monster_01.wav", "21-S11_Monster_01.wav"],
        ], getMonsterSquareByName("whiz-bang")),
        new MonsterData("Monculus", [
            ["21-S12_Monster_01.wav", ""],
        ], getMonsterSquareByName("monculus")),
        new MonsterData("Ffidyll", [
            ["21-S13_Monster_01.wav", ""],
            ["21-S13_Monster_02.wav", ""],
        ], getMonsterSquareByName("ffidyll")),
        new MonsterData("Boo'qwurm", [
            ["21-S14_Monster_01.wav", "21-S14_Monster_01.wav"],
        ], getMonsterSquareByName("boo'qwurm")),
        new MonsterData("Spurrit", [
            ["21-S15_Monster_01.wav", "21-S15_Monster_01.wav"],
        ], getMonsterSquareByName("spurrit")),
    ], 10);
    document.body.appendChild(daSong.element);
}

init();
