import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Layout from "../components/layout/layout";
import Grid from "../components/grid";
import Card from "../components/cards/card";
import { useGetEverythingQuery } from "../services/news";
import LoadingSpinner from "../components/spinner";

export interface Article {
  urlToImage: string;
  title: string;
  author: string;
  publishedAt: string;
}

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);

  const { data: news, isLoading } = useGetEverythingQuery({
    keyword: category || "technology",
    page,
  });

  useEffect(() => {
    setPage(1);
    setArticles([]);
  }, [category]);

  useEffect(() => {
    if (news?.articles) {
      // Filtriraj artikle
      const filteredArticles = news.articles.filter(
        (article: any) => article.content !== "[Removed]" && article.description !== "[Removed]"
      );

      setArticles((prevArticles) =>
        page === 1 ? filteredArticles : [...prevArticles, ...filteredArticles]
      );
    }
  }, [news]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const capitalizeFirstLetter = (str: string | undefined) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <Layout>
      <h2 className="category-title">{capitalizeFirstLetter(category)} News</h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={!isLoading && news?.articles?.length > 0}
        loader={<LoadingSpinner />}
        endMessage={<p>You have seen all the articles!</p>}
      >
        <Grid>
          {articles.map((article: any, index: number) => (
            <Card
              key={index}
              image={article.urlToImage || "https://via.placeholder.com/300x210"}
              title={article.title}
              author={article.author}
              url={article.url}
              category={capitalizeFirstLetter(category) || "News"}
            />
          ))}
        </Grid>
      </InfiniteScroll>
    </Layout>
  );
};

export default Category;
