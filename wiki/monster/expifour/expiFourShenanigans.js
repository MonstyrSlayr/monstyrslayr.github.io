const infoSectionBio = document.getElementById("infoSectionBio");

fetch("./qna.json")
.then(response => response.json())
.then(data => {
    const messages = data.messages;
    const nonMonstyrMessages = messages.filter(message => message.author.id !== "434840883637125121");

    const showThisMessage = nonMonstyrMessages[Math.floor(Math.random() * nonMonstyrMessages.length)];

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

    const authorName = document.createElement("p");
    authorName.textContent = showThisMessage.author.nickname;
    authorName.style.color = showThisMessage.author.color;
    authorName.classList.add("authorName");
    messageThings.append(authorName);

    const messageContent = document.createElement("p");
    messageContent.textContent = showThisMessage.content;
    messageContent.classList.add("messageContent");
    messageThings.append(messageContent);
});