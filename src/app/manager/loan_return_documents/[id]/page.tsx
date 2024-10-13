import { options } from "@/app/api/auth/[...nextauth]/options";
import LoanReturnTransactionDetail from "@/components/manager/ManageLoanReturnTransaction/LoanReturnTransaction/main";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  if (!params.id || isNaN(Number(params.id))) return notFound();
  try {
    const session = await getServerSession(options);
    let res = await fetch(
      GenerateBackendURL("loan-return-transaction/get_item?id=" + params.id),
      {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      return <LoanReturnTransactionDetail data={await res.json()} />;
    } else return notFound();
  } catch (error) {
    console.log("dd", error);
    return notFound();
  }
}
