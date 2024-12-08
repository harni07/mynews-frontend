import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Layout from "../components/layout/layout";
import Grid from "../components/grid";
import Card from "../components/cards/card";
import BreakingCard from "../components/cards/breakingCard";
import LatestNews from "../components/cards/latestNews";
import { useGetEverythingQuery } from "../services/news";
import LoadingSpinner from "../components/spinner";
import { useSelector } from "react-redux";
import { AppState } from "../store";

export interface Article {
  urlToImage: string;
  title: string;
  author: string;
  publishedAt: string;
  url: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"featured" | "latest">("featured");
  const [breakingArticle, setBreakingArticle] = useState<Article | null>(null);

  const searchQuery = useSelector((state: AppState) => state.search.query);

  const { data: news, isLoading } = useGetEverythingQuery({
    keyword: searchQuery || "technology",
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
        (article: any) => article.content !== "[Removed]" && article.description !== "[Removed]"
      );

      setArticles((prevArticles) => {
        // Ako je prva stranica, resetiramo sve osim breakingArticle
        if (page === 1) {
          setBreakingArticle(filteredArticles[0] || null);
          return filteredArticles.slice(1);
        }
        // Inače dodajemo nove članke na postojeće
        return [...prevArticles, ...filteredArticles];
      });
    }
  }, [news]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Layout>
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
          <Grid>
            {breakingArticle && (
              <BreakingCard article={breakingArticle} />
            )}
            {articles.map((article: any, index: number) => (
              <Card
                key={index}
                image={article.urlToImage || "https://via.placeholder.com/300x210"}
                title={article.title}
                author={article.author}
                category="News"
                url={article.url}
              />
            ))}
          </Grid>
        </InfiniteScroll>
      )}
      {activeTab === "latest" && (
        <div className="latest-wrapper">
          <LatestNews />
        </div>
      )}
    </Layout>
  );
};

export default Home;
