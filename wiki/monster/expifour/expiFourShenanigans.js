const infoSectionBio = document.getElementById("infoSectionBio");

fetch("./qna.json")
.then(response => response.json())
.then(data => {
    const messages = data.messages;
    const blacklist = ["1262459391030853682", "434840883637125121", "688867253948776562"]
    const whitelistedMessages = messages.filter(message => !blacklist.includes(message.author.id));
    const expiMessages = whitelistedMessages.filter(message => message.content.toLowerCase().includes("expi"));

    const showThisMessage = expiMessages[Math.floor(Math.random() * expiMessages.length)];

    const daMessage = document.createElement("div");
    daMessage.classList.add("daMessage");
    infoSectionBio.append(daMessage);

    const profilePic = document.createElement("img");
    profilePic.src = showThisMessage.author.avatarUrl;
    profilePic.classList.add("profilePic");
    daMessage.append(profilePic);

    const messageThings = document.createElement("div");
    messageThings.classList.add("messageThings");
    daMessage.append(messageThings);

    const messageHeader = document.createElement("div");
    messageHeader.classList.add("messageHeader");
    messageThings.append(messageHeader);

    const authorName = document.createElement("p");
    authorName.textContent = showThisMessage.author.nickname;
    authorName.style.color = showThisMessage.author.color;
    authorName.classList.add("authorName");
    messageHeader.append(authorName);

    const messageDate = document.createElement("time");
    messageDate.dateTime = showThisMessage.timestamp;
    messageDate.textContent = new Date(showThisMessage.timestamp).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    }).replace(",", "");
    messageDate.classList.add("messageDate");
    messageHeader.append(messageDate);

    const messageContent = document.createElement("p");
    messageContent.textContent = showThisMessage.content;
    messageContent.classList.add("messageContent");
    messageThings.append(messageContent);
});