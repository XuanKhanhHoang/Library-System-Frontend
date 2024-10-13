import { options } from "@/app/api/auth/[...nextauth]/options";
import BackButton from "@/components/common/backButton/BackButton";
import UpdateDocumentAndVariants from "@/components/manager/ManageDocument/UpdateDocumentAndVariants/main";
import { Author, Category, Document, Publisher } from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const session = (await getServerSession(options)) as Session;
  let data = undefined,
    document: Document;
  try {
    let response = await fetch(
      GenerateBackendURL("document/get_document?document_id=" + params.id),{
        cache:"no-cache"
      }
    );
    if (!response.ok) return notFound();
    document = await response.json();
    const [categories, authors, publishers] = await Promise.all([
      fetch(GenerateBackendURL("handle-simple-data/get_categories")).then(
        async (res) => {
          if (res.ok) return (await res.json()) as Category[];
          return [];
        }
      ),
      fetch(GenerateBackendURL("handle-simple-data/get_authors")).then(
        async (res) => {
          if (res.ok) return (await res.json()) as Author[];
          return [];
        }
      ),
      fetch(GenerateBackendURL("handle-simple-data/get_publishers")).then(
        async (res) => {
          if (res.ok) return (await res.json()) as Publisher[];
          return [];
        }
      ),
    ]);
    data = {
      categories,
      authors,
      publishers,
    };
    return (
      <UpdateDocumentAndVariants
        document={document}
        session={session}
        data={data}
      />
    );
  } catch (e) {
    return notFound();
  }
}
