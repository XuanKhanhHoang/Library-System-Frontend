import { options } from "@/app/api/auth/[...nextauth]/options";
import CategoryPieChart from "@/components/manager/charts/CategoryPieChart/main";
import NumberUserPerJobTitle from "@/components/manager/charts/NumberUserPerJobTitle/main";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(options);
  try {
    let res = await fetch(
      "http://localhost:8081/api/v1/user/get_number_user_of_type",
      {
        cache: "default",
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
      }
    );
    if (res.ok) {
      return (
        <div className="w-full">
          <NumberUserPerJobTitle
            data={
              (await res.json()) as {
                quantity: number;
                job_title_name: string;
              }[]
            }
          />
        </div>
      );
    }
    console.log(res.statusText);

    return <span>Có lỗi xảy ra</span>;
  } catch (e) {
    console.log(e);
    return <span>Có lỗi xảy ra</span>;
  }
}
