import { options } from "@/app/api/auth/[...nextauth]/options";
import CheckLoanRequest from "@/components/manager/ManageLoanRequest/CheckLoanRequest/main";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(options);
  return <CheckLoanRequest access_token={session!.user!.access_token.token} />;
}
