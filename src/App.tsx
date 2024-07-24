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
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./shared/api/queryClient";
import ToastContainer from "./features/Toast/ui/ToastContainer";

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
      { path: "/books", element: <Books /> },
      { path: "/books/:bookId", element: <BookDetail /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/reset", element: <ResetPassword /> },
      { path: "/carts", element: <Cart /> },
      { path: "/order", element: <Order /> },
      { path: "/orderlist", element: <OrderList /> },
    ],
  },
]);

function App() {
  // const [themeName, setThemeName] = useState<ThemeName>("light");
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
