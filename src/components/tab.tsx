import React from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;  
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => (
  <div className="mobile-tabs hide-desktop">
    <button className={`tab ${activeTab === "featured" ? "active" : ""}`} onClick={() => setActiveTab("featured")}>Featured</button>
    <button className={`tab ${activeTab === "latest" ? "active" : ""}`} onClick={() => setActiveTab("latest")}>Latest</button>
  </div>
);

export default Tabs;
