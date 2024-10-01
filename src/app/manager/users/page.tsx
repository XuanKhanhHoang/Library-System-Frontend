"use client";

import ClickOutside from "@/components/manager/ClickOutside";
import WarningModal from "@/components/modal/WarningModal";
import Pagination from "@/components/pagination/pagination";
import useDebounce from "@/hooks/useDebounce";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
type userSearchParams = {
  page?: string;
  search_term?: string;
  is_valid?: string;
  order_type?: "asc" | "desc";
  order_col?: "name" | "user_id";
  gender?: "true" | "false";
  search_col?: "name" | "phone_number" | "user_id";
};
export default function page({
  searchParams,
}: {
  searchParams: userSearchParams;
}) {
  const {
    is_valid: isValid,
    order_col,
    order_type,
    page,
    search_term,
    gender,
    search_col,
  } = searchParams;
  const searchPr = new URLSearchParams();

  if (page && isNaN(Number(page))) return notFound();
  if (search_term) {
    searchPr.append("searchTerm", search_term);
  }
  if (isValid) {
    if (isValid === "true" || isValid === "false")
      searchPr.append("is_valid", isValid);
    else return notFound();
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
  if (gender) {
    if (gender === "true" || gender === "false")
      searchPr.append("gender", gender);
    else return notFound();
  }
  if (search_col) {
    if (
      search_col === "name" ||
      search_col === "phone_number" ||
      search_col == "user_id"
    ) {
      searchPr.append("search_col", search_col);
    } else return notFound();
  }
  const users = [
    {
      user_id: 1,
      avatar: "/utcLogo.png",
      name: "Nguyen Van A",
      gender: true,
      phone_number: "0123456789",
      is_valid: true,
    },
    {
      user_id: 2,
      avatar: "/utcLogo.png",
      name: "Nguyen Van B",
      gender: true,
      phone_number: "0123456799",
      is_valid: true,
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
    router.push(`/manager/users?${searchPr.toString()}`);
  }, [searchTermDebounce]);
  const sort = (col: string) => {
    if (order_type == undefined || order_type == "asc")
      searchPr.set("order_type", "desc");
    else searchPr.set("order_type", "asc");
    searchPr.set("order_col", col);
    router.push(`/manager/users?${searchPr.toString()}`);
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
              Khóa tài khoản
            </button>
            <div
              className={`${
                !isFilterOpen && "hidden"
              } top-full px-6 py-4 border border-gray-200 bg-white rounded shadow-sm absolute w-52 mt-2`}
            >
              <div className="flex flex-col mt-2">
                <div className="my-2">
                  <h3 className="font-semibold mb-2">Giới tính </h3>

                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      if (e.target.value != "undefine")
                        searchPr.set("gender", e.target.value);
                      else searchPr.delete("gender");
                      router.push(`/manager/users?${searchPr.toString()}`);
                    }}
                    value={
                      !gender ? "undefine" : gender == "true" ? "true" : "false"
                    }
                  >
                    <option value="undefine">Không chọn</option>
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </div>
                <div className="my-2">
                  <h3 className="font-semibold mb-2">Trạng Thái</h3>

                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      if (e.target.value != "undefine")
                        searchPr.set("is_valid", e.target.value);
                      else searchPr.delete("is_valid");
                      router.push(`/manager/users?${searchPr.toString()}`);
                    }}
                    value={
                      !isValid
                        ? "undefine"
                        : isValid == "true"
                        ? "true"
                        : "false"
                    }
                  >
                    <option value="undefine">Không chọn</option>
                    <option value="true">Đã khóa</option>
                    <option value="false">Hoạt động</option>
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
                router.push(`/manager/users?${searchPr.toString()}`);
              }}
            >
              <option value="name">Tên</option>
              <option value="user_id">User ID</option>
              <option value="phone_number">Số điện thoại</option>
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
                Avatar
              </th>
              <th scope="col" className="px-6 py-3">
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
              <th scope="col" className="px-2 py-3">
                Giới Tính
              </th>
              <th scope="col" className="px-6 py-3">
                Số Điện Thoại
              </th>
              <th scope="col" className="px-3 py-3">
                Trạng Thái
              </th>
              <th scope="col" className="px-6 py-3">
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
                  <td className=" px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="/utcLogo.png"
                    />
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-2 py-4">
                    <span>{item.gender ? "Nam" : "Nữ"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span>{item.phone_number}</span>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />{" "}
                      Online
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 text-sm hover:underline flex items-center"
                    >
                      <svg
                        className="w-[16px] h-[16px] text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="px-1">Sửa</span>
                    </a>
                    <a
                      href="#"
                      className="font-medium text-blue-600 text-sm hover:underline flex items-center"
                    >
                      <svg
                        width="16px"
                        height="16px"
                        viewBox="0 -0.5 21 21"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <title>delete [#1487]</title>{" "}
                          <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                          <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            {" "}
                            <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-179.000000, -360.000000)"
                              fill="#000000"
                            >
                              {" "}
                              <g
                                id="icons"
                                transform="translate(56.000000, 160.000000)"
                              >
                                {" "}
                                <path
                                  d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                                  id="delete-[#1487]"
                                >
                                  {" "}
                                </path>{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                      <span className="px-1">Xóa</span>
                    </a>
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
        rootDirection={`/manager/users?${searchPr.toString()}`}
        forcePage={page ? Number(page) : 1}
      />
    </>
  );
}
