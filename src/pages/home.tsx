import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "../components/grid";
import Card from "../components/cards/card";
import BreakingCard from "../components/cards/breakingCard";
import LatestNews from "../components/cards/latestNews";
import { useGetEverythingQuery } from "../services/news";
import LoadingSpinner from "../components/spinner";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Article } from "../models/article";


const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"featured" | "latest">("featured");
  const [breakingArticle, setBreakingArticle] = useState<Article | null>(null);
  const categories = ["TECH", "SPORTS", "HEALTH", "NEWS", "VIRAL"];

  const searchQuery = useSelector((state: AppState) => state.search.query);

  const { data: news, isLoading } = useGetEverythingQuery({
    keyword: searchQuery || "news",
    page,
  });

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setBreakingArticle(null);
  }, [searchQuery]);

  useEffect(() => {
    if (news?.articles) {
      const filteredArticles = news.articles.filter(
        (article: Article) => article.content !== "[Removed]" && article.description !== "[Removed]"
      );

      setArticles((prevArticles) => {
        if (page === 1) {
          setBreakingArticle(filteredArticles[0] || null);
          return filteredArticles.slice(1);
        }
        return [...prevArticles, ...filteredArticles];
      });
    }
  }, [news]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="mobile-tabs hide-desktop">
        <button
          className={`tab ${activeTab === "featured" ? "active" : ""}`}
          onClick={() => setActiveTab("featured")}
        >
          Featured
        </button>
        <button
          className={`tab ${activeTab === "latest" ? "active" : ""}`}
          onClick={() => setActiveTab("latest")}
        >
          Latest
        </button>
      </div>
      {activeTab === "featured" && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={!isLoading && news?.articles && news.articles.length > 0}
          loader={<LoadingSpinner />}
          endMessage={<p>You have seen all the articles!</p>}
        >
        <Grid className={activeTab === "featured" ? "featured" : ""}>
          {breakingArticle && (
                  <BreakingCard article={breakingArticle} />
                )}
                <LatestNews />
                {articles.map((article: Article, index: number) => {
                  const randomCategory =
                    categories[Math.floor(Math.random() * categories.length)];
                  const showAdLabel = (index + 1) % 6 === 0;

                  return (
                    <Card
                      key={index}
                      image={article.urlToImage}
                      title={article.title}
                      author={article.author}
                      category={randomCategory}
                      url={article.url}
                      showAdLabel={showAdLabel} 
                    />
                  );
                })}
              </Grid>
            </InfiniteScroll>
          )}

      {activeTab === "latest" && (
        <div className="latest-wrapper">
          <LatestNews />
        </div>
      )}
    </>
  );
};

export default Home;
