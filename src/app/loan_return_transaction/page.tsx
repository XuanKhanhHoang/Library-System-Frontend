import { options } from "@/app/api/auth/[...nextauth]/options";
import LoanReturnTransactions from "@/components/user/loan_return_transaction/LoanReturnTransaction";
import { LoanReturnItem } from "@/dtos/loan_return";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function page({ searchParams }: { searchParams: {} }) {
  const session = await getServerSession(options);
  if (!session?.user?.access_token.token) return redirect("/auth/login");
  let needReturn,
    fullList:
      | {
          data: LoanReturnItem[];
          total_page: number;
        }
      | undefined;
  try {
    [needReturn, fullList] = await Promise.all([
      fetch(
        "http://localhost:8081/api/v1/loan-return-transaction/get_user_list?is_returned=false",
        {
          headers: {
            Authorization: "Bearer " + session!.user!.access_token.token,
          },
          cache: "no-store",
        }
      ).then(
        async (res) =>
          (
            (await res.json()) as {
              data: LoanReturnItem[];
              total_page: number;
            }
          ).data
      ),
      fetch(
        "http://localhost:8081/api/v1/loan-return-transaction/get_user_list",
        {
          headers: {
            Authorization: "Bearer " + session!.user!.access_token.token,
          },
          cache: "no-store",
        }
      ).then(
        async (res) =>
          (await res.json()) as {
            data: LoanReturnItem[];
            total_page: number;
          }
      ),
    ]);
  } catch (e) {
    console.log(e);
  }
  return (
    <LoanReturnTransactions
      token={session!.user!.access_token.token}
      data={{
        fullList: fullList,
        needReturn: needReturn,
      }}
    />
  );
}
