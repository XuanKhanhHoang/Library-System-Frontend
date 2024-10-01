/* eslint-disable @next/next/no-img-element */
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
      <div className="mt-[20px] mb-[10px]">
        <h1 className="">Trending Book</h1>
      </div>
      <Slider {...settings}>
        {object.map((i, index) => (
          <div className="w-[100px] h-[100px] px-3" key={index}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1726629597558-7450add25eb8?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="hello"
              />
            </div>
            <div className="mt-[10px]">
              <h1>Hello world</h1>
              <h2>100,000đ</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
