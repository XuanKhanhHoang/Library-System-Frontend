"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
export default function Pagination({
  handlePageClick,
  totalPage,
  rootDirection = "/",
  forcePage = 1,
  scrollTop = true,
}: {
  handlePageClick?: (event: { selected: number } & any) => void;
  totalPage: number;
  rootDirection: string;
  forcePage?: number;
  scrollTop?: boolean;
}) {
  const router = useRouter();
  if (handlePageClick == undefined)
    handlePageClick = (event: any) => {
      router.push(
        rootDirection +
          (rootDirection.includes("?") ? "&" : "?") +
          "page=" +
          (event.selected + 1),
        { scroll: scrollTop }
      );
    };

  return (
    <ReactPaginate
      breakLabel={<span className="mr-4">...</span>}
      nextLabel={
        <div className="text-nowrap">
          <svg
            className="w-[21px] h-[21px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </div>
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={totalPage}
      previousLabel={
        <div className="text-nowrap">
          <svg
            className="w-[21px] h-[21px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m15 19-7-7 7-7"
            />
          </svg>
        </div>
      }
      forcePage={forcePage - 1}
      containerClassName="flex items-center justify-center mt-4 mb-4 bg-white p-2 rounded font-medium"
      previousClassName="p-1 me-1 md:p-2 md:me-2"
      nextClassName="p1 md:p-2 md:ms-1"
      pageClassName=" hover:bg-[#fafafa] hover:border hover:border-gray-300 w-7 h-7 md:w-10 md:h-10  flex items-center justify-center rounded-md mr-4 text-main"
      activeClassName="!border !border-[#ccc] !bg-[#f1efef]"
    />
  );
}
