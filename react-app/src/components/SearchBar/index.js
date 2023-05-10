import React, { useState } from 'react';
import './SearchBar.css';
import { useHistory } from "react-router-dom"

function SearchBar() {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform search functionality with the query variable
    if(!query){
      return
    }
    setQuery('')
    history.push(`/search/${query}`)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

export default SearchBar;
