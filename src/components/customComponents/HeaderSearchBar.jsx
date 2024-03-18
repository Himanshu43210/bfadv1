import React from "react";
import { FaSearch } from "react-icons/fa";

export default function HeaderSearchBar({ component, isMobile }) {
  return (
    <>
      {!isMobile && (
        <div className="flex items-center px-4 rounded-lg border-2 border-[#006D77]">
          <input
            className="border-none outline-none text-[14px] w-[220px]"
            type="text"
            placeholder="Search Here...."
          />
          <FaSearch className="cursor-pointer" />
        </div>
      )}
    </>
  );
}
