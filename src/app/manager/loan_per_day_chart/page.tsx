import { options } from "@/app/api/auth/[...nextauth]/options";
import LoanPerDayChart from "@/components/manager/charts/LoanPerDayChart/main";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: {
    min_date?: string;
    max_date?: string;
  };
}) {
  const { min_date, max_date } = searchParams;
  const searchPr = new URLSearchParams();
  if (
    min_date &&
    max_date &&
    new Date(decodeURIComponent(min_date)) >
      new Date(decodeURIComponent(max_date))
  )
    return notFound;
  if (min_date) {
    searchPr.append("min_date", min_date);
  }
  if (max_date) {
    searchPr.append("max_date", max_date);
  }
  const session = await getServerSession(options);
  try {
    let res = await fetch(
      GenerateBackendURL(
        "loan-return-transaction/get_number_of_loan_transaction_day_by_day?" +
          searchPr.toString()
      ),
      {
        headers: {
          Authorization: "Bearer " + session!.user!.access_token.token,
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      return (
        <LoanPerDayChart
          data={await res.json()}
          min_date={min_date}
          max_date={max_date}
        />
      );
    }
    return <span>Có lỗi xảy ra</span>;
  } catch (e) {
    console.log(e);
    return <span>Có lỗi xảy ra</span>;
  }
}
