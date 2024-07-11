import { createContext, useEffect, useState } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

const DEFAULT_THEME_NAME = "light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state: State = {
  themeName: "light",
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
    localStorage.setItem(
      THEME_LOCALSTORAGE_KEY,
      themeName === "light" ? "dark" : "light"
    );
  };

  const ctx: State = {
    themeName,
    toggleTheme,
  };

  useEffect(() => {
    const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY);
    setThemeName(
      savedThemeName ? (savedThemeName as ThemeName) : DEFAULT_THEME_NAME
    );
  }, []);

  return (
    <ThemeContext.Provider value={ctx}>
      <ThemeProvider theme={getTheme(ctx.themeName)}>
        <GlobalStyle themeName={ctx.themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
