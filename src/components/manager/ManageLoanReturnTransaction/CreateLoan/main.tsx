"use client";
import BackButton from "@/components/common/backButton/BackButton";
import { LoanRequestWithVariants } from "@/dtos/loan_request";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { customFormatDate } from "@/utils/date";
import formatCurrency from "@/utils/formatPrice";
import { notFound, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
export default function CreateLoan({
  data,
  token,
}: {
  data: LoanRequestWithVariants;
  token: string;
}) {
  const router = useRouter();
  const [loanTimeTerm, setLoanTimeTerm] = useState<string>("3");
  const [variants, setVariants] = useState<
    { isbn: string; quantity: number; note: string }[]
  >(
    data.loan_request_list_documents.map((item) => ({
      isbn: item.document?.variants[0].isbn || "",
      quantity: item.quantity,
      note: "",
    }))
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      let res = await fetch(
        GenerateBackendURL("loan-return-transaction/create_item"),
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
          cache: "no-store",
          method: "POST",
          body: JSON.stringify({
            reader_id: data.id_reader,
            loan_term: loanTimeTerm,
            loan_list_document: variants,
            loan_request_id: data.id_loan_request,
          }),
        }
      );
      if (res.ok) {
        toast.success("Tạo thành công");
        router.push("/manager/loan_return_documents");
        router.refresh();
        return;
      }
      setIsLoading(false);
      toast.error("Có lỗi xảy ra");
    } catch (e) {
      setIsLoading(false);
      toast.error("Có lỗi xảy ra");
    }
  };
  return (
    <>
      <BackButton />
      <hr className="my-3" />
      <div className="p-3 shadow ">
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">LoanRequest ID:</h1>
          <span className="w-1/2 ">{data.id_loan_request}</span>
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày mượn dự kiến:</h1>
          <span className="w-1/2">
            {customFormatDate(new Date(data.expected_date), false)}
          </span>
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Kì hạn mượn:</h1>
          <select
            value={loanTimeTerm}
            onChange={(e) => setLoanTimeTerm(e.target.value)}
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
              <span>{data.id_reader}</span>
            </div>
            <div className="flex">
              <h1 className=" font-medium me-5">Họ tên:</h1>
              <span>{data.user.name}</span>
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
            {data.loan_request_list_documents.map((item) => {
              return (
                <tr
                  key={item.document?.document_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-2 py-4">3</td>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.document?.document_name}
                  </th>
                  <td className="px-2 py-4">{item.quantity}</td>
                </tr>
              );
            })}
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
              <th scope="col" className="px-2 py-3 w-1/12">
                Tồn kho
              </th>
              <th scope="col" className="px-2 py-3 w-5/12 text-center">
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody>
            {data.loan_request_list_documents?.map((item, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item.document?.document_id || index}
                >
                  <td className="px-2 py-4 w-1/12">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Docment ID"
                      defaultValue={item.document?.document_id}
                      readOnly
                    />
                  </td>
                  <td className="px-2 py-4 w-4/12">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      value={variants[index].isbn}
                      onChange={(e) => {
                        setVariants(
                          variants.map((itm, inx) =>
                            inx == index
                              ? {
                                  isbn: e.target.value,
                                  quantity: itm.quantity,
                                  note: itm.note,
                                }
                              : itm
                          )
                        );
                      }}
                    >
                      {item.document?.variants.map((item) => (
                        <option key={item.isbn} value={item.isbn}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="w-1/12 px-1">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Số lượng"
                      value={variants[index].quantity}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (isNaN(val) || val < 0) return;
                        if (val > item.quantity) return;
                        setVariants(
                          variants.map((itm, inx) =>
                            inx == index
                              ? {
                                  isbn: itm.isbn,
                                  quantity: val,
                                  note: itm.note,
                                }
                              : itm
                          )
                        );
                      }}
                    />
                  </td>
                  <td className="w-1/12 px-1">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Số lượng"
                      value={
                        item.document?.variants.find(
                          (itm) => itm.isbn == variants[index].isbn
                        )?.quantity
                      }
                      readOnly
                    />
                  </td>
                  <td className="w-5/12 px-2">
                    <textarea
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Ghi chú"
                      rows={2}
                      value={variants[index].note}
                      onChange={(e) => {
                        setVariants(
                          variants.map((itm, inx) =>
                            inx == index
                              ? { ...itm, note: e.target.value }
                              : itm
                          )
                        );
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          onClick={handleCreate}
          className={`
               p-3 text-sm font-medium text-white rounded bg-green-600 mx-auto block mt-3`}
        >
          Tiến hành cho muợn sách
        </button>
      </div>
    </>
  );
}
