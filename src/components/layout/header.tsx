import React from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./searchBar";
import AuthHeader from "./authHeader";

const Header: React.FC = () => {
  const location = useLocation();

  const isBookmarksPage = location.pathname === "/bookmarks"; 

  return (
    <div className="header">
      <div className="header-row">
        <h1 className="logo">
          <span className="red">My</span>
          <span className="black">News</span>
        </h1>
        {!isBookmarksPage && <SearchBar />} 
        <AuthHeader />
      </div>
      <hr />
    </div>
  );
};

export default Header;
