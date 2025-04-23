// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getCookie, setCookie, deleteCookie } from "./cookies.js";
import { CubeAlg, algToCubeAlg, getAlgSet, renderVote } from "./module.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig =
{
    apiKey: "AIzaSyCbn3YNMWkU_0bcbkYcTsx3CiwwpfHYczE",
    authDomain: "speedcubingenglish.firebaseapp.com",
    projectId: "speedcubingenglish",
    storageBucket: "speedcubingenglish.firebasestorage.app",
    messagingSenderId: "76001058367",
    appId: "1:76001058367:web:cdb7275dc2e066d171a28a",
    measurementId: "G-J3RQZZ38H3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const status = document.getElementById("status");
const cube = document.getElementById("cube");
const flavorText = document.getElementById("flavorText");
const voteForm = document.getElementById("voteForm");
const algButtons = document.getElementById("algButtons");
const voteFormSubmit = document.getElementById("voteFormSubmit");
const scrambleDiv = document.getElementById("scrambleDiv");
const scrambleText = document.getElementById("scrambleText");

const scrambleRef = doc(collection(db, "scrambles"), "current");
const votesRef = collection(scrambleRef, "votes");

const algSet = getAlgSet();

const dormantFlavorText =
[
    "is anyone else like super tired lately",
    "if you like this project, buy me a cookie!",
    "if you don't like this project, please stand up.",
    "omg the cube spins woahhhh",
    "hacking into mainframe...",
    "must... steal.. personal... data",
    "hopefully my evil twin isn't the one speaking :/",
    "surprise! it's a website in a tech school"
];

const votingFlavorText =
[
    "choose an algorithm to go up on the big screen",
    "let's give it everything we got",
    "you know the choice you make here will follow you for life, right?",
    "don't make it too hard ahahaha",
    "(he doesn't actually know how to solve so just skip the vote okay)",
    "make sure no one else sees your screen",
    "allegedly it only takes 20 moves to scramble a cube, let's prove that wrong",
    "if you don't submit an alg here i might just die",
    "don't tell the others but if you reload you get to make a different selection"
];

const submitNothingFlavorText =
[
    "you think you're funny, huh?",
    "please choose an algorithm!!",
    "please!!!! i have a wife and children!!!!",
    "you're killing me",
    ":/ make a choice before you submit",
    "it's not too hard to make a choice, is it?",
    "should i choose an alg for you or...",
    "you are doing this to spite me",
];

const submitVoteFlavorText =
[
    "you're on the big screen! (probably)",
    "look up! is your alg there? if it isn't then i messed up :/",
    "thank you for contributing (sucker)",
    "your algorithm is mine muahahaha",
    "in an ideal world that should have done something",
];

const scramblingFlavorText =
[
    "scrambling your scrambles...",
    "have you ever made scrambled eggs? it's a little like that, except way worse",
    "one day this will have a fancier animation",
    "pay attention now",
    "pick a card any card... now watch this",
    "there's every chance that it just doesn't scramble at all",
];

const readyFlavorText =
[
    "omg he's really gonna do it",
    "there's no more audience participation from here you can go to sleep now",
    "do you actually want to learn or are you participating to make me feel better",
    "consider your cube scrambled",
    "scrambled like an egg before i got folded like an omelette",
];

const solvedFlavorText =
[
    "behold, the master",
    "i could probably do it faster if i wasn't explaining my every move",
    "i average 15 seconds, i swear!",
    "for my next trick, i will do it blindfolded",
    "join me next time as i do it with my right hand behind my back",
    "now ask me to solve it while juggling",
    "were you following all of that",
    "up next: the quiz section",
    "hopefully you were paying attention, the quiz is coming next",
];

onSnapshot(scrambleRef, (doc) =>
{
    const data = doc.data();
    if (!data)
    {
        status.textContent = "No scramble found.";

        voteForm.classList.add("inactive");
        flavorText.classList.add("inactive");
        scrambleDiv.classList.add("inactive");
        return;
    }

    switch (data.status)
    {
        case "dormant": default:
        {
            status.innerHTML = "Welcome to the Audience Generated Scrambler!<br>(not recommended for audiences above 20 people)";
            cube.alg = "";
            algButtons.innerHTML = "";
            flavorText.textContent = dormantFlavorText[Math.floor(Math.random() * dormantFlavorText.length)];

            flavorText.classList.remove("inactive");
            scrambleDiv.classList.add("inactive");
            voteForm.classList.add("inactive");
        }
        break;

        case "building":
        {
            status.textContent = "Audience is building the scramble...";
            cube.alg = "";
            algButtons.innerHTML = "";
            flavorText.textContent = votingFlavorText[Math.floor(Math.random() * votingFlavorText.length)];

            flavorText.classList.remove("inactive");
            scrambleDiv.classList.add("inactive");
            voteForm.classList.remove("inactive");

            if (getCookie("algSubmitted" + data.createdAt) == null || getCookie("algSubmitted" + data.createdAt) == false)
            {
                const algSetCopy = [...algSet];
                const options = 5;
                for (let i = 0; i < options; i++)
                {
                    const daIndex = Math.floor(algSetCopy.length * Math.random());
                    const daAlg = algSetCopy.splice(daIndex, 1)[0];

                    const daOption = renderVote(daAlg, data.createdAt);
                    algButtons.appendChild(daOption);

                    daOption.addEventListener("click", function()
                    {
                        for (const node of algButtons.childNodes)
                        {
                            node.classList.remove("selected");
                        }
                        daOption.classList.add("selected");
                        
                        cube.jumpToStart();
                        cube.alg = "";
                        cube.alg = daAlg.moves;
                        cube.play();
                    })
                }

                voteForm.classList.remove("inactive");
            }
            else
            {
                confirmVoted(data.createdAt);
            }
        }
        break;

        case "scrambling":
        {
            status.textContent = "Scrambling your scramble...";
            flavorText.textContent = scramblingFlavorText[Math.floor(Math.random() * scramblingFlavorText.length)];

            voteForm.classList.add("inactive");
            flavorText.classList.remove("inactive");
            scrambleDiv.classList.add("inactive");
        }
        break;

        case "ready":
        {
            const moves = data.finalMoves.join(" ");
            status.textContent = "Scramble ready!";
            scrambleText.textContent = moves;
            flavorText.textContent = readyFlavorText[Math.floor(Math.random() * readyFlavorText.length)];

            cube.jumpToStart();
            cube.alg = moves;
            cube.play();
            cube.experimentalDisplayMoveSequence = true;

            voteForm.classList.add("inactive");
            flavorText.classList.remove("inactive");
            scrambleDiv.classList.remove("inactive");
        }
        break;

        case "solved":
        {
            const moves = data.finalMoves.join(" ");
            cube.alg = moves;
            scrambleText.textContent = moves;
            status.textContent = `Solved in ${(data.solveTime / 1000).toFixed(2)} seconds!`;
            flavorText.textContent = solvedFlavorText[Math.floor(Math.random() * solvedFlavorText.length)];

            voteForm.classList.add("inactive");
            flavorText.classList.remove("inactive");
            scrambleDiv.classList.remove("inactive");
        }
        break;
    }
});

async function submitVote()
{
    const selectedAlg = algButtons.getElementsByClassName("selected")[0];
    if (!selectedAlg)
    {
        flavorText.textContent = submitNothingFlavorText[Math.floor(Math.random() * submitNothingFlavorText.length)];
        return;
    }

    const createdAt = selectedAlg.createdAt;
    const selectedMoves = selectedAlg.daAlg.moves.split(" ");
    const userId = "user_" + Math.floor(Math.random() * 1000000); // temporary random id idk, hopefully doesn't overlap otherwise everything breaks

    try
    {
        await setDoc(doc(votesRef, userId),
        {
            selectedMoves: selectedMoves,
            votedAt: new Date()
        });

        selectedAlg.classList.add("exit");
        setTimeout(function()
        {
            confirmVoted(createdAt);
        }, 1100);
    }
    catch (err)
    {
        console.error("Vote error:", err);
        flavorText.textContent = "Error submitting vote.";
    }
}

function confirmVoted(createdAt)
{
    setCookie("algSubmitted" + createdAt, true, 1);

    flavorText.textContent = submitVoteFlavorText[Math.floor(Math.random() * submitVoteFlavorText.length)];

    flavorText.classList.remove("inactive");
    voteForm.classList.add("inactive");
}

voteFormSubmit.addEventListener("click", submitVote);
