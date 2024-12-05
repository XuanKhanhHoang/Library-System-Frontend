"use client";
import { customFormatDate } from "@/utils/date";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/common/pagination/pagination";
import Link from "next/link";
import { LoanReturnItem } from "@/dtos/loan_return";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { GenerateBackendURL } from "@/utils/backendUrl";

export default function LoanReturnTransactions({
  token,
  data,
}: {
  token: string;
  data: {
    needReturn?: LoanReturnItem[];
    fullList?: {
      data: LoanReturnItem[];
      total_page: number;
    };
  };
}) {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number | undefined>(
    data.fullList?.total_page
  );
  const [fullTransactions, setFullTransactions] = useState<
    LoanReturnItem[] | undefined
  >(data?.fullList?.data);

  const [isLoading, setIsLoading] = useState(false);
  useDidMountEffect(async () => {
    setIsLoading(true);
    try {
      let result = await fetch(
        GenerateBackendURL(
          "loan-return-transaction/get_user_list?page=" + page
        ),
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          cache: "no-store",
        }
      ).then(
        async (res) =>
          (await res.json()) as {
            data: LoanReturnItem[];
            total_page: number;
          }
      );
      setFullTransactions(result.data);
      setTotalPage(result.total_page);
      setIsLoading(false);
    } catch (e) {
      setFullTransactions(undefined);
      setTotalPage(undefined);
      setIsLoading(false);
      console.log(e);
    }
  }, [page]);
  return (
    <>
      <div className="relative  shadow-md sm:rounded-lg my-2">
        <h3 className=" text-xl py-2 font-semibold ">
          Danh sách luợt mượn sách chưa trả:
        </h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col " className="px-2 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">ID</span>
                  <button>
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
                  <button>
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
                  <button>
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
                  <button>
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
            {data.needReturn?.map((item) => {
              return (
                <tr
                  key={item.id_loan_return}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className=" px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <span>{item.id_loan_return}</span>
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
                      href={`./loan_return_transaction/${item.id_loan_return}`}
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
        {data.needReturn ? (
          data.needReturn.length == 0 && (
            <p className="text-center bg-white p-5 rounded">
              Không có yêu cầu nào
            </p>
          )
        ) : (
          <p className="text-center bg-white p-5 rounded">Có lỗi xảy ra</p>
        )}
      </div>
      <div className="relative  shadow-md sm:rounded-lg my-2">
        <h3 className=" text-xl py-2 font-semibold">Lịch sử mượn tài tiệu</h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col " className="px-2 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">ID</span>
                  <button>
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
                  <button>
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
                  <button>
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
                  <button>
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
            {!isLoading &&
              fullTransactions?.map((item) => {
                return (
                  <tr
                    key={item.id_loan_return}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className=" px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <span>{item.id_loan_return}</span>
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
                              Và {item.loan_list_document.length - 1} tài liệu
                              nữa
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
                        href={`./loan_return_transaction/${item.id_loan_return}`}
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
        {isLoading ? (
          <p className="text-center bg-white p-5 rounded">Loading ...</p>
        ) : fullTransactions ? (
          fullTransactions.length == 0 && (
            <p className="text-center bg-white p-5 rounded">
              Không có yêu cầu nào
            </p>
          )
        ) : (
          <p className="text-center bg-white p-5 rounded">Có lỗi xảy ra</p>
        )}
        <Pagination
          rootDirection=""
          totalPage={totalPage || 1}
          forcePage={page}
          handlePageClick={(e) => {
            setPage(e.selected + 1);
          }}
          scrollTop={false}
        />
      </div>
    </>
  );
}
