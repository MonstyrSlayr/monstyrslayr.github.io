const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const daMonster = getAmeliorateById(urlParams.get("id"));

const daAmeliorateImg = document.getElementById("monsterImg");
daAmeliorateImg.src = daMonster.images.default;

const daMonsterTitle = document.getElementById("monsterTitle");
daMonsterTitle.innerHTML = daMonster.realName;