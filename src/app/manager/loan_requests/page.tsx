import { options } from "@/app/api/auth/[...nextauth]/options";
import ManageLoanRequest from "@/components/manager/ManageLoanRequest/main";
import { LoanRequestWithStatusUserName } from "@/dtos/loan_request";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export type loanRequestSearchParams = {
  page?: string;
  search_term?: string;
  min_date?: string;
  order_type?: "asc" | "desc";
  order_col?: "name" | "user_id" | "create_at";
  max_date?: string;
  search_col?: "name" | "loan_request_id" | "user_id";
  status?: string;
};
export default async function page({
  searchParams,
}: {
  searchParams: loanRequestSearchParams;
}) {
  const {
    order_col,
    order_type,
    page,
    search_term,
    search_col,
    status,
    min_date,
    max_date,
  } = searchParams;
  if (
    (status &&
      (isNaN(Number(status)) || Number(status) < 1 || Number(status) > 3)) ||
    (page && isNaN(Number(page)))
  )
    return notFound();
  const searchPr = new URLSearchParams();
  const serverSearchPr = new URLSearchParams();

  if (search_term) {
    searchPr.append("search_term", search_term);
    if (!search_col) serverSearchPr.append("name", search_term);
    else {
      switch (search_col) {
        case "name":
          serverSearchPr.append("name", search_term);
          break;
        case "loan_request_id":
          serverSearchPr.append("loan_request_id", search_term);
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
      order_col === "name" ||
      order_col == "user_id" ||
      order_col == "create_at"
    ) {
      searchPr.append("order_col", order_col);
      serverSearchPr.append("sort_by_col", order_col);
      serverSearchPr.append("sort_type", order_type || "asc");
    } else return notFound();
  }
  if (search_col) {
    if (
      search_col === "loan_request_id" ||
      search_col === "name" ||
      search_col == "user_id"
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
        data: LoanRequestWithStatusUserName[];
        total_page: number;
      }
    | undefined;
  try {
    let res = await fetch(
      "http://localhost:8081/api/v1/loan-request/get_list?" +
        serverSearchPr.toString(),
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
    <ManageLoanRequest
      access_token={session!.user!.access_token.token}
      searchParams={searchParams}
      data={data}
      searchPr={searchPr}
    />
  );
}
