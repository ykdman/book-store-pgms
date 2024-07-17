import React, { useContext, useState } from "react";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Layout from "./Layout/Layout";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, ThemeName, getTheme } from "./style/theme";
import ThemeSwitcher from "./shared/components/Header/ThemeSwitcher/ThemeSwitcher";
import { BookStoreThemeProvider, ThemeContext } from "./context/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./shared/components/Error";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/books", element: <div>도서목록</div> },
      { path: "/signup", element: <Signup /> },
      { path: "/reset", element: <ResetPassword /> },
    ],
  },
]);

function App() {
  // const [themeName, setThemeName] = useState<ThemeName>("light");
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <BookStoreThemeProvider>
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
