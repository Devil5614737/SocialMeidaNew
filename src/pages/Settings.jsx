import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Settings() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleDarkMode = () => {
    setDarkMode((prev) => prev == !true);
    if (darkMode) {
      document.body.style.background = "#fff";
      document.body.style.color = "#111";
    } else {
      document.body.style.background = "#101010";
      document.body.style.color = "#fff";
    }
  };

  return (
    <div className="p-5">
      <h3 className="text-3xl font-bold">Settings</h3>
      <div className="mt-10">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            checked={darkMode}
            onChange={handleDarkMode}
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span
            className="ml-3 text-2xl font-medium text-gray-900 dark:text-gray-300 "
            style={{
              color: darkMode && "white",
            }}
          >
            Dark mode
          </span>
        </label>
      </div>
    </div>
  );
}

export default Settings;
