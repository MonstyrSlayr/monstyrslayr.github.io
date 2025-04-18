import { Song, MonsterData } from "../script.js";

function init()
{
    const daSong = new Song("Plasma Islet", 96, 16, 2, "#b08cf8", "white", [
        new MonsterData("Bass", [
            ["26-Bass_Monster_01.wav", ""],
            ["26-Bass_Monster_02.wav", ""],
            ["26-Bass_Monster_03.wav", ""],
        ], "monster_portrait_plasma.avif"),
        new MonsterData("Ghast", [
            ["26-G_Monster_01.wav", ""],
            ["26-G_Monster_02.wav", ""],
        ], "monster_portrait_square_g.avif"),
        new MonsterData("Whisp", [
            ["26-GJ_Monster_01.wav", ""],
        ], "monster_portrait_square_gj.avif"),
        new MonsterData("Nebulob", [
            ["26-GK_Monster_01.wav", ""],
            ["26-GK_Monster_02.wav", ""],
        ], "monster_portrait_square_gk.avif"),
        new MonsterData("Sox", [
            ["26-GL_Monster_01.wav", ""],
            ["26-GL_Monster_02.wav", ""],
            ["26-GL_Monster_03.wav", ""],
        ], "monster_portrait_square_gl.avif"),
        new MonsterData("Jellbilly", [
            ["26-GM_Monster_01.wav", ""],
        ], "monster_portrait_square_gm.avif"),
        new MonsterData("Yooreek", [
            ["26-GJK_Monster_01.wav", ""],
            ["26-GJK_Monster_02.wav", ""],
        ], "monster_portrait_square_gjk.avif"),
        new MonsterData("Meebkin", [
            ["26-GJL_Monster_01.wav", "26-GJL_Monster_01.wav"],
            ["26-GJL_Monster_02.wav", "26-GJL_Monster_02.wav"],
            ["26-GJL_Monster_03.wav", "26-GJL_Monster_03.wav"],
        ], "monster_portrait_square_gjl.avif"),
        new MonsterData("Blarret", [
            ["26-GJM_Monster_01.wav", ""],
            ["26-GJM_Monster_02.wav", ""],
        ], "monster_portrait_square_gjm.avif"),
        new MonsterData("Gaddzooks", [
            ["26-GKL_Monster_01.wav", "26-GKL_Monster_01.wav"],
            ["26-GKL_Monster_02.wav", "26-GKL_Monster_02.wav"],
            ["26-GKL_Monster_03.wav", "26-GKL_Monster_03.wav"],
            ["26-GKL_Monster_04.wav", "26-GKL_Monster_04.wav"],
            ["26-GKL_Monster_05.wav", "26-GKL_Monster_05.wav"],
            ["26-GKL_Monster_05.wav", "26-GKL_Monster_06.wav"],
        ], "monster_portrait_square_gkl.avif"),
        new MonsterData("Auglur", [
            ["26-GKM_Monster_01.wav", ""],
            ["26-GKM_Monster_02.wav", ""],
            ["26-GKM_Monster_03.wav", ""],
        ], "monster_portrait_square_gkm.avif"),
        new MonsterData("Flasque", [
            ["26-GLM_Monster_01.wav", ""],
            ["26-GLM_Monster_02.wav", ""],
        ], "monster_portrait_square_glm.avif"),
        new MonsterData("Whaill", [
            ["26-GJKL_Monster_01.wav", ""],
            ["26-GJKL_Monster_02.wav", ""],
        ], "monster_portrait_square_gjkl.avif"),
        new MonsterData("Lowb", [
            ["26-PRM_01_Monster_01.wav", "26-PRM_01_Monster_01.wav"],
            ["26-PRM_01_Monster_02.wav", "26-PRM_01_Monster_02.wav"],
            ["26-PRM_01_Monster_03.wav", "26-PRM_01_Monster_03.wav"],
        ], "monster_portrait_square_prm_01.avif"),
    ]);
    document.body.appendChild(daSong.element);
}

init();
