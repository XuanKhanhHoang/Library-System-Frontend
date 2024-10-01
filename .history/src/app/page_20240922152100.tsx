"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const object = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="slider-container">
      <h1>Trending Book</h1>
      <Slider {...settings}>
        {object.map((i, index) => (
          <div className="w-[100px] h-[100px] bg-red-600 px-3" key={index}>
            <h1>{i}</h1>
          </div>
        ))}
      </Slider>
    </div>
  );
}
