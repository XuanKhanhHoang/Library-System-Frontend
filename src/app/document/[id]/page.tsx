import ExpandableText from "@/components/common/ExpandableText/ExpandableText";
import DocumentDetailButton from "@/components/user/document/DocumentDetail";
import ImageSlider from "@/components/user/document_detail/ImageSlider";
import { Document } from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
const colors = [
  "text-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-blue-300",
  "text-red-700 border-red-700 hover:bg-red-800 focus:ring-red-300",
  "text-green-700 border-green-700 hover:bg-green-800 focus:ring-green-300",
  "text-yellow-700 border-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300",
  "text-purple-700 border-purple-700 hover:bg-purple-800 focus:ring-purple-300",
  "text-pink-700 border-pink-700 hover:bg-pink-800 focus:ring-pink-300",
  "text-indigo-700 border-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300",
  "text-teal-700 border-teal-700 hover:bg-teal-800 focus:ring-teal-300",
  "text-orange-700 border-orange-700 hover:bg-orange-800 focus:ring-orange-300",
  "text-gray-700 border-gray-700 hover:bg-gray-800 focus:ring-gray-300",
];
export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  if (!params || !params.id || isNaN(Number(params.id))) return notFound();
  try {
    let res = await fetch(
      GenerateBackendURL("document/get_document?document_id=" + params.id)
    );
    if (!res.ok)
      return (
        <div className="block mx-auto p-7 text-2xl font-semibold">
          Có lỗi xảy ra
        </div>
      );
    let data: Document = await res.json();
    return (
      <div className="mt-[20px]">
        <div className="flex">
          <ImageSlider data={data.image?.map((item) => item.image)} />
          <div className="w-8/12 px-6">
            <div>
              <h1 className="text-2xl font-semibold">{data.document_name}</h1>
            </div>
            <div className="flex flex-wrap mt-5">
              <div className="w-1/2">
                <span className=" font-medium text-lg me-1">Nhà xuất bản:</span>
                <span className="font-medium text-lg">
                  {data.publisher.publisher_name}
                </span>
              </div>
              <div className="w-1/2">
                <span className=" font-medium text-lg me-1">Tác giả:</span>
                <span className="font-medium text-lg">
                  {data.author.author_name}
                </span>
              </div>
            </div>
            <h3 className="text-lg font-medium mt-2 mb-1">Thể loại:</h3>
            <div className="flex flex-wrap">
              {data.document_ref_category.map((item, i) => {
                return (
                  <Link
                    href={
                      "/document?search_col=category_id&search_term=" +
                      item.category_id
                    }
                    key={i}
                    className={`hover:text-white border focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 ${colors[i]}`}
                  >
                    {item.category.category_name}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3">
              <span className="text-lg font-medium"> Mô tả</span>
              <ExpandableText text={data.description || ""} />
            </div>
            <DocumentDetailButton document_id={params.id} />
          </div>
        </div>
      </div>
    );
  } catch (error) {}
}
