import { options } from "@/app/api/auth/[...nextauth]/options";
import ManageLoanRequest from "@/components/manager/ManageLoanRequest/main";
import ManageLoanReturnTransaction, {
  loanReturnSearchParams,
} from "@/components/manager/ManageLoanReturnTransaction/main";
import { LoanRequestWithStatusUserName } from "@/dtos/loan_request";
import { LoanReturnItem } from "@/dtos/loan_return";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: loanReturnSearchParams;
}) {
  const {
    order_col,
    order_type,
    page,
    search_term,
    search_col,
    is_punished,
    is_returned,
    min_date,
    max_date,
  } = searchParams;
  if (page && isNaN(Number(page))) return notFound();
  const searchPr = new URLSearchParams();
  const serverSearchPr = new URLSearchParams();

  if (search_term) {
    searchPr.append("search_term", search_term);
    if (!search_col) serverSearchPr.append("reader_name", search_term);
    else {
      switch (search_col) {
        case "document_name":
          serverSearchPr.append("document_name", search_term);
          break;
        case "id":
          serverSearchPr.append("id", search_term);
          break;
        case "librarian_id":
          serverSearchPr.append("librarian_id", search_term);
          break;
        case "reader_name":
          serverSearchPr.append("reader_name", search_term);
          break;
        case "user_id":
          serverSearchPr.append("user_id", search_term);
          break;
        default:
          break;
      }
    }
  }
  if (order_type && order_type !== "asc" && order_type !== "desc")
    return notFound();

  if (order_col) {
    if (
      order_col === "create_at" ||
      order_col == "user_name" ||
      order_col == "user_id" ||
      order_col == "due_date"
    ) {
      searchPr.append("order_col", order_col);
      serverSearchPr.append("sort_by_col", order_col);
      serverSearchPr.append("sort_type", order_type || "asc");
    } else return notFound();
  }
  if (search_col) {
    if (
      search_col === "document_name" ||
      search_col === "id" ||
      search_col == "user_id" ||
      search_col == "librarian_id" ||
      search_col == "reader_name"
    ) {
      searchPr.append("search_col", search_col);
    } else return notFound();
  }
  if (
    min_date &&
    max_date &&
    new Date(decodeURIComponent(min_date)) >
      new Date(decodeURIComponent(max_date))
  )
    return notFound;
  if (min_date) {
    searchPr.append("min_date", min_date);
    serverSearchPr.append("min_date", min_date);
  }
  if (max_date) {
    searchPr.append("max_date", max_date);
    serverSearchPr.append("max_date", max_date);
  }

  serverSearchPr.append("page", page || "1");
  const session = await getServerSession(options);
  let data:
    | {
        data: LoanReturnItem[];
        total_page: number;
      }
    | undefined;
  try {
    let res = await fetch(
      GenerateBackendURL(
        "loan-return-transaction/get_list?" + serverSearchPr.toString()
      ),
      {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      data = await res.json();
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <ManageLoanReturnTransaction
      access_token={session!.user!.access_token.token}
      searchParams={searchParams}
      data={data}
      searchPr={searchPr}
    />
  );
}
