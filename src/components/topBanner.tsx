import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideBanner } from "../store/slices/bannerSlice";
import { AppState } from "../store";
import "../styles/components/topBanner.scss";

const TopBanner: React.FC = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state: AppState) => state.banner.isVisible);

  const handleClose = () => {
    dispatch(hideBanner());
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="top-banner">
      <div className="top-banner-content">
        <div className="banner-text">
          <strong>Make MyNews your homepage</strong>
          <span>Every day discover what’s trending on the internet!</span>
        </div>
        <div className="banner-actions">
          <button className="dismiss-btn" onClick={handleClose}>
            No, thanks
          </button>
          <button className="get-btn">GET</button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
