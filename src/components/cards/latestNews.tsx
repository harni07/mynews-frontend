import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetLatestNewsQuery } from "../../services/news";
import { Article } from "../../models/article";

interface LatestNewsProps {
  className?: string; 
}

const LatestNews: React.FC<LatestNewsProps> = ({ className }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);

  const { data } = useGetLatestNewsQuery(page);

  useEffect(() => {
    if (data?.articles) {
      setArticles((prev) => [...prev, ...data.articles]);
    }
  }, [data]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={`latest-news ${className || ""}`}>
      <div className="live-indicator">
        <div className="inner-circle"></div>
        <span className="live-text">Latest News</span>
      </div>

      <InfiniteScroll
        dataLength={articles.length - 2}
        next={fetchMoreData}
        hasMore={true}
        scrollableTarget="latest-news-container"
        loader=""
      >
         <div className="news-list" id="latest-news-container">
          {articles.map((article: Article, index: number) => (
            <div
              key={index}
              className="news-item"
              onClick={() =>
                article.url
                  ? window.open(article.url, "_blank")
                  : alert("URL not available")
              }
            >
              <div className="news-time">
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "No time available"}
              </div>
              <div className="news-title">
                {article.title || "No title available"}
              </div>
              <hr />
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <div className="see-all">
        <span>
          See all news <span className="arrow">›</span>
        </span>
      </div>
    </div>
  );
};

export default LatestNews;
