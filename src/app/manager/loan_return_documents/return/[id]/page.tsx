"use client";
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
  const onBack = useCallback(() => {
    router.back();
  }, [router]);
  const [punishList, setPunishList] = useState<
    { reason: string; cost: number }[]
  >([]);
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

          {data.due_date > new Date() ? (
            <span className="w-1/2 text-red-500">Quá hạn </span>
          ) : (
            <span className="w-1/2 text-green-600">Đúng hạn </span>
          )}
        </div>
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

        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Tổng tiền phạt:</h1>
          <span className="w-1/2">
            {formatCurrency(punishList.reduce((pre, cur) => pre + cur.cost, 0))}
          </span>
        </div>
        <h1 className="text-lg  font-bold">Danh sách lí do phạt:</h1>
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
            {punishList?.map((item, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <td>
                    <textarea
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Lí do"
                      value={item.reason}
                      onChange={(e) => {
                        setPunishList(
                          punishList.map((val, ind) => {
                            if (ind == index)
                              return { reason: e.target.value, cost: val.cost };
                            return val;
                          })
                        );
                      }}
                      rows={2}
                    />
                  </td>
                  <td className="px-2 py-4">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Số tiền"
                      value={item.cost}
                      onChange={(e) => {
                        setPunishList(
                          punishList.map((val, ind) => {
                            let value = Number(e.target.value);
                            if (ind == index && !isNaN(value)) {
                              return { reason: val.reason, cost: value };
                            }
                            return val;
                          })
                        );
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
                      onClick={() =>
                        setPunishList(
                          punishList.filter((it, ind) => ind != index)
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
            setPunishList([...punishList, { cost: 0, reason: "" }])
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

          <span>Thêm phí phạt</span>
        </button>
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
        <button
          className={`
               p-3 text-sm font-medium text-white rounded bg-green-600 mx-auto block mt-3`}
        >
          Tiến hành trả sách
        </button>
      </div>
    </>
  );
}
