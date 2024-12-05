"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  GetDocumentsResponse,
  PreviewDocument,
} from "@/app/manager/documents/page";
import { getWebViewLinkFromWebContentLink } from "@/utils/handleImage";
import Slider, { Settings } from "react-slick";
import Link from "next/link";
import DocumentCard from "../../document/DocumentCard";

export default function CardSlider({
  data,
  settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
  },
}: {
  data: PreviewDocument[];
  settings?: Settings;
}) {
  return (
    <Slider {...settings} className="h-auto">
      {data.map((item, index) => (
        <DocumentCard item={item} key={index} />
      ))}
    </Slider>
  );
}
