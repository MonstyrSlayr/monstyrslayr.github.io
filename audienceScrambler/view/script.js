// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, addDoc, onSnapshot, orderBy, query, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getCookie, setCookie, deleteCookie } from "../cookies.js";
import { algToCubeAlg, renderVote } from "../module.js";
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
const audienceAlgs = document.getElementById("audienceAlgs");
const scrambleDiv = document.getElementById("scrambleDiv");
const scrambleText = document.getElementById("scrambleText");

const scrambleRef = doc(collection(db, "scrambles"), "current");
const votesRef = collection(scrambleRef, "votes");

let voteUnsubscribe = null; // fer cleanin' up th' listen'r

function addVoteToDiv(doc)
{
    const data = doc.data();
    const moves = data.selectedMoves.join(" ");
    const daCubeAlg = algToCubeAlg(moves);
    const daDiv = renderVote(daCubeAlg, 0);
    daDiv.id = `vote-${doc.id}`;
    
    daDiv.classList.add('floating', 'enter');

    const containerWidth = audienceAlgs.clientWidth;
    const containerHeight = audienceAlgs.clientHeight;
    let x = 0;
    let y = 0;
    daDiv.style.left = `${x}px`;
    daDiv.style.top = `${y}px`;

    audienceAlgs.appendChild(daDiv);

    setTimeout(() =>
    {
        daDiv.classList.remove('enter');
    }, 1000);

    let angle = Math.random() * 360;
    const speed = 0.1 + Math.random() * 0.5; // pixels per frame, or ppf for short
    const radius = 0.1 + Math.random() * 1;

    function float()
    {
        angle += 0.02 + Math.random() * 0.02;
        let dx = Math.cos(angle) * speed;
        let dy = Math.sin(angle) * speed;

        x += dx * radius;
        y += dy * radius;

        // bounce off walls
        if (x < 0 || x > containerWidth - 50) dx *= -1;
        if (y < 0 || y > containerHeight - 50) dy *= -1;

        daDiv.style.left = `${x}px`;
        daDiv.style.top = `${y}px`;

        requestAnimationFrame(float);
    }

    requestAnimationFrame(float);
}

async function loadAllVotes()
{
    const snapshot = await getDocs(query(votesRef, orderBy("votedAt")));
    snapshot.forEach((doc) =>
    {
        addVoteToDiv(doc);
    });
}

function startVoteListener()
{
    if (voteUnsubscribe) voteUnsubscribe();
    voteUnsubscribe = onSnapshot(query(votesRef, orderBy("votedAt")), (snapshot) =>
    {
        snapshot.docChanges()
        .filter(change => change.type === "added")
        .forEach(change =>
        {
            const doc = change.doc;

            if (!document.getElementById(`vote-${doc.id}`))
            {
                addVoteToDiv(doc);
            }
        });
    });
}
  
function stopVoteListener()
{
    if (voteUnsubscribe)
    {
        voteUnsubscribe();
        voteUnsubscribe = null;
    }
}

onSnapshot(scrambleRef, (doc) =>
{
    const data = doc.data();
    if (!data)
    {
        stopVoteListener();
        status.textContent = "No scramble found.";
        scrambleDiv.classList.add("inactive");
        audienceAlgs.classList.add("inactive");
        return;
    }

    switch (data.status)
    {
        case "dormant": default:
        {
            status.innerHTML = "Welcome to the Audience Generated Scrambler!<br>This is where the big screen goes :)";
            cube.alg = "";
            audienceAlgs.innerHTML = "";
            
            scrambleDiv.classList.add("inactive");
            audienceAlgs.classList.add("inactive");
        }
        break;

        case "building":
        {
            startVoteListener();
            audienceAlgs.classList.remove("inactive");
            scrambleDiv.classList.add("inactive");
            status.textContent = "Audience is building the scramble...";

            audienceAlgs.innerHTML = "";
            cube.alg = "";
        }
        break;

        case "scrambling":
        {
            stopVoteListener();
            status.textContent = "Scrambling your scramble...";

            audienceAlgs.classList.remove("inactive");
            scrambleDiv.classList.add("inactive");

            const daDocs = [];

            getDocs(query(votesRef, orderBy("votedAt")))
            .then((snapshot) =>
            {
                snapshot.forEach((doc) =>
                {
                    daDocs.push(doc);
                });

                for (const element of audienceAlgs.childNodes)
                {
                    if (element.innerHTML != undefined) // ????????
                    {
                        element.classList.add("exit");
                    }
                }

                setTimeout(function()
                {
                    audienceAlgs.innerHTML = "";
                    for (let i = 0; i < data.indexOrder.length; i++)
                    {
                        addVoteToDiv(daDocs[data.indexOrder[i]]);
                    }
                }, 2000);
            });
        }
        break;

        case "ready":
        {
            stopVoteListener();

            const moves = data.finalMoves.join(" ");

            status.textContent = "Scramble ready!";
            scrambleText.textContent = moves;

            if (audienceAlgs.innerHTML.trim() == "")
            {
                const daDocs = [];

                getDocs(query(votesRef, orderBy("votedAt")))
                .then((snapshot) =>
                {
                    snapshot.forEach((doc) =>
                    {
                        daDocs.push(doc);
                    });

                    for (let i = 0; i < data.indexOrder.length; i++)
                    {
                        addVoteToDiv(daDocs[data.indexOrder[i]]);
                    }
                });
            }

            cube.jumpToStart();
            cube.alg = moves;
            cube.play();
            cube.experimentalDisplayMoveSequence = true;

            scrambleDiv.classList.add("inactive");
            audienceAlgs.classList.remove("inactive");
        }
        break;

        case "solved":
        {
            stopVoteListener();
            const moves = data.finalMoves.join(" ");

            status.textContent = `Solved in ${(data.solveTime / 1000).toFixed(2)} seconds!`;
            scrambleText.textContent = moves;
            
            cube.alg = moves;

            scrambleDiv.classList.add("inactive");
            audienceAlgs.classList.remove("inactive");
        }
        break;
    }
});
