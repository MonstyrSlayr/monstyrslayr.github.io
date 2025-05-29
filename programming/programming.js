import { createNavbar, programmingProjects, createFooter, createProjectDiv, createRandomTransitionIn, createRandomTransitionOut, createImageQuartet, scrollQuartets, featuredProgrammingProject } from "../data.js";

const header = document.createElement("header");
document.body.appendChild(header);

const h1 = document.createElement("h1");
h1.classList.add("bigMan");
h1.textContent = "My Résumé and Portfolio";
header.appendChild(h1);

const navbar = createNavbar();
header.appendChild(navbar);

const showcaseSpace = document.createElement("div");
showcaseSpace.classList.add("showcaseSpace");
header.appendChild(showcaseSpace);

    const featuredHeading = document.createElement("h1");
    featuredHeading.textContent = "Featured Project";
    showcaseSpace.appendChild(featuredHeading);

    const featuredProjectDiv = createProjectDiv(featuredProgrammingProject);
    featuredProjectDiv.classList.add("featured");
    showcaseSpace.appendChild(featuredProjectDiv);

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
        Here are some programming projects I've worked on!
    `
    paddingDiv.appendChild(desc);

programmingProjects.sort((a, b) => b.date - a.date); // chronological desc

for (let i = 0; i < programmingProjects.length; i++)
{
    const project = programmingProjects[i];

    const projectWrapper = document.createElement("div"); // necessary for background shenanigans
    projectWrapper.classList.add("projectWrapper");
    document.body.appendChild(projectWrapper);

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
}

const footer = createFooter();

if (programmingProjects.length % 2 == 1)
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

scrollQuartets();
