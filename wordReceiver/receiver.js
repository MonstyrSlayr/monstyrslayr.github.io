import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig =
{
	apiKey: "AIzaSyDPRyLJvZ8Bbdlvty50kp87-jg1OpA4zX8",
	authDomain: "wordsender-150ea.firebaseapp.com",
	databaseURL: "https://wordsender-150ea-default-rtdb.firebaseio.com/",
	projectId: "wordsender-150ea",
	storageBucket: "wordsender-150ea.firebasestorage.app",
	messagingSenderId: "1064096463566",
	appId: "1:1064096463566:web:e2a1d5ecb61689e041ae9f",
	measurementId: "G-81K8K26S09"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const daDatabase = getDatabase();

const container = document.getElementById('messagesReceived');

let siteColors =
{};

fetch("https://raw.githubusercontent.com/bahamas10/css-color-names/refs/heads/master/css-color-names.json")
.then((response) =>
{
	if (!response.ok)
	{
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
}).then((data) =>
{
	siteColors = data;
});

function padZero(str, len)
{
	len = len || 2;
	var zeros = new Array(len).join("0");
	return (zeros + str).slice(-len);
}

function invertColor(hex, bw)
{
	if (hex.indexOf("#") === 0)
	{
		hex = hex.slice(1);
	}

	if (hex.length === 3)
	{
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	if (hex.length !== 6)
	{
		throw new Error("Invalid HEX color.");
	}

	var r = parseInt(hex.slice(0, 2), 16),
		g = parseInt(hex.slice(2, 4), 16),
		b = parseInt(hex.slice(4, 6), 16);
	
	if (bw)
	{
		return (r * 0.299 + g * 0.587 + b * 0.114) > 186
			? "#000000"
			: "#FFFFFF";
	}
	
	r = (255 - r).toString(16);
	g = (255 - g).toString(16);
	b = (255 - b).toString(16);
	
	return "#" + padZero(r) + padZero(g) + padZero(b);
}

function extractVideoId(url)
{
    try
    {
        const parsedUrl = new URL(url);

        // Handle "youtu.be" links (shortened format)
        if (parsedUrl.hostname === 'youtu.be')
        {
            return parsedUrl.pathname.slice(1); // Remove the leading slash
        }

        // Handle "youtube.com" links (standard format)
        if (parsedUrl.hostname.includes('youtube.com'))
        {
            const urlParams = new URLSearchParams(parsedUrl.search);
            return urlParams.get('v');
        }

        // If the URL doesn't match either format, return null
        return null;
    }
    catch (error)
    {
        console.error('Invalid URL:', error);
        return null;
    }
}

function rightToLeft(currentTime, element, startTime, duration)
{
    if (!startTime) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const progress = elapsedTime / duration;

    // Move the paragraph from right to left
    const containerWidth = container.clientWidth;
    const paragraphWidth = element.offsetWidth;
    const distance = containerWidth + paragraphWidth;
    element.style.right = `${-paragraphWidth + distance * progress}px`;

    function animateReal(currentTime)
    {
        rightToLeft(currentTime, element, startTime, duration);
    }

    // Continue the animation until the duration is complete
    if (progress < 1)
    {
        requestAnimationFrame(animateReal);
    }
    else
    {
        // Remove the paragraph after the animation ends
        element.remove();
    }
}

function createAnimatedText(text, animate = rightToLeft)
{
    // Create a new paragraph element
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    paragraph.style.right = `-${paragraph.offsetWidth}px`; // Start from the right edge of the screen
    paragraph.style.top = `${Math.random() * 80}vh`; // Random vertical position

    // Append the paragraph to the container
    container.appendChild(paragraph);

    // Animation logic
    let startTime = null;
    const duration = 10000;

    function animateReal(currentTime)
    {
        animate(currentTime, paragraph, startTime, duration);
    }

    // Start the animation
    requestAnimationFrame(animateReal);
}

function createAnimatedImage(src, animate = rightToLeft)
{
    // Create a new paragraph element
    const img = document.createElement('img');
    img.src = src;
    img.style.right = `-${img.offsetWidth}px`; // Start from the right edge of the screen
    img.style.top = `${Math.random() * 80}vh`; // Random vertical position

    // Append the paragraph to the container
    container.appendChild(img);

    // Animation logic
    let startTime = null;
    const duration = 10000;

    function animateReal(currentTime)
    {
        animate(currentTime, img, startTime, duration);
    }

    // Start the animation
    requestAnimationFrame(animateReal);
}

function createAnimatedVideo(src, isSilent = true, animate = rightToLeft)
{
    // Create a new paragraph element
    const video = document.createElement('video');
    video.src = src;
    video.autoplay = true;
    video.controls = false;
    video.volume = isSilent ? 0 : 1;
    video.loop = true;
    video.style.right = `-${video.offsetWidth}px`; // Start from the right edge of the screen
    video.style.top = `${Math.random() * 80}vh`; // Random vertical position

    // Append the paragraph to the container
    container.appendChild(video);

    // Animation logic
    let startTime = null;
    const duration = 10000;

    function animateReal(currentTime)
    {
        animate(currentTime, video, startTime, duration);
    }

    // Start the animation
    requestAnimationFrame(animateReal);
}

function createAnimatedYoutube(id, isSilent = true, animate = rightToLeft)
{
    // Create a new paragraph element
    const youtubeVideo = document.createElement("iframe");
    youtubeVideo.src = "https://www.youtube.com/embed/" + id + "?autoplay=1" + (isSilent ? "&mute=1" : "");
    youtubeVideo.width = "640";
    youtubeVideo.height = "360";
    youtubeVideo.frameborder = "0";
    youtubeVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    youtubeVideo.allowfullscreen = false;
    youtubeVideo.style.right = `-${youtubeVideo.offsetWidth}px`; // Start from the right edge of the screen
    youtubeVideo.style.top = `${Math.random() * 80}vh`; // Random vertical position

    // Append the paragraph to the container
    container.appendChild(youtubeVideo);
    youtubeVideo.style.opacity = "0%";

    setTimeout(function ()
    {
        // Animation logic
        let startTime = null;
        const duration = 10000;
        youtubeVideo.style.opacity = "100%";

        function animateReal(currentTime)
        {
            animate(currentTime, youtubeVideo, startTime, duration);
        }

        // Start the animation
        requestAnimationFrame(animateReal);
    }, 2000);
}

function isImageSource(str)
{
    if (typeof str !== 'string') {
      return false;
    }
  
    str = str.trim();
  
    if (str.startsWith('data:image')) {
        return true;
    }
  
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|svg)(?:\?.*)?)$/i;
    return urlPattern.test(str);
}

function isVideoSource(str)
{
    if (typeof str !== 'string') {
      return false;
    }
  
    str = str.trim();
  
    if (str.startsWith('data:video')) {
        return true;
    }
  
    const urlPattern = /^(https?:\/\/.*\.(?:mp4|mov|webm)(?:\?.*)?)$/i;
    return urlPattern.test(str);
}

function isYoutubeLink(link)
{
    // Regular expression to match YouTube URLs
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    // Test the link against the regex
    return youtubeRegex.test(link);
}

onValue(ref(daDatabase, "words"), (snapshot) =>
{
    const data = snapshot.val();

    if (isYoutubeLink(data.word))
    {
        const videoId = extractVideoId(data.word);
        createAnimatedYoutube(videoId, data.silent);
    }
    else if (isVideoSource(data.word))
    {
        createAnimatedVideo(data.word, data.silent);
    }
    else if (isImageSource(data.word))
    {
        createAnimatedImage(data.word);
    }
    else if (data.word.toLowerCase() in siteColors)
    {
        document.body.style.backgroundColor = siteColors[data.word.toLowerCase()];
        document.body.style.color = invertColor(siteColors[data.word.toLowerCase()], true);
        if (!data.silent)
        {
            const newUtter = new SpeechSynthesisUtterance(data.word);
            window.speechSynthesis.speak(newUtter);
        }
        createAnimatedText(data.word);
    }
    else
    {
        if (!data.silent)
        {
            const newUtter = new SpeechSynthesisUtterance(data.word);
            window.speechSynthesis.speak(newUtter);
        }
        createAnimatedText(data.word);
    }
});

const siteTime = new Date();

const pollOngoing = document.getElementById("pollOngoing");
const pollFinished = document.getElementById("pollFinished");
const pollQuestion = document.getElementById("pollQuestion");
const pollConsensus = document.getElementById("pollConsensus");
const pollTimerChart = document.getElementById("pollTimerChart");
const pollTimer = document.getElementById("pollTimer");
const pollAbstainees = document.getElementById("pollAbstainees");

let timerInterval;
let timerTimeout;

const chartColors = ["black", "white"];
let chartData = [0, 100];

const pollChart = new Chart("pollTimerChart",
{
    type: "pie",
    data:
    {
        datasets:
        [{
            backgroundColor: chartColors,
            data: chartData
        }]
    },
    options:
    {
        title:
        {
            display: false
        },
        plugins:
        {
            tooltip:
            {
                enabled: false
            }
        },
        hover:
        {
            mode: null
        },
        events: []
    }
});

let consensusDelay = 1500;
onValue(ref(daDatabase, "poll"), (snapshot) =>
{
    const data = snapshot.val();

    const startTime = new Date(data.time);
    const endTime = new Date(data.time);
    endTime.setSeconds(endTime.getSeconds() + data.duration, consensusDelay);
    let currentTime = new Date();

    function updateTimer()
    {
        let currentTime = new Date();
        pollTimer.textContent = Math.floor((endTime - currentTime) / 1000);
        chartData = [currentTime - startTime, endTime - currentTime];
        pollChart.data.datasets[0].data = chartData;
        pollChart.update();
    }

    function daFunction()
    {
        pollOngoing.style.display = "none";
        pollTimer.style.display = "none";
        pollTimerChart.style.display = "none";
        pollFinished.style.display = "block";
        pollQuestion.style.display = "block";
        pollQuestion.innerHTML = "";
        pollConsensus.style.display = "flex";
        pollConsensus.innerHTML = "";

		if (timerInterval != null) clearInterval(timerInterval);
		if (timerTimeout != null) clearTimeout(timerTimeout);
        
        updateTimer();

        pollQuestion.innerHTML = data.question;
        let abstainees = 0;

        if (data.answers)
        {
            const options = [];
            for (const option of data.answers)
            {
                const daThing = new Object()
                daThing.value = option;
                daThing.votes = 0;
                options.push(daThing);
            }

            for (const key in data.consensus)
            {
                const vote = data.consensus[key];

                if (vote == "null")
                {
                    abstainees++;
                    continue;
                }

                for (const option of options)
                {
                    if (vote == option.value)
                    {
                        option.votes++;
                        break;
                    }
                }
            }

            for (const option of options)
            {
                const daDiv = document.createElement("div");
                daDiv.classList.add("pollVote")
                pollConsensus.append(daDiv);

                const thing = document.createElement("p");
                thing.textContent = option.value + ": " + option.votes;
                daDiv.append(thing);
            }

            if (abstainees > 0)
            {
                pollAbstainees.style.display = "block";
                pollAbstainees.textContent = "Abstained: " + abstainees;
            }
        }
    }

    if (currentTime < endTime)
    {
        pollOngoing.style.display = "block";
        pollTimer.style.display = "block";
        pollTimerChart.style.display = "block";
        pollTimer.innerHTML = "";
        pollFinished.style.display = "none";
        pollQuestion.style.display = "block";
        pollConsensus.style.display = "none";
        pollAbstainees.style.display = "none";

		if (timerInterval != null) clearInterval(timerInterval);
		if (timerTimeout != null) clearTimeout(timerTimeout);

        pollQuestion.innerHTML = data.question;

        updateTimer();

        timerInterval = setInterval(function()
        {
            updateTimer();
        }, 100);

        timerTimeout = setTimeout(function()
        {
            clearTimeout(timerInterval);
            daFunction();
        }, endTime - currentTime);
    }

    if (currentTime > endTime && currentTime > siteTime)
    {
        daFunction();
    }
});
