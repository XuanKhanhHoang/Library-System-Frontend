import { options } from "@/app/api/auth/[...nextauth]/options";
import UpdateEditUser from "@/components/manager/ManageUser/UpdateCreateUser/main";
import UpdateUser from "@/components/user/user/UpdateUser";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function page() {
  let session = (await getServerSession(options))!.user!;
  try {
    let res = await fetch(
      "http://localhost:8081/api/v1/user/get_user" +
        "?user_id=" +
        session.user_info.id_user,
      {
        headers: {
          Authorization: "Bearer " + session.access_token.token,
        },
        cache: "no-store",
      }
    );
    if (!res.ok) return notFound();
    let user = await res.json();
    return (
      <UpdateUser accessToken={session.access_token.token} userProp={user} />
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
