import React from "react";
import Grid from "../components/grid";
import Card from "../components/cards/card";
import { useGetBookmarksQuery } from "../services/bookmark";
import { Article } from "../models/article";

const BookmarksPage: React.FC = () => {
  const { data: bookmarks = [], isLoading } = useGetBookmarksQuery("");

  return (
    <>
      <h2 className="page-title">Bookmarks</h2>
      {bookmarks.length > 0 ? (
        <Grid>
          {bookmarks.map((bookmark: Article, index: number) => (
              <Card
                key={index}
                image={bookmark.urlToImage}
                title={bookmark.title}
                author={bookmark.author}
                category={bookmark.category}
                url={bookmark.url}
              />
          ))}


        </Grid>
      ) : (
        <p className="no-bookmarks">You don't have any bookmarks yet.</p>
      )}
    </>
  );
};

export default BookmarksPage;
