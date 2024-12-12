import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "../../services/bookmark";
import { AppState } from "../../store";

interface CardProps {
  image: string;
  title: string;
  author: string;
  category: string;
  url: string;
}

const Card: React.FC<CardProps> = ({ image, title, author, category, url }) => {
  const user = useSelector((state: AppState) => state.user);
  const { data: bookmarks = [], refetch } = useGetBookmarksQuery("");
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const isBookmarked = bookmarks.some((bookmark: any) => bookmark.url === url);

  const handleCardClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isBookmarked) {
        const bookmark = bookmarks.find((b: any) => b.url === url);
        await removeBookmark(bookmark.id).unwrap();
      } else {
        await addBookmark({
          title,
          url,
          urlToImage: image,
          author,
          category,
        }).unwrap();
      }

      refetch();
    } catch (error) {
      console.error("Failed to update bookmark:", error);
    }
  };

  return (
    <div className="news-card" onClick={handleCardClick}>
      <div
        className="card-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {user?.access_token && (
        <div
          className={`bookmark-icon ${isBookmarked ? "bookmarked" : ""}`}
          onClick={handleBookmarkClick}
        >
          <FaBookmark />
        </div>
      )}

      <div className="card-category">{category.toUpperCase()}</div>
      <h3 className="card-title">{title}</h3>
      <div className="card-author">
        {author ? `${author}` : "Unknown Author"}
      </div>
    </div>
  );
};

export default Card;
