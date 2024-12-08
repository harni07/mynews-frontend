import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/user";

const AuthHeader: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="auth-header">
      {user?.access_token ? (
        <button className="auth-button logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <button
            className="auth-button login"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
          <button
            className="auth-button signup"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default AuthHeader;
