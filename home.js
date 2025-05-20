// dynamically crafted homepage for your struggles

import { createNavbar, education, languages, skillset, createFooter, createImageQuartet } from "./data.js";

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
        Hello! My name is Ehimare Ehikioya, and I like to create things using various mediums.
        I am currently a freshman in college studying software engineering.
        This site doubles as my archive and my résumé.
        Here are a few examples of the work I've done over the years.
    `
    paddingDiv.appendChild(desc);

const daEduWrapper = document.createElement("div"); // necessary for background shenanigans
daEduWrapper.classList.add("projectWrapper");
document.body.appendChild(daEduWrapper);

    const diaTransitionDiv2 = document.createElement("div");
    diaTransitionDiv2.classList.add("diaTransitionDivOut");
    daEduWrapper.appendChild(diaTransitionDiv2);

    const hEdu = document.createElement("h2");
    hEdu.textContent = "Education";
    daEduWrapper.appendChild(hEdu);

    const educationsDiv = document.createElement("div");
    educationsDiv.id = "educationsDiv";
    daEduWrapper.appendChild(educationsDiv);

        for (const edu of education)
        {
            const eduDiv = document.createElement("div");
            educationsDiv.appendChild(eduDiv);

                const eduAnchor = document.createElement("a");
                eduAnchor.textContent = edu.title;
                eduAnchor.href = edu.link;
                eduAnchor.target = "_blank";
                eduDiv.appendChild(eduAnchor);

                const eduGrad = document.createElement("p");
                eduGrad.textContent = "Graduation: " + edu.gradMonth;
                eduDiv.appendChild(eduGrad);
        }

    const diaTransitionDiv3 = document.createElement("div");
    diaTransitionDiv3.classList.add("diaTransitionDivIn2");
    daEduWrapper.appendChild(diaTransitionDiv3);

    const imageQuartet2 = createImageQuartet();
    daEduWrapper.appendChild(imageQuartet2);

const paddingDiv2 = document.createElement("div");
paddingDiv2.classList.add("paddingDiv");
document.body.appendChild(paddingDiv2);

    const skillFlex = document.createElement("div"); // double meaning :)
    skillFlex.id = "skillFlex";
    paddingDiv2.appendChild(skillFlex);

        const skillsetDiv = document.createElement("div");
        skillFlex.appendChild(skillsetDiv);

            const skillTitle = document.createElement("h2");
            skillTitle.textContent = "Skillset";
            skillsetDiv.appendChild(skillTitle);

            const skillsDiv = document.createElement("div");
            skillsetDiv.appendChild(skillsDiv);

                for (const skill of skillset)
                {
                    const skillText = document.createElement("p");
                    skillText.textContent = skill;
                    skillsDiv.appendChild(skillText);
                }

        const langsetDiv = document.createElement("div");
        skillFlex.appendChild(langsetDiv);

            const langTitle = document.createElement("h2");
            langTitle.textContent = "Programming";
            langsetDiv.appendChild(langTitle);

            const langsDiv = document.createElement("div");
            langsetDiv.appendChild(langsDiv);

                for (const langLink of languages)
                {
                    const langText = document.createElement("img");
                    langText.src = langLink;
                    langsDiv.appendChild(langText);
                }

const daFooterWrapper = document.createElement("div"); // necessary for background shenanigans
daFooterWrapper.classList.add("projectWrapper");
document.body.appendChild(daFooterWrapper);

    const diaTransitionDiv4 = document.createElement("div");
    diaTransitionDiv4.classList.add("diaTransitionDivOut2");
    daFooterWrapper.appendChild(diaTransitionDiv4);

    const footer = createFooter();
    daFooterWrapper.appendChild(footer);

    const imageQuartet3 = createImageQuartet();
    daFooterWrapper.appendChild(imageQuartet3);

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
