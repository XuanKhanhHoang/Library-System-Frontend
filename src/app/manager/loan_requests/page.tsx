"use client";

import AppDatePicker from "@/components/datePicker/DatePicker";
import WarningModal from "@/components/modal/WarningModal";
import Pagination from "@/components/pagination/pagination";
import useDebounce from "@/hooks/useDebounce";
import { customFormatDate, isValidDate } from "@/utils/date";
import Link from "next/link";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
type loanRequestSearchParams = {
  page?: string;
  search_term?: string;
  min_date?: string;
  order_type?: "asc" | "desc";
  order_col?: "name" | "user_id";
  max_date?: string;
  search_col?: "name" | "loan_request_id" | "user_id";
  status?: "true" | "false";
};
export default function page({
  searchParams,
}: {
  searchParams: loanRequestSearchParams;
}) {
  const {
    order_col,
    order_type,
    page,
    search_term,
    max_date,
    min_date,
    search_col,
    status,
  } = searchParams;
  const searchPr = new URLSearchParams();

  if (page) {
    if (isNaN(Number(page))) return notFound();
  }
  if (search_term) {
    searchPr.append("searchTerm", search_term);
  }
  if (order_type) {
    if (order_type === "asc" || order_type === "desc")
      searchPr.append("order_type", order_type);
    else return notFound();
  }
  if (order_col) {
    if (order_col === "name" || order_col == "user_id")
      searchPr.append("order_col", order_col);
    else return notFound();
  }
  if (search_col) {
    if (
      search_col === "name" ||
      search_col === "loan_request_id" ||
      search_col == "user_id"
    ) {
      searchPr.append("search_col", search_col);
    } else return notFound();
  }
  if (min_date) {
    if (isValidDate(decodeURI(min_date))) {
      searchPr.append("min_date", min_date);
    } else return notFound();
  }
  if (max_date) {
    if (isValidDate(decodeURI(max_date))) {
      searchPr.append("max_date", max_date);
    } else return notFound();
  }
  if (status) {
    if (status != "false" && status != "true") return notFound();
    else searchPr.append("status", status);
  }

  const users = [
    {
      loan_request_id: 1,
      user_id: 1,
      name: "Nguyen Van a",
      document_list: [
        {
          document_id: 1,
          document_name: "Giáo trình tin học đại cương",
          quantity: 1,
        },
        {
          document_id: 2,
          document_name: "document2",
          quantity: 2,
        },
      ],
      create_at: new Date(),
      loan_expected_date: new Date(),
      status: {
        status_id: 1,
        status_name: "Chờ xác nhận",
      },
    },
    {
      loan_request_id: 2,
      user_id: 2,
      name: "Nguyen Van b",
      document_list: [
        {
          document_id: 1,
          document_name: "document3",
          quantity: 1,
        },
        {
          document_id: 2,
          document_name: "document4",
          quantity: 2,
        },
      ],
      create_at: new Date(),
      loan_expected_date: new Date(),
      status: {
        status_id: 1,
        status_name: "Chờ xác nhận",
      },
    },
  ];
  const router = useRouter();
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(search_term || "");
  const searchTermDebounce = useDebounce(searchTerm, 400);
  const [userChoosing, setUserChoosing] = useState<number[]>([]);
  const [userChoosingAll, setUserChoosingAll] = useState<boolean>(false);
  const [modalWarningOpen, setWarningOpen] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm != "") {
      searchPr.set("search_term", searchTerm);
    } else searchPr.delete("search_team");
    router.push(`/manager/loan_requests?${searchPr.toString()}`);
  }, [searchTermDebounce]);
  const sort = (col: string) => {
    if (order_type == undefined || order_type == "asc")
      searchPr.set("order_type", "desc");
    else searchPr.set("order_type", "asc");
    searchPr.set("order_col", col);
    router.push(`/manager/loan_requests?${searchPr.toString()}`);
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
            <button
              className={`${
                userChoosing.length == 0 && "hidden"
              } px-3 text-sm ms-6 font-medium text-white rounded bg-blue-600`}
              onClick={() => setWarningOpen(true)}
            >
              Xác nhận yêu cầu
            </button>
            <button
              className={`${
                userChoosing.length == 0 && "hidden"
              } px-3 text-sm ms-6 font-medium text-white rounded bg-red-600`}
              onClick={() => setWarningOpen(true)}
            >
              Hủy yêu cầu
            </button>
            <div
              className={`${
                !isFilterOpen && "hidden"
              } top-full px-6 py-4 border border-gray-200 bg-white rounded shadow-sm absolute w-52 mt-2`}
            >
              <div className="flex flex-col mt-2">
                <div className="my-2">
                  <h3 className="font-semibold mb-2">Ngày tạo từ </h3>

                  <AppDatePicker
                    onChange={(dat) => {
                      searchPr.set(
                        "min_date",
                        encodeURI(dat.toLocaleDateString())
                      );
                      router.push(
                        `/manager/loan_requests?${searchPr.toString()}`
                      );
                    }}
                    dateConfig={{
                      initDate: min_date
                        ? new Date(decodeURI(min_date))
                        : undefined,
                    }}
                    className="!w-full"
                  />
                </div>
                <div className="my-2">
                  <h3 className="font-semibold mb-2">Ngày tạo tới </h3>

                  <AppDatePicker
                    onChange={(dat) => {
                      searchPr.set(
                        "max_date",
                        encodeURI(dat.toLocaleDateString())
                      );
                      router.push(
                        `/manager/loan_requests?${searchPr.toString()}`
                      );
                    }}
                    dateConfig={{
                      initDate: max_date
                        ? new Date(decodeURI(max_date))
                        : undefined,
                    }}
                    className="!w-full"
                  />
                </div>
                <div className="my-2">
                  <h3 className="font-semibold mb-2">Trạng Thái</h3>

                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      searchPr.set("status", e.target.value);
                      router.push(
                        `/manager/loan_requests?${searchPr.toString()}`
                      );
                    }}
                    value={status || "false"}
                  >
                    <option value="false">Chờ xác nhận</option>
                    <option value="true">Đã xác nhận</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 me-2"
              value={search_col == undefined ? "name" : search_col}
              onChange={(e) => {
                if (e.target.value != "name")
                  searchPr.set("search_col", e.target.value);
                else searchPr.delete("search_col");
                router.push(`/manager/loan_requests?${searchPr.toString()}`);
              }}
            >
              <option value="name">Tên</option>
              <option value="user_id">User ID</option>
              <option value="loan_request_id">LoanRequest ID</option>
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
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={userChoosingAll}
                    onChange={(e) => {
                      setUserChoosingAll(!userChoosingAll);

                      if (e.target.checked)
                        setUserChoosing(
                          users?.map((item) => item.user_id) || []
                        );
                      else setUserChoosing([]);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
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
                  <span className="text-nowrap">Tên</span>
                  <button onClick={() => sort("name")}>
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
                Ngày tạo yêu cầu
              </th>
              <th scope="col" className="px-3 py-3">
                Thời gian nhận sách
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
            {users?.map((item) => {
              return (
                <tr
                  key={item.user_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        checked={
                          userChoosingAll ||
                          userChoosing.find((t) => t == item.user_id) !=
                            undefined
                        }
                        onChange={(e) => {
                          if (!e.target.checked) {
                            setUserChoosingAll(false);
                            setUserChoosing(
                              userChoosing.filter((i) => i != item.user_id)
                            );
                          } else {
                            if (userChoosing.length == users.length - 1) {
                              setUserChoosingAll(true);
                            }
                            setUserChoosing([...userChoosing, item.user_id]);
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className=" px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <span>{item.user_id}</span>
                  </td>

                  <td className="px-3 py-4">{item.name}</td>
                  <td className="px-3 py-4">
                    <div className="flex flex-col">
                      {
                        <span className="font-medium ">
                          {item.document_list[0].document_name}
                        </span>
                      }
                      {item.document_list.length > 1 && (
                        <>
                          <span className="font-bold border-t-[1px] pt-1">
                            Và {item.document_list.length - 1} tài liệu nữa
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <span>{customFormatDate(item.create_at)}</span>
                  </td>
                  <td className="px-3 py-4">
                    <span>{customFormatDate(item.loan_expected_date)}</span>
                  </td>
                  <td className="px-3 py-4">
                    <span>{item.status.status_name}</span>
                  </td>
                  <td className="px-2 py-4">
                    <Link
                      href={`/manager/loan_requests/${item.loan_request_id}`}
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
      {modalWarningOpen && (
        <WarningModal
          content="Bạn chắc muốn khóa những tài khoản này chứ!"
          handleAccept={() => setWarningOpen(false)}
          handleClose={() => setWarningOpen(false)}
          title="Khóa tài khoản"
        />
      )}
      <Pagination
        itemsPerPage={6}
        totalPage={10}
        rootDirection={`/manager/loan_requests?${searchPr.toString()}`}
        forcePage={page ? Number(page) : 1}
      />
    </>
  );
}
