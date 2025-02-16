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
	"try putting an image link"
];
  
// Initialize Firebase
initializeApp(firebaseConfig);
const daDatabase = getDatabase();

const wordForm = document.getElementById("wordForm");
const isSilentCheckbox = document.getElementById("isSilent");
const wordInput = document.getElementById("wordInput");
const messageConfirm = document.getElementById("messageConfirm");

// Handle form submission
wordForm.addEventListener("submit", function(e)
{
	e.preventDefault();
	const daWord = wordInput.value;

	const now = new Date();
	const timeString = now.toLocaleTimeString();

	const isSilent = isSilentCheckbox.checked;

	// Save the word to Firebase
	set(ref(daDatabase, "words"),
	{
		word: daWord,
		silent: isSilent,
		time: timeString,
	});

	// Clear input field
	wordInput.value = "";

	messageConfirm.textContent = confirmMessages[Math.floor(Math.random() * confirmMessages.length)];
	messageConfirm.style.display = "block";
});
  