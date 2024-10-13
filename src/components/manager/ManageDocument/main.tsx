"use client";

import ClickOutside from "@/components/manager/ClickOutside";
import WarningModal from "@/components/common/modal/WarningModal";
import Pagination from "@/components/common/pagination/pagination";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  documentsSearchParams,
  GetDocumentsResponse,
} from "@/app/manager/documents/page";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { toast } from "react-toastify";

export default function ManageDocuments({
  access_token,
  searchParams,
  data,
  searchPr: sr,
}: {
  searchParams: documentsSearchParams;
  access_token: string;
  data?: GetDocumentsResponse;
  searchPr: URLSearchParams;
}) {
  const { search_col, order_col, order_type, page, search_term } = searchParams;
  const searchPr = new URLSearchParams(sr);
  const router = useRouter();
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(search_term || "");
  const searchTermDebounce = useDebounce(searchTerm, 400);
  const [bookChoosing, setBookChoosing] = useState<number[]>([]);
  const [bookChoosingAll, setBookChoosingAll] = useState<boolean>(false);
  const [modalWarningOpen, setWarningOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const documents = data?.data;
  useEffect(() => {
    if (searchTerm != "") {
      searchPr.set("search_term", searchTerm);
    } else searchPr.delete("search_term");
    router.push(`/manager/documents?${searchPr.toString()}`);
  }, [searchTermDebounce]);
  const sort = (col: string) => {
    if (order_type == undefined || order_type == "asc")
      searchPr.set("order_type", "desc");
    else searchPr.set("order_type", "asc");
    searchPr.set("order_col", col);
    router.push(`/manager/documents?${searchPr.toString()}`);
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      let res = await fetch(
        GenerateBackendURL(
          "document/delete_documents?" +
            bookChoosing.map((item) => `id=${item}&`).join("")
        ),
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + access_token,
          },
          cache: "no-store",
        }
      );
      if (!res.ok) {
        setIsLoading(false);
        return toast.error("Có lỗi xảy ra");
      }
      toast.success("Xóa thành công");
      router.refresh();
      setWarningOpen(false);
      setIsLoading(false);
      setBookChoosing([]);
      setBookChoosingAll(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Có lỗi xảy ra");
    }
  };
  return (
    <>
      <div className="relative  shadow-md sm:rounded-lg">
        <div className="flex  justify-between items-start space-y-4 md:space-y-0 pb-4 bg-white">
          {bookChoosing.length != 0 && (
            <button
              className={`px-3 text-sm  py-1.5 font-medium text-white rounded block bg-blue-600 `}
              onClick={() => setWarningOpen(true)}
            >
              Xóa tài liệu
            </button>
          )}

          <div className="flex items-center ms-auto">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 me-2"
              value={!search_col ? "document_name" : search_col}
              onChange={(e) => {
                if (e.target.value != "document_name")
                  searchPr.set("search_col", e.target.value);
                else searchPr.delete("search_col");
                router.push(`/manager/documents?${searchPr.toString()}`);
              }}
            >
              <option value="document_name">Tên sách</option>
              <option value="document_id">DocumentID</option>
              <option value="publisher">Nhà xuất bản</option>
              <option value="category">Thể loại</option>
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
                  id="table-search-documents"
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
                    checked={bookChoosingAll}
                    onChange={(e) => {
                      setBookChoosingAll(!bookChoosingAll);

                      if (e.target.checked)
                        setBookChoosing(
                          documents?.map((item) => item.document_id) || []
                        );
                      else setBookChoosing([]);
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
                  <span className="text-nowrap">STT</span>
                </div>
              </th>
              <th scope="col " className="px-2 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">document_id</span>
                </div>
              </th>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">Tên Sách</span>
                  <button onClick={() => sort("document_name")}>
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
                Nhà Xuất Bản
              </th>
              <th scope="col" className="px-2 py-3">
                Thể Loại
              </th>
              <th scope="col" className="px-2 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {documents?.map((item, index) => {
              return (
                <tr
                  key={item.document_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        checked={
                          bookChoosingAll ||
                          bookChoosing.find((t) => t == item.document_id) !=
                            undefined
                        }
                        onChange={(e) => {
                          if (!e.target.checked) {
                            setBookChoosingAll(false);
                            setBookChoosing(
                              bookChoosing.filter((i) => i != item.document_id)
                            );
                          } else {
                            if (bookChoosing.length == documents.length - 1) {
                              setBookChoosingAll(true);
                            }
                            setBookChoosing([
                              ...bookChoosing,
                              item.document_id,
                            ]);
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
                    <span>{index + 1}</span>
                  </td>
                  <td className=" px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <span>{item.document_id}</span>
                  </td>
                  <td className="px-6 py-4">{item.document_name}</td>
                  <td className="px-2 py-4">
                    <span>{item.publisher.publisher_name}</span>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-col">
                      {item.document_ref_category?.map((itm, inx) => {
                        return (
                          <span
                            className="text-center rounded-sm border border-gray-400 mb-1"
                            key={itm.category_id}
                          >
                            {itm.category.category_name}
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`./documents/${item.document_id}`}
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
                    <Link
                      href={`./documents/update_document/${item.document_id}`}
                      className="font-medium my-1 text-blue-600 text-sm hover:underline flex items-center"
                    >
                      <svg
                        width="18px"
                        height="18px"
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
                            d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </g>
                      </svg>

                      <span className="px-1">Cập nhật</span>
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
          data={{
            content: "Bạn chắc muốn xóa những tài liệu này chứ này chứ!",
            title: "Xóa tài liệu",
          }}
          isLoading={isLoading}
          handleAccept={handleDelete}
          handleClose={() => setWarningOpen(false)}
        />
      )}
      <Pagination
        itemsPerPage={6}
        totalPage={data?.total_page || 1}
        rootDirection={`/manager/documents?${searchPr.toString()}`}
        forcePage={page ? Number(page) : 1}
      />
    </>
  );
}
