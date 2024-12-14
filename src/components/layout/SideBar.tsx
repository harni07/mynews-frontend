import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

const Sidebar = () => {
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
    <div className="sidebar">
      <div className="nav-items">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`nav-item ${item.isActive(location.pathname) ? "active" : ""}`}
            onClick={() => {
              navigate(item.path);
            }}
          >
            <div className="icon">{item.icon}</div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
