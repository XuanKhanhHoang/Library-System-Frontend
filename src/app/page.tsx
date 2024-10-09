// Đánh dấu đây là Client Component
"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { bookList } from "@/data/data";
import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  const settings = {
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

  const services = [
    {
      image: '/ks1.png',
      title: 'GIÁO TRÌNH VÀ TÀI LIỆU THAM KHẢO',
      description: 'Hiện tại, giáo trình và tài liệu tham khảo phục vụ học tập và nghiên cứu của trường đang có tại Nhà sách (địa chỉ phòng 105 nhà N1) hoặc có tại Phòng mượn tại tầng 7 nhà A8. Trân trọng thông báo...',
    },
    {
      image: '/Capture.png',
      title: 'HỖ TRỢ TƯ VẤN VÀ GIẢI ĐÁP THÔNG TIN',
      description: 'Để được giải đáp các vấn đề liên quan đến Trung tâm thông tin - Thư viện, bạn đọc vui lòng làm theo một trong các cách sau: 1. Gọi điện đến số điện thoại: 024.37669860 2. Gửi mail về địa chỉ:...',
    },
    {
      image: '/ks.png',
      title: 'TRA CỨU THEO YÊU CẦU',
      description: 'Bộ phận dịch vụ (tầng 6 nhà A8) hỗ trợ, hướng dẫn, tìm kiếm thông tin, cung cấp các sản phẩm thông tin theo yêu cầu cho người dùng tin dưới dạng bản in, cơ sở dữ liệu thư mục...',
    },
  ];
 

  const object = bookList;

  const truncateDescription = (description: string) => {
    const words = description.split(" ");
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : description;
  };

  const ServiceItem: React.FC<{ image: string; title: string; description: string }> = ({ image, title, description }) => (
    <div className="flex mb-6">
      <div className="w-1/4 mr-4">
        <Image src={image} alt={title} width={200} height={150} className="rounded-lg" />
      </div>
      <div className="w-3/4">
        <h3 className="text-red-700 font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Trending Book */}
      <div className="slider-container p-5 rounded-lg">
        <div className="mt-5 mb-2">
          <div className="bg-[#f9f5f0] py-2 px-4 flex items-center">
            <div className="w-1 h-6 bg-gray-700 mr-3"></div>
            <h2 className="text-red-700 font-bold text-lg uppercase">Sách mới</h2>
          </div>
        </div>
        <Slider {...settings}>
          {object.map((book, index) => (
            <div key={index} className="relative w-[100px] h-[100px] px-3">
              <Link href="/book-detail">
                <div className="border border-white/50 p-2 transition duration-300">
                  <img src={book.thumbnail} alt={book.title} className="w-full h-auto" />
                  <div className="text-center mt-[10px]">
                    <h1>{book.title}</h1>
                    <h2>{book.publish_year}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
        <hr className="border-white my-4" />
      </div>

      <div className="slider-container p-5 rounded-lg">
        <div className="bg-[#f9f5f0] py-2 px-4 mb-6 flex items-center">
          <div className="w-1 h-6 bg-gray-700 mr-3"></div>
          <h2 className="text-red-700 font-bold text-lg uppercase">Dịch vụ</h2>
        </div>
        
        {services.map((service, index) => (
          <ServiceItem key={index} {...service} />
        ))}
        
        <div className="flex justify-center items-center mt-6">
          <Link href="/services?page=1" className="mx-1 px-3 py-1 rounded bg-gray-100 text-red-700 hover:bg-gray-200">1</Link>
          <Link href="/services?page=2" className="mx-1 px-3 py-1 rounded bg-gray-100 text-red-700 hover:bg-gray-200">2</Link>
          <Link href="/services?page=2" className="mx-1 px-3 py-1 rounded bg-gray-100 text-red-700 hover:bg-gray-200">sau &gt;</Link>
          <Link href="/services?page=2" className="mx-1 px-3 py-1 rounded bg-gray-100 text-red-700 hover:bg-gray-200">cuối &raquo;</Link>
        </div>

      </div>
      <div className="slider-container p-5 rounded-lgx">
        <div className="bg-[#f9f5f0] py-2 px-4 mb-6 flex items-center">
          <div className="w-1 h-6 bg-gray-700 mr-3"></div>
          <h2 className="text-red-700 font-bold text-lg uppercase">Tin tức</h2>
        </div>
        
        {services.map((service, index) => (
          <ServiceItem key={index} {...service} />
        ))}
        
        <div className="flex justify-center items-center mt-6">
          <Link href="/services?page=1" className="mx-1 px-3 py-1 rounded bg-gray-100 text-red-700 hover:bg-gray-200">1</Link>
          <Link href="/services?page=2" className="mx-1 px-3 py-1 rounded bg-gray-100 text-red-700 hover:bg-gray-200">2</Link>
          <Link href="/services?page=2" className="mx-1 px-3 py-1 rounded bg-gray-100 text-red-700 hover:bg-gray-200">sau &gt;</Link>
          <Link href="/services?page=2" className="mx-1 px-3 py-1 rounded bg-gray-100 text-red-700 hover:bg-gray-200">cuối &raquo;</Link>
        </div>

      </div>
      
    </>
  );
}