"use client";
import BackButton from "@/components/common/backButton/BackButton";
import AppDatePicker from "@/components/common/datePicker/DatePicker";
import {
  Author,
  Category,
  Document,
  Publisher,
  Supplier,
} from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { customFormatDate } from "@/utils/date";
import formatCurrency from "@/utils/formatPrice";
import {
  extractFileIdFromDiveLink,
  getWebViewLinkFromDiveId,
} from "@/utils/handleImage";
import { Session } from "next-auth";
import { notFound, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateDocumentAndVariants({
  session,
  data,
  document,
}: {
  session: Session;
  data?: {
    authors: Author[];
    publishers: Publisher[];
    categories: Category[];
  };
  document: Document;
}) {
  const router = useRouter();
  const [variantList, setVariantList] = useState<
    {
      name: string;
      quantity: number;
      published_date: Date;
      isbn: string;
    }[]
  >(
    document.variants.map((item) => ({
      isbn: item.isbn,
      name: item.name,
      published_date: new Date(item.published_date),
      quantity: item.quantity,
    }))
  );
  const [images, setImages] = useState<string[]>(
    document.image?.map((item) =>
      getWebViewLinkFromDiveId(extractFileIdFromDiveLink(item.image) as string)
    ) || []
  );
  const [categoryList, setCategoryList] = useState<number[]>(
    document.document_ref_category.map((item) => item.category_id)
  );
  const [name, setName] = useState<string>(document.document_name);
  const [typeId, setTypeId] = useState<{
    publisher_id: number;
    author_id: number;
  }>({
    author_id: document.author.id_author || 1,
    publisher_id: document.publisher.id_publisher || 1,
  });
  const [des, setDes] = useState<string>(document.description || "");
  const [isLoading, setIsLoading] = useState(false);
  const handleCreate = async () => {
    if (isLoading) return;
    if (name.length == 0 || categoryList.length == 0 || variantList.length == 0)
      return toast.error("Vui lòng nhập đúng dữ liệu");
    for (let i = 0; i < variantList.length; i++) {
      let item = variantList[i];
      if (!item.name || item.isbn.length == 0)
        return toast.error("Vui lòng nhập đúng dữ liệu");
    }
    setIsLoading(true);
    const frm = new FormData();
    frm.append("document_name", name);
    frm.append("publisher_id", typeId.publisher_id + "");
    frm.append("author_id", typeId.author_id + "");
    frm.append("description", des);
    frm.append("variants", JSON.stringify(variantList));
    frm.append("categories", JSON.stringify(Array.from(new Set(categoryList))));
    frm.append("document_id", document.document_id + "");

    for (const imageUrl of images) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      frm.append("images", blob);
    }
    try {
      let res = await fetch(GenerateBackendURL("document/update_document"), {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        method: "PUT",
        body: frm,
      });
      if (!res.ok) {
        setIsLoading(false);
        toast.error("Có lỗi xảy ra");
        return;
      }
      toast.success("Cập nhật thành công");
      router.push("/manager/documents");
      router.refresh();
      return;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImages([...images, URL.createObjectURL(event.target.files[0])]);
    }
  };
  return (
    <>
      <BackButton />
      <hr className="my-3" />
      <div className="p-3 shadow ">
        <div className="mb-4 flex ">
          <h2 className="text-lg font-bold mb-4 w-1/2">Người Nhận:</h2>
          <div className="flex flex-col w-1/2">
            <div className="flex ">
              <h1 className=" font-medium me-5">User ID: </h1>
              <span>{session.user?.user_info.id_user}</span>
            </div>
            <div className="flex">
              <h1 className=" font-medium me-5">Họ tên:</h1>
              <span>{session.user?.user_info.name}</span>
            </div>
          </div>
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Tên sách:</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Tác giả:</h1>
          <select
            value={typeId.author_id}
            onChange={(e) =>
              setTypeId({ ...typeId, author_id: Number(e.target.value) })
            }
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          >
            {data?.authors.map((item) => {
              return (
                <option value={item.id_author} key={item.id_author}>
                  {item.author_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Nhà Xuất Bản:</h1>
          <select
            value={typeId.publisher_id}
            onChange={(e) =>
              setTypeId({ ...typeId, publisher_id: Number(e.target.value) })
            }
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          >
            {data?.publishers.map((item) => {
              return (
                <option value={item.id_publisher} key={item.id_publisher}>
                  {item.publisher_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex mb-3">
          <h1 className="text-lg w-1/2 font-bold">Loại sách:</h1>
          <div className="flex flex-col w-1/2">
            {categoryList?.map((item, index) => {
              return (
                <div
                  className="flex w-full items-center mb-2"
                  key={item + "ww" + index}
                >
                  <select
                    value={item}
                    onChange={(e) => {
                      let val = Number(e.target.value);
                      setCategoryList(
                        categoryList.map((itm, ind) =>
                          ind == index ? val : itm
                        )
                      );
                    }}
                    className="w-10/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
                  >
                    {data?.categories.map((item) => {
                      return (
                        <option value={item.id_category} key={item.id_category}>
                          {item.category_name}
                        </option>
                      );
                    })}
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
          onClick={() =>
            setCategoryList([
              ...categoryList,
              data?.categories[1].id_category || 1,
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

          <span>Thêm loại sách</span>
        </button>
        <div className="">
          <h1 className="text-lg  font-bold">Mô tả:</h1>
          <textarea
            className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
            placeholder="Mô tả"
            value={des}
            onChange={(e) => {
              setDes(e.target.value);
            }}
            rows={2}
          />
        </div>
        <div className="flex flex-wrap">
          {images.map((item, index) => {
            return (
              <div className="w-3/12 mb-4 p-2">
                <div className=" p-2 bg-white border border-gray-200 rounded-lg shadow relative">
                  <img
                    src={item || "/logo.png"}
                    alt=""
                    className="h-[200px] mx-auto"
                  />
                  <div
                    className="w-4 h-4 rounded-full absolute top-3 right-5"
                    onClick={(e) => {
                      setImages(images.filter((itm, ind) => ind != index));
                    }}
                  >
                    <svg
                      fill="#ec5555"
                      height="64px"
                      width="64px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 511.76 511.76"
                      xmlSpace="preserve"
                      stroke="#ec5555"
                      className="w-8 h-8"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g>
                            <path d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048 c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251 l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251 c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165 c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0 c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="w-3/12 mb-4 mx-2 bg-white p-3 h-[200px]">
            <label
              className=" block m-auto h-full text-center"
              htmlFor="img_add"
              style={{
                backgroundImage: "url('/addImage.jfif')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></label>
            <input
              type="file"
              id="img_add"
              className="invisible "
              accept=".jpeg,.png,.webp"
              onChange={onImageChange}
            />
          </div>
        </div>
        <h1 className="text-lg  font-bold">Danh sách:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-1 py-3 w-2/12 text-center">
                ISBN
              </th>
              <th scope="col" className="px-2 py-3 w-5/12 text-center">
                Tên biến thể
              </th>
              <th scope="col" className="px-2 py-3 w-1/12">
                Số lượng
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
                  <td className="px-1 py-4 w-2/12">
                    <input
                      type="text"
                      value={item.isbn}
                      onChange={(e) =>
                        setVariantList(
                          variantList.map((it, ind) => {
                            if (ind == index)
                              return {
                                ...it,
                                isbn: e.target.value.trim(),
                              };
                            return it;
                          })
                        )
                      }
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    />
                  </td>
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

                  <td className="w-3/12 px-2">
                    <AppDatePicker
                      onChange={(date) => {
                        if (!date) return;
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
          onClick={handleCreate}
          className={`
                 p-3 text-sm font-medium text-white rounded bg-green-600 mx-auto block mt-3`}
        >
          {isLoading ? "Loading..." : "Tiến hành cập nhật"}
        </button>
      </div>
    </>
  );
}
