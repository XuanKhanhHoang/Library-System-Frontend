import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function Home() {
  return (
    <div className="swiper mySwiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
        <div className="swiper-slide">Slide 4</div>
        <div className="swiper-slide">Slide 5</div>
        <div className="swiper-slide">Slide 6</div>
        <div className="swiper-slide">Slide 7</div>
        <div className="swiper-slide">Slide 8</div>
        <div className="swiper-slide">Slide 9</div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
}
