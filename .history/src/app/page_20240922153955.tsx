/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { bookList } from "@/data/data";

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
  const object = bookList;
  return (
    <div className="slider-container">
      <div className="mt-[20px] mb-[10px]">
        <h1 className="">Trending Book</h1>
      </div>
      <Slider {...settings}>
        {object.map((i, index) => (
          <div className="w-[100px] h-[100px] px-3" key={index}>
            <div>
              <img src={i.thumbnail} alt="hello" />
            </div>
            <div className="text-center mt-[10px]">
              <h1>{i.title}</h1>
              <h2>100,000đ</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
