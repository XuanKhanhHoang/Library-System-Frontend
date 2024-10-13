"use client";
import BackButton from "@/components/common/backButton/BackButton";
import { LoanReturnItemDetail } from "@/dtos/loan_return";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { customFormatDate } from "@/utils/date";
import formatCurrency from "@/utils/formatPrice";
import { notFound, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function ReturnDocument({
  data,
  token,
}: {
  data: LoanReturnItemDetail;
  token: string;
}) {
  const [punishment, setPunishment] = useState<{
    reason: string;
    cost: number;
  }>();
  const [returnQuantity, setReturnQuantity] = useState<
    { isbn: string; quantity: number }[]
  >(
    data.loan_list_document.map((item) => ({
      isbn: item.variant.isbn,
      quantity: item.quantity,
    }))
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      let res = await fetch(
        GenerateBackendURL("loan-return-transaction/create_return"),
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
          cache: "no-store",
          method: "POST",
          body: JSON.stringify({
            transaction_id: data.id_loan_return,
            return_list: returnQuantity,
            punishment: punishment,
            return_date: new Date(),
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
            {customFormatDate(new Date(data.due_date))}
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

          {new Date() > new Date(data.due_date) ? (
            <span className="w-1/2 text-red-500">Quá hạn </span>
          ) : (
            <span className="w-1/2 text-green-600">{data.due_date} </span>
          )}
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày trả:</h1>
          <span className="w-1/2">{customFormatDate(new Date())}</span>
        </div>

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
        <h1 className="text-lg  font-bold">Phạt:</h1>
        {punishment && (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3 w-8/12">
                    Lí do
                  </th>
                  <th scope="col" className="px-2 py-3 w-3/12">
                    Số tiền
                  </th>
                  <th scope="col" className="px-2 py-3 w-1/12">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td>
                    <textarea
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Lí do"
                      value={punishment.reason}
                      onChange={(e) => {
                        setPunishment({
                          ...punishment,
                          reason: e.target.value,
                        });
                      }}
                      rows={2}
                    />
                  </td>
                  <td className="px-2 py-4">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Số tiền"
                      value={punishment.cost}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (isNaN(val)) return;
                        setPunishment({ ...punishment, cost: val });
                      }}
                    />
                  </td>
                  <td>
                    <svg
                      width="28px"
                      height="28px"
                      viewBox="0 0 1024 1024"
                      fill="#f77e7e"
                      className="icon cursor-pointer"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#f77e7e"
                      onClick={() => setPunishment(undefined)}
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
              </tbody>
            </table>
          </>
        )}
        {punishment == undefined && (
          <button
            onClick={() => setPunishment({ cost: 0, reason: "" })}
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

            <span>Thêm phí phạt</span>
          </button>
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
                {"Số lượng trả"}
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
            {data.loan_list_document.map((item, index) => {
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
                  <td className="px-2 py-4">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block max-w-20 text-center p-2`}
                      placeholder="Số lượng trả"
                      value={returnQuantity[index].quantity}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (isNaN(val) || val > item.quantity) return;

                        setReturnQuantity(
                          returnQuantity.map((itm, ind) =>
                            ind == index
                              ? { isbn: itm.isbn, quantity: val }
                              : itm
                          )
                        );
                      }}
                    />
                  </td>
                  <td className="px-2 py-4">{item.quantity}</td>
                  <td className="px-2 py-4">{item.note}</td>
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
          {isLoading ? "Loading..." : "Tiến hành cho muợn sách"}
        </button>
      </div>
    </>
  );
}
