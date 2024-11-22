"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function HomeCarousel() {
  return (
    <Carousel
      infiniteLoop
      interval={5000}
      autoPlay
      showIndicators={false}
      showThumbs={false}
      stopOnHover
      showStatus={false}
      dynamicHeight={false}
      className="max-w-4xl mx-auto "
    >
      <div className="w-full mx-auto bg-white h-full">
        <img src="/d1.jfif" className="max-w-3xl max-h-[420px]" alt="" />
      </div>
      <div className="w-full mx-auto bg-white h-full">
        <img src="/2.jfif" className="max-w-3xl max-h-[420px]" alt="" />
      </div>
      <div className="w-full mx-auto bg-white h-full">
        <img src="/3.jpg" className="max-w-3xl max-h-[420px]" alt="" />
      </div>
    </Carousel>
  );
}
