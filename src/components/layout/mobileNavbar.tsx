import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./searchBar";
import {
  FaHome,
  FaBusinessTime,
  FaHeartbeat,
  FaFlask,
  FaRunning,
  FaLaptopCode,
  FaBookmark,
} from "react-icons/fa";
import { AppState } from "../../store";

const MobileNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: AppState) => state.user);

  const navItems = [
    { label: "Home", icon: <FaHome />, path: "/home", isActive: (path: string) => ["/", "/home"].includes(path) },
    { label: "Business", icon: <FaBusinessTime />, path: "/category/business", isActive: (path: string) => path === "/category/business" },
    { label: "Health", icon: <FaHeartbeat />, path: "/category/health", isActive: (path: string) => path === "/category/health" },
    { label: "Science", icon: <FaFlask />, path: "/category/science", isActive: (path: string) => path === "/category/science" },
    { label: "Sports", icon: <FaRunning />, path: "/category/sports", isActive: (path: string) => path === "/category/sports" },
    { label: "Technology", icon: <FaLaptopCode />, path: "/category/technology", isActive: (path: string) => path === "/category/technology" },
  ];
  
  if (user?.access_token) {
    navItems.push({ label: "Bookmarks", icon: <FaBookmark />, path: "/bookmarks", isActive: (path: string) => path === "/bookmarks" });
  }

  return (
    <>
      <div className="mobile-navbar">
        <div className="navbar-content">
          <div className="logo" onClick={() => navigate("/")}>
            My<span>News</span>
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            ☰
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="hamburger-menu">
          <div className="menu-header">
            <div className="close-icon" onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </div>
          </div>
          <div className="centered-logo">
            <span className="logo-black">My</span>
            <span className="logo-red">News</span>
          </div>

          <SearchBar onSearchComplete={() => setMenuOpen(false)} />

          <div className="nav-items">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className={`nav-item ${item.isActive(location.pathname) ? "active" : ""}`}
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                >
                  <div className="icon">{item.icon}</div>
                  <div className="label">{item.label}</div>
                </div>
              ))}
            </div>

        </div>
      )}
    </>
  );
};

export default MobileNavbar;
