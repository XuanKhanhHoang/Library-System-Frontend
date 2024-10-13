import { options } from "@/app/api/auth/[...nextauth]/options";
import CreateLoan from "@/components/manager/ManageLoanReturnTransaction/CreateLoan/main";
import LoanReturnTransactionDetail from "@/components/manager/ManageLoanReturnTransaction/LoanReturnTransaction/main";
import { LoanRequestWithVariants } from "@/dtos/loan_request";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  if (!params.id || isNaN(Number(params.id))) return notFound();
  try {
    const session = await getServerSession(options);
    let res = await fetch(
      GenerateBackendURL(
        "loan-request/get_item_include_variants_of_document?id=" + params.id
      ),
      {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        cache: "no-store",
      }
    );

    if (res.ok) {
      let data = (await res.json()) as LoanRequestWithVariants;

      return (
        <CreateLoan data={data} token={session!.user!.access_token.token} />
      );
    } else return notFound();
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
