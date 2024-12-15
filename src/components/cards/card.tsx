import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "../../services/bookmark";
import { AppState } from "../../store";
import { Article } from "../../models/article";

interface CardProps {
  image?: string | null;
  title?: string | null;
  author?: string | null;
  category?: string | null;
  url?: string | null;
  showAdLabel?: boolean;
}

const Card: React.FC<CardProps> = ({
  image = "https://via.placeholder.com/300x210",
  title = "No Title Available",
  author = "Unknown Author",
  category = "News",
  url = "#",
  showAdLabel = false,
}) => {
  const user = useSelector((state: AppState) => state.user);
  const { data: bookmarks = [], refetch } = useGetBookmarksQuery("");
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  const isBookmarked = bookmarks.some((bookmark: Article) => bookmark.url === url);

  const handleCardClick = () => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmarked) {
      const bookmark = bookmarks.find((b: Article) => b.url === url);
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
  };

  return (
    <div className="news-card" onClick={handleCardClick}>
      <div
        className="card-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {showAdLabel && <div className="ad-label">AD</div>}

      {user?.access_token && (
        <div
          className={`bookmark-icon ${isBookmarked ? "bookmarked" : ""}`}
          onClick={handleBookmarkClick}
        >
          <FaBookmark />
        </div>
      )}

      <div className="card-category">{category?.toUpperCase()}</div>
      <h3 className="card-title">{title}</h3>
      <div className="card-author">{author}</div>
    </div>
  );
};

export default Card;
