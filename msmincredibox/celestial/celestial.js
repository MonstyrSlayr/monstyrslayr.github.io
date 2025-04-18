import { Song, MonsterData } from "../script.js";

function init()
{
    const daSong = new Song("Celestial Island", 120, 16, 4, "#64e1b7", "white", [
        new MonsterData("Scaratar", [
            ["12-T01_Monster_01.wav", "12-T01_Monster_02.wav", "12-T01_Monster_01.wav", "12-T01_Monster_02.wav"],
        ], "monster_portrait_square_t01.avif"),
        new MonsterData("Loodvigg", [
            ["12-T02_Monster_01.wav", "12-T02_Monster_01.wav", "12-T02_Monster_01.wav", "12-T02_Monster_01.wav"],
            ["12-T02_Monster_02.wav", "12-T02_Monster_03.wav", "12-T02_Monster_02.wav", "12-T02_Monster_03.wav"],
            ["12-T02_Monster_04.wav", "12-T02_Monster_04.wav", "12-T02_Monster_04.wav", "12-T02_Monster_04.wav"],
            ["12-T02_Monster_05.wav", "12-T02_Monster_06.wav", "12-T02_Monster_05.wav", "12-T02_Monster_06.wav"],
        ], "monster_portrait_square_t02.avif"),
        new MonsterData("Torrt", [
            ["12-T03_Monster_01.wav", "12-T03_Monster_01.wav", "12-T03_Monster_01.wav", "12-T03_Monster_01.wav"],
            ["12-T03_Monster_02.wav", "12-T03_Monster_02.wav", "12-T03_Monster_02.wav", "12-T03_Monster_02.wav"],
            ["12-T03_Monster_03.wav", "12-T03_Monster_03.wav", "12-T03_Monster_03.wav", "12-T03_Monster_03.wav"],
        ], "monster_portrait_square_t03.avif"),
        new MonsterData("Plixie", [
            ["12-T04_Monster_01.wav", "12-T04_Monster_01.wav", "12-T04_Monster_01.wav", "12-T04_Monster_01.wav"],
        ], "monster_portrait_square_t04.avif"),
        new MonsterData("Attmoz", [
            ["12-T05_Monster_01.wav", "", "12-T05_Monster_01.wav", ""],
        ], "monster_portrait_square_t05.avif"),
        new MonsterData("Hornacle", [
            ["12-T06_Monster_01.wav", "12-T06_Monster_01.wav", "12-T06_Monster_01.wav", "12-T06_Monster_01.wav"],
            ["12-T06_Monster_02.wav", "12-T06_Monster_02.wav", "12-T06_Monster_02.wav", "12-T06_Monster_02.wav"],
            ["12-T06_Monster_03.wav", "", "", ""],
            ["12-T06_Monster_04.wav", "", "", ""],
        ], "monster_portrait_square_t06.avif"),
        new MonsterData("Furnoss", [
            ["", "12-T07_Monster_01.wav", "", "12-T07_Monster_01.wav"],
            ["12-T07_Monster_02.wav", "12-T07_Monster_02.wav", "12-T07_Monster_02.wav", "12-T07_Monster_02.wav"],
        ], "monster_portrait_square_t07.avif"),
        new MonsterData("Glaishur", [
            ["12-T08_Monster_01.wav", "12-T08_Monster_01.wav", "12-T08_Monster_01.wav", "12-T08_Monster_01.wav"],
            ["12-T08_Monster_02.wav", "12-T08_Monster_02.wav", "12-T08_Monster_02.wav", "12-T08_Monster_02.wav"],
            ["12-T08_Monster_03.wav", "12-T08_Monster_03.wav", "12-T08_Monster_03.wav", "12-T08_Monster_03.wav"],
            ["12-T08_Monster_04.wav", "12-T08_Monster_04.wav", "12-T08_Monster_04.wav", "12-T08_Monster_04.wav"],
            ["12-T08_Monster_05.wav", "12-T08_Monster_05.wav", "12-T08_Monster_05.wav", "12-T08_Monster_05.wav"],
            ["12-T08_Monster_06.wav", "12-T08_Monster_06.wav", "12-T08_Monster_06.wav", "12-T08_Monster_06.wav"],
        ], "monster_portrait_square_t08.avif"),
        new MonsterData("Blasoom", [
            ["12-T09_Monster_01.wav", "", "12-T09_Monster_01.wav", ""],
        ], "monster_portrait_square_t09.avif"),
        new MonsterData("Syncopite", [
            ["12-T10_Monster_01.wav", "12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_03.wav"],
            ["12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_02.wav"],
            ["12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_02.wav", "12-T10_Monster_04.wav"],
        ], "monster_portrait_square_t10.avif"),
        new MonsterData("Vhamp", [
            ["12-T11_Monster_01.wav", "12-T11_Monster_02.wav", "12-T11_Monster_01.wav", "12-T11_Monster_02.wav"],
        ], "monster_portrait_square_t11.avif"),
        new MonsterData("Galvana", [
            ["12-T12_Monster_01.wav", "", "", ""],
        ], "monster_portrait_square_t12.avif"),
    ]);
    document.body.appendChild(daSong.element);
}

init();
