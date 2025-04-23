import { Song, MonsterData } from "../script.js";

function init()
{
    const daSong = new Song("Seasonal Shanty", 140, 16, 2, "#ffb3d5", "black", [
        new MonsterData("Bass", [
            ["21-Bass_Monster_01.wav", ""],
            ["21-Bass_Monster_02.wav", ""],
            ["21-Bass_Monster_03.wav", ""],
            ["21-Bass_Monster_04.wav", ""],
        ], "monster_portrait_anniversary.avif"),
        new MonsterData("Punkleton", [
            ["21-S01_Monster_01.wav", "21-S01_Monster_01.wav"],
        ], "monster_portrait_square_s01.avif"),
        new MonsterData("Yool", [
            ["21-S02_Monster_01.wav", ""],
            ["21-S02_Monster_02.wav", ""],
        ], "monster_portrait_square_s02.avif"),
        new MonsterData("Schmoochle", [
            ["21-S03_Monster_01.wav", ""],
            ["21-S03_Monster_02.wav", ""],
        ], "monster_portrait_square_s03.avif"),
        new MonsterData("Blabbit", [
            ["21-S04_Monster_01.wav", ""],
            ["21-S04_Monster_02.wav", ""],
        ], "monster_portrait_square_s04.avif"),
        new MonsterData("Hoola", [
            ["21-S05_Monster_01.wav", ""],
            ["21-S05_Monster_02.wav", ""],
        ], "monster_portrait_square_s05.avif"),
        new MonsterData("Gobbleygourd", [
            ["21-S06_Monster_01.wav", ""],
            ["21-S06_Monster_02.wav", ""],
        ], "monster_portrait_square_s06.avif"),
        new MonsterData("Clavavera", [
            ["21-S07_Monster_01.wav", ""],
        ], "monster_portrait_square_s07.avif"),
        new MonsterData("Viveine", [
            ["21-S08_Monster_01.wav", "21-S08_Monster_01.wav"],
        ], "monster_portrait_square_s08.avif"),
        new MonsterData("Jam Boree", [
            ["21-S09_Monster_01.wav", ""],
            ["21-S09_Monster_02.wav", ""],
        ], "monster_portrait_square_s09.avif"),
        new MonsterData("Carillong", [
            ["21-S10_Monster_01.wav", ""],
        ], "monster_portrait_square_s10.avif"),
        new MonsterData("Whiz-bang", [
            ["21-S11_Monster_01.wav", "21-S11_Monster_01.wav"],
        ], "monster_portrait_square_s11.avif"),
        new MonsterData("Monculus", [
            ["21-S12_Monster_01.wav", ""],
        ], "monster_portrait_square_s12.avif"),
        new MonsterData("Ffidyll", [
            ["21-S13_Monster_01.wav", ""],
            ["21-S13_Monster_02.wav", ""],
        ], "monster_portrait_square_s13.avif"),
        new MonsterData("Boo'qwurm", [
            ["21-S14_Monster_01.wav", "21-S14_Monster_01.wav"],
        ], "monster_portrait_square_s14.avif"),
        new MonsterData("Spurrit", [
            ["21-S15_Monster_01.wav", "21-S15_Monster_01.wav"],
        ], "monster_portrait_square_s15.avif"),
    ], 10);
    document.body.appendChild(daSong.element);
}

init();
