// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
  
  // Handle form submission
  document.getElementById("wordForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const daWord = document.getElementById("wordInput").value;
    
    // Save the word to Firebase
    set(ref(daDatabase, "words"), {word: daWord});
    
    // Clear input field
    document.getElementById("wordInput").value = '';
  });
  