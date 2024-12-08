import React from "react";
import { Article } from "../../pages/home";

interface BreakingCardProps {
  article: Article;
}

const BreakingCard: React.FC<BreakingCardProps> = ({ article }) => {
  const handleCardClick = () => {
    window.open(article.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="breaking-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="breaking-label">BREAKING</div>
      <h3 className="breaking-title">{article.title}</h3>
      <div className="breaking-author">{article.author || "Unknown Author"}</div>
    </div>
  );
};

export default BreakingCard;
