"use client";
import BackButton from "@/components/backButton/BackButton";
import AppDatePicker from "@/components/datePicker/DatePicker";
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
export default function page() {
  const router = useRouter();
  const [variantList, setVariantList] = useState<
    { name: string; quantity: number; published_date: Date; price: number }[]
  >([]);
  const [categoryList, setCategoryList] = useState<number[]>([]);
  const [createAt, setCreateAt] = useState<Date>(new Date());

  return (
    <>
      <BackButton />
      <hr className="my-3" />
      <div className="p-3 shadow ">
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">ISBN:</h1>
          <input
            type="text"
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Ngày Thêm:</h1>
          <AppDatePicker
            onChange={(date) => {
              setCreateAt(date);
            }}
            dateConfig={{
              maxTime: new Date(),
              showTime: true,
              format: "hh:mm dd/MM/yyyy",
              selected: createAt,
            }}
          />
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Nhà cung cấp:</h1>
          <select
            // value={}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          >
            <option value="3">abc</option>
            <option value="6">xyz</option>
          </select>
        </div>
        <div className="mb-4 flex ">
          <h2 className="text-lg font-bold mb-4 w-1/2">Người Giao:</h2>
          <span className="w-1/2">{"Nguyen Van A"}</span>
        </div>
        <div className="mb-4 flex ">
          <h2 className="text-lg font-bold mb-4 w-1/2">Người Nhận:</h2>
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
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Tên sách:</h1>
          <input
            type="text"
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Tác giả:</h1>
          <select
            // value={}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          >
            <option value="3">abc</option>
            <option value="6">xyz</option>
          </select>
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Nhà Xuất Bản:</h1>
          <select
            // value={}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          >
            <option value="3">abc</option>
            <option value="6">xyz</option>
          </select>
        </div>
        <div className="flex mb-3">
          <h1 className="text-lg w-1/2 font-bold">Loại sách:</h1>
          <div className="flex flex-col w-1/2">
            {categoryList?.map((item, index) => {
              return (
                <div
                  className="flex w-full items-center mb-2"
                  key={item + "" + index}
                >
                  <select
                    // value={}
                    className="w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                  >
                    <option value="3">abc</option>
                    <option value="6">xyz</option>
                  </select>
                  <div className="w-2/12">
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
                        setCategoryList(
                          categoryList.filter((it, ind) => ind != index)
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => setCategoryList([...categoryList, 1])}
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

          <span>Thêm loại sách</span>
        </button>
        <h1 className="text-lg  font-bold">Danh sách:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3 w-4/12 text-center">
                Tên biến thể
              </th>
              <th scope="col" className="px-2 py-3 w-1/12">
                Số lượng
              </th>
              <th scope="col" className="px-2 py-3 w-2/12 text-center">
                Giá tiền
              </th>
              <th scope="col" className="px-2 py-3 w-3/12 text-center">
                Ngày xuất bản
              </th>
              <th scope="col" className="px-2 py-3 w-1/12 text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {variantList?.map((item, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <td className="px-2 py-4 w-5/12">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Tên biến thể"
                      value={item.name}
                      onChange={(e) => {
                        setVariantList(
                          variantList.map((it, ind) => {
                            if (ind == index)
                              return {
                                ...it,
                                name: e.target.value,
                              };
                            return it;
                          })
                        );
                      }}
                    />
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
                        setVariantList(
                          variantList.map((it, ind) => {
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
                  <td className="w-2/12 px-2">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Giá"
                      value={item.price}
                      onChange={(e) => {
                        let val = Number(e.target.value);
                        if (isNaN(val) || val < 1) return;
                        setVariantList(
                          variantList.map((it, ind) => {
                            if (ind == index)
                              return {
                                ...it,
                                price: e.target.value == "" ? 0 : val,
                              };
                            return it;
                          })
                        );
                      }}
                    />
                  </td>
                  <td className="w-3/12 px-2">
                    <AppDatePicker
                      onChange={(date) => {
                        setVariantList(
                          variantList.map((it, ind) => {
                            if (ind == index)
                              return {
                                ...it,
                                published_date: date,
                              };
                            return it;
                          })
                        );
                      }}
                      dateConfig={{
                        maxTime: new Date(),
                        format: "dd/MM/yyyy",
                        selected: item.published_date,
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
                        setVariantList(
                          variantList.filter((it, ind) => ind != index)
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
            setVariantList([
              ...variantList,
              { name: "", price: 0, published_date: new Date(), quantity: 0 },
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
          Tiến hành thêm sách
        </button>
      </div>
    </>
  );
}
