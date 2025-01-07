export function createHeader()
{
    const header = document.createElement("header");
    return header;
}

export function createLink(href)
{
    const link = document.createElement("a");
    link.href = href;
    return link;
}

export function createButton(innerHTML)
{
    const button = document.createElement("button");
    button.innerHTML = innerHTML;
    return button;
}

export function createTitle(innerHTML)
{
    const title = document.createElement("h1");
    title.innerHTML = innerHTML;
    return title;
}

export function createContainer()
{
    const container = document.createElement("div");
    container.classList = ["container soloContainer"];
    return container;
}

export function createHeading(innerHTML)
{
    const heading = document.createElement("h2");
    heading.innerHTML = innerHTML;
    return heading;
}

export function createInfoSection(heading, isInline = false)
{
    const container = document.createElement("div");
    container.classList = ["infoSection"];
    if (isInline) container.classList.add("infoInline");

    const h2 = createHeading(heading);
    container.appendChild(h2);
    if (!isInline) h2.classList.add("underlined");

    return container;
}

export function createMiniSection(heading, isInline = false)
{
    const is = createInfoSection(heading, isInline);
    is.classList.add("miniSection");
    return is;
}

export function createContentContainer()
{
    const container = document.createElement("div");
    container.classList = "contentContainer";
    return container;
}

export function createHomeButton()
{
    const homeButtonLink = createLink("https://monstyrslayr.github.io/wiki/ameliorates");
    homeButtonLink.id = "homeButton";
        const homeButton = createButton("< Home");
        homeButtonLink.appendChild(homeButton);
    return homeButtonLink;
}

export function createInfoSiteHeader(heading)
{
    const header = createHeader();
        const homeButton = createHomeButton();
        header.appendChild(homeButton);
    
        const islandTitle = createTitle(heading);
        islandTitle.id = "monsterTitle";
        header.appendChild(islandTitle);
    return header;
}