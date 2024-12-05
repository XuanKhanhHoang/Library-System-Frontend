import HomeCarousel from "@/components/user/home/carousel/HomeCarousel";
import CardSlider from "@/components/user/home/CardSlider/CardSlider";
import { GenerateBackendURL } from "@/utils/backendUrl";
import {
  GetDocumentsResponse,
  PreviewDocument,
} from "./manager/documents/page";

export default async function Home() {
  let newDocuments: PreviewDocument[] | undefined,
    learningDocuments: PreviewDocument[] | undefined,
    historicalDocuments: PreviewDocument[] | undefined;
  try {
    [newDocuments, learningDocuments, historicalDocuments] = await Promise.all([
      fetch(
        "http://localhost:8081/api/v1/document/get_preview_documents?limit=10&sort_by_col=document_id&sort_type=desc",
        { cache: "no-store" }
      )
        .then((res) => res.json())
        .then((res: GetDocumentsResponse) => res.data),
      fetch(
        "http://localhost:8081/api/v1/document/get_preview_documents?limit=10&category_ids=3",
        { cache: "no-store" }
      )
        .then((res) => res.json())
        .then((res: GetDocumentsResponse) => res.data),
      fetch(
        "http://localhost:8081/api/v1/document/get_preview_documents?limit=10&category_ids=2",
        { cache: "no-store" }
      )
        .then((res) => res.json())
        .then((res: GetDocumentsResponse) => res.data),
    ]);
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <HomeCarousel />
      <div className="slider-container p-5 rounded-lg">
        <div className="mt-5 mb-2">
          <div className="bg-[#f9f5f0] py-2 px-4 flex items-center">
            <div className="w-1 h-6 bg-gray-700 mr-3"></div>
            <h2 className="text-red-700 font-bold text-lg uppercase">
              Sách mới
            </h2>
          </div>
        </div>
        <CardSlider data={newDocuments || []} />
        <hr className="border-white my-4" />
      </div>
      <div className="slider-container p-5 rounded-lg">
        <div className="mt-5 mb-2">
          <div className="bg-[#f9f5f0] py-2 px-4 flex items-center">
            <div className="w-1 h-6 bg-gray-700 mr-3"></div>
            <h2 className="text-red-700 font-bold text-lg uppercase">
              Văn học nước ngoài
            </h2>
          </div>
        </div>
        <CardSlider data={learningDocuments || []} />
        <hr className="border-white my-4" />
      </div>
      <div className="slider-container p-5 rounded-lg">
        <div className="mt-5 mb-2">
          <div className="bg-[#f9f5f0] py-2 px-4 flex items-center">
            <div className="w-1 h-6 bg-gray-700 mr-3"></div>
            <h2 className="text-red-700 font-bold text-lg uppercase">
              Văn học Việt Nam
            </h2>
          </div>
        </div>
        <CardSlider data={historicalDocuments || []} />
        <hr className="border-white my-4" />
      </div>
    </>
  );
}
