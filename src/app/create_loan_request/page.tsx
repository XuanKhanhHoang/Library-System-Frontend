import CreateLoanRequest from "@/components/user/CreateLoanRequest/CreateLoanRequest";
import { DocumentWithoutVariant } from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

export default async function page({
  searchParams,
}: {
  searchParams: {
    document_id?: string;
  };
}) {
  const session = await getServerSession(options);
  if (!session?.user?.access_token) redirect("/auth/login");
  const { document_id } = searchParams;
  if (searchParams.document_id && isNaN(Number(document_id))) return notFound();

  return (
    <>
      <div className="flex flex-row  bg-white p-2 rounded-sm items-center flex-wrap justify-center">
        <i className="fa-solid text-2xl fa-money-check"></i>
        <h1 className=" text-center  w-fit text-2xl font-bold p-2">
          Xác nhận đặt lịch mượn
        </h1>
      </div>
      <div className=" max-w-screen-lg  mx-auto ">
        <CreateLoanRequest
          document_id={searchParams.document_id}
          token={session!.user!.access_token.token}
        />
      </div>
    </>
  );
}
