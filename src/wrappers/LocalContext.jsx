import React, { useState } from 'react';

const LocalContext = React.createContext();

function LocalContextProvider({ children }) {
  // const API_URL = 'http://localhost:32000/api/v2';
  const API_URL = 'https://api.konnect.dev/api/v2';
  const UPLOAD_URL = 'https://media.konnect.dev';
  // const REACT_URL = 'http://localhost:3001';
  const REACT_URL = 'https://snippets.konnect.dev';

  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [darkTheme, setDarkTheme] = useState(true);

  const changeTheme = () => {
    setDarkTheme((prev) => {
      document.getElementById(
        'body'
      ).className = `w-screen overflow-x-hidden bg-gray-${
        !prev ? '9' : '1'
      }00 duration-500 ease-in-out`;

      return !prev;
    });
  };

  return (
    <LocalContext.Provider
      value={{
        API_URL,
        UPLOAD_URL,
        REACT_URL,
        currentSnippet,
        setCurrentSnippet,
        darkTheme,
        changeTheme,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}

export { LocalContext, LocalContextProvider };
