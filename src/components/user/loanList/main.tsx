"use client";
import { customFormatDate } from "@/utils/date";
import React, { useEffect, useState } from "react";
import WarningModal from "@/components/common/modal/WarningModal";
import Pagination from "@/components/common/pagination/pagination";
import Link from "next/link";
import { LoanRequestWithStatusUserName } from "@/dtos/loan_request";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { toast } from "react-toastify";

export default function LoanRequests({
  access_token,
  data,
}: {
  access_token: string;
  data: {
    waiting?: LoanRequestWithStatusUserName[];
    newAccepted?: LoanRequestWithStatusUserName[];
    fullList?: {
      data: LoanRequestWithStatusUserName[];
      total_page: number;
    };
  };
}) {
  const [page, setPage] = useState<number>(1);
  const [requestChosen, setRequestChosen] = useState<number | undefined>();
  const [waitingRequest, setWaitingRequest] = useState<
    LoanRequestWithStatusUserName[] | undefined
  >(data?.waiting);
  const [fullRequest, setFullRequest] = useState<
    LoanRequestWithStatusUserName[] | undefined
  >(data?.fullList?.data);

  const [isLoading, setIsLoading] = useState(false);

  const handleRefuse = async () => {
    setIsLoading(true);
    try {
      let res = await fetch(GenerateBackendURL("loan-request/refuse"), {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          id: [requestChosen],
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        return toast.error("Có lỗi xảy ra");
      }
      toast.success("Từ chối thành công");
      setWaitingRequest(
        waitingRequest?.filter((item) => item.id_loan_request != requestChosen)
      );
      setRequestChosen(undefined);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Có lỗi xảy ra");
    }
  };
  return (
    <>
      <div className="relative  shadow-md sm:rounded-lg my-2">
        <h3 className=" text-xl py-2 font-semibold ">
          Danh sách lịch mượn chờ xác nhận:
        </h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Danh sách tài liệu mượn
              </th>
              <th scope="col" className="px-3 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">Ngày tạo yêu cầu</span>
                </div>
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
            {waitingRequest?.map((item) => {
              return (
                <tr
                  key={item.id_loan_request}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-3 py-4">
                    <div className="flex flex-col">
                      {
                        <span className="font-medium ">
                          {
                            item?.loan_request_list_documents[0]?.document
                              ?.document_name
                          }
                        </span>
                      }
                      {item.loan_request_list_documents.length > 1 && (
                        <>
                          <span className="font-bold border-t-[1px] pt-1">
                            Và {item.loan_request_list_documents.length - 1} tài
                            liệu nữa
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
                      {customFormatDate(new Date(item.expected_date), false)}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span>{item.status.name}</span>
                  </td>
                  <td className="px-2 py-4 flex flex-col">
                    <Link
                      href={`/loan_requests/${item.id_loan_request}`}
                      className="font-medium mt-2 rounded text-blue-600 text-sm hover:underline flex items-center p-2 border w-40"
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
                    <button
                      onClick={() => {
                        setRequestChosen(item.id_loan_request);
                      }}
                      className="font-medium mt-2 rounded text-blue-600 text-sm hover:underline flex items-center p-2 border w-fit"
                    >
                      <svg
                        fill="#000000"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
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
                          <defs>
                            {" "}
                            <style
                              dangerouslySetInnerHTML={{
                                __html: " .cls-1 { fill-rule: evenodd; } ",
                              }}
                            />{" "}
                          </defs>{" "}
                          <path
                            id="cancel"
                            className="cls-1"
                            d="M936,120a12,12,0,1,1,12-12A12,12,0,0,1,936,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,936,98Zm4.706,14.706a0.951,0.951,0,0,1-1.345,0l-3.376-3.376-3.376,3.376a0.949,0.949,0,1,1-1.341-1.342l3.376-3.376-3.376-3.376a0.949,0.949,0,1,1,1.341-1.342l3.376,3.376,3.376-3.376a0.949,0.949,0,1,1,1.342,1.342l-3.376,3.376,3.376,3.376A0.95,0.95,0,0,1,940.706,112.706Z"
                            transform="translate(-924 -96)"
                          />{" "}
                        </g>
                      </svg>
                      <span className="px-1">Hủy yêu cầu</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {waitingRequest ? (
          waitingRequest.length == 0 && (
            <p className="text-center bg-white p-5 rounded">
              Không có yêu cầu nào
            </p>
          )
        ) : (
          <p className="text-center bg-white p-5 rounded">Có lỗi xảy ra</p>
        )}
      </div>
      <div className="relative  shadow-md sm:rounded-lg my-2">
        <h3 className=" text-xl py-2 font-semibold">
          Danh sách lịch mượn đã chấp nhận gần đây
        </h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Danh sách tài liệu mượn
              </th>
              <th scope="col" className="px-3 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">Ngày tạo yêu cầu</span>
                </div>
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
            {data.newAccepted?.map((item) => {
              return (
                <tr
                  key={item.id_loan_request}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-3 py-4">
                    <div className="flex flex-col">
                      {
                        <span className="font-medium ">
                          {
                            item?.loan_request_list_documents[0]?.document
                              ?.document_name
                          }
                        </span>
                      }
                      {item.loan_request_list_documents.length > 1 && (
                        <>
                          <span className="font-bold border-t-[1px] pt-1">
                            Và {item.loan_request_list_documents.length - 1} tài
                            liệu nữa
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
                      {customFormatDate(new Date(item.expected_date), false)}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span>{item.status.name}</span>
                  </td>
                  <td className="px-2 py-4">
                    <Link
                      href={`loan_requests/${item.id_loan_request}`}
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
        {data.newAccepted ? (
          data.newAccepted.length == 0 && (
            <p className="text-center bg-white p-5 rounded">
              Không có yêu cầu nào
            </p>
          )
        ) : (
          <p className="text-center bg-white p-5 rounded">Có lỗi xảy ra</p>
        )}
      </div>
      <div className="relative  shadow-md sm:rounded-lg my-2">
        <h3 className=" text-xl py-2 font-semibold">
          Danh sách lịch mượn chờ xác nhận
        </h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                Danh sách tài liệu mượn
              </th>
              <th scope="col" className="px-3 py-3">
                <div className="flex items-center">
                  <span className="text-nowrap">Ngày tạo yêu cầu</span>
                </div>
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
            {fullRequest?.map((item) => {
              return (
                <tr
                  key={item.id_loan_request}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-3 py-4">
                    <div className="flex flex-col">
                      {
                        <span className="font-medium ">
                          {
                            item?.loan_request_list_documents[0]?.document
                              ?.document_name
                          }
                        </span>
                      }
                      {item.loan_request_list_documents.length > 1 && (
                        <>
                          <span className="font-bold border-t-[1px] pt-1">
                            Và {item.loan_request_list_documents.length - 1} tài
                            liệu nữa
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
                      {customFormatDate(new Date(item.expected_date), false)}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span>{item.status.name}</span>
                  </td>
                  <td className="px-2 py-4">
                    <Link
                      href={`loan_requests/${item.id_loan_request}`}
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
        {fullRequest ? (
          fullRequest.length == 0 && (
            <p className="text-center bg-white p-5 rounded">
              Không có yêu cầu nào
            </p>
          )
        ) : (
          <p className="text-center bg-white p-5 rounded">Có lỗi xảy ra</p>
        )}
        <Pagination
          rootDirection=""
          totalPage={data.fullList?.total_page || 1}
          forcePage={page}
          handlePageClick={() => {}}
          scrollTop={false}
        />
      </div>
      {requestChosen != undefined && (
        <WarningModal
          data={{
            content: "Bạn xác nhận từ chối yêu cầu này chứ",
            title: "Xác nhận từ chối",
          }}
          isLoading={isLoading}
          handleAccept={handleRefuse}
          handleClose={() => setRequestChosen(undefined)}
        />
      )}
    </>
  );
}
