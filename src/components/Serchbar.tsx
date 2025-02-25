

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  
    const trimmedQuery = query.trim();
  
    if (trimmedQuery) {
      let encodedQuery = trimmedQuery;
  
      if (trimmedQuery.includes("#")) {
        console.log("Query contains #, encoding it for URL.");

        encodedQuery = encodeURIComponent(trimmedQuery);
      }
  
      
      router.push(`/search/${encodedQuery}`);
    } else {
      console.log("Query is empty, handle the empty case if necessary.");
    }
  };
  
  return (
    <form onSubmit={handleOnSubmit} className="max-w-md mx-auto w-[100%]">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={handleChange}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-[#1F1F1F] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-x-gray-500"
          placeholder="Search creators discover with hashtag..."
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-[#E4BEAD] hover:bg-[#e4bead99] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#E4BEAD] dark:hover:bg-[#e4beada2] dark:focus:ring-gray-700"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Searchbar;

