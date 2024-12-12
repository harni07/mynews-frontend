import React from "react";
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

interface NavItemsProps {
  onItemClick?: () => void;
}

const NavItems: React.FC<NavItemsProps> = ({ onItemClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: AppState) => state.user);

  const navItems = [
    { label: "Home", icon: <FaHome />, path: "/home" },
    { label: "Business", icon: <FaBusinessTime />, path: "/category/business" },
    { label: "Health", icon: <FaHeartbeat />, path: "/category/health" },
    { label: "Science", icon: <FaFlask />, path: "/category/science" },
    { label: "Sports", icon: <FaRunning />, path: "/category/sports" },
    { label: "Technology", icon: <FaLaptopCode />, path: "/category/technology" },
  ];

  if (user?.access_token) {
    navItems.push({ label: "Bookmarks", icon: <FaBookmark />, path: "/bookmarks" });
  }

  return (
    <div className="nav-items">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
          onClick={() => {
            navigate(item.path);
            onItemClick && onItemClick();
          }}
        >
          <div className="icon">{item.icon}</div>
          <div className="label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default NavItems;
