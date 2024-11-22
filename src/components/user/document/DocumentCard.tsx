import { PreviewDocument } from "@/app/manager/documents/page";
import { getWebViewLinkFromWebContentLink } from "@/utils/handleImage";
import Link from "next/link";
import React from "react";

export default function DocumentCard({
  item,
  widthClass = "w-56",
}: {
  item: PreviewDocument;
  widthClass?: string;
}) {
  return (
    <div className={`relative  px-3 ${widthClass} shadow-md h-80 mb-2`}>
      <Link href={`/document/${item.document_id}`}>
        <div className="border border-white/50 p-2 transition duration-300  flex flex-col justify-between">
          <img
            src={getWebViewLinkFromWebContentLink(item.image) || "utcLogo.png"}
            alt={item.document_name}
            className="w-full h-auto"
          />
          <div className="text-center mt-[10px] flex flex-col">
            <span className="font-medium text-lg">{item.document_name}</span>
            <p>
              <span className="font-semibold">Tác giả:</span>{" "}
              {item.author.author_name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
