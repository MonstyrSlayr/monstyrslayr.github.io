const infoSectionBio = document.getElementById("infoSectionBio");

fetch("./qna.json")
.then(response => response.json())
.then(data => {
    const messages = data.messages;
    const nonMonstyrMessages = messages.filter(message => message.author.id !== "434840883637125121");
    const expiMessages = nonMonstyrMessages.filter(message => message.content.toLowerCase().includes("expi"));

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