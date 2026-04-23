import { createNavbar, programmingProjects, createFooter, createProjectDiv, createRandomTransitionIn, createRandomTransitionOut, createImageQuartet, scrollQuartets, featuredProgrammingProject, filters, FILTERTYPE } from "../data.js";

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

const paddingDiv = document.createElement("div");
paddingDiv.classList.add("paddingDiv");
document.body.appendChild(paddingDiv);

    const desc = document.createElement("p");
    desc.textContent = "Here are some programming projects I've worked on!";
    paddingDiv.appendChild(desc);

    const filtersDiv = document.createElement("div");
    filtersDiv.classList.add("filtersDiv");
    paddingDiv.appendChild(filtersDiv);

        const filtersButton = document.createElement("button");
        filtersButton.textContent = "Filter by: ALL";
        filtersDiv.appendChild(filtersButton);

        filtersButton.addEventListener("click", () =>
        {
            filtersList.classList.toggle("show");
        });

        window.addEventListener("click", (e) =>
        {
            if (filtersButton.contains(e.target)) return;
            filtersList.classList.remove("show");
        });

        const filtersList = document.createElement("div");
        filtersList.classList.add("filtersList");
        filtersDiv.appendChild(filtersList);

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

scrollQuartets();

repostAndScreamAtMe();
