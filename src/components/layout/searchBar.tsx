import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/slices/searchSlice";

interface SearchBarProps {
  onSearchComplete?: () => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchComplete }) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const isMobile = window.innerWidth <= 768;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput));
      onSearchComplete && onSearchComplete();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isMobile && event.key === "Enter") {
      handleSearch(); 
    }
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search news"
          className="search-input"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} 
        />
        {!isMobile && (
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
