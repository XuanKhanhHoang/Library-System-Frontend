"use client";

import AppDatePicker from "@/components/common/datePicker/DatePicker";
import ClickOutside from "@/components/manager/ClickOutside";
import Pagination from "@/components/common/pagination/pagination";
import useDebounce from "@/hooks/useDebounce";
import { customFormatDate } from "@/utils/date";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LoanReturnItem } from "@/dtos/loan_return";
export type loanReturnSearchParams = {
  page?: string;
  search_term?: string;
  min_date?: string;
  order_type?: "asc" | "desc";
  order_col?: "user_name" | "user_id" | "create_at" | "due_date";
  max_date?: string;
  search_col?:
    | "document_name"
    | "user_id"
    | "librarian_id"
    | "reader_name"
    | "id";
  is_returned: string;
  is_punished?: string;
};
export default function ManageLoanReturnTransaction({
  access_token,
  searchParams,
  data,
  searchPr: sr,
}: {
  searchParams: loanReturnSearchParams;
  access_token: string;
  data?: {
    data: LoanReturnItem[];
    total_page: number;
  };
  searchPr: URLSearchParams;
}) {
  const {
    order_col,
    order_type,
    page,
    search_term,
    search_col,
    is_returned: status,
    is_punished,
  } = searchParams;
  const min_date = searchParams.min_date
    ? decodeURIComponent(searchParams.min_date)
    : undefined;
  const max_date = searchParams.max_date
    ? decodeURIComponent(searchParams.max_date)
    : undefined;

  const searchPr = new URLSearchParams(sr);
  const router = useRouter();
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(search_term || "");
  const searchTermDebounce = useDebounce(searchTerm, 400);
  const [minDate, setMinDate] = useState<string | undefined>(min_date);
  const [maxDate, setMaxDate] = useState<string | undefined>(min_date);

  const minDateDebounce = useDebounce(minDate, 2000);
  const maxDateDebounce = useDebounce(maxDate, 2000);
  useEffect(() => {
    if (searchTerm != "") {
      searchPr.set("search_term", searchTerm);
    } else searchPr.delete("search_term");
    router.push(`/manager/loan_return_documents?${searchPr.toString()}`);
  }, [searchTermDebounce]);
  useEffect(() => {
    if (!minDate) return;
    searchPr.set("min_date", minDate);
    router.push(`/manager/loan_return_documents?${searchPr.toString()}`);
  }, [minDateDebounce]);
  useEffect(() => {
    if (!maxDate) return;
    searchPr.set("max_date", maxDate);
    router.push(`/manager/loan_return_documents?${searchPr.toString()}`);
  }, [maxDateDebounce]);
  const sort = (col: string) => {
    if (order_type == undefined || order_type == "asc")
      searchPr.set("order_type", "desc");
    else searchPr.set("order_type", "asc");
    searchPr.set("order_col", col);
    router.push(`/manager/loan_return_documents?${searchPr.toString()}`);
  };
  return (
    <>
      <div className="relative  shadow-md sm:rounded-lg">
        <div className="flex  justify-between items-start space-y-4 md:space-y-0 pb-4 bg-white">
          <div className="relative flex">
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setFilterOpen(!isFilterOpen)}
            >
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#0a1415"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M4 8V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V8M4 8H20M4 8L9.28632 14.728C9.42475 14.9042 9.5 15.1218 9.5 15.3459V18.4612C9.5 19.1849 10.2449 19.669 10.9061 19.375L13.4061 18.2639C13.7673 18.1034 14 17.7453 14 17.3501V15.3699C14 15.1312 14.0854 14.9004 14.2407 14.7191L20 8"
                    stroke="#1fb4ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>{" "}
                </g>
              </svg>
              <span>Lọc</span>
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isFilterOpen && (
              <ClickOutside
                onClick={() => setFilterOpen(false)}
                className="top-full px-6 py-4 border border-gray-200 bg-white rounded shadow-sm absolute w-52 mt-2"
              >
                <div className="flex flex-col mt-2">
                  <div className="my-2">
                    <h3 className="font-semibold mb-2">Ngày nhận từ </h3>
                    <AppDatePicker
                      onChange={(dat) => {
                        if (!dat) return;
                        setMinDate(
                          encodeURIComponent(dat.toLocaleDateString())
                        );
                      }}
                      dateConfig={{
                        initDate: min_date ? new Date(min_date) : undefined,
                        selected: min_date
                          ? new Date(min_date)
                          : new Date("1/1/1960"),
                      }}
                      className="!w-full"
                    />
                  </div>
                  <div className="my-2">
                    <h3 className="font-semibold mb-2">Ngày nhận tới </h3>

                    <AppDatePicker
                      onChange={(dat) => {
                        if (!dat) return;
                        setMaxDate(
                          encodeURIComponent(dat.toLocaleDateString())
                        );
                      }}
                      dateConfig={{
                        initDate: max_date ? new Date(max_date) : undefined,
                        minDate: min_date
                          ? new Date(min_date)
                          : new Date("1/1/1960"),
                        selected: max_date ? new Date(max_date) : new Date(),
                      }}
                      className="!w-full"
                    />
                  </div>
                  <hr />
                  <div className="my-2">
                    <h3 className="font-semibold mb-2">Trạng Thái</h3>

                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        if (e.target.value == "")
                          searchPr.delete("is_returned");
                        else searchPr.set("is_returned", e.target.value);
                        router.push(
                          `/manager/loan_return_documents?${searchPr.toString()}`
                        );
                      }}
                      value={status || ""}
                    >
                      <option value="">Không chọn</option>
                      <option value="false">Chưa trả</option>
                      <option value="true">Đã trả</option>
                    </select>
                  </div>
                  <hr />
                  <div className="my-2">
                    <h3 className="font-semibold mb-2">Phí phạt</h3>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        if (e.target.value == "")
                          searchPr.delete("is_punished");
                        else searchPr.set("is_punished", e.target.value);
                        router.push(
                          `/manager/loan_return_documents?${searchPr.toString()}`
                        );
                      }}
                      value={is_punished || ""}
                    >
                      <option value="">Không chọn </option>
                      <option value="true">Có </option>
                      <option value="false">Không</option>
                    </select>
                  </div>
                </div>
              </ClickOutside>
            )}
          </div>
          <div className="flex items-center">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 me-2"
              value={search_col == undefined ? "name" : search_col}
              onChange={(e) => {
                if (e.target.value != "reader_name")
                  searchPr.set("search_col", e.target.value);
                else searchPr.delete("search_col");
                router.push(
                  `/manager/loan_return_documents?${searchPr.toString()}`
                );
              }}
            >
              <option value="reader_name">Tên Người Mượn</option>
              <option value="user_id">User ID</option>
              <option value="librarian_id">Librarian ID</option>
              <option value="id">{"Mã Giao dịch (ID)"}</option>
              <option value="document_name">Tên tài liệu</option>
            </select>
            <div className="flex">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
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
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập để tìm kiếm"
                />
              </div>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col " className="px-2 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">ID</span>
                  <button onClick={() => sort("id")}>
                    <svg
                      className="w-6 h-6 text-gray-800 p-1 cursor-pointer"
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
                        d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
                      />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col " className="px-2 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">User ID</span>
                  <button onClick={() => sort("user_id")}>
                    <svg
                      className="w-6 h-6 text-gray-800 p-1 cursor-pointer"
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
                        d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
                      />
                    </svg>
                  </button>
                </div>
              </th>

              <th scope="col" className="px-3 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">Người mượn</span>
                  <button onClick={() => sort("user_name")}>
                    <svg
                      className="w-6 h-6 text-gray-800 p-1 cursor-pointer"
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
                        d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
                      />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="px-3 py-3">
                Danh sách tài liệu mượn
              </th>
              <th scope="col" className="px-3 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">Ngày nhận sách</span>
                  <button onClick={() => sort("create_at")}>
                    <svg
                      className="w-6 h-6 text-gray-800 p-1 cursor-pointer"
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
                        d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
                      />
                    </svg>
                  </button>
                </div>
              </th>
              <th scope="col" className="px-3 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">Ngày hạn trả</span>
                  <button onClick={() => sort("due_date")}>
                    <svg
                      className="w-6 h-6 text-gray-800 p-1 cursor-pointer"
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
                        d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
                      />
                    </svg>
                  </button>
                </div>
              </th>

              <th scope="col" className="px-3 py-3">
                Trạng Thái
              </th>
              <th scope="col" className="px-3 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item) => {
              return (
                <tr
                  key={item.id_loan_return}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className=" px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <span>{item.id_loan_return}</span>
                  </td>
                  <td className=" px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <span>{item.id_reader}</span>
                  </td>

                  <td className="px-3 py-4">{item.user.name}</td>
                  <td className="px-3 py-4">
                    <div className="flex flex-col">
                      {
                        <span className="font-medium ">
                          {
                            item?.loan_list_document[0]?.variant.document
                              .document_name
                          }
                        </span>
                      }
                      {item.loan_list_document.length > 1 && (
                        <>
                          <span className="font-bold border-t-[1px] pt-1">
                            Và {item.loan_list_document.length - 1} tài liệu nữa
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <span>{customFormatDate(new Date(item.create_at))}</span>
                  </td>
                  <td className="px-3 py-4">
                    <span>
                      {customFormatDate(new Date(item.due_date), false)}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span>
                      {item.return_date != undefined ? "Đã trả" : "Chờ trả"}
                    </span>
                  </td>
                  <td className="px-2 py-4">
                    <Link
                      href={`/manager/loan_return_documents/${item.id_loan_return}`}
                      className="font-medium text-blue-600 text-sm hover:underline flex items-center"
                    >
                      <svg
                        fill="#000000"
                        width="18px"
                        height="18px"
                        viewBox="0 0 64 64"
                        id="Layer_1_1_"
                        version="1.1"
                        xmlSpace="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          <g>
                            <path d="M36,21c0-2.206-1.794-4-4-4s-4,1.794-4,4s1.794,4,4,4S36,23.206,36,21z M30,21c0-1.103,0.897-2,2-2s2,0.897,2,2 s-0.897,2-2,2S30,22.103,30,21z" />{" "}
                            <path d="M27,41v6h10v-6h-2V27h-8v6h2v8H27z M29,31v-2h4v14h2v2h-6v-2h2V31H29z" />{" "}
                            <path d="M32,1C14.907,1,1,14.907,1,32s13.907,31,31,31s31-13.907,31-31S49.093,1,32,1z M32,61C16.009,61,3,47.991,3,32 S16.009,3,32,3s29,13.009,29,29S47.991,61,32,61z" />{" "}
                            <path d="M32,7c-5.236,0-10.254,1.607-14.512,4.649l1.162,1.628C22.567,10.479,27.184,9,32,9c12.682,0,23,10.318,23,23 c0,4.816-1.479,9.433-4.277,13.35l1.628,1.162C55.393,42.254,57,37.236,57,32C57,18.215,45.785,7,32,7z" />{" "}
                            <path d="M32,55C19.318,55,9,44.682,9,32c0-4.817,1.479-9.433,4.277-13.35l-1.627-1.162C8.608,21.746,7,26.764,7,32 c0,13.785,11.215,25,25,25c5.236,0,10.254-1.607,14.512-4.649l-1.162-1.628C41.433,53.521,36.816,55,32,55z" />{" "}
                          </g>{" "}
                        </g>
                      </svg>

                      <span className="px-1">Chi tiết</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPage={data?.total_page || 1}
        rootDirection={`/manager/loan_return_documents?${searchPr.toString()}`}
        forcePage={page ? Number(page) : 1}
      />
    </>
  );
}
