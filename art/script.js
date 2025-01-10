// loads all of the artwork
// like, ALL of the artwork
// sorry

class Animation
{
    image;
    pfp;
    source;
    site;
    name;
    date;
}

function waitForArray(array, targetLength, timeout, callback)
{
    // Check if the array already meets the condition
    if (array.length >= targetLength) {
        callback(array);
        return;
    }

    // Flag to ensure callback runs only once
    let executed = false;

    // Timeout handler
    const timeoutId = setTimeout(() =>
    {
        if (!executed) {
            executed = true;
            callback(array);
        }
    }, timeout);

    // Array observer
    const intervalId = setInterval(() =>
    {
        if (array.length >= targetLength && !executed) {
            executed = true;
            clearTimeout(timeoutId); // Stop the timeout
            clearInterval(intervalId); // Stop checking the array
            callback(array);
        }
    }, 50); // Poll every 50ms (adjust as needed)
}

// TODO: in the future, when there are more artworks than just animation,
// ALL of the art goes in here, and will be diferentiated on fetch
const animationLinks =
[
    "https://monstyrslayr.github.io/art/matchaWitchNicole.gif",
    "https://monstyrslayr.github.io/art/mastermindAvery.gif"
]

document.addEventListener("DOMContentLoaded", () =>
{
    const animations = [];

    function onAnimationsLoad()
    {
        const animationsDiv = document.getElementById("animations");

        for (const animation of animations)
        {
            const pfp = document.createElement("img");
            pfp.src = animation.pfp;
            animationsDiv.appendChild(pfp);
        }
    }

    for (const link of animationLinks)
    {
        const animation = new Animation();

        fetch(link + "/data.json")
        .then(response => response.json())
        .then(data =>
        {
            animation.name = data.name;
            animation.date = new Date(data.date);
            animation.site = data.site;
            animation.source = data.source;
            animation.image = data.image;
            animation.pfp = data.pfp;

            animations.push(animation);
        });
    }

    waitForArray(animations, animationLinks.length, 5000, onAnimationsLoad);
});