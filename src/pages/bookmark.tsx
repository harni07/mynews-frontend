import React from "react";
import Layout from "../components/layout/layout";
import Grid from "../components/grid";
import Card from "../components/cards/card";
import { useGetBookmarksQuery } from "../services/bookmark";
import LoadingSpinner from "../components/spinner";

const BookmarksPage: React.FC = () => {
  const { data: bookmarks = [], isLoading } = useGetBookmarksQuery("");

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="page-title">Bookmarks</h2>
      {bookmarks.length > 0 ? (
        <Grid>
          {bookmarks.map((bookmark: any, index: number) => (
            <Card
              key={index}
              image={bookmark.urlToImage || "https://via.placeholder.com/300x210"}
              title={bookmark.title}
              author={bookmark.author}
              category={bookmark.category || "News"}
              url={bookmark.url}
            />
          ))}
        </Grid>
      ) : (
        <p className="no-bookmarks">You don't have any bookmarks yet.</p>
      )}
    </Layout>
  );
};

export default BookmarksPage;
