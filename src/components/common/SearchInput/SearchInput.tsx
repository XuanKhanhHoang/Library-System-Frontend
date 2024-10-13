"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchInput({ rootDir }: { rootDir?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("keyword") || ""
  );

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let searchKey = searchTerm.trim();
    router.push(`${rootDir || "./"}${searchKey && "?keyword=" + searchKey}`);
  };
  return (
    <form
      className=" relative  shadow-md rounded-md h-9 mx-auto"
      onSubmit={(e) => handleSearch(e)}
    >
      <input
        className="border-0 text-sm font-normal rounded w-full p-2 h-full border-transparent focus:border-transparent focus:ring-0"
        type="text"
        placeholder="Bạn cần tìm gì?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className=" absolute  text-black text-xs right-0 w-12 h-full  hover:opacity-30 "
        type="submit"
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#000000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </g>
        </svg>
      </button>
    </form>
  );
}
