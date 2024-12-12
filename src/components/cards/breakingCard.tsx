import React from "react";
import { Article } from "../../models/article";

interface BreakingCardProps {
  article: Article;
}

const BreakingCard: React.FC<BreakingCardProps> = ({ article }) => {
  const isClickable = !!article.url;

  const handleCardClick = () => {
    if (article.url) {
      window.open(article.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="breaking-card"
      onClick={handleCardClick}
      style={{
        cursor: isClickable ? "pointer" : "default",
        pointerEvents: isClickable ? "auto" : "none",
      }}
    >
      <div className="breaking-label">BREAKING</div>
      <h3 className="breaking-title">{article.title || "No title available"}</h3>
      <div className="breaking-author">{article.author || "Unknown Author"}</div>
    </div>
  );
};

export default BreakingCard;
