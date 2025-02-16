// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
	"LOCK IN",
	"buy nathan another crush orange"
];

const siteColors =
[
	"#000000",
	"#ff0000",
	"#00ff00",
	"#0000ff",
	"#ffff00",
	"#00ffff",
	"#ff00ff",
	"#ffffff"
];

const changeSiteColorChance = 1;

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

function changeSiteColor()
{
	const newColor = siteColors[Math.floor(Math.random() * siteColors.length)];
	document.body.style.backgroundColor = newColor;
	document.body.style.color = invertColor(newColor, true);
}
  
// Initialize Firebase
initializeApp(firebaseConfig);
const daDatabase = getDatabase();

document.addEventListener('DOMContentLoaded', function()
{
	const wordForm = document.getElementById("wordForm");
	const submitButton = document.getElementById("wordSubmit");
	const isSilentCheckbox = document.getElementById("isSilent");
	const wordInput = document.getElementById("wordInput");
	const messageConfirm = document.getElementById("messageConfirm");

	// Handle form submission
	wordForm.addEventListener("submit", (e) =>
	{
		console.log('Form submitted');
		e.preventDefault();

		const daWord = wordInput.value;
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

		if (Math.random() < changeSiteColorChance)
		{
			changeSiteColor();
			messageConfirm.textContent = "oooo color change";
		}
		else
		{
			messageConfirm.textContent = confirmMessages[Math.floor(Math.random() * confirmMessages.length)];
		}
		messageConfirm.style.display = "block";

		return false;
	});
});
  