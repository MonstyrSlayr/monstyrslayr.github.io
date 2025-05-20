// dynamically crafted homepage for your struggles

import { createNavbar, education, languages, skillset } from "./data.js";

const imageQuartet = document.createElement("div");
imageQuartet.id = "imageQuartet";
document.body.appendChild(imageQuartet);

    const artSiteImg = document.createElement("img");
    artSiteImg.src = "./img/artSite.png";
    imageQuartet.appendChild(artSiteImg);
    
    const ameWikiImg = document.createElement("img");
    ameWikiImg.src = "./img/ameWiki.png";
    imageQuartet.appendChild(ameWikiImg);
    
    const lbaldleImg = document.createElement("img");
    lbaldleImg.src = "./img/LBALDLEDAILY.png";
    imageQuartet.appendChild(lbaldleImg);
    
    const msmIncreImg = document.createElement("img");
    msmIncreImg.src = "./img/msmincredibox.png";
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
        Hello! My name is Ehimare Ehikioya, and I like to create things using various mediums.
        I am currently a freshman in college studying software engineering.
        This site doubles as my archive and my résumé.
        Here are a few examples of the work I've done over the years.
    `
    paddingDiv.appendChild(desc);

const diaTransitionDiv2 = document.createElement("div");
diaTransitionDiv2.classList.add("diaTransitionDivOut");
document.body.appendChild(diaTransitionDiv2);

const hEdu = document.createElement("h2");
hEdu.textContent = "Education";
document.body.appendChild(hEdu);

const educationsDiv = document.createElement("div");
educationsDiv.id = "educationsDiv";
document.body.appendChild(educationsDiv);

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
diaTransitionDiv3.classList.add("diaTransitionDivIn");
document.body.appendChild(diaTransitionDiv3);

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

            for (const skill of skillset)
            {
                const skillText = document.createElement("p");
                skillText.textContent = skill;
                skillsetDiv.appendChild(skillText);
            }

        const langsetDiv = document.createElement("div");
        skillFlex.appendChild(langsetDiv);

            const langTitle = document.createElement("h2");
            langTitle.textContent = "Programming";
            langsetDiv.appendChild(langTitle);

            for (const lang of languages)
            {
                const langText = document.createElement("p");
                langText.textContent = lang;
                langsetDiv.appendChild(langText);
            }

const diaTransitionDiv4 = document.createElement("div");
diaTransitionDiv4.classList.add("diaTransitionDivOut");
document.body.appendChild(diaTransitionDiv4);
