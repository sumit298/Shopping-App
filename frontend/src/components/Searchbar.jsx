import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const SearchBar = ({
  products,
  handleOnSearch,
  productNames,
  handleOnHover,
  handleOnSelect,
  handleOnFocus,
  formatResult,
  productArray,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="w-96">
      <ReactSearchAutocomplete
        items={productArray}
        onSearch={handleOnSearch}
        // onHover={handleOnHover}
        onSelect={handleOnSelect}
        // onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        placeholder="Enter product name"
      />
    </div>
  );
};

export default SearchBar;
