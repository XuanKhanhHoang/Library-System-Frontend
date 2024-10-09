import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { headers } from "next/headers";
import UserLayout from "@/components/user/layout/UserLayout";
import UserLayout1 from "@/components/user/layout/UserLayout1";
const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  if (pathname.startsWith("/manager"))
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  return (
    <html lang="en">
      <body className={inter.className}>
        {pathname !== "/login" && <UserLayout /> }
        <div className="max-w-screen-xl mx-auto">{children}</div>
        {pathname !== "/login" && <UserLayout1 />}
      </body>
    </html>
  );
}
