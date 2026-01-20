class Project
{
    constructor(title, description, image, link, date, isWIP = false)
    {
        this.title = title;
        this.desc = description;
        this.image = image;
        this.link = link;
        this.date = date;
        this.isWIP = isWIP;
    }
}

const bicolage = new Project(
    "Bicolage",
    "I created this website along with 3 of my classmates in order to tell our American Studies class about the history of Seneca Village.",
    "https://monstyrslayr.github.io/img/bicolage.png",
    "https://monstyrslayr.github.io/bicolage/project/",
    new Date("02/01/2023")
);

const boxPush = new Project(
    "boxPush",
    "I created a game using GameMaker Studio 2 for my final project in my physics mechanics class. Two opponents push a box into their goals.",
    "https://monstyrslayr.github.io/img/boxPush.png",
    "https://monstyrslayr.github.io/boxPush/",
    new Date("01/16/2023")
);

const magonet = new Project(
    "Magonet",
    "I created a game using GameMaker Studio for my final project in my physics electricity & magnetism class. Guide your magnetic character into the yellow goals.",
    "https://monstyrslayr.github.io/img/magoNet.png",
    "https://monstyrslayr.github.io/magonet/",
    new Date("05/24/2023")
);

const lbaldle = new Project(
    "LBALdle",
    "This is a passion project based on Wordle, the popular word guessing game, and Luck Be a Landlord, one of my favorite video games. You are able to guess a Luck Be a Landlord symbol based on clues.",
    "https://monstyrslayr.github.io/img/LBALDLE.png",
    "https://monstyrslayr.github.io/lbaldle/",
    new Date("09/22/2024")
);

const tigerGoodbuy = new Project(
    "Tiger Goodbuy",
    "A team of students and I created a prototype for a website similar to Ebay, but for RIT students.",
    "https://monstyrslayr.github.io/img/tigerGoodbuy.png",
    "https://adeseyn.github.io/tigergoodbuy/",
    new Date("12/09/2024")
);

const msmRMG = new Project(
    "MSM Random Monster Generator",
    "I created a website for fans of My Singing Monsters, the hit mobile game. This site generates a random monster from the game. All of the other generators I found were outdated, so I made my own!",
    "https://monstyrslayr.github.io/img/MSMRMG.png",
    "https://monstyrslayr.github.io/randomMonsterGenerator/",
    new Date("06/12/2025")
);

const ameliorateWiki = new Project(
    "Ameliorate Wiki",
    "For my YouTube fans to explore the extensive lore of my original characters.",
    "https://monstyrslayr.github.io/img/ameWiki.png",
    "https://monstyrslayr.github.io/wiki/",
    new Date("09/20/25"),
    true
);

const msmIncredibox = new Project(
    "MSM Incredibox",
    "A passion project mashup of Incredibox mechanics and My Singing Monsters music.",
    "https://monstyrslayr.github.io/img/msmincredibox.png",
    "https://monstyrslayr.github.io/msmincredibox/",
    new Date("04/10/2025"),
    true
);

const lbalBadApple = new Project(
    "Bad Apple but it's Luck be a Landlord",
    "A recreation of the Bad Apple music video using nothing but Python and LbaL symbols. Remaster of a January 2024 project.",
    "https://monstyrslayr.github.io/img/lbalBadApple.png",
    "https://github.com/MonstyrSlayr/lbalBadApple",
    new Date("05/27/2025")
);

const msmMemory = new Project(
    "MSM Ultimate Memory Game",
    "Let's see how well My Singing Monsters fans can name every single monster in the game.",
    "https://monstyrslayr.github.io/img/msmMemoryGame.png",
    "https://monstyrslayr.github.io/ultimateMemoryGame/",
    new Date("06/13/2025")
);

const msmChainer = new Project(
    "MSM Monster Chains",
    "Make a monster chain that links two monsters through their inhabited islands!",
    "https://monstyrslayr.github.io/img/monsterChainer.png",
    "https://monstyrslayr.github.io/monsterChains/",
    new Date("07/28/2025")
);

const msmSudoku = new Project(
    "MSM Sudoku",
    "Make and play MSM Sudokus made my My Singing Monsters fans!",
    "https://monstyrslayr.github.io/img/msmSudoku.png",
    "https://monstyrslayr.github.io/msmsudoku/",
    new Date("10/10/2025")
);

const msmGuessWho = new Project(
    "MSM Guess Who",
    "Guess the My Singing Monster based on the clues!",
    "https://monstyrslayr.github.io/img/msmGuessWho.png",
    "https://monstyrslayr.github.io/msmGuessWho/",
    new Date("11/09/2025")
);

const blackCatSaga = new Project(
    "Black Cat Saga",
    "Black Cat Island is the first animated island I have ever created, and thus, it holds a special place in my heart. Most of the monsters are based on cats.",
    "https://monstyrslayr.github.io/img/blackCat.png",
    "https://youtu.be/RYFg599fCRM",
    new Date("11/14/2020")
);

const ameliorateSaga = new Project(
    "Ameliorate Saga",
    "I started Signal Stadium around a year after my old laptop crashed and I lost all of my intricate animation projects, including the Black Cat Saga. This island helped me to get back into the flow of music and animation.",
    "https://monstyrslayr.github.io/img/sigStad.png",
    "https://youtu.be/x03o46Deeyo",
    new Date("05/19/2025"), // do something you fool
    true
);

const artArchive = new Project(
    "General Art Archive",
    "I'm trying a new way to share my general / uncategorized artwork.",
    "https://monstyrslayr.github.io/img/artSite.png",
    "https://monstyrslayr.github.io/art",
    new Date("03/20/25"),
    true
);

const fullRadiation = new Project(
    "Undertale 10th Anniversary - Toby Fox",
    "A program recreating the speech-to-text setup Toby Fox used during the UNDERTALE 10th Anniversary livestream.",
    "https://monstyrslayr.github.io/img/fullRadiation.png",
    "https://github.com/MonstyrSlayr/Undertale-10th-Anniversary-Toby-Fox",
    new Date("10/4/2025")
);

const deltaruneMotifs = new Project(
    "Deltarune Motifs",
    "A website documenting leitmotifs in the soundtracks of UNDERTALE and DELTARUNE.",
    "https://monstyrslayr.github.io/img/deltaruneMotifs.png",
    "https://monstyrslayr.github.io/deltarunemotifs",
    new Date("12/20/2025"),
    true
);

const bossFightBadApple = new Project(
    "Bad Apple but it's Rhythm Doctor - Boss Fight",
    "A recreation of the Bad Apple music video using the blinking eyes in the background of a Rhythm Doctor level.",
    "https://monstyrslayr.github.io/img/rdBapple.png",
    "https://youtu.be/cyWGuhD37eQ",
    new Date("1/14/2026")
);

export const programmingProjects =
[
    bicolage, boxPush, magonet,
    lbaldle, lbalBadApple,
    tigerGoodbuy,
    msmRMG, ameliorateWiki, msmIncredibox, msmMemory, msmChainer, msmSudoku, msmGuessWho,
    bossFightBadApple,
    deltaruneMotifs,
    artArchive
];

export const artProjects =
[
    blackCatSaga,
    ameliorateSaga,
    artArchive
];

export const featuredProgrammingProject = deltaruneMotifs;

export const skillset =
[
    // programming
    "Web development",
    "Game development",
    "Project management",
    "Database management",
    "DevOps cycle",
    "Repository management",
    "Git",
    "GitHub",
    "GitLab",
    
    // youtube
    "Community moderation",
    "Content creation"
]

export const languages =
[
    "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1f/Python_logo_01.svg",
    "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/f/fb/GameMaker_Logo.png"
]

class Education
{
    constructor(title, gradMonth, link, info = "")
    {
        this.title = title;
        this.gradMonth = gradMonth;
        this.link = link;
        this.info = info;
    }
}

export const education =
[
    new Education("The Wight Foundation", "June 2020", "https://www.wightfoundation.org/"),
    new Education("The Masters School", "June 2024", "https://www.mastersny.org/"),
    new Education("Rochester Institute of Technology", "May 2029", "https://www.rit.edu/", "(5 year major)"),
];

export function createNavbar()
{
    const navbar = document.createElement("div");
    navbar.id = "navbar";
    const navbarNames = ["HOME", "PROGRAMMING", "CREATIVE"];
    const navbarLinks = ["https://monstyrslayr.github.io/",
                            "https://monstyrslayr.github.io/programming",
                                "https://monstyrslayr.github.io/creative"];

    for (let i = 0; i < navbarNames.length; i++)
    {
        const daName = navbarNames[i];
        const daLink = navbarLinks[i];

        const daAnchor = document.createElement("a");
        daAnchor.href = daLink;
        navbar.appendChild(daAnchor);

            const daAnchorText = document.createElement("p");
            daAnchorText.textContent = daName;
            daAnchor.appendChild(daAnchorText);
    }

    return navbar;
}

export function createFooter()
{
    const footer = document.createElement("footer");

        const footerHeading = document.createElement("h2");
        footerHeading.textContent = "Personal / Contact";
        footer.appendChild(footerHeading);

        const daEmail = document.createElement("p");
        daEmail.textContent = "Email: ";
        footer.appendChild(daEmail);

            const emailLink = document.createElement("a");
            emailLink.href = "mailto:eehikioya@wightfoundation.com";
            emailLink.target = "_blank";
            emailLink.textContent = "eehikioya@wightfoundation.com";
            daEmail.appendChild(emailLink);

        const daSite = document.createElement("p");
        daSite.textContent = "Website: ";
        footer.appendChild(daSite);

            const siteLink = document.createElement("a");
            siteLink.href = "https://monstyrslayr.github.io";
            siteLink.target = "_blank";
            siteLink.textContent = "monstyrslayr.github.io";
            daSite.appendChild(siteLink);

    return footer;
}

function getMonthName(monthNumber)
{
    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1];
}

export function createRandomTransitionIn()
{
    const transitions = ["diaTransitionDivIn", "diaTransitionDivIn2"];
    const diaTransitionDiv = document.createElement("div");
    diaTransitionDiv.classList.add(transitions[Math.floor(Math.random() * transitions.length)]);
    return diaTransitionDiv;
}

export function createRandomTransitionOut()
{
    const transitions = ["diaTransitionDivOut", "diaTransitionDivOut2", "diaTransitionDivOut3"];
    const diaTransitionDiv = document.createElement("div");
    diaTransitionDiv.classList.add(transitions[Math.floor(Math.random() * transitions.length)]);
    return diaTransitionDiv;
}

export function createProjectDiv(project)
{
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("projectDiv");

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

    return projectDiv;
}

function shuffleSetToArray(set)
{
    const array = Array.from(set);

    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export function createImageQuartet()
{
    const imageQuartet = document.createElement("div");
    imageQuartet.classList.add("imageQuartet");

        const projects = shuffleSetToArray(new Set(programmingProjects, artProjects));

        for (let i = 0; i < 6; i++)
        {
            const daImg = document.createElement("img");
            daImg.src = projects[i].image;
            imageQuartet.appendChild(daImg);
        }
    
    return imageQuartet;
}

export function scrollQuartets()
{
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
}
