import { options } from "@/app/api/auth/[...nextauth]/options";
import ManageUser from "@/components/manager/ManageUser/main";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type userSearchParams = {
  page?: string;
  search_term?: string;
  is_valid?: string;
  order_type?: "asc" | "desc";
  order_col?: "name" | "user_id";
  gender?: "true" | "false";
  search_col?: "name" | "phone_number" | "user_id";
};
type getUserResponse = {
  total_page: number;
  data: UserType[];
};
type UserType = {
  id_user: number;
  user_name: string;
  name: string;
  gender: boolean;
  birth_date: Date;
  phone_number: string;
  avatar?: string;
  is_valid: boolean;
  id_job_title: number;
  id_major: number;
};
export default async function page({
  searchParams,
}: {
  searchParams: userSearchParams;
}) {
  const {
    is_valid: isValid,
    order_col,
    order_type,
    page,
    search_term,
    gender,
    search_col,
  } = searchParams;
  const searchPr = new URLSearchParams();
  const severSearchPr = new URLSearchParams();

  if (page && isNaN(Number(page))) return notFound();
  if (search_term) {
    searchPr.append("search_term", search_term);
  }
  if (isValid) {
    if (isValid === "true" || isValid === "false") {
      searchPr.append("is_valid", isValid);
      severSearchPr.append("is_valid", isValid);
    } else return notFound();
  }

  if (gender) {
    if (gender === "true" || gender === "false") {
      searchPr.append("gender", gender);
      severSearchPr.append("gender", gender);
    } else return notFound();
  }
  if (search_col) {
    if (
      search_col === "name" ||
      search_col === "phone_number" ||
      search_col == "user_id"
    ) {
      searchPr.append("search_col", search_col);
    } else return notFound();
  }
  if (search_term && search_col) {
    switch (search_col) {
      case "name":
        severSearchPr.append("name", search_term);
        break;
      case "user_id":
        severSearchPr.append("user_id", search_term);
        break;
      case "phone_number":
        severSearchPr.append("phone_number", search_term);
        break;
      default:
        break;
    }
  }
  if (search_col == undefined && search_term) {
    severSearchPr.append("name", search_term);
  }
  if (order_col) {
    if (order_col === "name" || order_col == "user_id") {
      searchPr.append("order_col", order_col);
      severSearchPr.append(
        "sort_by_col",
        order_col != "user_id" ? order_col : "id_user"
      );
      severSearchPr.append("sort_type", order_type || "asc");
    }
  }
  if (order_type) {
    if (order_type === "asc" || order_type === "desc")
      searchPr.append("order_type", order_type);
  }
  severSearchPr.append("page", page || "1");
  const session = await getServerSession(options);
  let data: getUserResponse | undefined;
  try {
    let res = await fetch(
      "http://localhost:8081/api/v1/user/manager/get_users?" +
        severSearchPr.toString(),
      {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      data = (await res.json()) as getUserResponse;
    }
  } catch (e) {
    console.log(e);
  }

  return (
    <ManageUser
      access_token={session!.user!.access_token.token}
      searchParams={searchParams}
      data={data}
      searchPr={searchPr}
    />
  );
}
