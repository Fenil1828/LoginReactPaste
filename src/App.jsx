import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};

const LoginPage = () => {
  useEffect(() => {
    // Initialize container
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        container.classList.add("active");
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    }

    // Add Firebase script
    const firebaseScript = document.createElement('script');
    firebaseScript.type = 'module';
    firebaseScript.innerHTML = `
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
      import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
      
      // Your web app's Firebase configuration
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
      auth.languageCode = 'en';
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
      
      if (googleLoginSignup) googleLoginSignup.addEventListener("click", handleGoogleLogin);
      if (googleLoginSignin) googleLoginSignin.addEventListener("click", handleGoogleLogin);
    `;
    document.body.appendChild(firebaseScript);
  }, []);

  return (
    <div className="login-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
        }

        body{
            background-color: #c9d6ff;
            background: linear-gradient(to right, #e2e2e2, #c9d6ff);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100vh;
        }

        .container{
            background-color: #fff;
            border-radius: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
            position: relative;
            overflow: hidden;
            width: 768px;
            max-width: 100%;
            min-height: 480px;
        }

        .container p{
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0.3px;
            margin: 20px 0;
        }

        .container span{
            font-size: 12px;
        }

        .container a{
            color: #333;
            font-size: 13px;
            text-decoration: none;
            margin: 15px 0 10px;
        }

        .social-icons{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            gap: 5px;
        }

        .container button{
            background-color: #512da8;
            color: #fff;
            font-size: 12px;
            padding: 10px 45px;
            border: 1px solid transparent;
            border-radius: 8px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-top: 10px;
            cursor: pointer;
        }

        .container button.hidden{
            background-color: transparent;
            border-color: #fff;
        }

        .container form{
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 40px;
            height: 100%;
        }

        .container input{
            background-color: #eee;
            border: none;
            margin: 8px 0;
            padding: 10px 15px;
            font-size: 13px;
            border-radius: 8px;
            width: 100%;
            outline: none;
        }

        .form-container{
            position: absolute;
            top: 0;
            height: 100%;
            transition: all 0.6s ease-in-out;
        }

        .sign-in{
            left: 0;
            width: 50%;
            z-index: 2;
        }

        .container.active .sign-in{
            transform: translateX(100%);
        }

        .sign-up{
            left: 0;
            width: 50%;
            opacity: 0;
            z-index: 1;
        }

        .container.active .sign-up{
            transform: translateX(100%);
            opacity: 1;
            z-index: 5;
            animation: move 0.6s;
        }

        @keyframes move{
            0%, 49.99%{
                opacity: 0;
                z-index: 1;
            }
            50%, 100%{
                opacity: 1;
                z-index: 5;
            }
        }

        .social-icons{
            margin: 20px 0;
        }

        .social-icons a{
            border: 1px solid #ccc;
            border-radius: 20%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 3px;
            width: 40px;
            height: 40px;
        }

        .toggle-container{
            position: absolute;
            top: 0;
            left: 50%;
            width: 50%;
            height: 100%;
            overflow: hidden;
            transition: all 0.6s ease-in-out;
            border-radius: 150px 0 0 100px;
            z-index: 1000;
        }

        .container.active .toggle-container{
            transform: translateX(-100%);
            border-radius: 0 150px 100px 0;
        }

        .toggle{
            background-color: #512da8;
            height: 100%;
            background: linear-gradient(to right, #5c6bc0, #512da8);
            color: #fff;
            position: relative;
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
        }

        .container.active .toggle{
            transform: translateX(50%);
        }

        .toggle-panel{
            position: absolute;
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 30px;
            text-align: center;
            top: 0;
            transform: translateX(0);
            transition: all 0.6s ease-in-out;
        }

        .toggle-left{
            transform: translateX(-200%);
        }

        .container.active .toggle-left{
            transform: translateX(0);
        }

        .toggle-right{
            right: 0;
            transform: translateX(0);
        }

        .container.active .toggle-right{
            transform: translateX(200%);
        }

        #g-login-btn-signup, #g-login-btn-signin {
            background-color: white !important;
            color: #757575 !important;
            border: 1px solid #dadce0 !important;
            border-radius: 4px !important;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-weight: 500;
            font-size: 14px;
            padding: 10px 12px !important;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            text-transform: none !important;
            transition: background-color 0.3s;
            width: 100%;
        }

        #g-login-btn-signup:hover, #g-login-btn-signin:hover {
            background-color: #f8f9fa !important;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        #g-login-btn-signup img, #g-login-btn-signin img {
            width: 18px;
            height: 18px;
        }
      `}} />

      <div className="container" id="container">
        <div className="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <div className="social-icons">
                    <button id="g-login-btn-signup"><img src="/google.png" alt="" /> Continue with Google</button>
                </div>
                <span>or use your email for registeration</span>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <div className="social-icons">
                    <button id="g-login-btn-signin"><img src="/google.png" alt="" /> Continue with Google</button>
                </div>
                <span>or use your email password</span>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="login">Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Jee!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default App; 