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
    "https://monstyrslayr.github.io/art/mastermindAvery.gif",
    "https://monstyrslayr.github.io/art/umbrellaGirl.gif",
    "https://monstyrslayr.github.io/art/rickACard.gif",
    "https://monstyrslayr.github.io/art/worldRecordCat.gif",
    "https://monstyrslayr.github.io/art/sprigatitoFriend.gif",
    "https://monstyrslayr.github.io/art/unintentionalBreak.gif",
]

document.addEventListener("DOMContentLoaded", () =>
{
    const animations = [];
    let sortedAnimations = [];
    let animationsLoaded = false;

    const displayAnimationOptions = document.getElementById("displayAnimationOptions");
    
    function createAnimations()
    {
        const animationsDiv = document.getElementById("animations");
        animationsDiv.innerHTML = "";

        for (const animation of sortedAnimations)
        {
            const pfpDiv = document.createElement("a");
            pfpDiv.classList.add(displayAnimationOptions.value);
            pfpDiv.classList.add("trophy");
            pfpDiv.href = animation.site;
            animationsDiv.appendChild(pfpDiv);

            const pfp = document.createElement("img");
            pfp.classList.add("artImg");
            pfp.src = animation[displayAnimationOptions.value];
            pfpDiv.appendChild(pfp);

            const name = document.createElement("label");
            name.textContent = animation.name;
            pfpDiv.appendChild(name);
        }
    }

    displayAnimationOptions.addEventListener("change", () =>
    {
        if (animationsLoaded) createAnimations();
    });

    const sortAnimationOptions = document.getElementById("sortAnimationOptions");
    const sortAnimationDescending = document.getElementById("sortAnimationCheckbox");

    function sortAnimations()
    {
        const selectedOption = sortAnimationOptions.value; // Get selected value
        const descend = sortAnimationDescending.checked;
        sortedAnimations = [...animations];
    
        switch (selectedOption)
        {
            case "alphabetical":
                sortedAnimations = [...animations].sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return 0;
                });
                break;
            case "chronological":
                sortedAnimations = [...animations].sort((a, b) => { return Date.parse(a.date) - Date.parse(b.date); });
                break;
            default:
                break;
        }

        if (descend) sortedAnimations.reverse();
    }

    function onAnimationsLoad()
    {
        animationsLoaded = true;
        sortAnimationOptions.value = "chronological";
        sortAnimationDescending.checked = true;
        sortAnimations();
        createAnimations();
    }

    sortAnimationOptions.addEventListener("change", () =>
    {
        sortAnimations();
        if (animationsLoaded) createAnimations();
    });

    sortAnimationDescending.addEventListener("change", () =>
    {
        sortAnimations();
        if (animationsLoaded) createAnimations();
    });

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
            console.log(animation);

            animations.push(animation);
        });
    }

    waitForArray(animations, animationLinks.length, 5000, onAnimationsLoad);
});