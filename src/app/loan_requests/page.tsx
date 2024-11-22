import { options } from "@/app/api/auth/[...nextauth]/options";
import ManageLoanRequest from "@/components/manager/ManageLoanRequest/main";
import LoanRequests from "@/components/user/loanList/main";
import { LoanRequestWithStatusUserName } from "@/dtos/loan_request";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function page() {
  const session = await getServerSession(options);
  let waiting,
    newAccepted,
    fullList:
      | {
          data: LoanRequestWithStatusUserName[];
          total_page: number;
        }
      | undefined;
  try {
    [waiting, newAccepted, fullList] = await Promise.all([
      fetch(
        GenerateBackendURL("loan-request/get_user_list?status_id=1?limit=100"),
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
              data: LoanRequestWithStatusUserName[];
              total_page: number;
            }
          ).data
      ),
      fetch(
        GenerateBackendURL("loan-request/get_user_list?status_id=3&limit=4"),
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
              data: LoanRequestWithStatusUserName[];
              total_page: number;
            }
          ).data
      ),
      fetch(GenerateBackendURL("loan-request/get_user_list"), {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        cache: "no-store",
      }).then(
        async (res) =>
          (await res.json()) as {
            data: LoanRequestWithStatusUserName[];
            total_page: number;
          }
      ),
    ]);
  } catch (e) {
    console.log(e);
  }
  return (
    <LoanRequests
      access_token={session!.user!.access_token.token}
      data={{
        fullList: fullList,
        newAccepted: newAccepted,
        waiting: waiting,
      }}
    />
  );
}
