import { options } from "@/app/api/auth/[...nextauth]/options";
import UpdateEditUser from "@/components/manager/ManageUser/UpdateCreateUser/main";
import { getServerSession } from "next-auth";

export default async function page() {
  let accessToken = (await getServerSession(options))!.user!.access_token.token;
  return <UpdateEditUser accessToken={accessToken} userProp={undefined} />;
}
