import { options } from "@/app/api/auth/[...nextauth]/options";
import UpdateEditUser from "@/components/manager/ManageUser/UpdateCreateUser/main";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  if (!params.id || isNaN(Number(params.id))) return notFound();
  let accessToken = (await getServerSession(options))!.user!.access_token.token;
  try {
    let res = await fetch(
      "http://localhost:8081/api/v1/user/get_user" + "?user_id=" + params.id,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        cache: "no-store",
      }
    );
    if (!res.ok) return notFound();
    let user = await res.json();
    return <UpdateEditUser accessToken={accessToken} userProp={user} />;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
