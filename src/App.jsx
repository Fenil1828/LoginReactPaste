import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    // Load the script file
    const script = document.createElement('script');
    script.src = '/Login page/script.js';
    script.type = 'module';
    script.defer = true;
    document.body.appendChild(script);
    
    // Load the CSS file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/Login page/style.css';
    document.head.appendChild(link);
    
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

const LoginPage = () => {
  useEffect(() => {
    // Fetch the HTML content
    fetch('/Login page/index.html')
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.body.innerHTML;
        document.getElementById('login-container').innerHTML = content;
      });
  }, []);
  
  return <div id="login-container"></div>;
};

export default App; 