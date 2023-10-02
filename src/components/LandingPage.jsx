import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Handle language selection and redirection
  const handleLanguageSelection = (language) => {
    // You can store the selected language in a cookie, local storage, or state
    // For simplicity, let's use local storage in this example
    localStorage.setItem('selectedLanguage', language);
  };

  return (
    <div>
      <h2>Select Your Language</h2>
      <button onClick={() => handleLanguageSelection('en')}>
        <Link to="/en/profile">English</Link>
      </button>
      <button onClick={() => handleLanguageSelection('pt')}>
        <Link to="/pt/profile">Portuguese</Link>
      </button>
    </div>
  );
};

export default LandingPage;
