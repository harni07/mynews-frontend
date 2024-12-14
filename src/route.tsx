import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/layout";
import AuthContainer from "./components/authContainer";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import AccountActivated from "./pages/auth/account-acctivated";
import BookmarksPage from "./pages/bookmark";
import Category from "./pages/category";
import ProtectedRoute from "./services/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,         
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "bookmarks",
        element: (
          <ProtectedRoute>
            <BookmarksPage />
          </ProtectedRoute>
        ),
      },
      { path: "category/:category", element: <Category /> },
    ],
  },
  {
    path: "/",
    element: <AuthContainer />,  
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "auth/activate/:token", element: <AccountActivated /> },
    ],
  },
]);
