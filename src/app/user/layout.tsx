import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { userRole } from "../api/auth/[...nextauth]/roles.enum";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = await getServerSession(options);
  if (
    !session ||
    new Date(session.user!.access_token.exp) < new Date() ||
    session.user?.role != userRole
  )
    return redirect("/auth/login");
  return children;
}
