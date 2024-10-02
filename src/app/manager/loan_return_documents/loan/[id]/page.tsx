"use client";
import BackButton from "@/components/common/backButton/BackButton";
import AppDatePicker from "@/components/common/datePicker/DatePicker";
import { customFormatDate } from "@/utils/date";
import formatCurrency from "@/utils/formatPrice";
import { notFound, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const data = {
  loan_return_documents_id: 1,
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
  punish: [{ id: 1, reason: "adsdasf adsmfa fasfs" }],
  create_at: new Date(),
  due_date: new Date(),
  return_date: new Date(),
  is_returned: true,
};
export default function page({ params }: { params: { id: string } }) {
  if (!params.id || isNaN(Number(params.id))) return notFound();
  const router = useRouter();
  const [loanVariantList, setLoanVariantList] = useState<
    { variantId: number; documentId: number; note: string; quantity: number }[]
  >([]);
  return (
    <>
      <BackButton />
      <hr className="my-3" />
      <div className="p-3 shadow ">
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">LoanRequest ID:</h1>
          <span className="w-1/2 ">{params.id}</span>
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày mượn:</h1>
          <span className="w-1/2">{customFormatDate(data.create_at)}</span>
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Kì hạn mượn:</h1>
          <select
            // value={}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          >
            <option value="3">3 tháng</option>
            <option value="6">6 tháng</option>
            <option value="12">1 năm</option>
            <option value="24">2 năm</option>
          </select>
        </div>
        <div className="mb-4 flex ">
          <h2 className="text-lg font-bold mb-4 w-1/2">Người hẹn mượn:</h2>
          <div className="flex flex-col w-1/2">
            <div className="flex ">
              <h1 className=" font-medium me-5">User ID: </h1>
              <span>{1}</span>
            </div>
            <div className="flex">
              <h1 className=" font-medium me-5">Họ tên:</h1>
              <span>{"Nguyen Van A"}</span>
            </div>
          </div>
        </div>

        <h1 className="text-lg  font-bold">Danh sách mượn yêu cầu mượn:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Document ID
              </th>
              <th scope="col" className="px-4 py-3">
                Tên sách
              </th>
              <th scope="col" className="px-2 py-3 ">
                Số lượng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-2 py-4">3</td>
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-2 py-4">{1}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-2 py-4">3</td>
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-2 py-4">{1}</td>
            </tr>
          </tbody>
        </table>
        <h1 className="text-lg  font-bold">Danh sách thực mượn:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3 w-1/12 text-center">
                Document ID
              </th>
              <th scope="col" className="px-2 py-3 w-4/12 text-center">
                Tên biến thể
              </th>
              <th scope="col" className="px-2 py-3 w-1/12">
                Số lượng
              </th>
              <th scope="col" className="px-2 py-3 w-5/12 text-center">
                Ghi chú
              </th>
              <th scope="col" className="px-2 py-3 w-1/12 text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {loanVariantList?.map((item, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <td className="px-2 py-4 w-1/12">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Docment ID"
                      value={item.documentId == -1 ? "" : item.documentId}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (isNaN(val)) return;
                        setLoanVariantList(
                          loanVariantList.map((it, ind) => {
                            if (ind == index)
                              return {
                                ...it,
                                documentId: e.target.value == "" ? -1 : val,
                              };
                            return it;
                          })
                        );
                      }}
                    />
                  </td>
                  <td className="px-2 py-4 w-4/12">
                    <select
                      value={item.variantId}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        setLoanVariantList(
                          loanVariantList.map((it, ind) => {
                            if (ind == index)
                              return {
                                ...it,
                                variantId: val,
                              };
                            return it;
                          })
                        );
                      }}
                    >
                      <option value="2">sách mới 80% -2023</option>
                      <option value="3">sách mới 90% -2023</option>
                      <option value="4">sách mới 100% -2024</option>
                    </select>
                  </td>
                  <td className="w-1/12">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Số lượng"
                      value={item.quantity}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (isNaN(val) || val < 1) return;
                        setLoanVariantList(
                          loanVariantList.map((it, ind) => {
                            if (ind == index)
                              return {
                                ...it,
                                quantity: e.target.value == "" ? 0 : val,
                              };
                            return it;
                          })
                        );
                      }}
                    />
                  </td>
                  <td className="w-5/12 px-2">
                    <textarea
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Ghi chú"
                      rows={2}
                      value={item.note}
                      onChange={(e) => {
                        setLoanVariantList(
                          loanVariantList.map((it, ind) => {
                            if (ind == index)
                              return {
                                ...it,
                                note: e.target.value.trim(),
                              };
                            return it;
                          })
                        );
                      }}
                    />
                  </td>
                  <td className="w-1/12">
                    <svg
                      width="28px"
                      height="28px"
                      viewBox="0 0 1024 1024"
                      fill="#f77e7e"
                      className="icon cursor-pointer mx-auto"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#f77e7e"
                      onClick={() =>
                        setLoanVariantList(
                          loanVariantList.filter((it, ind) => ind != index)
                        )
                      }
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
                          fill=""
                        />
                        <path
                          d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"
                          fill=""
                        />
                        <path d="M328 340.8l32-31.2 348 348-32 32z" fill="" />
                      </g>
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          onClick={() =>
            setLoanVariantList([
              ...loanVariantList,
              { documentId: -1, note: "", variantId: -1, quantity: 0 },
            ])
          }
          className="flex bg-white border-b w-full  p-2 dark:bg-gray-800 dark:border-gray-700 items-center "
        >
          <svg
            width="28px"
            height="28px"
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
              <circle
                opacity="0.5"
                cx={12}
                cy={12}
                r={10}
                stroke="#1C274C"
                strokeWidth="1.5"
              />
              <path
                d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </svg>

          <span>Thêm sách</span>
        </button>
        <button
          className={`
               p-3 text-sm font-medium text-white rounded bg-green-600 mx-auto block mt-3`}
        >
          Tiến hành cho muợn sách
        </button>
      </div>
    </>
  );
}
