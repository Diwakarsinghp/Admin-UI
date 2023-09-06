import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search by name,email or role"
      onChange={props.onChange}
    />
  );
}

export default SearchBar;
