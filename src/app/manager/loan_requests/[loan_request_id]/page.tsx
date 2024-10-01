import { customFormatDate } from "@/utils/date";
import React from "react";

export default function page({
  params,
}: {
  params: { loan_request_id: string };
}) {
  return (
    <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
      <div className="flex mb-3 items-center">
        <h1 className="text-lg w-1/2 font-bold">LoanRequest ID:</h1>
        <span className="w-1/2 ">{1}</span>
      </div>
      <div className="flex mb-3 items-center">
        <h1 className="text-lg w-1/2 font-bold">Ngày tạo:</h1>
        <span className="w-1/2">{customFormatDate(new Date())}</span>
      </div>
      <div className="flex mb-3 items-center">
        <h1 className="text-lg w-1/2 font-bold">Trạng thái:</h1>
        <span className="w-1/2">{"Chưa xác nhận"}</span>
      </div>
      <div className="mb-4 flex ">
        <h2 className="text-lg font-bold mb-4 w-1/2">Người tạo:</h2>
        <div className="flex flex-col w-1/2">
          <div className="flex justify-between">
            <h1 className=" font-medium">User ID: </h1>
            <span>{1}</span>
          </div>
          <div className="flex justify-between">
            <h1 className=" font-medium">Chức danh:</h1>
            <span>{"Sinh Vien"}</span>
          </div>
          <div className="flex justify-between">
            <h1 className=" font-medium">Họ tên:</h1>
            <span>{"Nguyen Van A"}</span>
          </div>
        </div>
      </div>
      <div className="flex mb-4 items-center">
        <h1 className="text-lg w-1/2 font-bold">Ngày nhận:</h1>
        <span className="w-1/2">{customFormatDate(new Date())}</span>
      </div>
      <h1 className="text-lg  font-bold">Danh sách mượn:</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Tên tài liệu
            </th>
            <th scope="col" className="px-2 py-3">
              Số lượng
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-2 py-4">3</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-2 py-4">3</td>
          </tr>
        </tbody>
      </table>

      <div className="flex my-4 justify-center">
        <button
          className={`p-3 text-sm ms-6 font-medium text-white rounded bg-blue-600`}
        >
          Xác nhận yêu cầu
        </button>
        <button
          className={` p-3 text-sm ms-6 font-medium text-white rounded bg-red-600`}
        >
          Hủy yêu cầu
        </button>
      </div>
    </div>
  );
}
