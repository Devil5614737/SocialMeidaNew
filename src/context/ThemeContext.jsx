import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({});

export const ThemeContexProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
};
