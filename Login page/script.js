const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login')

registerBtn.addEventListener('click',() => {
    container.classList.add("active");
})

loginBtn.addEventListener('click',() => {
    container.classList.remove("active");
})

//firbase connect


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup  } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBG26QWeyfFIKQkbacXISbgtAabo3cmn5U",
    authDomain: "pasteapplogin-k22.firebaseapp.com",
    projectId: "pasteapplogin-k22",
    storageBucket: "pasteapplogin-k22.firebasestorage.app",
    messagingSenderId: "890921744810",
    appId: "1:890921744810:web:d69b87cc6fa93af79993d3",
    measurementId: "G-40HSSZ375M"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth(app);
  auth.languageCode = 'en'
  const provider = new GoogleAuthProvider();

// Google sign-in functionality
const googleLoginSignup = document.getElementById("g-login-btn-signup");
const googleLoginSignin = document.getElementById("g-login-btn-signin");

function handleGoogleLogin(e) {
    e.preventDefault();
    console.log("Google login clicked");
    
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        // Store user data in localStorage for React app to access
    localStorage.setItem('user', JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
    }));
    
    // Redirect to the live Vercel project
    const reactAppUrl = "https://paste-app-blond-theta.vercel.app/";
    
    // Redirect to the React app
    window.location.href = reactAppUrl;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Firebase auth error:", errorCode, errorMessage);
        alert("Login failed: " + errorMessage);
    });
}

googleLoginSignup.addEventListener("click", handleGoogleLogin);
googleLoginSignin.addEventListener("click", handleGoogleLogin);

