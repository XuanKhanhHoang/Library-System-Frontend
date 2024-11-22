import Pagination from "@/components/common/pagination/pagination";
import DocumentCard from "@/components/user/document/DocumentCard";
import { ChevronRight, SlashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { GetDocumentsResponse } from "../manager/documents/page";
import { GenerateBackendURL } from "@/utils/backendUrl";
export interface documentsSearchParams extends contentDocumentsSearchParams {
  page?: string;
}
export interface contentDocumentsSearchParams {
  search_term?: string;
  search_col?: "name" | "author_name" | "category_name" | "category_id";
}
export default async function page({
  searchParams,
}: {
  searchParams: documentsSearchParams;
}) {
  let { page, search_col, search_term } = searchParams;
  if (
    ["name", "author_name", "category_name", "category_id"].findIndex(
      (item) => item == search_col
    ) == -1
  ) {
    search_col = undefined;
    search_term = undefined;
  }
  if (search_term && search_col == "category_id" && isNaN(Number(search_term)))
    search_term = undefined;
  if (page && isNaN(Number(page))) page = "1";
  let pageSearchParams = new URLSearchParams();
  let backendSearchParams = new URLSearchParams();
  if (search_term) {
    pageSearchParams.append("search_term", search_term);
    backendSearchParams.append(search_col || "name", search_term);
  }
  let data: GetDocumentsResponse | undefined;
  try {
    data = await fetch(
      GenerateBackendURL(
        `document/get_preview_documents?limit=8&page=${page || 1}&${
          search_col == "category_id"
            ? `category_ids=${search_term}`
            : backendSearchParams.toString()
        }`
      )
    ).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
  return (
    <main>
      <nav
        className="flex px-5 py-3 text-gray-700 border "
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link
              href="/"
              className="font-semibold inline-flex items-center text-sm  text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <i className="p-1 fa-solid fa-house"></i>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight />
              <Link
                href="/document"
                className="ms-1 text-sm font-semibold text-green-500 hover:text-main md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Tìm kiếm
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      {!data || data.data.length == 0 ? (
        <section className="p-5">
          <h2 className="text-2xl font-semibold py-2">Không tìm thấy gì</h2>
          <p>
            Xin lỗi, nhưng không có kết quả nào phù hợp với cụm từ tìm kiếm của
            bạn. Vui lòng thử lại với một số từ khóa khác.
          </p>
        </section>
      ) : (
        <div className="flex flex-wrap">
          {data.data.map((item) => {
            return (
              <div className="w-1/4 px-10 py-5" key={item.document_id}>
                <DocumentCard widthClass="w-full" item={item} />
              </div>
            );
          })}
        </div>
      )}
      <Pagination
        rootDirection={`/document?${pageSearchParams.toString()}`}
        totalPage={data?.total_page || 1}
        forcePage={Number(page) || 1}
      />
    </main>
  );
}
