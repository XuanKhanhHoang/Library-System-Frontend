import CategoryPieChart from "@/components/manager/charts/CategoryPieChart/main";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

export default async function page() {
  try {
    let res = await fetch(
      "http://localhost:8081/api/v1/document/get_number_document_of_category",
      {
        cache: "no-store",
      }
    );
    if (res.ok) {
      return (
        <div className="w-full">
          <CategoryPieChart
            data={
              (await res.json()) as {
                doc_count: number;
                category_id: number;
                category_name: string;
              }[]
            }
          />
        </div>
      );
    }
    return <span>Có lỗi xảy ra</span>;
  } catch (e) {
    console.log(e);
    return <span>Có lỗi xảy ra</span>;
  }
}
