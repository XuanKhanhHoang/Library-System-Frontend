import { PreviewDocument } from "@/app/manager/documents/page";
import { getWebViewLinkFromWebContentLink } from "@/utils/handleImage";
import { truncateString } from "@/utils/handleString";
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
    <div className={`relative  px-3 ${widthClass} shadow-md h-[400px] mb-2`}>
      <Link href={`/document/${item.document_id}`}>
        <div className="border border-white/50 p-2 transition duration-300  flex flex-col justify-between">
          <div className="h-[245px]">
            <img
              src={
                getWebViewLinkFromWebContentLink(item.image) || "utcLogo.png"
              }
              alt={item.document_name}
              className="w-full h-auto !max-h-[245px]"
            />
          </div>
          <div className="text-center mt-[10px] flex flex-col justify-between flex-1">
            <span className="font-medium text-lg">
              {truncateString(item.document_name, 20)}
            </span>
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
