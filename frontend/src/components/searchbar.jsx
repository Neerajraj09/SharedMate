import React from "react";


const SearchBar = ({ setSearchQuery }) => {
  // Handle input change and update searchQuery state in the parent component
  const handleChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query in the parent
  };

  return (
    <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden shadow-md pl-4 h-10 cursor-pointer w-20 sm:w-60 md:w-72 lg:w-96 xl:w-1/2">
      <input
        placeholder="Search"
        id="input"
        className="w-full h-full border-none outline-none text-sm caret-orange-600"
        name="text"
        type="text"
        onChange={handleChange} // Trigger state update on input change
      />
      <label className="cursor-text px-3" htmlFor="input">
        <svg className="w-4 h-4" viewBox="0 0 512 512">
          <path
            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            fill="rgb(114, 114, 114)"
          />
        </svg>
      </label>
    </div>
  );
};

export default SearchBar;
