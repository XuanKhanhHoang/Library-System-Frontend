import Loader from "@/components/manager/common/Loader";
import DefaultLayout from "@/components/manager/Layouts/DefaultLayout";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { librarianRole } from "../api/auth/[...nextauth]/roles.enum";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const session = await getServerSession(options);
  if (
    pathname != "/manager/logout" &&
    pathname != "/manager/login" &&
    Number(session?.user?.access_token.exp) < new Date().getTime()
  ) {
    return redirect("/manager/logout");
  }
  if (
    pathname != "/manager/login" &&
    pathname != "/manager/logout" &&
    (!session ||
      !session.user ||
      !session?.user?.access_token ||
      session?.user?.role != librarianRole)
  )
    return redirect("/manager/login");
  if (pathname == "/manager/login" && session) return redirect("/manager");
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <Suspense fallback={<Loader />}>
        {pathname == "/manager/login" ? (
          children
        ) : (
          <DefaultLayout>{children}</DefaultLayout>
        )}
      </Suspense>
    </div>
  );
}
