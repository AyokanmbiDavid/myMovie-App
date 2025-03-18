// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container">
        <Link className="navbar-brand text-primary fw-bold" to="/">
          🎬 MovieApp
        </Link>

        <div className="d-flex ms-auto me-3">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress} // Triggers search on Enter key
          />
          <button className="btn btn-outline-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
