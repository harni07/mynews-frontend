import React from 'react';

const Tabs = ({ activeTab, setActiveTab }: any) => (
  <div className="mobile-tabs hide-desktop">
    <button className={`tab ${activeTab === "featured" ? "active" : ""}`} onClick={() => setActiveTab("featured")}>Featured</button>
    <button className={`tab ${activeTab === "latest" ? "active" : ""}`} onClick={() => setActiveTab("latest")}>Latest</button>
  </div>
);

export default Tabs;
