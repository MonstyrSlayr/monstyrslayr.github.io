// script for individual art sites
// DO NOT PUT ON MAIN SITE

for (const turntable of document.getElementsByClassName("turntable"))
{
    const leftArrow = document.createElement("div");
    leftArrow.textContent = "<";
    leftArrow.classList.add("turntableLeftArrow");
    turntable.prepend(leftArrow);

    const rightArrow = document.createElement("div");
    rightArrow.textContent = ">";
    rightArrow.classList.add("turntableRightArrow");
    turntable.appendChild(rightArrow);

    const divs = turntable.getElementsByTagName("div");
    const itemCount = divs.length - 2;
    turntable.i = 1;

    function setSelectedDiv(i)
    {
        turntable.i = i;
        const leftNumber = (i != 1) ? i - 1 : itemCount;
        const rightNumber = (i != itemCount) ? i + 1 : 1;

        function lefties() { setSelectedDiv(leftNumber);}
        function righties() { setSelectedDiv(rightNumber);}

        for (let j = 1; j < itemCount + 1; j++)
        {
            const curDiv = divs[j];
            curDiv.classList.remove("turntableSelected");
            curDiv.classList.remove("turntableAdjacentLeft");
            curDiv.classList.remove("turntableAdjacentRight");
            curDiv.removeEventListener("click", lefties);
            curDiv.removeEventListener("click", righties);
        }

        const thatDiv = divs[i];
        thatDiv.classList.add("turntableSelected");

        const leftDiv = divs[leftNumber];
        leftDiv.classList.add("turntableAdjacentLeft");
        leftDiv.addEventListener("click", lefties);

        const rightDiv = divs[rightNumber];
        rightDiv.classList.add("turntableAdjacentRight");
        rightDiv.addEventListener("click", righties);
    }

    const turnMin = 1;
    const turnMax = itemCount;

    leftArrow.addEventListener("click", function()
    {
        if (turntable.i == turnMin) setSelectedDiv(turnMax);
        else setSelectedDiv(turntable.i - 1);
    });

    rightArrow.addEventListener("click", function()
    {
        if (turntable.i == turnMax) setSelectedDiv(turnMin);
        else setSelectedDiv(turntable.i + 1);
    });

    setSelectedDiv(turnMin);
}
