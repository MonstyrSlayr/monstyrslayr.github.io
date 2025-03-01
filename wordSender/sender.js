import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
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

const confirmMessages =
[
	"peep the big screen",
	"look at the tv",
	"ideally your message should appear right about now",
	"look mom! i'm on tv!",
	"are you having fun yet",
	"alright, now do another one",
	"yoooooooooooooo",
	"now let's see paul allen's message",
	"anyone else here play among us",
	"try putting an image link",
	"now try a youtube video link",
	"have you tried typing a color yet",
	"LOCK IN",
	"buy nathan another crush orange",
	"hoohoohee",
	"hopefully that one wasn't a slur",
	"hopefully that one wasn't porn",
	"you know these are all saved to a backlog, right",
	"that one might get you banned"
];

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

const changeSiteColorChance = 0.1;

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

function getRandomKey(dict)
{
	const keys = Object.keys(dict);
	if (keys.length === 0) {
	  return undefined; // Return undefined if the dictionary is empty
	}
	const randomIndex = Math.floor(Math.random() * keys.length);
	return keys[randomIndex];
}

const pollTimer = document.getElementById("pollTimer");
function changeSiteColor()
{
	const daKey = getRandomKey(siteColors);
	const newColor = siteColors[daKey];
	document.body.style.backgroundColor = newColor;
	document.body.style.color = invertColor(newColor, true);
	document.body.style.borderColor = invertColor(newColor, true);
	pollTimer.style.color = "white";
	return daKey;
}

document.addEventListener('DOMContentLoaded', function()
{
	const wordForm = document.getElementById("wordForm");
	const submitButton = document.getElementById("wordSubmit");
	const isSilentCheckbox = document.getElementById("isSilent");
	const wordInput = document.getElementById("wordInput");
	const messageConfirm = document.getElementById("messageConfirm");

	wordForm.addEventListener("submit", (e) =>
	{
		e.preventDefault();

		const daWord = wordInput.value.trim();
		wordInput.value = "";

		const now = new Date();
		const timeString = now.toLocaleTimeString();

		const isSilent = isSilentCheckbox.checked;

		set(ref(daDatabase, "words"),
		{
			word: daWord,
			silent: isSilent,
			time: timeString,
		});

		push(ref(daDatabase, "allWords"),
		{
			word: daWord,
			silent: isSilent,
			time: timeString,
		});

		if (Math.random() < changeSiteColorChance)
		{
			messageConfirm.textContent = "oooo color change to " + changeSiteColor();;
		}
		else
		{
			messageConfirm.textContent = confirmMessages[Math.floor(Math.random() * confirmMessages.length)];
		}
		messageConfirm.style.display = "block";

		return false;
	});

	const pollDiv = document.getElementById("poll");
	const pollQuestion = document.getElementById("pollQuestion");
	const pollAnswers = document.getElementById("pollAnswers");
	const pollTimerChart = document.getElementById("pollTimerChart");
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

	function resetPoll()
	{
		pollDiv.style.display = "none";
		pollQuestion.style.display = "none";
		pollQuestion.innerHTML = "";
		pollAnswers.style.display = "none";
		pollAnswers.innerHTML = "";
		pollTimer.style.display = "none";
		pollTimer.innerHTML = "";
		pollTimerChart.style.display = "none";
		if (timerInterval != null) clearInterval(timerInterval);
		if (timerTimeout != null) clearTimeout(timerTimeout);
	}

	let previousTime = null;

	onValue(ref(daDatabase, "poll"), (snapshot) =>
	{
		const data = snapshot.val();
		const startTime = new Date(data.time);

		if (startTime != previousTime)
		{
			resetPoll();
			previousTime = startTime;
			const endTime = new Date(data.time);
			endTime.setSeconds(endTime.getSeconds() + data.duration);
			let currentTime = new Date();

			if (currentTime < endTime)
			{
				pollDiv.style.display = "flex";

				pollQuestion.textContent = data.question;
				pollQuestion.style.display = "block";

				for (const answer of data.answers)
				{
					const daDiv = document.createElement("div");
					daDiv.classList.add("pollOption");
					pollAnswers.appendChild(daDiv);

					const option = document.createElement("input");
					option.type = "radio";
					option.name = "poll";
					option.id = "poll" + answer;
					option.value = answer;
					daDiv.appendChild(option);
					
					const label = document.createElement("label");
					label.textContent = answer;
					label.htmlFor = "poll" + answer;
					daDiv.appendChild(label);
				}

				pollAnswers.style.display = "flex";
				pollTimerChart.style.display = "block";

				function updateTimer()
				{
					let currentTime = new Date();
					pollTimer.textContent = Math.floor((endTime - currentTime) / 1000);
					chartData = [currentTime - startTime, endTime - currentTime];
					pollChart.data.datasets[0].data = chartData;
					pollChart.update();
				}
				updateTimer();

				timerInterval = setInterval(function()
				{
					updateTimer();
				}, 100);

				timerTimeout = setTimeout(function()
				{
					const radios = document.getElementsByName("poll");
					let pollChecked = false;
					let pushThing = "";

					for (const radio of radios)
					{
						if (radio.checked)
						{
							pushThing = radio.value;
							pollChecked = true;
							break;
						}
					}

					if (!pollChecked)
					{
						pushThing = "null";
					}

					setTimeout(function()
					{
						push(ref(daDatabase, "poll/consensus"), pushThing);
					}, 3000);

					resetPoll();
				}, endTime - currentTime);
				pollTimer.style.display = "block";
			}
		}
	});
});
  