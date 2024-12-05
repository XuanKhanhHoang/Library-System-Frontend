import { options } from "@/app/api/auth/[...nextauth]/options";
import CreateNewDocument from "@/components/manager/ManageDocument/CreateNewDocument/main";
import { Author, Category, Publisher, Supplier } from "@/dtos/documents";
import { GenerateBackendURL } from "@/utils/backendUrl";
import { getServerSession, Session } from "next-auth";

export default async function page() {
  const session = (await getServerSession(options)) as Session;
  let data = undefined;
  try {
    const [categories, authors, suppliers, publishers] = await Promise.all([
      fetch(
        "http://localhost:8081/api/v1/handle-simple-data/get_categories"
      ).then(async (res) => {
        if (res.ok) return (await res.json()) as Category[];
        return [];
      }),
      fetch("http://localhost:8081/api/v1/handle-simple-data/get_authors").then(
        async (res) => {
          if (res.ok) return (await res.json()) as Author[];
          return [];
        }
      ),
      fetch(
        "http://localhost:8081/api/v1/handle-simple-data/get_suppliers"
      ).then(async (res) => {
        if (res.ok) return (await res.json()) as Supplier[];
        return [];
      }),
      fetch(
        "http://localhost:8081/api/v1/handle-simple-data/get_publishers"
      ).then(async (res) => {
        if (res.ok) return (await res.json()) as Publisher[];
        return [];
      }),
    ]);
    data = {
      categories,
      authors,
      suppliers,
      publishers,
    };
  } catch (error) {}
  return <CreateNewDocument data={data} session={session} />;
}
