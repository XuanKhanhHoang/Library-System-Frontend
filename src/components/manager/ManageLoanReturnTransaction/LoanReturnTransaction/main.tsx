import BackButton from "@/components/common/backButton/BackButton";
import { LoanReturnItemDetail } from "@/dtos/loan_return";
import { customFormatDate } from "@/utils/date";
import formatCurrency from "@/utils/formatPrice";
import { notFound, useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function LoanReturnTransactionDetail({
  data,
}: {
  data: LoanReturnItemDetail;
}) {
  return (
    <>
      <BackButton />
      <hr className="my-3" />
      <div className="p-3 shadow ">
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">ID:</h1>
          <span className="w-1/2 ">{data.id_loan_return}</span>
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày mượn:</h1>
          <span className="w-1/2">
            {customFormatDate(new Date(data.create_at))}
          </span>
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày hạn trả:</h1>
          <span className="w-1/2">
            {customFormatDate(new Date(data.due_date), false)}
          </span>
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Người cho mượn:</h1>
          <div className="flex flex-col w-1/2">
            <div className="flex">
              <h1 className=" font-medium me-5">Librarian ID: </h1>
              <span>{data.librian.id_user}</span>
            </div>
            <div className="flex">
              <h1 className=" font-medium me-5">Họ tên:</h1>
              <span>{data.librian.name}</span>
            </div>
          </div>
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Trạng thái:</h1>
          <span className="w-1/2">
            {data.return_date ? "Đã trả" : "Chưa trả"}
          </span>
        </div>
        {data.return_date && (
          <>
            <div className="flex mb-4 items-center">
              <h1 className="text-lg w-1/2 font-bold">Ngày trả:</h1>
              <span className="w-1/2">
                {customFormatDate(new Date(data.return_date))}
              </span>
            </div>
          </>
        )}
        <div className="mb-4 flex ">
          <h2 className="text-lg font-bold mb-4 w-1/2">Người mượn:</h2>
          <div className="flex flex-col w-1/2">
            <div className="flex ">
              <h1 className=" font-medium me-5">User ID: </h1>
              <span>{data.user.id_user}</span>
            </div>
            <div className="flex">
              <h1 className=" font-medium me-5">Họ tên:</h1>
              <span>{data.user.name}</span>
            </div>
          </div>
        </div>
        {data.id_punish && (
          <>
            <h1 className="text-lg  font-bold">Phạt:</h1>
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
                  <th scope="col" className="px-2 py-3">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-2 py-4">{data.punishment?.id_punish}</td>
                  <th
                    scope="row"
                    className="px-4 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <textarea
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      readOnly
                      defaultValue={data.punishment?.reason}
                    />
                  </th>
                  <td className="px-2 py-4">
                    {formatCurrency(data.punishment?.cost || 0)}
                  </td>
                  <td className="px-2 py-4">
                    {data.punishment?.is_handled
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        <h1 className="text-lg  font-bold">Danh sách mượn:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                ISBN
              </th>
              <th scope="col" className="px-4 py-3">
                Tên sách
              </th>
              <th scope="col" className="px-2 py-3">
                Số lượng
              </th>
              <th scope="col" className="px-2 py-3">
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody>
            {data.loan_list_document.map((item) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item.variant.isbn}
                >
                  <td className="px-2 py-4">{item.variant.isbn}</td>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.variant.document.document_name}
                  </th>
                  <td className="px-2 py-4">{item.quantity}</td>
                  <td className="px-2 py-4">{item.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
