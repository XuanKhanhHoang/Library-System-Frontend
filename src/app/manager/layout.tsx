import Loader from "@/components/manager/common/Loader";
import DefaultLayout from "@/components/manager/Layouts/DefaultLayout";
import { headers } from "next/headers";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <Suspense fallback={<Loader />}>
            {pathname == "/manager/login" ? (
              children
            ) : (
              <DefaultLayout>{children}</DefaultLayout>
            )}
          </Suspense>
        </div>
      </body>
    </html>
  );
}
