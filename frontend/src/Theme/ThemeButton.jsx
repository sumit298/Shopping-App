import React, { useContext } from "react";
import ThemeContext from "../App/ThemeContext";
import { BsMoon, BsSun } from "react-icons/bs";

const ThemeSwitch = () => {
  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);
  return (
    <button
      data-testid="switch-theme-btn"
      className={`${currentTheme === "light" ? "text-black" : "text-white"} ${
        currentTheme === "light" ? "bg-gray-700" : "bg-white"
      } px-4 py-2.5 rounded-md transition-colors delay-200`}
      onClick={() =>
        changeCurrentTheme(currentTheme === "light" ? "dark" : "light")
      }
    >
      {currentTheme === "light" ? (
        <BsMoon color="white" size={20} />
      ) : (
        <BsSun color="black" size={20}/>
      )}
    </button>
  );
};

export default ThemeSwitch;
