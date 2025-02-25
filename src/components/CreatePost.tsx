

"use client";
  
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {PenBox} from "lucide-react"

const CreatePost = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    const fetchBanStatus = async () => {
      try {
        const response = await fetch('/api/admin/bannedactive'); // Replace with your API endpoint
        const data = await response.json();
        console.log("3456789: ", data);
        setIsBanned(data.ban_active === 1? true: false); // Assuming the response has a ban_active field
      } catch (error) {
        console.error("Error fetching ban status:", error);
      }
    };

    fetchBanStatus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  
    const trimmedQuery = query.trim();
  
    if (trimmedQuery) {
      let encodedQuery = trimmedQuery;
  
   
  
      

      router.push(`/secret-dashboard/?title=${encodedQuery}`);
    } else {
      console.log("Query is empty, handle the empty case if necessary.");
    }
  };
  
  return (
    <form onSubmit={handleOnSubmit} className=" max-w-[95%] mx-auto w-[100%] mt-3 ">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Post
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <PenBox className="h-6 w-6 stroke-[#515151]"/>
        </div>
        <input
          onChange={handleChange}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-gray-500  dark:bg-[#1F1F1F]  dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 "
          placeholder="Whats on your mind..."
          required
        />
        <button
          type="submit"
          //className="text-white absolute end-2.5 bottom-2.5 bg-[#E4BEAD] hover:bg-[#e4bead99] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#E4BEAD] dark:hover:bg-[#e4beada2] dark:focus:ring-gray-700"
          className={`text-white absolute end-2.5 bottom-2.5 bg-[#E4BEAD] hover:bg-[#e4bead99] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#E4BEAD] dark:hover:bg-[#e4beada2] dark:focus:ring-gray-700 ${isBanned ? 'opacity-50 cursor-not-allowed' : ''}`}
          // disabled>
          >
          Post
        </button>
      </div>
    </form>
  );
};

export default CreatePost;

