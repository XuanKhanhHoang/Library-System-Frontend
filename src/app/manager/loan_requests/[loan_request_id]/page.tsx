import { options } from "@/app/api/auth/[...nextauth]/options";
import ViewRequest from "@/components/manager/ManageLoanRequest/ViewRequest/main";
import { LoanRequestWithStatusUserName } from "@/dtos/loan_request";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { customFormatDate } from "@/utils/date";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params,
}: {
  params: { loan_request_id: string };
}) {
  const session = await getServerSession(options);
  try {
    let res = await fetch(
      GenerateBackendURL("loan-request/get_item?id=" + params.loan_request_id),
      {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      return (
        <ViewRequest
          access_token={session!.user!.access_token.token}
          data={await res.json()}
        />
      );
    }
    return notFound();
  } catch (e) {
    console.log(e);
    return notFound();
  }
}
