import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  // Handle language selection and redirection
  const handleLanguageSelection = (language) => {
    // You can store the selected language in a cookie, local storage, or state
    // For simplicity, let's use local storage in this example
    localStorage.setItem('selectedLanguage', language);

    // Redirect to the task list with the selected language
    navigate(`/${language}/profile`);
  };

  return (
    <div>
      <h2>Select Your Language</h2>
      <button onClick={() => handleLanguageSelection('en')}>English</button>
      <button onClick={() => handleLanguageSelection('pt')}>Portuguese</button>
    </div>
  );
};

export default LandingPage;
