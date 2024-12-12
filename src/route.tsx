import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import AccountActivated from "./pages/auth/account-acctivated";
import Home from "./pages/home";
import Category from "./pages/category";
import BookmarksPage from "./pages/bookmark";
import ProtectedRoute from "./services/protectedRoute";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/bookmarks",
        element: (
          <ProtectedRoute>
            <BookmarksPage />
          </ProtectedRoute>
        ),
      },  
    {
        path: "/category/:category",
        element: <Category />,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/auth/activate/:token",
        element: <AccountActivated/>
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword/>
    },
    {
        path: "/reset-password/:token",
        element: <ResetPassword/>
    }
]);
