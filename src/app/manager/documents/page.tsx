import { options } from "@/app/api/auth/[...nextauth]/options";
import ManageDocuments from "@/components/manager/ManageDocument/main";
import { Category } from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export interface GetDocumentsResponse {
  data: PreviewDocument[];
  total_page: number;
}
export interface PreviewDocument {
  document_id: number;
  document_name: string;
  id_author: number;
  id_publisher: number;
  description: string;
  image: string;
  author: {
    id_author: number;
    author_name: string;
  };
  publisher: {
    id_publisher: number;
    publisher_name: string;
  };

  document_ref_category: {
    document_id: number;
    category_id: number;
    category: Category;
  }[];
}
export type documentsSearchParams = {
  page?: string;
  search_term?: string;
  order_type?: "asc" | "desc";
  order_col?: "stt" | "document_name";
  search_col?: "document_id" | "document_name" | "publisher" | "category";
};
export default async function page({
  searchParams,
}: {
  searchParams: documentsSearchParams;
}) {
  const { order_col, order_type, page, search_term, search_col } = searchParams;
  const searchPr = new URLSearchParams();
  const severSearchPr = new URLSearchParams();

  if (page && isNaN(Number(page))) return notFound();
  if (search_term) {
    searchPr.append("search_term", search_term);
    if (!search_col) severSearchPr.append("name", search_term);
    else {
      switch (search_col) {
        case "document_name":
          severSearchPr.append("name", search_term);
          break;
        case "publisher":
          severSearchPr.append("publisher_name", search_term);
          break;
        case "category":
          severSearchPr.append("category_name", search_term);
          break;
        case "document_id":
          severSearchPr.append("document_id", search_term);
          break;
        default:
          break;
      }
    }
  }
  if (order_type && order_type !== "asc" && order_type !== "desc")
    return notFound();

  if (order_col) {
    if (order_col === "document_name") {
      searchPr.append("order_col", order_col);
      severSearchPr.append("sort_by_col", order_col);
      severSearchPr.append("sort_type", order_type || "asc");
    } else return notFound();
  }
  if (search_col) {
    if (
      search_col === "category" ||
      search_col === "document_name" ||
      search_col == "document_id" ||
      search_col == "publisher"
    ) {
      searchPr.append("search_col", search_col);
    } else return notFound();
  }

  severSearchPr.append("page", page || "1");
  const session = await getServerSession(options);
  let data: GetDocumentsResponse | undefined;
  try {
    let res = await fetch(
      GenerateBackendURL(
        "document/get_preview_documents?" + severSearchPr.toString()
      ),
      {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      data = (await res.json()) as GetDocumentsResponse;
    }
  } catch (e) {
    console.log(e);
  }

  return (
    <ManageDocuments
      access_token={session!.user!.access_token.token}
      searchParams={searchParams}
      data={data}
      searchPr={searchPr}
    />
  );
}
