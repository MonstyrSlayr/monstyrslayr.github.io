import { createNavbar, artProjects, createFooter, createImageQuartet, createProjectDiv, createRandomTransitionIn, createRandomTransitionOut } from "../data.js";

const header = document.createElement("header");
document.body.appendChild(header);

const h1 = document.createElement("h1");
h1.textContent = "My Résumé and Personal Projects";
header.appendChild(h1);

const navbar = createNavbar();
header.appendChild(navbar);

const showcaseSpace = document.createElement("div");
showcaseSpace.classList.add("showcaseSpace");
header.appendChild(showcaseSpace);

const imageQuartet = createImageQuartet();
header.appendChild(imageQuartet);

const diaTransitionDiv = document.createElement("div");
diaTransitionDiv.classList.add("diaTransitionDivIn");
header.appendChild(diaTransitionDiv);

const paddingDiv = document.createElement("div");
paddingDiv.classList.add("paddingDiv");
document.body.appendChild(paddingDiv);

    const desc = document.createElement("p");
    desc.textContent = `
        Here are some of my creative projects!
    `
    paddingDiv.appendChild(desc);

artProjects.sort((a, b) => b.date - a.date); // chronological desc

for (let i = 0; i < artProjects.length; i++)
{
    const project = artProjects[i];
    
    const projectWrapper = document.createElement("div"); // necessary for background shenanigans
    projectWrapper.classList.add("projectWrapper");

    const projectDiv = createProjectDiv(project);

    if (i % 2 == 1) // white bg
    {
        const daPaddingDiv = document.createElement("div");
        daPaddingDiv.classList.add("paddingDiv");
        projectWrapper.appendChild(daPaddingDiv);

            daPaddingDiv.appendChild(projectDiv);
    }
    else // image quartet bg
    {
        projectWrapper.appendChild(createRandomTransitionOut());

        projectWrapper.appendChild(projectDiv);

        projectWrapper.appendChild(createRandomTransitionIn());
        
        const daImageQuartet = createImageQuartet();
        projectWrapper.appendChild(daImageQuartet);
    }

    document.body.appendChild(projectWrapper);
}

const footer = createFooter();

if (artProjects.length % 2 == 1)
{
    const paddingDiv = document.createElement("div");
    paddingDiv.classList.add("paddingDiv");
    document.body.appendChild(paddingDiv);

    paddingDiv.appendChild(footer);
}
else
{
    document.body.appendChild(footer);
}

window.addEventListener("scroll", () =>
{
    document.querySelectorAll(".imageQuartet").forEach(el =>
    {
        const parent = el.offsetParent;
        const parentTop = parent.getBoundingClientRect().top + window.scrollY;
        const scrollRelativeToParent = window.scrollY - parentTop;
        el.style.top = `${scrollRelativeToParent}px`;
    });
});
