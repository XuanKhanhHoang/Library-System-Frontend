"use client";
import BackButton from "@/components/common/backButton/BackButton";
import { LoanRequestForItem } from "@/dtos/loan_request";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { customFormatDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ViewRequest({
  data,
  access_token,
}: {
  data: LoanRequestForItem;
  access_token: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    if (isLoading) return toast.warning("Vui lòng chờ ...");
    setIsLoading(true);
    try {
      let res = await fetch(GenerateBackendURL("loan-request/accept"), {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          id: data.id_loan_request,
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        return toast.error("Có lỗi xảy ra");
      }
      toast.success("Chấp nhận thành công");
      router.push("/manager/loan_requests");
      router.refresh();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Có lỗi xảy ra");
    }
  };
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
          id: data.id_loan_request,
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
        return toast.error("Có lỗi xảy ra");
      }
      toast.success("Từ chối thành công");
      router.push("/manager/loan_requests");
      router.refresh();
    } catch (e) {
      setIsLoading(false);
      toast.error("Có lỗi xảy ra");
    }
  };
  return (
    <>
      <BackButton />
      <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">LoanRequest ID:</h1>
          <span className="w-1/2 ">{data.id_loan_request}</span>
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày tạo:</h1>
          <span className="w-1/2">
            {customFormatDate(new Date(data.create_at))}
          </span>
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Trạng thái:</h1>
          <span className="w-1/2">{data.status.name}</span>
        </div>
        <div className="mb-4 flex ">
          <h2 className="text-lg font-bold mb-4 w-1/2">Người tạo:</h2>
          <div className="flex flex-col w-1/2">
            <div className="flex justify-between">
              <h1 className=" font-medium">User ID: </h1>
              <span>{data.id_reader}</span>
            </div>
            <div className="flex justify-between">
              <h1 className=" font-medium">Chức danh:</h1>
              <span>{data.user.job_title.job_title_name}</span>
            </div>
            <div className="flex justify-between">
              <h1 className=" font-medium">Họ tên:</h1>
              <span>{data.user.name}</span>
            </div>
          </div>
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày nhận:</h1>
          <span className="w-1/2">
            {customFormatDate(new Date(data.expected_date))}
          </span>
        </div>
        <h1 className="text-lg  font-bold">Danh sách mượn:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                Mã tài liệu
              </th>
              <th scope="col" className="px-4 py-3">
                Tên tài liệu
              </th>
              <th scope="col" className="px-2 py-3">
                Số lượng
              </th>
            </tr>
          </thead>
          <tbody>
            {data.loan_request_list_documents.map((item, ind) => (
              <tr
                key={item.document?.document_id || ind}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-2 py-4">{item.document?.document_id}</td>

                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.document?.document_name}
                </th>
                <td className="px-2 py-4">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.status_id == 1 && (
          <>
            {" "}
            <div className="flex my-4 justify-center">
              <button
                className={`p-3 text-sm ms-6 font-medium text-white rounded bg-blue-600`}
                onClick={handleAccept}
              >
                Xác nhận yêu cầu
              </button>
              <button
                className={` p-3 text-sm ms-6 font-medium text-white rounded bg-red-600`}
                onClick={handleRefuse}
              >
                Hủy yêu cầu
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
