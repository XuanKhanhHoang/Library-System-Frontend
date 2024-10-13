import { options } from "@/app/api/auth/[...nextauth]/options";
import CreateNewVariant from "@/components/manager/ManageDocument/CreateNewVariant/main";
import { Document, Supplier } from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession, Session } from "next-auth";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  if (!params || !params.id || isNaN(Number(params.id))) return notFound();
  const [session, suppliers, document] = await Promise.all([
    getServerSession(options),
    fetch(GenerateBackendURL("handle-simple-data/get_suppliers")).then(
      async (res) => {
        if (res.ok) return (await res.json()) as Supplier[];
        return [];
      }
    ),
    fetch(
      GenerateBackendURL(`document/get_document?document_id=${params.id}`)
    ).then(async (res) => {
      if (res.ok)
        return (await res.json()) as {
          document_id: string;
          document_name: string;
        };
      return undefined;
    }),
  ]);
  if (!document) return notFound();
  return (
    <CreateNewVariant
      document={{
        document_id: document.document_id,
        name: document.document_name,
      }}
      session={session as unknown as Session}
      suppliers={suppliers}
    />
  );
}
