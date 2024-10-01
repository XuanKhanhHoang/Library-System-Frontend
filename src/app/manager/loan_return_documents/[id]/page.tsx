"use client";
import { customFormatDate } from "@/utils/date";
import formatCurrency from "@/utils/formatPrice";
import { notFound, useRouter } from "next/navigation";
import React, { useCallback } from "react";

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
  const onBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <button
        className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded text-sm"
        onClick={() => onBack()}
      >
        Quay lại
      </button>
      <hr className="my-3" />
      <div className="p-3 shadow ">
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">ID:</h1>
          <span className="w-1/2 ">{1}</span>
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày mượn:</h1>
          <span className="w-1/2">{customFormatDate(data.create_at)}</span>
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày hạn trả:</h1>
          <span className="w-1/2">{customFormatDate(data.return_date)}</span>
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Trạng thái:</h1>
          <span className="w-1/2">
            {data.is_returned ? "Đã trả" : "Chưa trả"}
          </span>
        </div>
        {data.is_returned && data.return_date && (
          <>
            <div className="flex mb-4 items-center">
              <h1 className="text-lg w-1/2 font-bold">Ngày trả:</h1>
              <span className="w-1/2">
                {customFormatDate(data.return_date)}
              </span>
            </div>
            <div className="flex mb-4 items-center">
              <h1 className="text-lg w-1/2 font-bold">Người nhận trả:</h1>
              <div className="flex flex-col w-1/2">
                <div className="flex">
                  <h1 className=" font-medium me-5">Librarian ID: </h1>
                  <span>{1}</span>
                </div>
                <div className="flex">
                  <h1 className=" font-medium me-5">Họ tên:</h1>
                  <span>{"Nguyen Van A"}</span>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="mb-4 flex ">
          <h2 className="text-lg font-bold mb-4 w-1/2">Người mượn:</h2>
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
        <div className="mb-4 flex ">
          <h2 className="text-lg font-bold mb-4 w-1/2">Người cho mượn:</h2>
          <div className="flex flex-col w-1/2">
            <div className="flex">
              <h1 className=" font-medium me-5">Librarian ID: </h1>
              <span>{1}</span>
            </div>
            <div className="flex">
              <h1 className=" font-medium me-5">Họ tên:</h1>
              <span>{"Nguyen Van A"}</span>
            </div>
          </div>
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Tổng tiền phạt:</h1>
          <span className="w-1/2">{formatCurrency(0)}</span>
        </div>
        <h1 className="text-lg  font-bold">Danh sách lí do phạt:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Punish ID
              </th>
              <th scope="col" className="px-4 py-3">
                Lí do
              </th>
              <th scope="col" className="px-2 py-3">
                Số tiền
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
              <td className="px-2 py-4">{formatCurrency(1000000)}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-2 py-4">3</td>
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-2 py-4">{formatCurrency(1000000)}</td>
            </tr>
          </tbody>
        </table>
        <h1 className="text-lg  font-bold">Danh sách mượn:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Variant ID
              </th>
              <th scope="col" className="px-4 py-3">
                Tên sách
              </th>
              <th scope="col" className="px-2 py-3">
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
              <td className="px-2 py-4">{formatCurrency(1000000)}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-2 py-4">3</td>
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-2 py-4">{formatCurrency(1000000)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
