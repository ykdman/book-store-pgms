import React, { useContext } from "react";
import { ThemeName } from "../../../../style/theme";
import { ThemeContext } from "../../../../context/theme";

function ThemeSwitcher() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>{themeName}</button>;
}

export default ThemeSwitcher;
