import React, { useContext, useState } from "react";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Layout from "./Layout/Layout";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, ThemeName, getTheme } from "./style/theme";
import ThemeSwitcher from "./shared/components/Header/ThemeSwitcher/ThemeSwitcher";
import { BookStoreThemeProvider, ThemeContext } from "./context/theme";

function App() {
  // const [themeName, setThemeName] = useState<ThemeName>("light");
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <BookStoreThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
