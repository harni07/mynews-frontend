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

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: any) => state.user);

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
    <div className="sidebar">
      <div className="nav-items">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
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
