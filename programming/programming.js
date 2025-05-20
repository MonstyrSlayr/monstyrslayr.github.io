import { createNavbar, programmingProjects, getMonthName } from "../data.js";

// copied from home,, idiot you fool

const imageQuartet = document.createElement("div");
imageQuartet.id = "imageQuartet";
document.body.appendChild(imageQuartet);

    const artSiteImg = document.createElement("img");
    artSiteImg.src = "https://monstyrslayr.github.io/img/artSite.png";
    imageQuartet.appendChild(artSiteImg);
    
    const ameWikiImg = document.createElement("img");
    ameWikiImg.src = "https://monstyrslayr.github.io/img/ameWiki.png";
    imageQuartet.appendChild(ameWikiImg);
    
    const lbaldleImg = document.createElement("img");
    lbaldleImg.src = "https://monstyrslayr.github.io/img/LBALDLEDAILY.png";
    imageQuartet.appendChild(lbaldleImg);
    
    const msmIncreImg = document.createElement("img");
    msmIncreImg.src = "https://monstyrslayr.github.io/img/msmincredibox.png";
    imageQuartet.appendChild(msmIncreImg);

const h1 = document.createElement("h1");
h1.textContent = "My Résumé and Personal Projects";
document.body.appendChild(h1);

const navbar = createNavbar();
document.body.appendChild(navbar);

const showcaseSpace = document.createElement("div");
showcaseSpace.classList.add("showcaseSpace");
document.body.appendChild(showcaseSpace);

const diaTransitionDiv = document.createElement("div");
diaTransitionDiv.classList.add("diaTransitionDivIn");
document.body.appendChild(diaTransitionDiv);

const paddingDiv = document.createElement("div");
paddingDiv.classList.add("paddingDiv");
document.body.appendChild(paddingDiv);

    const desc = document.createElement("p");
    desc.textContent = `
        Here are some programming projects I've worked on!
    `
    paddingDiv.appendChild(desc);

const diaTransitionDiv2 = document.createElement("div");
diaTransitionDiv2.classList.add("diaTransitionDivOut");
document.body.appendChild(diaTransitionDiv2);

const projectsDiv = document.createElement("div");
projectsDiv.classList.add("projectsDiv");
document.body.appendChild(projectsDiv);

programmingProjects.sort((a, b) => b.date - a.date); // chronological desc

for (const project of programmingProjects)
{
    const projectDiv = document.createElement("div");
    projectsDiv.appendChild(projectDiv);

        const projectImageLink = document.createElement("a");
        projectImageLink.href = project.link;
        projectImageLink.target = "_blank";
        projectDiv.appendChild(projectImageLink);

            const projectImage = document.createElement("img");
            projectImage.src = project.image;
            projectImageLink.appendChild(projectImage);

        const projectWords = document.createElement("div");
        projectDiv.appendChild(projectWords);

            const projectTitleLink = document.createElement("a");
            projectTitleLink.href = project.link;
            projectTitleLink.target = "_blank";
            projectWords.appendChild(projectTitleLink);

                const projectTitle = document.createElement("h2");
                projectTitle.textContent = project.title;
                projectTitleLink.appendChild(projectTitle);

            const projectDate = document.createElement("h3");
            projectDate.textContent = getMonthName(project.date.getMonth() + 1) + " " + (project.date.getYear() + 1900);
            if (project.isWIP) projectDate.textContent += " (WIP)";
            projectWords.appendChild(projectDate);

            const projectDesc = document.createElement("p");
            projectDesc.textContent = project.desc;
            projectWords.appendChild(projectDesc);
}
