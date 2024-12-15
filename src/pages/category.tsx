import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "../components/grid";
import Card from "../components/cards/card";
import { useGetEverythingQuery } from "../services/news";
import LoadingSpinner from "../components/spinner";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { Article } from "../models/article";

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);

  const searchQuery = useSelector((state: AppState) => state.search.query);

  const { data: news, isLoading } = useGetEverythingQuery({
    keyword: searchQuery || category || "technology",
    page,
  });

  useEffect(() => {
    setPage(1);
    setArticles([]);
  }, [category, searchQuery]);

  useEffect(() => {
    if (news?.articles) {
      const filteredArticles = news.articles.filter(
        (article: Article) =>
          article.content !== "[Removed]" &&
          article.description !== "[Removed]"
      );

      setArticles((prevArticles) =>
        page === 1 ? filteredArticles : [...prevArticles, ...filteredArticles]
      );
    }
  }, [news]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={!isLoading && news?.articles?.length > 0}
        loader={<LoadingSpinner />}
      >
        <Grid>
          {articles.length === 0 && !isLoading && (
            <p>No articles found for "{searchQuery || category}".</p>
          )}
          {articles.map((article: Article, index: number) => {
            const showAdLabel = (index + 1) % 6 === 0;

            return (
              <Card
                key={index}
                image={article.urlToImage}
                title={article.title}
                author={article.author}
                url={article.url}
                category={category}
                showAdLabel={showAdLabel}
              />
            );
          })}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default Category;
