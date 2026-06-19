// dynamically crafted homepage for your struggles

import { createNavbar, education, languages, skillset, createFooter, createImageQuartet, scrollQuartets, createProjectDiv, featuredProgrammingProject } from "./data.js";

const header = document.getElementsByTagName("header")[0];

const navbar = createNavbar();
document.getElementById("navbar").replaceWith(navbar);

const featuredProjectDiv = createProjectDiv(featuredProgrammingProject);
document.getElementById("featured").replaceWith(featuredProjectDiv);

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

const skillsDiv = document.getElementById("skillset");
skillset.sort((a, b) => Math.random() - Math.random());
for (const skill of skillset)
{
    const skillText = document.createElement("p");
    skillText.textContent = skill;
    skillsDiv.appendChild(skillText);
}

const langsDiv = document.getElementById("langset");
for (const langLink of languages)
{
    const langText = document.createElement("img");
    langText.src = langLink;
    langsDiv.appendChild(langText);
}

const footer = document.getElementsByTagName("footer")[0];
footer.replaceWith(createFooter());

for (const tempQuartet of [...document.getElementsByClassName("tempImageQuartet")])
{
    const imageQuartet = createImageQuartet();
    tempQuartet.replaceWith(imageQuartet);
}

scrollQuartets();
