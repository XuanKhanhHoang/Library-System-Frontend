import BackButton from "@/components/common/backButton/BackButton";
import { Document } from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { customFormatDate } from "@/utils/date";
import {
  extractFileIdFromDiveLink,
  getWebViewLinkFromDiveId,
} from "@/utils/handleImage";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  if (!params.id || isNaN(Number(params.id))) return notFound();
  let data: Document;
  try {
    let res = await fetch(
      "http://localhost:8081/api/v1/document/get_document?document_id=" +
        params.id,
      { cache: "no-store" }
    );
    if (!res.ok) return notFound();
    data = await res.json();
  } catch (error) {
    return notFound();
  }
  return (
    <>
      <BackButton />
      <hr className="my-3" />
      <div className="p-3 shadow ">
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">DocumentId:</h1>
          <input
            type="text"
            readOnly
            defaultValue={data.document_id}
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-3 items-center">
          <h1 className="text-lg w-1/2 font-bold">Tên sách:</h1>
          <input
            readOnly
            type="text"
            defaultValue={data.document_name}
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Tác giả:</h1>
          <input
            readOnly
            type="text"
            defaultValue={data.author.author_name}
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex mb-4 items-center">
          <h1 className="text-lg w-1/2 font-bold">Nhà Xuất Bản:</h1>
          <input
            readOnly
            type="text"
            defaultValue={data.publisher.publisher_name}
            className={`w-1/2 border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
          />
        </div>
        <div className="flex flex-wrap">
          {data.image?.map((item, index) => {
            return (
              <div className="w-3/12 mb-4 p-2" key={item.id}>
                <div className=" p-2 bg-white border border-gray-200 rounded-lg shadow relative">
                  <img
                    src={
                      getWebViewLinkFromDiveId(
                        extractFileIdFromDiveLink(item.image) as string
                      ) || "/logo.png"
                    }
                    alt=""
                    className="h-[200px] mx-auto"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex mb-3">
          <h1 className="text-lg w-1/2 font-bold">Thể loại:</h1>
          <div className="flex flex-col w-1/2">
            {data.document_ref_category?.map((item, index) => {
              return (
                <input
                  readOnly
                  type="text"
                  key={item.category_id}
                  defaultValue={item.category.category_name}
                  className={`w-1/2 border my-1 bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block  p-2.5`}
                />
              );
            })}
          </div>
        </div>
        <h1 className="text-lg  font-bold">Danh sách:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-1 py-3 w-3/12 text-center">
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
            </tr>
          </thead>
          <tbody>
            {data.variants?.map((item, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item.isbn}
                >
                  <td className="px-1 py-4 w-2/12">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      readOnly
                      defaultValue={item.isbn}
                    />
                  </td>
                  <td className="px-2 py-4 w-5/12">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      readOnly
                      defaultValue={item.name}
                    />
                  </td>
                  <td className="w-1/12 px-2 py-4">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      defaultValue={item.quantity}
                      readOnly
                    />
                  </td>
                  <td className="w-2/12 px-2 py-4">
                    <input
                      type="text"
                      className={` border bg-gray-50 text-gray-900 text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      defaultValue={customFormatDate(
                        new Date(item.published_date),
                        false
                      )}
                      readOnly
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
