function getShinyPebblePercent(pebbleLevel = 1)
{
    if (pebbleLevel < 1) return 0;
    return Math.round((0.16 + 0.08 * (pebbleLevel - 1)) * 100) / 100;
}

function getXpForNextLevel(playerLevel = 1, pebbleLevel = 0)
{
    // where xp is calculated not by shiny pebble giving more xp,
    // but by shiny pebble decreasing the amount of xp required

    if (playerLevel - pebbleLevel <= 0) pebbleLevel = 0;
    return (64 + 64 * (playerLevel - 1)) / (1 + getShinyPebblePercent(pebbleLevel));
}

function getTotalXpGained(startPlayerLevel = 1, playerLevel = 1, levelsPebbleUpgraded = [])
{
    let xp = 0;
    const pebbleSet = new Set(levelsPebbleUpgraded);
    for (let i = Math.max(1, startPlayerLevel); i <= playerLevel; i++)
    {
        let shinyPebbles = 0;
        for (const pebbleLevel of pebbleSet)
        {
            if (1 < pebbleLevel && pebbleLevel <= i)
            {
                shinyPebbles++;
            }
        }

        xp += getXpForNextLevel(i, shinyPebbles);
    }
    return xp;
}

function getTotalXpSaved(startPlayerLevel = 1, playerLevel = 1, levelsPebbleUpgraded = [])
{
    return getTotalXpGained(startPlayerLevel, playerLevel) - getTotalXpGained(startPlayerLevel, playerLevel, levelsPebbleUpgraded);
}

function getTotalXpGainedSpecific(levels = [])
{
    let xp = 0;
    const levelSet = new Set(levels);

    for (const level of levelSet)
    {
        xp += getXpForNextLevel(level);
    }
    
    return xp;
}

function getLevelShinyPebbleIsWorth(levelsPebbleUpgraded = [])
{
    if (levelsPebbleUpgraded.length == 0) return 1;

    let levelWorth = 1;

    while (getTotalXpSaved(Math.min(...levelsPebbleUpgraded), levelWorth, levelsPebbleUpgraded) < getTotalXpGainedSpecific(levelsPebbleUpgraded))
    {
        levelWorth++;
    }

    return levelWorth;
}

// the good stuff
document.addEventListener('DOMContentLoaded', function()
{
    const playerLevelInput = document.getElementById("playerLevel");
    const playerLevelOutput = document.getElementById("determinedPlayerLevel");
    let playerLevel = 1;
    
    const pebbleLevelsInput = document.getElementById("pebbleLevels");
    const pebbleLevelsOutput = document.getElementById("determinedPebbleLevels");
    const pebbleLevelOutput = document.getElementById("determinedPebbleLevel");
    let pebbleLevels = [];

    const xpSavedOutput = document.getElementById("shinyPebbleXpSaved");
    const levelWorthOutput = document.getElementById("shinyPebbleLevelWorth");

    function outputPebbleCalculations()
    {
        let xpSaved = getTotalXpSaved(1, playerLevel, pebbleLevels);
        let levelWorth = getLevelShinyPebbleIsWorth(pebbleLevels);

        xpSavedOutput.textContent = "Shiny pebble gives you " + Math.round(xpSaved) + " xp";
        levelWorthOutput.textContent = "The shiny pebbles taken are worth it at level " + levelWorth;
    }

    function updatePlayerLevelOutput()
    {
        const parsedInput = playerLevelInput.value.split(",")[0];
        if (Number(parsedInput))
        {
            playerLevel = Math.max(1, Math.round(Number(parsedInput)));
            playerLevelOutput.textContent = "Level " + playerLevel;
        }
        else
        {
            playerLevel = 1;
            playerLevelOutput.textContent = "Level 1";
        }
    }

    function updatePebbleLevelsOutput()
    {
        const parsedInput = pebbleLevelsInput.value.split(",");
        let pebbles = [];

        for (const maybeNum of parsedInput)
        {
            if (Number(maybeNum))
            {
                if (Number(maybeNum) >= 2)
                {
                    pebbles.push(Math.max(2, Math.round(Number(maybeNum))));
                }
            }
        }

        pebbles = [...new Set(pebbles)];

        pebbleLevels = pebbles.sort((a, b) => a - b);

        if (pebbleLevels.length == 0)
        {
            pebbleLevelsOutput.textContent = "No shiny pebbles taken";
            pebbleLevelOutput.textContent = "";
        }
        else
        {
            if (pebbleLevels.length == 1) pebbleLevelsOutput.textContent = "Shiny pebble taken at level " + pebbleLevels[0];
            else pebbleLevelsOutput.textContent = "Shiny pebble taken at levels " + pebbleLevels.join(", ");

            if (Math.max(...pebbleLevels) < playerLevel)
            {
                pebbleLevelOutput.textContent = "Your shiny pebble is level " + pebbleLevels.length;
            }
            else if (Math.max(...pebbleLevels) == playerLevel)
            {
                pebbleLevelOutput.textContent = "Your shiny pebble is/will be level " + pebbleLevels.length;
            }
            else
            {
                pebbleLevelOutput.textContent = "Your shiny pebble will be level " + pebbleLevels.length;
            }

            pebbleLevelOutput.textContent += " and gives +" + Math.round(getShinyPebblePercent(pebbleLevels.length) * 100) + "% more xp";
        }
    }

    updatePlayerLevelOutput();
    playerLevelInput.addEventListener("input", function()
    {
        updatePlayerLevelOutput();
        updatePebbleLevelsOutput();
        outputPebbleCalculations();
    });

    updatePebbleLevelsOutput();
    pebbleLevelsInput.addEventListener("input", function()
    {
        updatePebbleLevelsOutput();
        outputPebbleCalculations();
    });

    outputPebbleCalculations();
});

// unit testing
function assertEquals(expected, actual)
{
    if (expected === actual) return true;
    throw Error("Assertion Error: expected " + expected + " but got " + actual);
}

function assertAlmostEquals(expected, actual, leeway = 0.1)
{
    if (Math.abs(expected - actual) <= leeway) return true;
    throw Error("Assertion Error: expected " + expected + " but got " + actual);
}

const tests = 
[
    function testGetXpForNextLevel()
    {
        assertEquals(0, getXpForNextLevel(0));
        assertEquals(64, getXpForNextLevel(1));
        assertEquals(128, getXpForNextLevel(2));
        assertEquals(192, getXpForNextLevel(3));
        assertEquals(256, getXpForNextLevel(4));
    },

    function testGetXpForNextLevelWithImpossiblePebble()
    {
        // return normal if shiny pebble level is impossible
        assertEquals(getXpForNextLevel(1), getXpForNextLevel(1, 12));
        assertEquals(getXpForNextLevel(4, 0), getXpForNextLevel(4, 4));
        assertEquals(0, getXpForNextLevel(0, 1));
    },

    function testGetXpForNextLevelWithPebble()
    {
        assertAlmostEquals(64, getXpForNextLevel(1, 1));
        assertAlmostEquals(110.34, getXpForNextLevel(2, 1));
        assertAlmostEquals(165.51, getXpForNextLevel(3, 1));
        assertAlmostEquals(154.83, getXpForNextLevel(3, 2));
    },

    function testGetTotalXpSameLevel()
    {
        assertEquals(getXpForNextLevel(0), getTotalXpGained(0, 0));
        assertEquals(getXpForNextLevel(1), getTotalXpGained(1, 1));
        assertEquals(getXpForNextLevel(2), getTotalXpGained(2, 2));
        assertEquals(getXpForNextLevel(3), getTotalXpGained(3, 3));
    },

    function testGetTotalXpSameLevelWithPebble()
    {
        assertEquals(getXpForNextLevel(0, 0), getTotalXpGained(0, 0, []));
        assertEquals(getXpForNextLevel(1, 0), getTotalXpGained(1, 1, []));
        assertEquals(getXpForNextLevel(2, 1), getTotalXpGained(2, 2, [2]));
        assertEquals(getXpForNextLevel(3, 2), getTotalXpGained(3, 3, [2, 3]));

        // no duplicte levels allowed
        assertEquals(getXpForNextLevel(3, 2), getTotalXpGained(3, 3, [2, 2, 3]));
    },

    function testGetTotalXp()
    {
        assertEquals(getXpForNextLevel(1), getTotalXpGained(0, 1));
        assertEquals(getXpForNextLevel(1), getTotalXpGained(1, 1));
        assertEquals(getXpForNextLevel(1) + getXpForNextLevel(2), getTotalXpGained(1, 2));
        assertEquals(getXpForNextLevel(1) + getXpForNextLevel(2) + getXpForNextLevel(3), getTotalXpGained(1, 3));
        assertEquals(getXpForNextLevel(2) + getXpForNextLevel(3), getTotalXpGained(2, 3));
        assertEquals(getXpForNextLevel(3) + getXpForNextLevel(4), getTotalXpGained(3, 4));
    },

    function testGetTotalXpWithPebble()
    {
        assertEquals(getXpForNextLevel(1), getTotalXpGained(0, 1, [1]));
        assertEquals(getXpForNextLevel(1), getTotalXpGained(1, 1, [1]));
        assertEquals(getXpForNextLevel(1) + getXpForNextLevel(2, 1), getTotalXpGained(1, 2, [2]));
        assertEquals(getXpForNextLevel(1) + getXpForNextLevel(2, 1) + getXpForNextLevel(3, 1), getTotalXpGained(1, 3, [2]));
        assertEquals(getXpForNextLevel(1) + getXpForNextLevel(2, 1) + getXpForNextLevel(3, 2), getTotalXpGained(1, 3, [2, 3]));
        assertEquals(getXpForNextLevel(2) + getXpForNextLevel(3, 1), getTotalXpGained(2, 3, [3]));

        // shiny pebble is impossible to get level 1
        assertEquals(getXpForNextLevel(3, 2) + getXpForNextLevel(4, 3), getTotalXpGained(3, 4, [1, 2, 3, 4]));
    }
]

function unittest()
{
    let testsPassed = 0;
    for (const test of tests)
    {
        try
        {
            test();
            testsPassed++;
        }
        catch (error)
        {
            console.error(error);
        }
    }

    console.log(testsPassed + " tests passed");
    console.log((tests.length - testsPassed) + " tests failed");
}

function isLiveServer()
{
    return location.hostname === "127.0.0.1" || location.hostname === "localhost";
}

if (isLiveServer())
{
    console.log("live server detected, running unit tests...");
    unittest();
}
