import { createNavbar, programmingProjects, createFooter, createProjectDiv, createRandomTransitionIn, createRandomTransitionOut, createImageQuartet, scrollQuartets, featuredProgrammingProject, filters, FILTERTYPE } from "../data.js";

const header = document.getElementsByTagName("header")[0];

const navbar = createNavbar();
document.getElementById("navbar").replaceWith(navbar);

const featuredProjectDiv = createProjectDiv(featuredProgrammingProject);
document.getElementById("featured").replaceWith(featuredProjectDiv);

function repostProgrammingProjects(filter = null)
{
    wrappersWrapper.innerHTML = "";
    if (document.getElementsByTagName("footer").length > 0) document.getElementsByTagName("footer")[0].remove();
    if (document.getElementById("footerPadder")) document.getElementById("footerPadder").remove();

    let numProjects = 0;
    for (let i = 0; i < programmingProjects.length; i++)
    {
        const project = programmingProjects[i];

        if (!project.filters.includes(filter) && filter != null) continue;
        numProjects++;

        const projectWrapper = document.createElement("div"); // necessary for background shenanigans
        projectWrapper.classList.add("projectWrapper");
        wrappersWrapper.appendChild(projectWrapper);

        const projectDiv = createProjectDiv(project);

        if (numProjects % 2 == 0) // white bg
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

    if (numProjects % 2 == 1)
    {
        const paddingDiv = document.createElement("div");
        paddingDiv.classList.add("paddingDiv");
        paddingDiv.id = "footerPadder";
        document.body.appendChild(paddingDiv);

        paddingDiv.appendChild(footer);
    }
    else
    {
        document.body.appendChild(footer);
    }
}

const filtersButton = document.getElementById("filtersButton");
const filtersList = document.getElementById("filtersList");

filtersButton.addEventListener("click", () =>
{
    filtersList.classList.toggle("show");
});

window.addEventListener("click", (e) =>
{
    if (filtersButton.contains(e.target)) return;
    filtersList.classList.remove("show");
});

// ALL
const filterSelectorAll = document.createElement("div");
filterSelectorAll.classList.add("filterSelector");
filtersList.appendChild(filterSelectorAll);

filterSelectorAll.addEventListener("click", () =>
{
    repostProgrammingProjects();
    filtersList.classList.remove("show");
});

    const filterAllP = document.createElement("p");
    filterAllP.textContent = "All";
    filterSelectorAll.appendChild(filterAllP);

for (const h of Object.values(FILTERTYPE))
{
    const filterHeader = document.createElement("div");
    filterHeader.classList.add("filterHeader");
    filtersList.appendChild(filterHeader);

        const filterH = document.createElement("h2");
        filterH.textContent = h;
        filterHeader.appendChild(filterH);
    
    // for every filter of this type that is in at least one project
    for (const f of filters.filter(fi => fi.type == h && programmingProjects.some(p => p.filters.includes(fi))))
    {
        const filterSelector = document.createElement("div");
        filterSelector.classList.add("filterSelector");
        filtersList.appendChild(filterSelector);

        filterSelector.addEventListener("click", () =>
        {
            repostAndScreamAtMe(f);
            filtersList.classList.remove("show");
        });

            const filterP = document.createElement("p");
            filterP.textContent = f.name;
            filterSelector.appendChild(filterP);
    }
}

function repostAndScreamAtMe(filter = null)
{
    filtersButton.textContent = "Filter By: " + (filter == null ? "ALL" : filter.name.toUpperCase());
    repostProgrammingProjects(filter);
}

programmingProjects.sort((a, b) => b.date - a.date); // chronological desc

const wrappersWrapper = document.createElement("div");
document.body.appendChild(wrappersWrapper);

for (const tempQuartet of [...document.getElementsByClassName("tempImageQuartet")])
{
    const imageQuartet = createImageQuartet();
    tempQuartet.replaceWith(imageQuartet);
}

scrollQuartets();

repostAndScreamAtMe();
